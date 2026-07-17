import { useState, useEffect } from "react";
import Config from "../config.json";

/* ── Icon components ── */
const IconClipboardCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="M9 14l2 2 4-4"/>
  </svg>
);
const IconUsers = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const IconFileText = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const IconAward = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);
const IconHeart = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

/* ── Fallback data tahapan ── */
const fallbackTahapanData = [
  {
    step_no: 1,
    judul: "Seleksi Administrasi",
    icon_name: "clipboard",
    deskripsi: "Panitia melakukan verifikasi kelengkapan berkas administrasi sesuai dengan ketentuan yang dipersyaratkan.\nPanitia menetapkan calon peserta yang memenuhi persyaratan administrasi untuk mengikuti seleksi berikutnya.",
  },
  {
    step_no: 2,
    judul: "Seleksi Kompetensi Manajerial",
    icon_name: "users",
    deskripsi: "Peserta akan mengikuti asesmen yang diselenggarakan oleh pihak luar yang ditunjuk oleh Panitia.\nCakupan asesmen meliputi: Tes Tertulis, Leaderless Group Discussion (LGD), dan Wawancara.",
  },
  {
    step_no: 3,
    judul: "Seleksi Kompetensi Teknis",
    icon_name: "file",
    deskripsi: "Peserta akan diuji kemampuan dan kompetensi teknisnya melalui tes berupa: pembuatan dan presentasi makalah, wawancara mendalam, dan penelusuran rekam jejak.",
  },
  {
    step_no: 4,
    judul: "Pengumuman Hasil Akhir 3 (Tiga) Besar",
    icon_name: "award",
    deskripsi: "Panitia akan mengumumkan 3 (tiga) calon terbaik berdasarkan nilai akumulasi tes seleksi kompetensi manajerial dan seleksi kompetensi teknis.",
  },
  {
    step_no: 5,
    judul: "Tes Kesehatan",
    icon_name: "heart",
    deskripsi: "Peserta akan mengikuti Tes Kesehatan yang diselenggarakan oleh rumah sakit yang ditunjuk oleh Panitia.\nJenis-jenis pemeriksaan terdiri atas pemeriksaan fisik dan jiwa dengan tes MMPI.",
  },
];

/* ── Colors and Icons helper mappings ── */
const colorMap = [
  { color: "#2563eb", gradient: "linear-gradient(135deg, #2563eb, #3b82f6)" },
  { color: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)" },
  { color: "#059669", gradient: "linear-gradient(135deg, #059669, #10b981)" },
  { color: "#d97706", gradient: "linear-gradient(135deg, #d97706, #f59e0b)" },
  { color: "#dc2626", gradient: "linear-gradient(135deg, #dc2626, #ef4444)" }
];

function getIconForStep(stepNo, iconName) {
  const name = (iconName || "").toLowerCase();
  if (name.includes("clipboard") || stepNo === 1) return <IconClipboardCheck />;
  if (name.includes("users") || stepNo === 2) return <IconUsers />;
  if (name.includes("file") || stepNo === 3) return <IconFileText />;
  if (name.includes("award") || stepNo === 4) return <IconAward />;
  if (name.includes("heart") || stepNo === 5) return <IconHeart />;
  return <IconClipboardCheck />;
}

/* ── Styles ── */
const styles = {
  page: {
    background: "#f4f6fb",
    minHeight: "75vh",
    paddingBottom: "64px",
  },
  header: {
    background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 100%)",
    padding: "48px 24px 40px",
  },
  headerInner: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(200,146,42,0.15)",
    border: "1px solid rgba(200,146,42,0.4)",
    borderRadius: "100px",
    padding: "5px 14px",
    marginBottom: "16px",
  },
  badgeText: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#e8b84a",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
  },
  h1: {
    color: "#fff",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
    margin: 0,
    lineHeight: 1.2,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "15px",
    marginTop: "8px",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "48px 24px 0",
    position: "relative",
  },
  /* Timeline line */
  timelineLine: {
    position: "absolute",
    left: "47px",
    top: "60px",
    bottom: "60px",
    width: "3px",
    background: "linear-gradient(180deg, #2563eb 0%, #7c3aed 25%, #059669 50%, #d97706 75%, #dc2626 100%)",
    borderRadius: "4px",
    opacity: 0.25,
  },
};

