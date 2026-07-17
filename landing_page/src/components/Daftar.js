import * as React from "react";

function Daftar() {
  const steps = [
    <>
      Buka peramban (web browser), kemudian akses laman{" "}
      <a
        href="https://asnkarier.bkn.go.id/"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#1a3a6b", fontWeight: 600, textDecoration: "none" }}
        onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
      >
        https://asnkarier.bkn.go.id/
      </a>.
    </>,
    <>Pada halaman utama, pilih menu <strong>Lowongan JPT</strong>.</>,
    <>Pada kolom Instansi, ketik <strong>Badan Informasi Geospasial</strong>, kemudian klik tombol <strong>Cari</strong>.</>,
    <>Dari daftar lowongan yang ditampilkan, klik tombol <strong>Lihat Detail</strong> pada formasi yang diminati.</>,
    <>Pelajari informasi formasi secara saksama, terutama persyaratan, kualifikasi, dan ketentuan yang berlaku. Pastikan seluruh persyaratan telah sesuai dengan kualifikasi yang dimiliki.</>,
    <>Apabila telah memenuhi persyaratan dan dinyatakan memenuhi kriteria (eligible), klik tombol <strong>Daftar Sekarang</strong> untuk melanjutkan proses pendaftaran.</>,
  ];

  return (
    <div style={{ background: "#f4f6fb", minHeight: "75vh", paddingBottom: "64px" }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 100%)", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.4)", borderRadius: "100px", padding: "5px 14px", marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#e8b84a", letterSpacing: "1.2px", textTransform: "uppercase" }}>Seleksi Terbuka</span>
          </div>
          <h1 style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", margin: 0, lineHeight: 1.2 }}>
            Tata Cara Pendaftaran
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", marginTop: "8px" }}>
            Seleksi Jabatan Pimpinan Tinggi Pratama — Badan Informasi Geospasial
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 24px rgba(26,58,107,0.10)", padding: "40px", overflow: "hidden" }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a3a6b", marginTop: 0, marginBottom: "32px", fontSize: "20px" }}>
            Langkah-langkah Pendaftaran via ASN Karier
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {steps.map((step, index) => (
              <div key={index} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1a3a6b, #2451a0)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "18px",
                    boxShadow: "0 4px 12px rgba(26,58,107,0.2)",
                  }}
                >
                  {index + 1}
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: "#3a4a64",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    paddingTop: "8px",
                  }}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <a
              href="https://asnkarier.bkn.go.id/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #e8b84a, #d4a031)",
                color: "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                padding: "16px 36px",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(232,184,74,0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,184,74,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,184,74,0.35)";
              }}
            >
              Menuju ASN Karier
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daftar;