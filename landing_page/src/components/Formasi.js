import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1a3a6b",
    color: "#ffffff",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: "13px",
    letterSpacing: "0.5px",
    padding: "14px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#1a2236",
    padding: "14px 16px",
    lineHeight: 1.6,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f4f6fb",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#e8eef8",
    transition: "background-color 0.2s ease",
  },
}));

function Formasi() {

  return (
    <div style={{ background: "#f4f6fb", minHeight: "75vh", paddingBottom: "48px" }}>
      {/* Page Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 100%)",
          padding: "48px 24px 40px",
          marginBottom: "0",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(200,146,42,0.15)",
              border: "1px solid rgba(200,146,42,0.4)",
              borderRadius: "100px",
              padding: "5px 14px",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#e8b84a", letterSpacing: "1.2px", textTransform: "uppercase" }}>
              Seleksi Terbuka · BIG 2026
            </span>
          </div>
          <h1 style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", margin: 0, lineHeight: 1.2 }}>
            Formasi Jabatan
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", marginTop: "8px" }}>
            Seleksi Jabatan Pimpinan Tinggi Pratama — Badan Informasi Geospasial 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 0" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(26,58,107,0.10)",
            overflow: "hidden",
          }}
        >
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="tabel formasi">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" style={{ width: "60px" }}>No</StyledTableCell>
                  <StyledTableCell>Jabatan</StyledTableCell>
                  <StyledTableCell>Tugas dan Fungsi</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { 
                    no: 1, 
                    jabatan: "Kepala BIG", 
                    tugas: (
                      <div>
                        Kepala BIG mempunyai tugas memimpin BIG dalam menjalankan tugas dan fungsi BIG. Fungsi Kepala BIG adalah:
                        <ol style={{ paddingLeft: "20px", marginTop: "8px", marginBottom: 0 }}>
                          <li>perumusan, penetapan, dan pengendalian kebijakan teknis di bidang informasi geospasial;</li>
                          <li>pelaksanaan kebijakan teknis di bidang informasi geospasial;</li>
                          <li>penyusunan norma, standar, prosedur, dan kriteria di bidang informasi geospasial;</li>
                          <li>pemberian bimbingan teknis dan supervisi di bidang informasi geospasial;</li>
                          <li>pengelolaan barang milik/kekayaan negara yang menjadi tanggung jawab BIG;</li>
                          <li>koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unsur organisasi di lingkungan BIG;</li>
                          <li>pelaksanaan dukungan yang bersifat substantif kepada seluruh unsur organisasi di lingkungan BIG; dan</li>
                          <li>pengawasan atas pelaksanaan tugas di lingkungan BIG</li>
                        </ol>
                      </div>
                    )
                  }
                ].map((row) => (
                  <StyledTableRow key={row.no}>
                    <StyledTableCell align="center" style={{ fontWeight: 700, color: "#1a3a6b", verticalAlign: "top" }}>{row.no}</StyledTableCell>
                    <StyledTableCell style={{ fontWeight: 600, verticalAlign: "top", width: "15%" }}>{row.jabatan}</StyledTableCell>
                    <StyledTableCell style={{ color: "#5a6a84", verticalAlign: "top" }}>{row.tugas}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Formasi;
