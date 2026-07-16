import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import { ArrowBack, Save } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

export default function AccountEdit() {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const token = getCookie('OPERATOR_TOKEN');
    let { dataId } = useParams();

    const url_update = Config.api_domain + "/user/" + dataId;
    const url_get = Config.api_domain + "/user/" + dataId;

    useEffect(() => {
        try {
            // Fetch data from REST API
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            };

            fetch(url_get, requestOptions).then(res => res.json()).then(data => {
                setUsername(data.username || "");
                setEmail(data.email || "");
            });

        } catch (error) {
            alert(`Error ${error}`)
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
                username: username,
                email: email
            };
            if (password.length > 0) {
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

            const response = await fetch(url_update, requestOptions)
            var json = await response.json();
            if (response.status === 200) {
                setSuccess(true);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(json.message || "Updated successfully.");
                window.setTimeout(() => {
                    window.location.href = "/pansel-management/#/akun"
                }, 2000);
            } else {
                setSuccess(false);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(json.message || `Error ${response.status} ${response.statusText}`);
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
        <div style={{ padding: '1em' }}>
            <div className="admin-card" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '20px' }}>
                <div className="admin-card-header" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', color: '#fff', padding: '18px 24px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Edit Account</h3>
                </div>
                <div style={{ padding: '24px' }}>
                    <form onSubmit={(e) => handleSubmit(e)}>
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
                                label="Email" 
                                type="email" 
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
                                label="Password (leave empty to keep current)" 
                                type="password" 
                                variant="outlined" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<ArrowBack />}
                                onClick={() => window.history.back()}
                                size="medium"
                                style={{
                                    borderRadius: '100px',
                                    textTransform: 'none',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontWeight: 600
                                }}
                            >
                                Cancel
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
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

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