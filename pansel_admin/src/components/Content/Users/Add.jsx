
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import { useState, useEffect } from 'react';
import styled from "styled-components";
import { ArrowBack, Save } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

import MenuItem from '@mui/material/MenuItem';
import JSZip from 'jszip';
//import FormTambah from "./FormTambah";

export default function Add() {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rPassword, setRPassword] = useState("");


    const url_insert = "../api/user/";

    const token = getCookie('ADMIN_TOKEN');
    const public_id = getCookie('ADMIN_PUBLIC_ID');

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
        return !loading && name.length > 0 && username.length > 0 && email.length > 0 && password.length > 0 && rPassword.length > 0 && rPassword === password;
    }

    
    const postData = async () => {

        try {
            // Fetch data from REST API
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    "fullname": name,
                    "username": username,
                    "email": email,
                    "password": password,
                })
            };

            const response = await fetch(url_insert, requestOptions)
            //console.log(response)

            var json = await response.json();
            //console.log(json);
            //console.log(json.status);

            if (response.status === 201) {
                console.log('sukses');
                console.log(json)
                //setGeoserverVisible(false);
                setSuccess(true);
                setLoading(false);
                setOpen(true);
                setMessage("You are successfully add user");
                //window.location.href = "http://www.w3schools.com";
                //window.history.back()
                window.setTimeout(() => {
                    window.location.href = "/sikambing/walidata/#/users"
                }, 2000);
            } else {
                setSuccess(false);
                setLoading(false);
                setOpen(true);
                setMessage(`Error ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpen(true);
            setMessage(`Error ${error}`);
        }
    };


    return <Container>
        <Title>Add New User</Title>
        <Wrapper>
            <Form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Top>
                        <Left>
                            <Input>
                                <TextField fullWidth id="name" label="Fullname" color="secondary" size="small" value={name}  onChange={e => setName(e.target.value)} />
                            </Input>
                            <Input>
                                <TextField fullWidth id="email" label="Email" type="email" color="secondary" size="small" value={email}  onChange={e => setEmail(e.target.value)} />
                            </Input>
                         
                            <Input>
                                <TextField fullWidth id="username" label="Username" color="secondary" size="small" value={username}  onChange={e => setUsername(e.target.value)} />
                            </Input>
                         
                            <Input>
                                <TextField fullWidth id="password" type="password" label="Password" color="secondary" size="small" value={password}  onChange={e => setPassword(e.target.value)} />
                            </Input>
                         
                            <Input>
                                <TextField fullWidth id="rpassword" type="password" label="Repeat Password" color="secondary" size="small" value={rPassword}  onChange={e => setRPassword(e.target.value)} />
                            </Input>
                         
                         
                        </Left>
                    </Top>

                    <Bottom >
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ArrowBack />}
                            onClick={() => window.history.back()}
                            size="small"
                            style={{ marginRight: '1em' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            type="submit"
                            disabled={!validateForm()}
                            size="small"
                        >
                            Save
                        </Button>
                    </Bottom>
                </form>
            </Form>

        </Wrapper>
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

    </Container>;
}

const Container = styled.div`
  padding: 1em;
`;

const Title = styled.h3`
  font-size: 16px;
  margin-top: 0px;
  padding: 10px;
  background-color: #dedede;
`;


const Wrapper = styled.div`
    display: "flex";
    margin-top: 15px;
`;

const Form = styled.div`
    flex: 1;
`;

const Top = styled.div`
    display: flex;
   
`;
const Left = styled.div`
    width: 40%;
`;
const Right = styled.div`
    width: 50%;
    padding: 0px 15px 15px 15px;
`;

const Input = styled.div`
    margin-bottom: 1em;
`;


const Bottom = styled.div`
    margin-top: 1em;
`;

const List = styled.div`
    margin-top: 2em;
    font-size: 12px;
`;