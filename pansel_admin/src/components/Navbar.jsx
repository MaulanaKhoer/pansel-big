import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import logo from '../big.png';
import { getCookie } from '../Helpers';
import { useState } from 'react';
import Config from '../config.json';

export default function Navbar({ auth, setOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const contributor = getCookie('OPERATOR');

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClickOpen = () => { setOpen(true); handleClose(); };
    const handleClose = () => setAnchorEl(null);

    return (
        <div className="admin-navbar">
            {/* Brand */}
            <div className="admin-navbar-brand" onClick={() => (window.location.href = '#/')}>
                <img src={logo} alt={Config.nama_sj || 'BIG'} />
                <div className="admin-navbar-title">
                    Seleksi JPT BIG
                    <span>Pansel Management System</span>
                </div>
            </div>

            {/* Right side */}
            {auth && (
                <div className="admin-navbar-right">
                    <span className="admin-welcome">👋 Halo, {contributor}</span>
                    <IconButton
                        size="medium"
                        aria-label="akun pengguna"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        sx={{
                            color: '#1a3a6b',
                            background: 'rgba(26,58,107,0.06)',
                            borderRadius: '50%',
                            '&:hover': { background: 'rgba(26,58,107,0.12)' },
                        }}
                    >
                        <AccountCircle fontSize="medium" />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                borderRadius: '12px',
                                boxShadow: '0 8px 32px rgba(26,58,107,0.16)',
                                border: '1px solid rgba(26,58,107,0.09)',
                                minWidth: '160px',
                                mt: 0.5,
                            }
                        }}
                    >
                        <MenuItem
                            onClick={handleClickOpen}
                            sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13.5px', fontWeight: 600, py: 1.2 }}
                        >
                            👤 Profile
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                            component="a"
                            href="#/logout"
                            sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13.5px', fontWeight: 600, py: 1.2, color: '#dc2626' }}
                        >
                            🚪 Logout
                        </MenuItem>
                    </Menu>
                </div>
            )}
        </div>
    );
}
