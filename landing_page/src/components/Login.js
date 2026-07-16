
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import CircularProgress from '@mui/material/CircularProgress';
import Config from '../config.json';

import { setCookie } from '../Helpers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const ButtonLogin = styled(Button)(({ theme }) => ({
    ':hover': {
        backgroundColor: "#EF4C4C!important",
        color: "white"
    }
}));

const CircularProgressExt = styled(CircularProgress)(({ theme }) => ({
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '5px',
    marginLeft: '-12px'
}));

function createData(no, nama, tanggal, link) {
    return { no, nama, tanggal, link };
}

const rows = [
    createData(1, 'Test Pengumuman Seleksi', '30 Oktober 2022', <Button variant="outlined" startIcon={<DownloadIcon />} component="a" href="./pengumuman.pdf" download>
        Unduh
    </Button>)
];

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const url_login = Config.api_domain + "/auth/login";


    const handleSubmit = (e) => {

        e.preventDefault();
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            postData();

            //timer.current = window.setTimeout(() => {
            //    setSuccess(true);
            //    setLoading(false);
            //}, 2000);
        }
    };

    function validateForm() {
        return !loading && email.length > 0 && password.length > 0;
    }


    const postData = async () => {

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                })
            };

            const response = await fetch(url_login, requestOptions)
            var json = await response.json();
            if (response.status === 200) {

                if (json.Authorization) {
                    setPassword("");
                    setCookie('USER_TOKEN', json.Authorization);
                    setCookie('CONTRIBUTOR', json.username);
                    setCookie('PUBLIC_ID', json.public_id);
                    //setCountry('CONTRIBUTOR', username);

                    setSuccess(true);
                    setLoading(false);
                    setOpen(true);
                    setMessage("You are successfully logged in");
                    //setAuth(true);
                    window.location.reload();
                } else {
                    setSuccess(false);
                    setLoading(false);
                    setOpen(true);
                    //setAuth(false);
                    setMessage(json.message);
                }
            } else {
                setSuccess(false);
                setLoading(false);
                setOpen(true);
                //setAuth(false);
                setMessage(`Error ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpen(true);
            //setAuth(false);
            setMessage(`Error ${error}`);
        }
    };


    return (
        <div style={{ padding: "1em 2em 3em 2em" }}>
            <Container sx={{ display: { xs: 'block', md: 'flex' }, justifyContent: "center" }}>
                <div style={{ padding: "20px 20px 0px 20px" }}>
                    <h1>Masuk Akun</h1>
                </div>
                <div style={{ padding: "20px 0px 20px 20px", minWidth: "50%" }}>
                    <Box sx={{ width: '85%', padding: "20px 20px 20px 20px", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} >
                        <h3 style={{ paddingLeft: "1em" }}>Form Login</h3>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className='input-wrapper'>
                                <TextField fullWidth required id="email" type="email" autoComplete="off" label="Email" color="secondary" size="small" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className='input-wrapper'>
                                <TextField fullWidth required id="password" type="password" label="Password" color="secondary" size="small" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className='button-wrapper'>
                                <ButtonLogin fullWidth variant="contained"
                                    type="submit" disabled={!validateForm()}
                                >
                                    Login
                                </ButtonLogin>
                                {loading && <CircularProgressExt size={24} />}
                            </div>
                        </form>

                    </Box>
                </div>


            </Container>
        </div>
    )
}

export default Login;