import styled from "styled-components";
import Edit from "./Edit";

export default function Main() {
    return (
      <Container>
        <div className="page-header">
          <div>
            <div className="page-header-badge">📋 Content Management</div>
            <h1 className="page-header-title">Tahapan</h1>
            <p className="page-header-subtitle">Kelola informasi tahapan seleksi Jabatan Pimpinan Tinggi</p>
          </div>
        </div>
        <Edit />
      </Container>
    )
}

const Container = styled.div`
  padding: 1em;
`;