import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit } from '@mui/icons-material';
import DeleteDialog from "./DeleteDialog";

import { useState, useEffect } from 'react';
import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function FormasiTable() {
  const token = getCookie('OPERATOR_TOKEN');

  const [list, setList] = useState(null);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataId, setDataId] = useState();

  const url_list = Config.api_domain + "/formasi";

  const handleClickOpen = (dataId) => {
    setOpen(true);
    setDataId(dataId);
  };

  useEffect(() => {
    try {
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
      alert(`Error ${error}`);
    }
  }, []);

  useEffect(() => {
    if (refresh) {
      try {
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
        setRefresh(false);

      } catch (error) {
        alert(`Error ${error}`);
      }
    }
  }, [refresh]);

  function getRows() {
    if (typeof (list) !== 'undefined' && list !== null) {
      if (list.length > 0) {
        return list.map((row, index) => {
          return (
            <StyledTableRow key={row.uuid || index}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{row.order_no || '-'}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.jabatan}
              </StyledTableCell>
              <StyledTableCell>
                <div dangerouslySetInnerHTML={{ __html: row.tugas_fungsi || '-' }} />
              </StyledTableCell>
              <StyledTableCell>{row.is_active ? 'Aktif' : 'Tidak Aktif'}</StyledTableCell>
              <StyledTableCell>
                <IconButton aria-label="edit" component="a" href={"#/formasi/edit/" + row.uuid}>
                  <Edit color="warning" />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleClickOpen(row.uuid)}>
                  <Delete color="error" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          );
        });
      } else {
        return (
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" colSpan={6}>
              No data found.
            </StyledTableCell>
          </StyledTableRow>
        );
      }
    } else {
      return (
        <StyledTableRow>
          <StyledTableCell component="th" scope="row" colSpan={6}>
            No data found.
          </StyledTableCell>
        </StyledTableRow>
      );
    }
  }

  return (
    <>  
      <TableContainer component={Paper} className="admin-table-container">
        <DeleteDialog open={open} setOpen={(e) => setOpen(e)} dataId={dataId} setRefresh={(e) => setRefresh(e)} />
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Order No</StyledTableCell>
              <StyledTableCell>Nama Jabatan</StyledTableCell>
              <StyledTableCell>Tugas & Fungsi</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}