
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import styled from "styled-components";
import { ArrowBack, Delete, Save } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

import MenuItem from '@mui/material/MenuItem';

//import FormTambah from "./FormTambah";

export default function GazetteerDelete() {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [featureType, setFeatureType] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const token = getCookie('ADMIN_TOKEN');
    let { gazetteerId } = useParams();

    const url_update = "../api/gazetteer/update/";
    const url_get = "../api/gazetteer/id/" + gazetteerId;


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
                //console.log(data)
                setName(data.name);
                setFeatureType(data.featuretype);
                setCountry(data.country);
                setRegion(data.region);
                setLatitude(data.latitude);
                setLongitude(data.longitude);


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
        return !loading && name.length > 0 && featureType.length > 0;
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
                    "name": name,
                    "featuretype": featureType,
                    "country": country,
                    "region": region,
                    "latitude": latitude,
                    "longitude": longitude,
                    "gazetteer_public_id": gazetteerId,
                })
            };

            const response = await fetch(url_update, requestOptions)
            var json = await response.json();
            if (response.status === 200) {

                if (json.status === 'success') {
                    setSuccess(true);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);
                    window.setTimeout(() => {
                        window.location.href = "/sikambing/walidata/#/gazetteer"
                    }, 2000);
                    //
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
        <Title>Edit Gazetteer</Title>
        <Wrapper>
            <Form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Input>
                        <TextField size="small" fullWidth label="Name" color="secondary" value={name} onChange={(e) => setName(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Feature Type" color="secondary" value={featureType} onChange={(e) => setFeatureType(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Country" color="secondary" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Region" color="secondary" value={region} onChange={(e) => setRegion(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Latitude" color="secondary" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Longitude" color="secondary" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
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
                            Update
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

const List = styled.div`
    margin-top: 2em;
`;