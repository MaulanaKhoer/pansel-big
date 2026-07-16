
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit, InsertComment } from '@mui/icons-material';

import { useState, useEffect } from 'react';


import Config from '../../../config.json';
import { getCookie, dateToString } from '../../../Helpers';
import DeleteDialog from "./DeleteDialog";


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

export default function ForumTable() {
  const token = getCookie('ADMIN_TOKEN');
  const public_id = getCookie('ADMIN_PUBLIC_ID');

  const [list, setList] = useState(null);

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataId, setDataId] = useState();

  const url_list = "../api/keywords/";

  const handleClickOpen = (dataId) => {
    setOpen(true);
    setDataId(dataId)
  };


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

      fetch(url_list, requestOptions).then(res => res.json()).then(data => {
        setList(data.data);
        //  if (data.status === "Expired token") {
      });

    } catch (error) {
      alert(`Error ${error}`)
    }
  }, []);

  useEffect(() => {
    if (refresh) {
      try {
        // Fetch data from REST API

        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };

        fetch(url_list, requestOptions).then(res => res.json()).then(data => {
          //console.log(data)
          if (data)
            setList(data.data);
          //  if (data.status === "Expired token") {
        });
        setRefresh(false)

      } catch (error) {
        alert(`Error ${error}`)
      }
    }
  }, [refresh]);


  function getRows() {
    if (typeof (list) !== 'undefined') {
      //var items=props.presensiDataLast.data;
      if (list !== null) {

        if (list.length > 0) {

          return list.map((row, index) => {
            return (
              <StyledTableRow key={row.id}>
               <StyledTableCell component="th" scope="row">
                  {index+1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="post message" component="a" href={"#/keywords/edit/" + row.id}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="post message" onClick={() => handleClickOpen(row.id)}>
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            )
          })
        } else {
          return (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" colSpan={2} >
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

  return (
    <TableContainer component={Paper}  sx={{ width: 500, maxHeight: 400 }}>
      <DeleteDialog open={open} setOpen={(e) => setOpen(e)} dataId={dataId} setRefresh={(e) => setRefresh(e)} />
      
      <Table stickyHeader sx={{ width: 500 }} aria-label="customized table">
        <TableHead>
        <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell width="160px">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            getRows()
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}