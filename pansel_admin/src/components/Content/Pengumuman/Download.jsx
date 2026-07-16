import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/Search';
import Upload from '@mui/icons-material/Upload';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import styled from "styled-components";
import { ArrowBack, Delete, Download } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie , dateToString } from '../../../Helpers';
import { styled as styled2 } from '@mui/material/styles';


const StyledTableCell = styled2(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled2(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
export default function DataDelete({ dataId, setOpenDialog, setRefresh }) {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [status, setStatus] = useState("");
    const [timeUploaded, setTimeUploaded] = useState("");
    const [list, setList] = useState(null);
    const [fileName, setFileName] = useState("");
    const [title, setTitle] = useState("");

    const token = getCookie('OPERATOR_TOKEN');
    const public_id = getCookie('USER_PUBLIC_ID');

    const url_get = Config.api_domain + "/pengumuman_file/pengumuman/" + dataId;
    const url_delete = Config.api_domain + "/jadwal/delete/";


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
                setList(data);
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
        return !loading && fileName.length > 0;
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
                    "public_id": dataId,
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
    function getRows() {
        if (typeof (list) !== 'undefined') {
          //var items=props.presensiDataLast.data;
          if (list !== null) {
    
            if (list.length > 0) {
    
              return list.map((row, index) => {
                //console.log(row
                let dateISO = new Date(row.time_uploaded);
                //console.log(dateISO.getTimezoneOffset())
    
                let formatted_datetime = dateToString(dateISO);
                return (
                  <StyledTableRow key={row.public_id}>
                    <StyledTableCell component="th" scope="row">
                      {row.filename}
                    </StyledTableCell>
                    <StyledTableCell>{formatted_datetime}</StyledTableCell>
                    <StyledTableCell>
                    <IconButton aria-label="post message" component="a" href={Config.api_domain+"/pengumuman_file/download/" + row.public_id} >
                    <Download />
                  </IconButton>
                
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })
            } else {
              return (
                <StyledTableRow >
                  <StyledTableCell component="th" scope="row" colspan="7">
                    No data found.
                  </StyledTableCell>
                </StyledTableRow>
              )
            }
          } else {
            return null
          }
        } else {
          return null
        }
      }


    return <Container>
        <Wrapper>
        <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Time Uploaded	</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              getRows()

            }

          </TableBody>
        </Table>
      </TableContainer>
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