import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Config from '../config.json';
import { setCookie } from '../Helpers';
import logo from '../big.png';

export default function Login({ setAuth }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const url_login = Config.api_domain + "/auth/loginOperator";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            postData();
        }
    };

    const validateForm = () => !loading && username.length > 0 && password.length > 0;

    const postData = async () => {
        try {
            const response = await fetch(url_login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const json = await response.json();

            if (response.status === 200 && json.Authorization) {
                setPassword("");
                setCookie('OPERATOR_TOKEN', json.Authorization);
                setCookie('OPERATOR', json.username);
                setCookie('OPERATOR_PUBLIC_ID', json.public_id);
                setSuccess(true);
                setLoading(false);
                setOpen(true);
                setMessage("Login berhasil! Mengalihkan...");
                window.location.reload();
            } else {
                setSuccess(false);
                setLoading(false);
                setOpen(true);
                setMessage(json.message || `Error ${response.status}`);
            }
        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpen(true);
            setMessage(`Error: ${error}`);
        }
    };

    return (
        <>
            <div className="login-page">
                <div className="login-card">
                    {/* Logo */}
                    <div className="login-logo">
                        <img src={logo} alt="Logo BIG" />
                        <div className="login-logo-text">
                            Seleksi JPT BIG<br />
                            <span style={{ fontWeight: 500, fontSize: '11px', opacity: 0.7 }}>
                                Badan Informasi Geospasial
                            </span>
                        </div>
                    </div>

                    <h1 className="login-title">Selamat Datang</h1>
                    <p className="login-subtitle">Masuk ke Pansel Management System</p>

                    <form onSubmit={handleSubmit}>
                        <div className="login-input-group">
                            <TextField
                                required
                                fullWidth
                                id="username"
                                autoComplete="off"
                                label="Username"
                                size="small"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: '14px',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1a3a6b',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1a3a6b',
                                    },
                                }}
                            />
                        </div>
                        <div className="login-input-group">
                            <TextField
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                size="small"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: '14px',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1a3a6b',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1a3a6b',
                                    },
                                }}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <button
                                type="submit"
                                className="login-btn"
                                disabled={!validateForm()}
                            >
                                {loading ? 'Memproses...' : '🔑 Masuk'}
                            </button>
                            {loading && (
                                <CircularProgress
                                    size={20}
                                    sx={{
                                        color: '#fff',
                                        position: 'absolute',
                                        top: '50%',
                                        right: '20px',
                                        marginTop: '-10px',
                                    }}
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {success
                    ? <Alert onClose={handleClose} severity="success" sx={{ borderRadius: '10px' }}>{message}</Alert>
                    : <Alert onClose={handleClose} severity="error" sx={{ borderRadius: '10px' }}>{message}</Alert>
                }
            </Snackbar>
        </>
    );
}