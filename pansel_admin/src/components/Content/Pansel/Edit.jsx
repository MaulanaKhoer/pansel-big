
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
    const [dataId, setDataId] = useState("");
    const [pratama, setPratama] = useState("");
    const [madya, setMadya] = useState("");
    const [utama, setUtama] = useState("");
    const [step, setStep] = useState("");
    
    const [idJadwal, setIdJadwal] = useState(0);

    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const token = getCookie('OPERATOR_TOKEN');

    const [list, setList] = useState(null);

    const url_update = Config.api_domain + "/seleksi/update/";
    const url_update_step = Config.api_domain + "/seleksi/update_step/";
    const url_get = Config.api_domain + "/seleksi/active/";
    const url_list = Config.api_domain+ "/jadwal/active/";


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
                if (data){
                setName(data.title?? "");
                setFeatureType(data.caption?? "");
                setDataId(data.public_id?? "");
                setPratama(data.pratama?? 0);
                setMadya(data.madya?? 0);
                setUtama(data.utama?? 0);
                setStep(data.step?? 0);
                setIdJadwal(data.step?? 0);
                }

                //  if (data.status === "Expired token") {
            });

            fetch(url_list, requestOptions).then(res => res.json()).then(data => {
                setList(data.data);
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
                    "title": name,
                    "caption": featureType,
                    "pratama": parseInt(pratama),
                    "madya": parseInt(madya),
                    "utama": parseInt(utama),
                    "public_id": dataId,
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
                        window.location.href = "/pansel-management/#/pansel"
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

    const postData2 = async () => {

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    "jadwal_id": idJadwal,
                    "public_id": dataId,
                })
            };

            const response = await fetch(url_update_step, requestOptions)
            var json = await response.json();
            if (response.status === 200) {

                if (json.status === 'success') {
                    setSuccess(true);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);
                    window.setTimeout(() => {
                        window.location.href = "/pansel-management/#/pansel"
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

    function handleIdJadwal(value) {
        //console.log(value)
        setIdJadwal(value)
    }

    
    function getRows() {
        if (typeof (list) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (list !== null) {

                if (list.length > 0) {

                    return list.map((row, index) => {

                        return (
                            <MenuItem key={row.id} value={index}>
                                {row.judul}
                            </MenuItem>
                        )
                    })
                } else {
                    return (
                        <MenuItem key={0} value={0}>
                           List Jadwal not found
                        </MenuItem>
                    )
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }

    const handleSubmit2 = (e) => {

        e.preventDefault();

        if (!loading) {
            setSuccess(false);
            setLoading(true);
            setOpenBackdrop(true);
            postData2();
        }
    };

    return <Container>
        <Wrapper>
            <Form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Input>
                        <TextField size="small" fullWidth label="Title" color="secondary" value={name} onChange={(e) => setName(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Caption" color="secondary" value={featureType} onChange={(e) => setFeatureType(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Jumlah Pratama" color="secondary" value={pratama} onChange={(e) => setPratama(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Jumlah Madya" color="secondary" value={madya} onChange={(e) => setMadya(e.target.value)} />
                    </Input>
                    <Input>
                        <TextField size="small" fullWidth label="Jumlah Utama" color="secondary" value={utama} onChange={(e) => setUtama(e.target.value)} />
                    </Input>
                    <Bottom >

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
            <br />
            <br />
            
            <Form>
                <form onSubmit={(e) => handleSubmit2(e)}>
                    <Input>
                        <TextField
                            size="small"
                            color="secondary" 
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Current Step Jadwal"
                            value={idJadwal}
                            onChange={(e) => handleIdJadwal(e.target.value)}

                        >
                            {
                                getRows()
                            }
                        </TextField>
                    </Input>


                    <Bottom >
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