import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit, Preview } from '@mui/icons-material';
import DeleteDialog from "./DeleteDialog";

import { useState, useEffect } from 'react';
import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '13px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "'Plus Jakarta Sans', sans-serif"
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

export default function BerkasTable() {
  const token = getCookie('OPERATOR_TOKEN');

  const [list, setList] = useState(null);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataId, setDataId] = useState();

  const url_list = Config.api_domain + "/unduh_berkas";

  const handleClickOpen = (dataId) => {
    setOpen(true);
    setDataId(dataId);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);

  const fetchData = () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      };

      fetch(url_list, requestOptions)
        .then(res => res.json())
        .then(data => {
          const dataList = Array.isArray(data) ? data : (data.data || []);
          setList(dataList);
        })
        .catch(err => console.error(err));
    } catch (error) {
      console.error(`Error fetching berkas: ${error}`);
    }
  };

  function getRows() {
    if (list !== null) {
      if (list.length > 0) {
        return list.map((row, index) => {
          const uuid = row.uuid || row.public_id;
          const namaBerkas = row.nama_berkas || row.title;
          const namaFile = row.nama_file || row.filename;
          const status = row.is_active !== false;

          let tglPublikasi = row.tanggal_publikasi ? new Date(row.tanggal_publikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-";

          return (
            <StyledTableRow key={uuid || index}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{ fontWeight: 600 }}>
                {namaBerkas || '-'}
              </StyledTableCell>
              <StyledTableCell>{tglPublikasi}</StyledTableCell>
              <StyledTableCell>{status ? 'Aktif' : 'Tidak Aktif'}</StyledTableCell>
              <StyledTableCell>
                <IconButton aria-label="view" component="a" href={Config.api_domain + "/unduh_berkas/view/" + uuid} target="_blank" rel="noopener noreferrer">
                  <Preview color="primary" />
                </IconButton>
                <IconButton aria-label="edit" component="a" href={"#/berkas/edit/" + uuid}>
                  <Edit color="warning" />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleClickOpen(uuid)}>
                  <Delete color="error" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          );
        });
      } else {
        return (
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" colSpan="5" align="center">
              No data found.
            </StyledTableCell>
          </StyledTableRow>
        );
      }
    }
    return null;
  }

  return (
    <>  
      <TableContainer component={Paper} className="admin-table-container">
        <DeleteDialog open={open} setOpen={(e) => setOpen(e)} dataId={dataId} setRefresh={(e) => setRefresh(e)} />
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" style={{ width: '60px' }}>No</StyledTableCell>
              <StyledTableCell>Nama Berkas</StyledTableCell>
              <StyledTableCell>Tanggal Publikasi</StyledTableCell>
              <StyledTableCell style={{ width: '120px' }}>Status</StyledTableCell>
              <StyledTableCell style={{ width: '150px' }}>Aksi</StyledTableCell>
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