/* ── Card component ── */
function StepCard({ item, index, total }) {
  const [hovered, setHovered] = useState(false);

  const stepNo = item.step_no || item.step || (index + 1);
  const title = item.judul || item.title || "";
  const rawItems = item.deskripsi || item.label || "";
  const items = Array.isArray(rawItems)
    ? rawItems
    : (rawItems ? rawItems.split("\n").map(t => t.trim()).filter(t => t.length > 0) : []);

  const stepStyle = colorMap[(stepNo - 1) % colorMap.length] || colorMap[0];
  const stepIcon = getIconForStep(stepNo, item.icon_name);

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "flex-start",
        position: "relative",
        zIndex: 2,
        marginBottom: index < total - 1 ? "12px" : 0,
        animation: `fadeSlideUp 0.5s ease ${index * 0.1}s both`,
      }}
    >
      {/* Step number circle */}
      <div
        style={{
          width: "56px",
          height: "56px",
          minWidth: "56px",
          borderRadius: "50%",
          background: stepStyle.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: "20px",
          boxShadow: `0 4px 20px ${stepStyle.color}40`,
          position: "relative",
          zIndex: 3,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        {stepNo}
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: "16px",
          padding: "28px 32px",
          boxShadow: hovered
            ? `0 12px 40px ${stepStyle.color}18, 0 0 0 1px ${stepStyle.color}20`
            : "0 2px 12px rgba(26,58,107,0.07)",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          borderLeft: `4px solid ${stepStyle.color}`,
          cursor: "default",
        }}
      >
        {/* Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: `${stepStyle.color}10`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: stepStyle.color,
              transition: "all 0.3s ease",
              transform: hovered ? "rotate(-5deg) scale(1.05)" : "rotate(0)",
            }}
          >
            {stepIcon}
          </div>
          <h3
            style={{
              margin: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#1a2236",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
        </div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((text, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  minWidth: "22px",
                  borderRadius: "50%",
                  background: `${stepStyle.color}12`,
                  border: `1.5px solid ${stepStyle.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "2px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: stepStyle.color,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {String.fromCharCode(97 + i)}
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "14.5px",
                  lineHeight: 1.7,
                  color: "#3a4a64",
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
function Tahapan() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(Config.api_domain + "/tahapan/active", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        const dataList = Array.isArray(data) ? data : (data.data || []);
        if (dataList.length > 0) {
          // Sort by step_no
          dataList.sort((a, b) => (a.step_no || 0) - (b.step_no || 0));
          setList(dataList);
        } else {
          setList(fallbackTahapanData);
        }
      })
      .catch((err) => {
        console.error("Error fetching tahapan:", err);
        setList(fallbackTahapanData);
      });
  }, []);

  return (
    <div style={styles.page}>
      {/* Keyframes injection */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .tahapan-timeline-line { left: 27px !important; }
          .tahapan-step-circle { width: 40px !important; height: 40px !important; min-width: 40px !important; font-size: 16px !important; }
          .tahapan-card { padding: 20px 18px !important; }
        }
      `}</style>

      {/* Page Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.badge}>
            <span style={styles.badgeText}>Seleksi Terbuka · BIG 2026</span>
          </div>
          <h1 style={styles.h1}>Tahapan Seleksi</h1>
          <p style={styles.subtitle}>
            Seleksi Jabatan Pimpinan Tinggi Pratama — Badan Informasi Geospasial 2026
          </p>
        </div>
      </div>

      {/* Timeline Content */}
      <div style={styles.content}>
        {/* Vertical gradient line */}
        <div style={styles.timelineLine} />

        {list.map((item, idx) => (
          <StepCard key={item.uuid || idx} item={item} index={idx} total={list.length} />
        ))}
      </div>
    </div>
  );
}

export default Tahapan;
