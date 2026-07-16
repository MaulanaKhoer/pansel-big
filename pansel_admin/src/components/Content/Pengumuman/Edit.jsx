import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ArrowBack, Save, CloudUpload } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

export default function PengumumanEdit() {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [existingFile, setExistingFile] = useState("");

    const token = getCookie('OPERATOR_TOKEN');
    const contributor = getCookie('OPERATOR');
    let { dataId } = useParams();

    const url_get = Config.api_domain + "/pengumuman/" + dataId;
    const url_update = Config.api_domain + "/pengumuman/" + dataId;

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
                setTitle(data.judul || "");
                setNotes(data.konten || "");
                setIsActive(data.is_active !== false);
                setExistingFile(data.file_url || "");
            });

        } catch (error) {
            alert(`Error fetching data: ${error}`);
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

    function onFileChange(event) {
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setFileName(event.target.files[0].name);
        }
    }

    const postData = async () => {
        try {
            const formData = new FormData();
            formData.append("username", contributor);
            formData.append("title", title);
            formData.append("notes", notes);
            formData.append("is_active", String(isActive));
            
            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': token
                },
                body: formData
            };

            const response = await fetch(url_update, requestOptions);
            var json = await response.json();

            if (json.status === 'success' || response.status === 200) {
                setSuccess(true);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(json.message || "Updated successfully.");

                window.setTimeout(() => {
                    window.location.href = "/pansel-management/#/pengumuman"
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
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Ubah Pengumuman</h3>
                </div>
                <div style={{ padding: '24px' }}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div style={{ marginBottom: '16px' }}>
                            <TextField 
                                size="small" 
                                fullWidth 
                                label="Judul Pengumuman" 
                                variant="outlined" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <TextField 
                                size="small" 
                                fullWidth 
                                label="Keterangan / Konten" 
                                variant="outlined" 
                                multiline
                                rows={3}
                                value={notes} 
                                onChange={(e) => setNotes(e.target.value)} 
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Status"
                                value={isActive ? "true" : "false"}
                                onChange={(e) => setIsActive(e.target.value === "true")}
                            >
                                <MenuItem value="true">Aktif</MenuItem>
                                <MenuItem value="false">Tidak Aktif</MenuItem>
                            </TextField>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ 
                                display: 'block', 
                                fontFamily: "'Plus Jakarta Sans', sans-serif", 
                                fontSize: '13px', 
                                fontWeight: 600, 
                                color: 'var(--text-secondary)', 
                                marginBottom: '8px' 
                            }}>
                                Dokumen Pengumuman (PDF) - *Biarkan kosong jika tidak ingin mengubah*
                            </label>
                            <label htmlFor="dataFile">
                                <input
                                    id="dataFile"
                                    name="btn-upload"
                                    style={{ display: 'none' }}
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => onFileChange(e)}
                                />
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component="span"
                                    startIcon={<CloudUpload />}
                                    style={{
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontWeight: 600
                                    }}
                                >
                                    Pilih Berkas PDF Baru
                                </Button>
                            </label>
                            {fileName ? (
                                <div style={{ 
                                    marginTop: '8px', 
                                    fontFamily: "'Plus Jakarta Sans', sans-serif", 
                                    fontSize: '13px', 
                                    color: 'var(--primary)',
                                    fontWeight: 500
                                }}>
                                    📎 File baru: {fileName}
                                </div>
                            ) : existingFile ? (
                                <div style={{ 
                                    marginTop: '8px', 
                                    fontFamily: "'Plus Jakarta Sans', sans-serif", 
                                    fontSize: '13px', 
                                    color: '#5a6a84',
                                    fontWeight: 500
                                }}>
                                    📄 File aktif saat ini: {existingFile}
                                </div>
                            ) : null}
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