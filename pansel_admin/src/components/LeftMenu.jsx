import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import ForumIcon from '@mui/icons-material/Forum';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PublicIcon from '@mui/icons-material/Public';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

import { useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Pansel Setting', href: '#/pansel', icon: PublicIcon, path: '/pansel' },
    { label: 'Tahapan', href: '#/tahapan', icon: ForumIcon, path: '/tahapan' },
    { label: 'Jadwal List', href: '#/jadwal', icon: EventIcon, path: '/jadwal' },
    { label: 'Berkas List', href: '#/berkas', icon: CollectionsBookmarkIcon, path: '/berkas' },
    { label: 'Pengumuman List', href: '#/pengumuman', icon: ListAltIcon, path: '/pengumuman' },
    { label: 'Pelamar List', href: '#/pelamar', icon: GroupIcon, path: '/pelamar' },
    { label: 'Account List', href: '#/akun', icon: PersonIcon, path: '/akun' },
];

export default function LeftMenu() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const isActive = (path) => location?.pathname.includes(path);
    const isHome = location?.pathname === '/';

    const itemSx = (active) => ({
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '13.5px',
        fontWeight: active ? 700 : 500,
        color: active ? '#1a3a6b' : '#5a6a84',
        borderRight: active ? '3px solid #1a3a6b' : '3px solid transparent',
        backgroundColor: active ? 'rgba(26,58,107,0.07) !important' : 'transparent',
        borderRadius: '8px',
        margin: '2px 8px',
        padding: '8px 12px',
        '&:hover': {
            backgroundColor: 'rgba(26,58,107,0.05) !important',
            color: '#1a3a6b',
        },
        transition: 'all 0.2s ease',
    });

    const iconSx = (active) => ({
        color: active ? '#1a3a6b' : '#9aacbf',
        minWidth: '36px',
    });

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper', pt: 1 }}
            component="nav"
            subheader={
                <ListSubheader
                    component="div"
                    sx={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '1.4px',
                        textTransform: 'uppercase',
                        color: '#9aacbf',
                        lineHeight: '2',
                        padding: '8px 20px 4px',
                        background: 'transparent',
                    }}
                >
                    Navigation
                </ListSubheader>
            }
        >
            {/* Home */}
            <ListItemButton
                component="a"
                href="#/"
                sx={itemSx(isHome)}
            >
                <ListItemIcon sx={iconSx(isHome)}>
                    <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                    primary="Home"
                    primaryTypographyProps={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '13.5px',
                        fontWeight: isHome ? 700 : 500,
                    }}
                />
            </ListItemButton>

            {/* Manage Content collapsible */}
            <ListItemButton
                onClick={() => setOpen(!open)}
                sx={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    margin: '2px 8px',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#5a6a84',
                    '&:hover': { backgroundColor: 'rgba(26,58,107,0.05) !important', color: '#1a3a6b' },
                }}
            >
                <ListItemIcon sx={{ color: '#9aacbf', minWidth: '36px' }}>
                    <GridViewIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                    primary="Manage Content"
                    primaryTypographyProps={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '13.5px',
                        fontWeight: 600,
                    }}
                />
                {open
                    ? <ExpandLess sx={{ color: '#9aacbf', fontSize: '18px' }} />
                    : <ExpandMore sx={{ color: '#9aacbf', fontSize: '18px' }} />
                }
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        const Icon = item.icon;
                        return (
                            <ListItemButton
                                key={item.path}
                                component="a"
                                href={item.href}
                                sx={{ ...itemSx(active), pl: 3 }}
                            >
                                <ListItemIcon sx={iconSx(active)}>
                                    <Icon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: '13px',
                                        fontWeight: active ? 700 : 500,
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
}