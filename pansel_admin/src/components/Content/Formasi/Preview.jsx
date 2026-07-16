import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import styled from "styled-components";
import { ArrowBack } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie, dateToString } from '../../../Helpers';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function DataPreview() {


    const [loading, setLoading] = useState(false);

    const [idPublic, setIdPublic] = useState(0);
    const [name, setName] = useState("");
    const [timeUploaded, setTimeUploaded] = useState("");

    const [url, setUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [xml, setXml] = useState();
    const [status, setStatus] = useState();

    const token = getCookie('OPERATOR_TOKEN');
    const public_id = getCookie('USER_PUBLIC_ID');
    let { dataId } = useParams();

    const contributor = getCookie('OPERATOR');

    const url_get = Config.api_domain + "/jadwal/id/" + dataId;

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
                setName(data.judul);
                setFileName(data.label);

            });

        } catch (error) {
            alert(`Error ${error}`)
        }
    }, []);

    return <Container>

      
        <Title>Preview Jadwal</Title>
        <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBack />}
            onClick={() => window.history.back()}
            size="small"
            style={{ marginRight: '1em', marginBottom: '2em' }}
        >
            Back
        </Button>
        <Wrapper>
            <Form>
                <Top>
                    <Left>
                        <Input>
                            <TextField size="small" fullWidth label="Title" color="secondary" value={name} onChange={(e) => setName(e.target.value)} disabled />
                        </Input>
                        <Input>
                            <TextField size="small" fullWidth label="Label" color="secondary" value={fileName} onChange={(e) => setFileName(e.target.value)} disabled />
                        </Input>
                    </Left>
                    <Right>

                    </Right>

                </Top>


            </Form>

        </Wrapper>

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
  margin-bottom: 15px
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
    width: 50%;
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
`;

const Attribute = styled.div`
`;
