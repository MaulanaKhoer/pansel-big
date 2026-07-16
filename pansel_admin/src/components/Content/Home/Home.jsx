import { useState, useEffect } from "react";
import Config from "../../../config.json";
import { getCookie } from "../../../Helpers";

const statCards = [
    { icon: "📋", label: "Pengumuman", endpoint: "/pengumuman/count", key: "count", color: "#1a3a6b" },
    { icon: "👥", label: "Pelamar", endpoint: "/pelamar/count", key: "count", color: "#1a6b4a" },
    { icon: "📁", label: "Berkas Dokumen", endpoint: "/berkas/count", key: "count", color: "#6b1a3a" },
    { icon: "🗓️", label: "Jadwal", endpoint: "/jadwal/count", key: "count", color: "#6b4a1a" },
];

export default function Home() {
    const token = getCookie("OPERATOR_TOKEN");
    const operator = getCookie("OPERATOR");

    const now = new Date();
    const dateStr = now.toLocaleDateString("id-ID", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <div className="page-header-badge">🏛️ Pansel Management</div>
                    <h1 className="page-header-title">Dashboard</h1>
                    <p className="page-header-subtitle">{dateStr}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Operator aktif
                    </p>
                    <p style={{ color: "#fff", fontSize: "16px", fontWeight: 700, margin: "4px 0 0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        👤 {operator || "—"}
                    </p>
                </div>
            </div>

            {/* Welcome Card */}
            <div className="admin-card" style={{ marginBottom: "24px", padding: "28px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                        width: "56px", height: "56px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #1a3a6b, #2451a0)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "24px", flexShrink: 0,
                    }}>
                        🏛️
                    </div>
                    <div>
                        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#1a2236", marginBottom: "4px" }}>
                            Seleksi Jabatan Pimpinan Tinggi BIG
                        </h2>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", color: "#5a6a84", margin: 0 }}>
                            Badan Informasi Geospasial — Sistem Manajemen Pansel Internal
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Nav Cards */}
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "15px", color: "#1a3a6b", marginBottom: "16px", letterSpacing: "0.3px" }}>
                Menu Cepat
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" }}>
                {[
                    { icon: "⚙️", label: "Pansel Setting", href: "#/pansel", desc: "Konfigurasi seleksi" },
                    { icon: "📋", label: "Pengumuman", href: "#/pengumuman", desc: "Kelola pengumuman" },
                    { icon: "🗓️", label: "Jadwal", href: "#/jadwal", desc: "Manajemen jadwal" },
                    { icon: "📁", label: "Berkas", href: "#/berkas", desc: "Dokumen & berkas" },
                    { icon: "📌", label: "Tahapan", href: "#/tahapan", desc: "Tahapan seleksi" },
                    { icon: "👥", label: "Pelamar", href: "#/pelamar", desc: "Daftar pelamar" },
                    { icon: "👤", label: "Account", href: "#/akun", desc: "Manajemen akun" },
                ].map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className="stat-card"
                            style={{ cursor: "pointer" }}
                        >
                            <div className="stat-card-icon">{item.icon}</div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "14px", color: "#1a3a6b" }}>{item.label}</div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", color: "#5a6a84" }}>{item.desc}</div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Info Footer */}
            <div style={{
                background: "linear-gradient(135deg, rgba(26,58,107,0.06), rgba(26,58,107,0.02))",
                border: "1px solid rgba(26,58,107,0.10)",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
            }}>
                <span style={{ fontSize: "20px" }}>ℹ️</span>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13.5px", color: "#5a6a84", margin: 0, lineHeight: 1.6 }}>
                    Sistem ini digunakan untuk mengelola konten publik Seleksi JPT BIG.
                    Perubahan yang dilakukan akan langsung tercermin di halaman <strong>landing page</strong>.
                </p>
            </div>
        </div>
    );
}