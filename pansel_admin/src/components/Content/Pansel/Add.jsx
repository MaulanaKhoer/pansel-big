
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import { useState } from 'react';
import styled from "styled-components";
import { ArrowBack, Save } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

//import FormTambah from "./FormTambah";

export default function ForumAdd() {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [label, setLabel] = useState("");

    
    const token = getCookie('OPERATOR_TOKEN');
    
    const url_insert = Config.api_domain + "/jadwal/";

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
        return !loading && name.length > 0 && label.length > 0;
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
                    "judul": name,
                    "label": label
                })
            };

            const response = await fetch(url_insert, requestOptions)
            var json = await response.json();
            if (response.status === 201) {

                if (json.status === 'success') {
                    setSuccess(true);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);
                    window.setTimeout(() => {
                        window.location.href = "/pansel-management/#/jadwal"
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
        <Title>Add New Jadwal</Title>
        <Wrapper>
            <Form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Input>
                        <TextField size="small" fullWidth label="Title" color="secondary" value={name} onChange={(e) => setName(e.target.value)}  inputProps={{ maxLength: 100 }} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Label" color="secondary" value={label} onChange={(e) => setLabel(e.target.value)}  inputProps={{ maxLength: 50 }}/>
                    </Input>                   

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
        <Backdrop open={openBackdrop}  sx={{color: "#1976d2", backgroundColor: "rgba(255, 255, 255, 0.6)", zIndex:100}}>
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
`;

const Form = styled.div`
    flex: 1;
`;

const Input = styled.div`
    margin-bottom: 1em;
`;


const Bottom = styled.div`
    margin-top: 1em;
`;
