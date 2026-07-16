import styled from "styled-components";
import Table from "./Table";
import { AddCircle } from "@mui/icons-material";
import Button from "@mui/material/Button";

export default function Main() {
    return (
      <Container>
        <div className="page-header">
          <div>
            <div className="page-header-badge">📋 Content Management</div>
            <h1 className="page-header-title">Unduh</h1>
            <p className="page-header-subtitle">Kelola berkas dokumen dan lampiran yang dapat diunduh</p>
          </div>
          <div>
            <Button 
              variant="contained" 
              startIcon={<AddCircle />} 
              component="a" 
              href="#/berkas/add"
              style={{
                borderRadius: '100px',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 3px 12px rgba(200,146,42,0.25)'
              }}
            >
              Tambah Berkas
            </Button>
          </div>
        </div>
        <Table />
      </Container>
    )
}

const Container = styled.div`
  padding: 1em;
`;