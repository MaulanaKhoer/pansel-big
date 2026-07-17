import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';

import { useState } from 'react';
import { ArrowBack, Save } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

export default function TahapanAdd() {
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [judul, setJudul] = useState("");
    const [stepNo, setStepNo] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [isActive, setIsActive] = useState("true");

    const token = getCookie('OPERATOR_TOKEN');
    const url_insert = Config.api_domain + "/tahapan/";

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
        return !loading && judul.length > 0 && stepNo.length > 0;
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
                    judul: judul,
                    step_no: stepNo ? parseInt(stepNo) : null,
                    deskripsi: deskripsi,
                    is_active: isActive === "true"
                })
            };

            const response = await fetch(url_insert, requestOptions);
            var json = await response.json();
            
            if (response.status === 201 || response.status === 200 || json.status === 'success') {
                setSuccess(true);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage("Tahapan created successfully!");
                
                window.setTimeout(() => {
                    window.location.href = "/pansel-management/#/tahapan";
                }, 2000);
            } else {
                setSuccess(false);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(json.message || "Failed to create tahapan");
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
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tambah Tahapan Baru</h3>
                </div>
                <div style={{ padding: '24px' }}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                            <TextField 
                                size="small" 
                                style={{ width: '130px' }}
                                label="Step No" 
                                type="number"
                                variant="outlined" 
                                value={stepNo} 
                                onChange={(e) => setStepNo(e.target.value)} 
                                required 
                            />
                            <TextField 
                                size="small" 
                                fullWidth 
                                label="Judul Tahapan" 
                                variant="outlined" 
                                value={judul} 
                                onChange={(e) => setJudul(e.target.value)} 
                                required 
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <TextField 
                                size="small" 
                                fullWidth 
                                label="Deskripsi / Ketentuan" 
                                variant="outlined" 
                                multiline
                                rows={5}
                                value={deskripsi} 
                                onChange={(e) => setDeskripsi(e.target.value)} 
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Status"
                                value={isActive}
                                onChange={(e) => setIsActive(e.target.value)}
                            >
                                <MenuItem value="true">Aktif</MenuItem>
                                <MenuItem value="false">Tidak Aktif</MenuItem>
                            </TextField>
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
                                Simpan
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
