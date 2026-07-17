import { useState, useEffect } from "react";
import Config from "../config.json";

const URL_DATA = Config.api_domain + "/seleksi/active/";

function Beranda() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(URL_DATA, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.error(`Error ${error}`));
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="dot" />
            <span>Seleksi Terbuka · Badan Informasi Geospasial</span>
          </div>

          {/* Title & Subtitle sejajar dalam satu blok */}
          <h1 className="hero-title">
            {data?.title || "Seleksi Jabatan Pimpinan Tinggi BIG"}
          </h1>
          <p className="hero-subtitle">
            {data?.caption || "Formasi Tahun 2026"}
          </p>

          {/* CTA Buttons — sejajar horizontal */}
          <div className="hero-actions">
            <a className="btn-primary-hero" href="#/pengumuman">
              <span>📋</span>
              Lihat Pengumuman Seleksi JPT BIG
            </a>
            <a className="btn-secondary-hero" href="#/formasi">
              <span>🗂️</span>
              Lihat Formasi
            </a>
          </div>
        </div>
      </section>

      {/* ===== SEBARAN FORMASI ===== */}
      <section className="formasi-section">
        <div className="formasi-inner">
          <h2 className="section-title">Sebaran Formasi</h2>
          <p className="section-subtitle">
            Jabatan Pimpinan Tinggi yang tersedia pada seleksi terbuka saat ini
          </p>

          <div className="formasi-grid">
            {[
              { count: data?.pratama, label: "JPT Pratama" },
              { count: data?.madya, label: "JPT Madya" },
              { count: data?.utama, label: "JPT Utama" },
            ]
              .filter((item) => item.count !== undefined && item.count !== null && item.count > 0)
              .map((item, idx) => (
                <div className="formasi-card" key={idx}>
                  <div className="formasi-number">{item.count}</div>
                  <div className="formasi-label">{item.label}</div>
                </div>
              ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a
              href="#/formasi"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #1a3a6b, #2451a0)",
                color: "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                padding: "13px 32px",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(26,58,107,0.25)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,58,107,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,58,107,0.25)";
              }}
            >
              🔍 Lihat Formasi Selengkapnya
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTIONS ===== */}
      <div style={{ background: "#f4f6fb", padding: "0 24px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* Registrasi */}
          <div
            className="cta-card registrasi"
            style={{
              margin: 0,
              background: "linear-gradient(135deg, #1a3a6b 0%, #2451a0 100%)",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "36px 48px",
              gap: "24px",
              boxShadow: "0 8px 32px rgba(26,58,107,0.20)",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "6px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                📝 Registrasi Pendaftaran
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", margin: 0 }}>
                Pendaftaran Seleksi JPT Badan Informasi Geospasial
              </p>
            </div>
            <a href="#/daftar" className="btn-cta">
              Daftar Sekarang →
            </a>
          </div>

        </div>
      </div>
    </>
  );
}

export default Beranda;
