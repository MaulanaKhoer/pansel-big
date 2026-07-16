import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import { useState, useEffect } from 'react';
import { ArrowBack, Delete } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

export default function DataDelete({ dataId, setOpenDialog, setRefresh }) {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

    const token = getCookie('OPERATOR_TOKEN');
    const url_get = Config.api_domain + "/user/" + dataId;
    const url_delete = Config.api_domain + "/user/" + dataId;

    useEffect(() => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            };
         
            fetch(url_get, requestOptions).then(res => res.json()).then(data => {
                setTitle(data.username || data.email || "");
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
        return !loading && title.length > 0;
    }

    const postData = async () => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            };

            const response = await fetch(url_delete, requestOptions)
            var json = await response.json();
            if (response.status === 200) {
                setSuccess(true);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(json.message || "Deleted successfully!");
                                   
                window.setTimeout(() => {
                    setOpenDialog(false);
                    setRefresh(true);
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
        <div style={{ padding: '24px' }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div style={{ marginBottom: '16px' }}>
                    <TextField 
                        size="small" 
                        fullWidth 
                        label="Username" 
                        variant="outlined" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        disabled 
                    />
                </div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    Are you sure you want to delete this account?
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ArrowBack />}
                        onClick={() => setOpenDialog(false)}
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
                        color="error"
                        startIcon={<Delete />}
                        type="submit"
                        disabled={!validateForm()}
                        size="medium"
                        style={{
                            borderRadius: '100px',
                            textTransform: 'none',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600
                        }}
                    >
                        Yes, Delete
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