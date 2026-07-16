
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

import CSVReader from "react-csv-reader";
//import FormTambah from "./FormTambah";

export default function DataAdd() {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [valid, setValid] = useState(false);

    const [idPublic, setIdPublic] = useState(0);
    const [featureName, setFeatureName] = useState("");
    const [notes, setNotes] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [title, setTitle] = useState();
    const [shapeFile, setShapeFile] = useState();
    const [fileName, setFileName] = useState();
    const [url, setUrl] = useState('Automatically generated from geoserver response');

    const token = getCookie('OPERATOR_TOKEN');
    const public_id = getCookie('USER_PUBLIC_ID');
    const contributor = getCookie('OPERATOR');

    const url_upload = Config.api_domain + "/berkas/";



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
        return !loading && selectedFile && selectedFile.length > 0;
    }

    function onFileChange(event) {

        // Update the state
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files)
            setFileName(event.target.files[0].name)

            //var filesInput = event.target.files[0];
            //var list = document.getElementById("list");
        }
    }

    const postData = async () => {

        try {

            var dataFile = document.getElementById('dataFile'); //document.querySelector("#proposalFile");

            const formData = new FormData();
            formData.append('file', dataFile?.files[0]);
            formData.append("username", contributor);
            formData.append("title", title);

            /*
             
                JSON.stringify({
                    "public_id": public_id,
                    "feature_name": featureName,
                    "notes": notes,
                    'is_public': idPublic === 1 ? true : false,
                    'filename': fileName
                })
            */
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: formData
            };

            const response = await fetch(url_upload, requestOptions)
            var json = await response.json();


            if (json.status === 'success') {
                setSuccess(true);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                setMessage(json.message);

                window.setTimeout(() => {
                    window.location.href = "/pansel-management/#/berkas"
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

        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpenBackdrop(false);
            setOpen(true);
            //setAuth(false);
            setMessage(`Error ${error}`);
        }
    };


    /*

      <Input>
                        <TextField type="date" size="small" id="title" label="Date" color="secondary"  InputLabelProps={{
                                shrink: true,
                        }} />
                    </Input>

                    */

    return <Container>
        <Title>Add New Berkas</Title>
        <Wrapper>
            <Form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Top>
                        <Left>
                            
                            <Input>
                                <TextField size="small" fullWidth label="Title" color="secondary" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Input>
                            <Input>
                                <label htmlFor="file">Upload Berkas</label>
                            </Input>
                            <label htmlFor="dataFile">
                                <input
                                    id="dataFile"
                                    name="btn-upload"
                                    style={{ display: 'none' }}
                                    type="file"
                                    onChange={(e) => onFileChange(e)}
                                />
                                <Button
                                    className="btn-choose"
                                    variant="outlined"
                                    component="span" size="small" >
                                    Choose Files
                                </Button>
                            </label>

                            <div className="file-name">
                                {selectedFile && selectedFile.length > 0 ? selectedFile[0].name : null}
                            </div>
                        </Left>
                        <Right>

                        </Right>
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
                            Submit
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