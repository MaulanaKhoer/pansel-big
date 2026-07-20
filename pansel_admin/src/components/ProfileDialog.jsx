import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';

import FormInformation from './Profile/FormInformation';

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

export default function ProfileDialog({ open, setOpen }) {
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
            PaperProps={{
                style: {
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }
            }}
        >
            <DialogTitle 
                style={{ 
                    cursor: 'move', 
                    padding: '16px 24px', 
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#1a3a6b'
                }} 
                id="draggable-dialog-title"
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Edit Profil Operator</span>
                    <IconButton size="small" onClick={handleCloseDialog}>
                        <Close />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent style={{ padding: '24px' }}>
                <FormInformation handleCloseDialog={handleCloseDialog} />
            </DialogContent>
        </Dialog>
    );
}