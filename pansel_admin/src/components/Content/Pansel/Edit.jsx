import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { Save } from '@mui/icons-material';

import { useState, useEffect } from 'react';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

export default function PanselEdit() {
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [featureType, setFeatureType] = useState("");
    const [dataId, setDataId] = useState("");
    const [pratama, setPratama] = useState("");
    const [madya, setMadya] = useState("");
    const [utama, setUtama] = useState("");

    const token = getCookie('OPERATOR_TOKEN');

    const url_update = Config.api_domain + "/seleksi/update/";
    const url_get = Config.api_domain + "/seleksi/active/";

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
                if (data){
                    setName(data.title?? "");
                    setFeatureType(data.caption?? "");
                    setDataId(data.public_id?? "");
                    setPratama(data.pratama?? 0);
                    setMadya(data.madya?? 0);
                    setUtama(data.utama?? 0);
                }
            });

        } catch (error) {
            console.error(`Error fetching config: ${error}`)
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
        return !loading && name.length > 0 && featureType.length > 0;
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
                    "title": name,
                    "caption": featureType,
                    "pratama": parseInt(pratama) || 0,
                    "madya": parseInt(madya) || 0,
                    "utama": parseInt(utama) || 0,
                    "public_id": dataId,
                })
            };

            const response = await fetch(url_update, requestOptions)
            var json = await response.json();
            if (response.status === 200) {
                if (json.status === 'success') {
                    setSuccess(true);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);
                    window.setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    setSuccess(false);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);
                }
            } else {
                setSuccess(false);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(`Error ${response.status} ${response.statusText}`);
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
        <div>
            <div className="card-panel">
                <div className="card-panel-header">Edit Pansel Setting</div>
                <div className="card-panel-body">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div style={{ marginBottom: '16px' }}>
                            <TextField 
                                size="small" 
                                fullWidth 
                                label="Title" 
                                variant="outlined" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <TextField 
                                size="small" 
                                fullWidth 
                                label="Caption" 
                                variant="outlined" 
                                value={featureType} 
                                onChange={(e) => setFeatureType(e.target.value)} 
                                required 
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                            <TextField 
                                size="small" 
                                fullWidth 
                                type="number"
                                label="Jumlah Pratama" 
                                variant="outlined" 
                                value={pratama} 
                                onChange={(e) => setPratama(e.target.value)} 
                            />
                            <TextField 
                                size="small" 
                                fullWidth 
                                type="number"
                                label="Jumlah Madya" 
                                variant="outlined" 
                                value={madya} 
                                onChange={(e) => setMadya(e.target.value)} 
                            />
                            <TextField 
                                size="small" 
                                fullWidth 
                                type="number"
                                label="Jumlah Utama" 
                                variant="outlined" 
                                value={utama} 
                                onChange={(e) => setUtama(e.target.value)} 
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
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