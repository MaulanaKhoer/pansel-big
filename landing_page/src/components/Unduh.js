import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Config from "../config.json";
import { dateToStringDate } from "../Helpers";

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
  "&:nth-of-type(odd)": { backgroundColor: "#f4f6fb" },
  "&:last-child td, &:last-child th": { border: 0 },
  "&:hover": { backgroundColor: "#e8eef8", transition: "background-color 0.2s ease" },
}));

function Unduh() {
  const [list, setList] = useState(null);

  useEffect(() => {
    fetch(Config.api_domain + "/unduh_berkas/active", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        const dataList = Array.isArray(data) ? data : (data.data || []);
        setList(dataList);
      })
      .catch((err) => {
        console.error("Error fetching unduh berkas:", err);
        setList([]);
      });
  }, []);

  function getRows() {
    if (!list) {
      return (
        <StyledTableRow>
          <StyledTableCell colSpan={4} align="center" style={{ color: "#5a6a84", padding: "32px" }}>
            Memuat data...
          </StyledTableCell>
        </StyledTableRow>
      );
    }

    if (list.length === 0) {
      return (
        <StyledTableRow>
          <StyledTableCell colSpan={4} align="center" style={{ color: "#5a6a84", padding: "32px" }}>
            Berkas dokumen belum tersedia.
          </StyledTableCell>
        </StyledTableRow>
      );
    }

    return list.map((row, index) => {
      const orderNo = row.order_no || (index + 1);
      const formattedDate = row.tanggal_publikasi ? dateToStringDate(new Date(row.tanggal_publikasi)) : "-";
      
      let downloadLink = row.url_link || "";
      const isExternal = downloadLink.startsWith("http://") || downloadLink.startsWith("https://");
      if (!isExternal && row.uuid) {
        downloadLink = Config.api_domain + "/unduh_berkas/download/" + row.uuid;
      }

      return (
        <StyledTableRow key={row.uuid || index}>
          <StyledTableCell align="center" style={{ fontWeight: 700, color: "#1a3a6b" }}>{orderNo}</StyledTableCell>
          <StyledTableCell style={{ fontWeight: 600 }}>{row.nama_berkas}</StyledTableCell>
          <StyledTableCell style={{ color: "#5a6a84", whiteSpace: "nowrap" }}>{formattedDate}</StyledTableCell>
          <StyledTableCell align="center">
            <a
              href={downloadLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "linear-gradient(135deg, #1a3a6b, #2451a0)",
                color: "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                padding: "7px 16px",
                borderRadius: "100px",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              ⬇ Unduh
            </a>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  }

  return (
    <div style={{ background: "#f4f6fb", minHeight: "75vh", paddingBottom: "48px" }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 100%)", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.4)", borderRadius: "100px", padding: "5px 14px", marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#e8b84a", letterSpacing: "1.2px", textTransform: "uppercase" }}>Seleksi Terbuka</span>
          </div>
          <h1 style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", margin: 0, lineHeight: 1.2 }}>
            Unduh Berkas Dokumen
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", marginTop: "8px" }}>
            Seleksi Jabatan Pimpinan Tinggi — Badan Informasi Geospasial
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 24px rgba(26,58,107,0.10)", overflow: "hidden" }}>
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="tabel unduh berkas">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" style={{ width: "60px" }}>No</StyledTableCell>
                  <StyledTableCell>Nama Berkas</StyledTableCell>
                  <StyledTableCell>Tanggal Publikasi</StyledTableCell>
                  <StyledTableCell align="center">Unduh</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{getRows()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Unduh;
