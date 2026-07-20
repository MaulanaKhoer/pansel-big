import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { Save } from '@mui/icons-material';

import { useState, useEffect } from 'react';

import Config from '../../config.json';
import { getCookie } from '../../Helpers';

export default function FormInformation({ handleCloseDialog }) {
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [publicId, setPublicId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const token = getCookie('OPERATOR_TOKEN');
    const operator_public_id = getCookie('OPERATOR_PUBLIC_ID');

    const url_user = Config.api_domain + "/user/";

    useEffect(() => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            };

            fetch(url_user + operator_public_id, requestOptions).then(res => res.json()).then(data => {
                if (data) {
                    setPublicId(data.uuid || "");
                    setUsername(data.username || "");
                    setEmail(data.email || "");
                }
            });

        } catch (error) {
            console.error(`Error fetching profile: ${error}`);
        }
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loading) {
            setSuccess(false);
            setLoading(true);
            setOpenBackdrop(true);
            postData();
        }
    };

    function validateForm() {
        return !loading && username.length > 0 && email.length > 0;
    }

    const postData = async () => {
        try {
            const bodyData = {
                "username": username,
                "email": email
            };
            if (password && password.length > 0) {
                bodyData.password = password;
            }

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(bodyData)
            };

            const response = await fetch(url_user + operator_public_id, requestOptions);
            var json = await response.json();
            if (response.ok) {
                setSuccess(true);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(json.message || "Profile updated successfully.");
                
                // Update username in cookie if updated successfully
                document.cookie = `OPERATOR=${username}; path=/`;

                window.setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setSuccess(false);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(json.message || "Some error occurred while updating profile.");
            }
        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpenBackdrop(false);
            setOpen(true);
            setMessage(`Error ${error}`);
        }
    };

    return (
        <div style={{ padding: '8px 4px' }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div style={{ marginBottom: '16px' }}>
                    <TextField 
                        size="small" 
                        fullWidth 
                        label="Public Id" 
                        variant="outlined" 
                        value={publicId} 
                        disabled 
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <TextField 
                        size="small" 
                        fullWidth 
                        label="Username" 
                        variant="outlined" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <TextField 
                        size="small" 
                        fullWidth 
                        type="email"
                        label="Email" 
                        variant="outlined" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <TextField 
                        size="small" 
                        fullWidth 
                        type="password"
                        label="Password (Kosongkan jika tidak ingin diubah)" 
                        variant="outlined" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleCloseDialog}
                        size="medium"
                        style={{
                            borderRadius: '100px',
                            textTransform: 'none',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        type="submit"
                        disabled={!validateForm()}
                        size="medium"
                        style={{
                            borderRadius: '100px',
                            textTransform: 'none',
                            background: validateForm() ? 'linear-gradient(135deg, var(--primary), var(--primary-light))' : undefined,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600
                        }}
                    >
                        Simpan Perubahan
                    </Button>
                </div>
            </form>

            <Backdrop open={openBackdrop} sx={{ color: "#1976d2", backgroundColor: "rgba(255, 255, 255, 0.6)", zIndex: 100 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                {success ?
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">{message}</Alert>
                }
            </Snackbar>
        </div>
    );
}