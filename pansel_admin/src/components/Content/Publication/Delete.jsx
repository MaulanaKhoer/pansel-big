import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';


import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import styled from "styled-components";
import { ArrowBack, Delete } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie , dateToString } from '../../../Helpers';


export default function DataDelete({ dataId, setOpenDialog, setRefresh }) {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [organization, setOrganization] = useState("");
 


    const token = getCookie('ADMIN_TOKEN');
    const public_id = getCookie('ADMIN_PUBLIC_ID');

    const url_get = "../api/harvestings/identifier/" + dataId;
    const url_delete = "../api/harvestings/delete/";


    useEffect(() => {

        try {
            // Fetch data from REST API

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            };


         
            fetch(url_get, requestOptions).then(res => res.json()).then(data => {
                console.log(data)
                setTitle(data.data.title);
                setOrganization(data.data.organizations.name);

                //  if (data.status === "Expired token") {
            });


        } catch (error) {
            alert(`Error ${error}`)
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

    const postData = async () => {

        try {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    "identifier": dataId,
                })
            };

            const response = await fetch(url_delete, requestOptions)

            var json = await response.json();
            if (response.status === 200) {

                if (json.status === 'success') {
                    setSuccess(true);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);
                    
                    window.setTimeout(() => {
                        //window.location.reload();
                        setOpenDialog(false);
                        setRefresh(true);
                    }, 2000);
                    
                    //setAuth(true);
                    //window.location.reload();
                } else {
                    setSuccess(false);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    //setAuth(false);
                    setMessage(json.message);
                }
            } else {
                setSuccess(false);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                //setAuth(false);
                setMessage(`Error ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpenBackdrop(false);
            setOpen(true);
            //setAuth(false);
            setMessage(`Error ${error}`);
        }
    };



    return <Container>
        <Wrapper>
            <Form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Top>
                        <Left>
                        <Input>
                                <TextField fullWidth id="name" label="Identifier" color="secondary" size="small" value={dataId}  />
                            </Input>
                            <Input>
                                <TextField fullWidth id="email" label="Title" color="secondary" size="small" value={title}  onChange={e => setTitle(e.target.value)} />
                            </Input>
                         
                            <Input>
                                <TextField fullWidth id="username" label="Organization" color="secondary" size="small" value={organization}  onChange={e => setOrganization(e.target.value)} />
                            </Input>
                        </Left>
                    </Top>
                    <span>
                        Are you sure you want to delete this publication?
                    </span>

                    <Bottom >
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ArrowBack />}
                            onClick={() => setOpenDialog(false)}
                            size="small"
                            style={{ marginRight: '1em' }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Delete />}
                            type="submit"
                            disabled={!validateForm()}
                            size="small"
                        >
                            Yes, Delete
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
    display: flex;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
`;
const Top = styled.div`
    display: flex;
   
`;
const Left = styled.div`
width: 100%;
`;
const Right = styled.div`
    width: 50%;
    padding: 15px;
   
`;

const Input = styled.div`
    margin-bottom: 1em;
`;


const Bottom = styled.div`
    margin-top: 1em;
`;

const List = styled.div`
    margin-top: 2em;
`;