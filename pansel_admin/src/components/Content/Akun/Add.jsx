import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import { useState } from 'react';
import { ArrowBack, Save } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

export default function AccountAdd() {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const token = getCookie('OPERATOR_TOKEN');
    
    const url_insert = Config.api_domain + "/user";

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
        return !loading && username.length > 0 && email.length > 0 && password.length > 0;
    }

    const postData = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                 },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            };

            const response = await fetch(url_insert, requestOptions)
            var json = await response.json();
            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage("Account registered successfully!");
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
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Add New Account</h3>
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
                                label="Password" 
                                type="password" 
                                variant="outlined" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
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
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <Backdrop open={openBackdrop} sx={{color: "#1976d2", backgroundColor: "rgba(255, 255, 255, 0.6)", zIndex:100}}>
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
