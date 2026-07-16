
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
  const [openApproval, setOpenApproval] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [dataId, setDataId] = useState();

  const url_list = Config.api_domain+ "/pengumuman";

  const handleClickOpen = (dataId) => {
    setOpen(true);
    setDataId(dataId)
  };

  const handleClickApprove = (dataId) => {
    setOpenApproval(true);
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
		if(event.key === 'Enter'){
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
        const dataList = Array.isArray(data) ? data : (data.data || []);
        setList(dataList);
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
          if (data) {
            const dataList = Array.isArray(data) ? data : (data.data || []);
            setList(dataList);
          }
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
            const uuid = row.uuid || row.public_id;
            const judul = row.judul || row.title;
            const file_url = row.file_url || row.filename;
            const tanggal = row.tanggal || row.createdAt || row.time_uploaded;
            const status = row.is_active !== false;

            let dateISO = new Date(tanggal);
            let formatted_datetime = dateToString(dateISO);
            return (
              <StyledTableRow key={uuid || index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {judul || '-'}
                </StyledTableCell>
                <StyledTableCell style={{ wordBreak: 'break-all' }}>{file_url || '-'}</StyledTableCell>
                <StyledTableCell>{formatted_datetime}</StyledTableCell>
                <StyledTableCell>{status ? 'Aktif' : 'Tidak Aktif'}</StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="view" component="a" href={Config.api_domain+"/pengumuman/view/" + uuid} target="_blank" rel="noopener noreferrer">
                    <Preview color="primary" />
                  </IconButton>
                  <IconButton aria-label="edit" component="a" href={"#/pengumuman/edit/" + uuid}>
                    <Edit color="warning" />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleClickOpen(uuid)}>
                    <Delete color="error" />
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
    <TableContainer component={Paper} className="admin-table-container">
      <DeleteDialog open={open} setOpen={(e) => setOpen(e)} dataId={dataId} setRefresh={(e) => setRefresh(e)} />
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" style={{ width: '60px' }}>No</StyledTableCell>
            <StyledTableCell>Judul</StyledTableCell>
            <StyledTableCell>Nama File</StyledTableCell>
            <StyledTableCell>Tanggal Publikasi</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Aksi</StyledTableCell>
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