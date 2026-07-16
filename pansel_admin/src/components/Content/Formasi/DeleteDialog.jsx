import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import DataDelete from "./Delete";

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function DeleteDialog({ open, setOpen, dataId, setRefresh }) {
    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle style={{ cursor: 'move', padding: '12px 18px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', color: '#fff' }} id="draggable-dialog-title">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px' }}>Delete Formasi</span>
                    <IconButton size="small" onClick={handleCloseDialog} style={{ color: '#fff' }}>
                        <Close />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent style={{ padding: '0px' }}>
                <DataDelete dataId={dataId} setOpenDialog={(e) => setOpen(e)} setRefresh={(e) => setRefresh(e)} />
            </DialogContent>
        </Dialog>
    )
}