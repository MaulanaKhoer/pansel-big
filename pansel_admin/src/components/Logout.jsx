
import { useEffect, useState } from 'react';
import Config from '../config.json';
import { getCookie } from '../Helpers';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import styled from "styled-components";

function Logout() {
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {

        const token = getCookie('OPERATOR_TOKEN');
        const url_logout = Config.api_domain + "/auth/logout";
        const postData = async () => {
            // Clear cookies client-side immediately
            document.cookie = "OPERATOR_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "OPERATOR=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "OPERATOR_PUBLIC_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                };
                
                // Try to notify the server about logout, but proceed anyway
                await fetch(url_logout, requestOptions);
                
                setSuccess(true);
                setOpen(true);
                setMessage("You are successfully logged out");
                
                window.setTimeout(() => {
                    if (window.location.pathname.includes('/pansel-management')) {
                        window.location.href = "/pansel-management/";
                    } else {
                        window.location.href = "/";
                    }
                }, 1000);

            } catch (error) {
                setSuccess(true);
                setOpen(true);
                setMessage("You are successfully logged out");
                
                window.setTimeout(() => {
                    if (window.location.pathname.includes('/pansel-management')) {
                        window.location.href = "/pansel-management/";
                    } else {
                        window.location.href = "/";
                    }
                }, 1000);
            }

        };
        postData();
    }, []);

    return (
        <Container >
            <Backdrop open={true} sx={{color: "white", backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex:100}}>
                <CircularProgress color="inherit" />
                Logout ...
            </Backdrop>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                {success ?
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">{message}</Alert>
                }
            </Snackbar>
        </Container>
    )
}

export default Logout;

const Container = styled.div`
`;