

import styled from "styled-components";
import Edit from "./Edit";

export default function Main() {
    return (
      <Container>
        <div className="page-header">
          <div>
            <div className="page-header-badge">⚙️ Konfigurasi</div>
            <h1 className="page-header-title">Pansel Setting</h1>
            <p className="page-header-subtitle">Kelola informasi umum dan sebaran formasi seleksi terbuka</p>
          </div>
        </div>
        <Edit />
      </Container>
    )
}

const Container = styled.div`
  padding: 1em;
`;