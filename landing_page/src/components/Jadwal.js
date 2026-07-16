import * as React from "react";
import { useState, useEffect } from "react";
import Config from "../config.json";

const URL_LIST = Config.api_domain + "/jadwal/active/";
const URL_DATA = Config.api_domain + "/seleksi/active/";

function Jadwal() {
  const [list, setList] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetch(URL_LIST, { method: "GET", headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then((data) => setList(data.data))
      .catch((err) => console.error(err));

    fetch(URL_DATA, { method: "GET", headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then((data) => setActiveStep(data.step))
      .catch((err) => console.error(err));
  }, []);

  const steps = list ?? [];

  return (
    <div style={{ background: "#f4f6fb", minHeight: "75vh", paddingBottom: "48px" }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 100%)", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.4)", borderRadius: "100px", padding: "5px 14px", marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#e8b84a", letterSpacing: "1.2px", textTransform: "uppercase" }}>Seleksi Terbuka · BIG 2026</span>
          </div>
          <h1 style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", margin: 0, lineHeight: 1.2 }}>
            Jadwal Seleksi
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", marginTop: "8px" }}>
            Seleksi Jabatan Pimpinan Tinggi Pratama — Badan Informasi Geospasial 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 0" }}>
        {/* Disclaimer */}
        <div style={{ background: "rgba(200,146,42,0.08)", border: "1px solid rgba(200,146,42,0.25)", borderRadius: "10px", padding: "12px 18px", marginBottom: "32px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <span style={{ fontSize: "16px" }}>⚠️</span>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13.5px", color: "#7a6020", margin: 0, lineHeight: 1.6 }}>
            Jadwal sewaktu-waktu dapat berubah. Informasi detail pelaksanaan akan diumumkan pada setiap tahapan seleksi.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {steps.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", textAlign: "center", boxShadow: "0 4px 24px rgba(26,58,107,0.10)" }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#5a6a84", fontSize: "15px" }}>Jadwal belum tersedia.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {steps.map((step, index) => {
                const isDone = index < activeStep;
                const isActive = index === activeStep;
                return (
                  <div key={index} style={{ display: "flex", gap: "20px", position: "relative" }}>
                    {/* Line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isDone ? "#1a6b4a" : isActive ? "linear-gradient(135deg, #1a3a6b, #2451a0)" : "#e2e8f0",
                        boxShadow: isActive ? "0 0 0 4px rgba(26,58,107,0.15)" : "none",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700, fontSize: "13px",
                        color: isDone || isActive ? "#fff" : "#5a6a84",
                        zIndex: 1,
                      }}>
                        {isDone ? "✓" : index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div style={{ width: "2px", flex: 1, background: isDone ? "#1a6b4a" : "#e2e8f0", margin: "4px 0" }} />
                      )}
                    </div>

                    {/* Card */}
                    <div style={{
                      flex: 1,
                      background: "#fff",
                      borderRadius: "12px",
                      padding: "18px 22px",
                      marginBottom: "12px",
                      boxShadow: isActive ? "0 4px 20px rgba(26,58,107,0.15)" : "0 2px 8px rgba(26,58,107,0.07)",
                      border: isActive ? "1.5px solid rgba(26,58,107,0.25)" : "1px solid rgba(26,58,107,0.08)",
                    }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "15px", color: isDone ? "#1a6b4a" : isActive ? "#1a3a6b" : "#1a2236", marginBottom: "4px" }}>
                        {step.judul}
                      </div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", color: "#5a6a84" }}>
                        📅 {step.label}
                      </div>
                      {isActive && (
                        <div style={{ marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(26,58,107,0.08)", borderRadius: "100px", padding: "3px 10px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2451a0", display: "inline-block", animation: "pulse 2s infinite" }} />
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 700, color: "#1a3a6b", letterSpacing: "0.5px" }}>TAHAP SAAT INI</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jadwal;
