import styled from "styled-components";
import { useState, useEffect } from 'react';

import { emphasize, styled as k } from '@mui/material/styles';

import { useParams } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import ListAltIcon from '@mui/icons-material/ListAlt';


import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { ArrowBack, Save, Send, Telegram } from '@mui/icons-material';



const StyledBreadcrumb = k(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
        cursor: "pointer"
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  }); 


const StyledTableCell = k(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = k(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const lFormasi = [{id:1, formasi: 'Sekretaris Utama' }];
const lPangkat = [{id:1, pangkat: 'IV/c - Pembina Utama Muda' },{id:2, pangkat: 'IV/d - Pembina Utama Madya' },{id:3, pangkat: 'IV/e - Pembina Utama' }];


export default function FinalisasiView({ handleCloseDialog }) {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [finalCheck, setFinalCheck] = useState(false);

    let { dataId } = useParams();

    const [name, setName] = useState("");
    const [user, setUser] = useState(null);
    const [lamaran, setLamaran] = useState(null);
    const [fullname, setFullname] = useState("");
    const [formasi, setFormasi] = useState("");
    const [pangkat, setPangkat] = useState("");

    const [email, setEmail] = useState("");
    const [rJabatan, setRJabatan] = useState([]);
    const [rPendidikan, setRPendidikan] = useState([]);
    const [rDiklatpim, setRDiklatpim] = useState([]);

    const token = getCookie('OPERATOR_TOKEN');
    const public_id = getCookie('OPERATOR_PUBLIC_ID');
    const url_profile = Config.api_domain + "/user/id/";
    const url_info = Config.api_domain + "/lamaran/operator_id/";
    const url_insert = Config.api_domain + "/lamaran/finalisasi/";
    const url_download = Config.api_domain + "/dokumen/download/";


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
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

            console.log(dataId)
            fetch(url_info + dataId, requestOptions).then(res => res.json()).then(data => {
                console.log(data)
                setLamaran(data)
                //console.log(lFormasi.filter((fruit) => fruit.id === data.formasi_id))
                setFormasi(lFormasi.filter((fruit) => fruit.id === data.formasi_id)[0].formasi)
                setPangkat(lPangkat.filter((fruit) => fruit.id === data.pangkat_id)[0].pangkat)

                setRJabatan(JSON.parse(data.r_jabatan))
                setRPendidikan(JSON.parse(data.r_pendidikan))
                setRDiklatpim(JSON.parse(data.r_diklatpim))
            });

        } catch (error) {
            alert(`Error ${error}`)
        }
    }, [dataId]);


    function validateForm() {
        return !loading && finalCheck;
    }

    function getRowsJabatan() {
        if (typeof (rJabatan) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (rJabatan !== null) {

                if (rJabatan.length > 0) {

                    return rJabatan.map((row, index) => {
                        //console.log(row)
                        return (
                            <StyledTableRow key={"jabatan" + index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.instansi}
                                </StyledTableCell>
                                <StyledTableCell> {row.jenjang}</StyledTableCell>
                                <StyledTableCell> {row.nama}</StyledTableCell>
                                <StyledTableCell> {row.no}</StyledTableCell>
                                <StyledTableCell> {row.tgl}</StyledTableCell>

                            </StyledTableRow>
                        )
                    })
                } else {
                    return (
                        <StyledTableRow >
                            <StyledTableCell component="th" scope="row" colspan="6">
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

    function getRowsPendidikan() {
        if (typeof (rPendidikan) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (rPendidikan !== null) {

                if (rPendidikan.length > 0) {

                    return rPendidikan.map((row, index) => {
                        //console.log(row)
                        return (
                            <StyledTableRow key={"pendidikan" + index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.tingkat}
                                </StyledTableCell>
                                <StyledTableCell> {row.nama}</StyledTableCell>
                                <StyledTableCell> {row.jurusan}</StyledTableCell>
                                <StyledTableCell> {row.no}</StyledTableCell>
                                <StyledTableCell> {row.tgl}</StyledTableCell>

                            </StyledTableRow>
                        )
                    })
                } else {
                    return (
                        <StyledTableRow >
                            <StyledTableCell component="th" scope="row" colspan="6">
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

    function getRowsDiklatpim() {
        if (typeof (rDiklatpim) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (rDiklatpim !== null) {

                if (rDiklatpim.length > 0) {

                    return rDiklatpim.map((row, index) => {
                        //console.log(row)
                        return (
                            <StyledTableRow key={"pendidikan" + index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.jenis}
                                </StyledTableCell>
                                <StyledTableCell> {row.no}</StyledTableCell>
                                <StyledTableCell> {row.tgl}</StyledTableCell>

                            </StyledTableRow>
                        )
                    })
                } else {
                    return (
                        <StyledTableRow >
                            <StyledTableCell component="th" scope="row" colspan="4">
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
        <Form>
            <Breadcrumbs aria-label="breadcrumb" >
                <StyledBreadcrumb
                    component="a"
                    href="#/pelamar"
                    label="Daftar Pelamar"
                    icon={<ListAltIcon fontSize="small" />}
                />
                <StyledBreadcrumb label="View" />

            </Breadcrumbs>
                <Paper elevation={1} style={{ padding: "0 0 1em 0", marginBottom: "1em" }}>
                    <Title>STATUS</Title>
                    <InputText style={{ paddingTop: '0' }}>
                        <Labelnya>
                            <Field>Status</Field><Value>: {lamaran?.is_final ? "Sudah finalisasi" : "Belum finalisasi"}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Nomor Pendaftaran</Field><Value>: {lamaran?.no_daftar ? lamaran.no_daftar : "(kirim dan finalisasi lamaran Anda terlebih dahulu)"}</Value>
                        </Labelnya>
                    </InputText>
                </Paper>
                <Paper elevation={1} style={{ padding: "0 0 1em 0", marginBottom: "1em" }}>
                    <Title>ISIAN FORMULIR</Title>
                    <InputText style={{ paddingTop: '0' }}>
                        <Labelnya>
                            <Field>Formasi</Field><Value>: {formasi ? formasi : ''}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Gelar Depan</Field><Value>: {lamaran?.gelar_depan}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Nama Lengkap</Field><Value>: {lamaran?.nama_lengkap}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Gelar Belakang</Field><Value>: {lamaran?.gelar_belakang}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>No. Induk Kependudukan (KTP)</Field><Value>: {lamaran?.nik}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Tempat Lahir</Field><Value>: {lamaran?.tempat}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Tanggal Lahir</Field><Value>: {lamaran?.tanggal}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Jenis Kelamin</Field><Value>: {lamaran?.jk == 1 ? "Laki-laki" : "Perempuan"}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>NIP</Field><Value>: {lamaran?.nip}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Pangkat Golongan Terakhir</Field><Value>: {pangkat ? pangkat : ''}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>No. SK Pangkat Golongan Terakhir</Field><Value>: {lamaran?.sk_pangkat}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>TMT Pangkat Golongan Terakhir</Field><Value>: {lamaran?.tanggal_pangkat}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Nilai SKP/DP3 Tahun 2021</Field><Value>: {lamaran?.nilai_skp1}</Value>
                        </Labelnya>
                        <Labelnya>
                            <Field>Nilai SKP/DP3 Tahun 2022</Field><Value>: {lamaran?.nilai_skp2}</Value>
                        </Labelnya>
                    </InputText>
                    <InputText>
                        <Labelnya>
                            <Field>Riwayat Jabatan</Field><Value>: </Value>
                        </Labelnya>
                        <div style={{ padding: "15px" }}>
                            <Table stickyHeader sx={{ minWidth: 500 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Instansi</StyledTableCell>
                                        <StyledTableCell>Jenjang</StyledTableCell>
                                        <StyledTableCell>Nama Jabatan</StyledTableCell>
                                        <StyledTableCell>No. SK</StyledTableCell>
                                        <StyledTableCell>TMT</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        getRowsJabatan()
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </InputText>
                    <InputText>
                        <Labelnya>
                            <Field>Riwayat Pendidikan</Field><Value>: </Value>
                        </Labelnya>
                        <div style={{ padding: "15px" }}>
                            <Table stickyHeader sx={{ minWidth: 500 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tingkat Pendidikan</StyledTableCell>
                                        <StyledTableCell>Nama Universitas</StyledTableCell>
                                        <StyledTableCell>Jurusan</StyledTableCell>
                                        <StyledTableCell>No. Ijasah</StyledTableCell>
                                        <StyledTableCell>Tgl. Ijasah</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        getRowsPendidikan()
                                    }

                                </TableBody>
                            </Table>
                        </div>
                    </InputText>
                    <InputText>
                        <Labelnya>
                            <Field>Riwayat Diklatpim</Field><Value>: </Value>
                        </Labelnya>
                        <div style={{ padding: "15px" }}>
                            <Table stickyHeader sx={{ minWidth: 500 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Jenis Diklatpim</StyledTableCell>
                                        <StyledTableCell>No. Sertifikat</StyledTableCell>
                                        <StyledTableCell>Tgl. Sertifikat</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        getRowsDiklatpim()
                                    }

                                </TableBody>
                            </Table>
                        </div>
                    </InputText>
                </Paper>
                <Paper elevation={1} style={{ padding: "0 0 1em 0", marginBottom: "1em" }}>
                    <Title>UNGGAHAN DOKUMEN</Title>
                    <div style={{ padding: "15px" }}>
                        <Input>
                            <Keterangan>

                                1. Hasil pindai Surat Lamaran yang ditandatangani dan bermeterai Rp.10.000 (diunduh pada sistem);
                                <br />
                                Status: <b>{lamaran?.file_1 ? "Sudah unggah dokumen " + "(" + lamaran?.file_1 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_1 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_1} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                2. Hasil pindai Daftar Riwayat Hidup yang ditandatangani dan bermeterai Rp.10.000 (diunduh pada sistem);
                                <br />
                                Status: <b>{lamaran?.file_2 ? "Sudah unggah dokumen " + "(" + lamaran?.file_2 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_2 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_2} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                3. Hasil pindai Pakta Integritas yang ditandatangani dan bermeterai Rp.10.000 (diunduh pada sistem);
                                <br />
                                Status: <b>{lamaran?.file_3 ? "Sudah unggah dokumen " + "(" + lamaran?.file_3 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_3 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_3} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                4. Hasil pindai Surat Keputusan Pangkat terakhir;
                                <br />
                                Status: <b>{lamaran?.file_4 ? "Sudah unggah dokumen " + "(" + lamaran?.file_4 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_4 ?

                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_4} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                5. Hasil pindai Surat Keputusan Pengangkatan Dalam Jabatan dari awal menjabat hingga yang terbaru;
                                <br />
                                Status: <b>{lamaran?.file_5 ? "Sudah unggah dokumen " + "(" + lamaran?.file_5 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_5 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_5} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                6. Hasil pindai Ijazah Strata 1 dan Pasca Sarjana (jika ada);
                                <br />
                                Status: <b>{lamaran?.file_6 ? "Sudah unggah dokumen " + "(" + lamaran?.file_6 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_6 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_6} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                7. Hasil pindai sertifikat Diklat PIM dan atau Diklat Jabatan Fungsional;
                                <br />
                                Status: <b>{lamaran?.file_7 ? "Sudah unggah dokumen " + "(" + lamaran?.file_7 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_7 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_7} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                8. Hasil pindai Penilaian Prestasi Kerja Pegawai 2 (dua) tahun terakhir dengan nilai minimal baik;
                                <br />
                                Status: <b>{lamaran?.file_8 ? "Sudah unggah dokumen " + "(" + lamaran?.file_8 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_8 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_8} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                9. Hasil pindai Surat Keterangan Sehat dari institusi pelayanan kesehatan pemerintah yang dilakukan pada bulan Juni - Agustus 2023;
                                <br />
                                Status: <b>{lamaran?.file_9 ? "Sudah unggah dokumen " + "(" + lamaran?.file_9 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_9 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_9} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                10. Hasil pindai Bukti Penyerahan LHKPN/LHKASN minimal tahun 2021 pada jabatan terakhir;
                                <br />
                                Status: <b>{lamaran?.file_10 ? "Sudah unggah dokumen " + "(" + lamaran?.file_10 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_10 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_10} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                11. Hasil pindai Bukti Penyerahan SPT (1 tahun terakhir);
                                <br />
                                Status: <b>{lamaran?.file_11 ? "Sudah unggah dokumen " + "(" + lamaran?.file_11 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_11 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_11} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                12. Hasil pindai Surat Persetujuan mengikuti seleksi dan mutasi dari Pejabat Pembina Kepegawaian atau pejabat yang mendapatkan pendelegasian wewenang untuk mutasi (disertakan surat resmi pendelegasian wewenang), dan meterai Rp.10.000 (diunduh pada sistem);
                                <br />
                                Status: <b>{lamaran?.file_12 ? "Sudah unggah dokumen " + "(" + lamaran?.file_12 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_12 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_12} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                13. Hasil pindai Surat Pernyataan dari Pejabat Yang Berwenang, bahwa tidak sedang dalam proses penyelesaian pelanggaran disiplin dan/atau tidak pernah dijatuhi hukuman disiplin tingkat sedang/berat dan bermeterai Rp.10.000 (diunduh pada sistem);
                                <br />
                                Status: <b>{lamaran?.file_13 ? "Sudah unggah dokumen " + "(" + lamaran?.file_13 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_13 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_13} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                14. Hasil pindai Surat Pernyataan Tidak Sedang Memiliki Afiliasi dan/atau Menjadi Pengurus/Anggota Partai Politik/Organisasi Kemasyarakatan Yang Dilarang Pemerintah, dan bermeterai Rp.10.000 (diunduh setelah registrasi);
                                <br />
                                Status: <b>{lamaran?.file_14 ? "Sudah unggah dokumen " + "(" + lamaran?.file_14 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_14 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_14} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                15. Hasil pindai Kartu Tanda Penduduk (KTP);
                                <br />
                                Status: <b>{lamaran?.file_15 ? "Sudah unggah dokumen " + "(" + lamaran?.file_15 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_15 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_15} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                16. Hasil pindai Nomor Pokok Wajib Pajak (NPWP);
                                <br />
                                Status: <b>{lamaran?.file_16 ? "Sudah unggah dokumen " + "(" + lamaran?.file_16 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_16 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_16} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                17. Hasil pindai Pas Foto terbaru berlatar belakang merah;
                                <br />
                                Status: <b>{lamaran?.file_17 ? "Sudah unggah dokumen " + "(" + lamaran?.file_17 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_17 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_17} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                        <Input>
                            <Keterangan>
                                18. Soft file Statement of Purpose.
                                <br />
                                Status: <b>{lamaran?.file_18 ? "Sudah unggah dokumen " + "(" + lamaran?.file_18 + ")" : "belum unggah dokumen"}</b>
                            </Keterangan>
                            <ButtonWrapper>
                                {lamaran?.file_18 ?
                                    <Button variant="contained" component="a" href={url_download + public_id + "/" + lamaran?.file_18} >
                                        Lihat
                                    </Button>
                                    : null
                                }
                            </ButtonWrapper>
                        </Input>
                    </div>
                </Paper>
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
        </Form>

    )
}


const Form = styled.div`
    flex: 1;
`;

const Title = styled.h4`
  padding: 10px;
  background-color: #FFE4B5;
  margin-block-end: 0;
`;


const Input = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em 1em 0 1em;
    justify-content: space-between;
    align-item: center;
`;

const InputText = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1em 0 1em;
`;

const Keterangan = styled.div`
    padding-right: 10px;
    
`;
const ButtonWrapper = styled.div`
    
`;


const Labelnya = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em 1em 0 1em;
`;

const Field = styled.div`
    padding-right: 10px;
    min-width:250px;
    
`;

const FieldFinal = styled.div`
    padding-right: 10px;
    min-width:50px;
    
`;

const Value = styled.div`
    padding-right: 10px;
    
`;
const Status = styled.span`
    color: #333;
    padding-top: 10px;
    padding-left: 0px;
`;

const Bottom = styled.div`
    margin-top: 1em;
    text-align: center;
`;

const FormInput = styled.div`
  margin:10px;
  display: flex;
`;

const Label = styled.div`
    width: 150px;
`;
const Entry = styled.div`
    flex-grow: 1;
    display: flex;
`;

const EntryMiddle = styled.div`
    flex-grow: 1;
    padding-right: 10px;
`;