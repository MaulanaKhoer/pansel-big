
import { styled } from '@mui/material/styles';
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
import { Delete, Edit, Preview, Download, AssignmentTurnedIn } from '@mui/icons-material';
import DeleteDialog from "./DeleteDialog";
import DownloadDialog from "./DownloadDialog";
import UploadDialog from "./UploadDialog";

import { useState, useEffect } from 'react';


import Config from '../../../config.json';
import { getCookie, dateToString } from '../../../Helpers';

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

export default function GazetteerTable() {
  const token = getCookie('OPERATOR_TOKEN');
  const public_id = getCookie('USER_PUBLIC_ID');

  const [list, setList] = useState(null);

  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);


  const [refresh, setRefresh] = useState(false);
  const [dataId, setDataId] = useState();

  const url_list = Config.api_domain + "/pengumuman/active/";

  const handleClickOpen = (dataId) => {
    setOpen(true);
    setDataId(dataId)
  };

  const handleClickUpload = (dataId) => {
    setOpenUpload(true);
    setDataId(dataId)
  };

  const handleClickDownload = (dataId) => {
    setOpenDownload(true);
    setDataId(dataId)
  };



  const handleSearch = () => {
    var q = document.getElementById('search').value;
    //alert('aaa ' + q);
    //setPage(0)
    //setTag("")
    //if (q)
    //	setQuery(q)
    //else
    //	setQuery('none')
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
      event.preventDefault();
    }
  }


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
            //console.log(row
            let dateISO = new Date(row.time_created);
            //console.log(dateISO.getTimezoneOffset())

            let formatted_datetime = dateToString(dateISO);
            return (
              <StyledTableRow key={row.public_id}>
                <StyledTableCell component="th" scope="row">
                  {row.judul}
                </StyledTableCell>
                <StyledTableCell>{formatted_datetime}</StyledTableCell>
                <StyledTableCell>{row.status ? 'Published' : 'Not published'}</StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="post message" component="a" href={"#/pengumuman/edit/" + row.public_id}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="post message" component="a" onClick={() => handleClickDownload(row.public_id)} >
                    <Download />
                  </IconButton>
                  <IconButton aria-label="post message" component="a" onClick={() => handleClickUpload(row.public_id)} >
                    <Upload />
                  </IconButton>
                  <IconButton aria-label="post message" component="a" onClick={() => handleClickOpen(row.public_id)}>
                    <Delete />
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
  /*
    <IconButton aria-label="post message" component="a" href={"#/metadata/edit/" + row.id}>
                    <Edit />
                  </IconButton>

  */
  return (
    <>
      <TableContainer component={Paper}>
        <DeleteDialog open={open} setOpen={(e) => setOpen(e)} dataId={dataId} setRefresh={(e) => setRefresh(e)} />
        <UploadDialog open={openUpload} setOpen={(e) => setOpenUpload(e)} dataId={dataId} setRefresh={(e) => setRefresh(e)} />
        <DownloadDialog open={openDownload} setOpen={(e) => setOpenDownload(e)} dataId={dataId} setRefresh={(e) => setRefresh(e)} />
      
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Time Created	</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
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
    </>
  )
}