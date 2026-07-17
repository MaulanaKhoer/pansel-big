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
            <h1 className="page-header-title">Tahapan</h1>
            <p className="page-header-subtitle">Kelola informasi tahapan seleksi Jabatan Pimpinan Tinggi</p>
          </div>
          <div>
            <Button 
              variant="contained" 
              startIcon={<AddCircle />} 
              component="a" 
              href="#/tahapan/add"
              style={{
                borderRadius: '100px',
                textTransform: 'none',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                padding: '8px 20px',
                boxShadow: '0 4px 12px rgba(0, 93, 45, 0.2)'
              }}
            >
              Tambah Tahapan
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