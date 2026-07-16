import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

import Beranda from "./components/Beranda";
import Formasi from "./components/Formasi";
import Pengumuman from "./components/Pengumuman";
import Jadwal from "./components/Jadwal";
import Tahapan from "./components/Tahapan";
import Unduh from "./components/Unduh";
import Daftar from "./components/Daftar";
import Config from "./config.json";

import { useLocation } from "react-router-dom";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
      sx={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: "13px",
        letterSpacing: "0.3px",
        textTransform: "none",
        color: "#5a6a84",
        minWidth: "auto",
        padding: "6px 14px",
        "&.Mui-selected": {
          color: "#1a3a6b",
        },
        "&:hover": {
          color: "#1a3a6b",
        },
      }}
    />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function App() {
  const [value, setValue] = React.useState(0);
  const [dialogAktivasi, setDialogAktivasi] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const url_activation = Config.api_domain + "/user/activate/";

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (event, newValue) => {
    const routes = ["#/", "#/formasi", "#/pengumuman", "#/jadwal", "#/tahapan", "#/unduh", "#/daftar"];
    if (newValue < routes.length) {
      window.location.href = routes[newValue];
    } else {
      window.location.href = Config.url_pelamar;
    }
  };

  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const pathMap = {
      "/": 0, "/formasi": 1, "/pengumuman": 2,
      "/jadwal": 3, "/tahapan": 4, "/unduh": 5, "/daftar": 6,
    };
    if (pathMap[location?.pathname] !== undefined) {
      setValue(pathMap[location.pathname]);
    } else if (location?.pathname.includes("aktivasi")) {
      setDialogAktivasi(true);
      const tokennya = location.pathname.split("/").pop();
      postActivation(tokennya);
    }
  }, [location]);

  const postActivation = async (tokennya) => {
    try {
      const response = await fetch(url_activation + tokennya, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      setLoading(false);
      if (response.status === 200) {
        setMessage(json.message);
      } else {
        setMessage(`Error ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setLoading(false);
      setMessage(`Error ${error}`);
    }
  };

  const navItems = [
    { label: "Beranda", href: "#/" },
    { label: "Formasi", href: "#/formasi" },
    { label: "Pengumuman", href: "#/pengumuman" },
    { label: "Jadwal", href: "#/jadwal" },
    { label: "Tahapan", href: "#/tahapan" },
    { label: "Unduh", href: "#/unduh" },
    { label: "Daftar", href: "#/daftar" },
  ];

  return (
    <>
      {/* ===== MOBILE DRAWER ===== */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(26,58,107,0.1)",
          },
        }}
      >
        <List sx={{ py: 1 }}>
          {navItems.map((item, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 1.2,
                  px: 3,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#1a3a6b",
                  "&:hover": { background: "rgba(26,58,107,0.06)" },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1a3a6b",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ===== NAVBAR ===== */}
      <div
        className="navbar-wrapper"
        style={{
          boxShadow: scrolled
            ? "0 4px 24px rgba(26,58,107,0.13)"
            : "0 2px 8px rgba(26,58,107,0.06)",
        }}
      >
        <div className="navbar-container">
          {/* Brand */}
          <div
            className="navbar-brand"
            onClick={() => (window.location.href = "#/")}
          >
            <img src="./logobig.png" alt="Logo BIG" />
            <span className="navbar-title">Seleksi Jabatan Pimpinan Tinggi BIG</span>
          </div>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="navigasi utama"
              TabIndicatorProps={{
                style: {
                  background: "linear-gradient(90deg, #1a3a6b, #2451a0)",
                  height: "3px",
                  borderRadius: "3px 3px 0 0",
                },
              }}
            >
              {navItems.map((item, idx) => (
                <LinkTab key={idx} label={item.label} href={item.href} />
              ))}
            </Tabs>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" }, color: "#1a3a6b" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div style={{ width: "100%", minHeight: "75vh", background: "#f4f6fb" }}>
        <TabPanel value={value} index={0}>
          <Beranda />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Formasi />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Pengumuman />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Jadwal />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Tahapan />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Unduh />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Daftar />
        </TabPanel>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="footer-wrapper">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <img src="./logobig.png" alt="Logo BIG" />
            <div className="footer-brand-title">
              Seleksi Jabatan Pimpinan Tinggi BIG
            </div>
            <div className="footer-brand-desc">
              Badan Informasi Geospasial — Lembaga Pemerintah Non Kementerian
              Republik Indonesia
            </div>
          </div>

          {/* Kontak */}
          <div className="footer-section">
            <h4>Bantuan Informasi</h4>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", marginBottom: "16px", lineHeight: 1.6 }}>
              Segala pertanyaan terkait Seleksi JPT di Lingkungan BIG dapat menghubungi:
            </p>
            <div className="footer-contact-item">
              <span className="icon">🏛️</span>
              <span>Tim Sekretariat Panitia Seleksi JPT Badan Informasi Geospasial</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">📞</span>
              <span>021-8757427</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">✉️</span>
              <span>pansel@big.go.id</span>
            </div>
          </div>

          {/* Navigasi */}
          <div className="footer-section">
            <h4>Navigasi</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Beranda", "Formasi", "Pengumuman", "Jadwal", "Tahapan", "Unduh", "Daftar"].map((item) => (
                <a
                  key={item}
                  href={`#/${item.toLowerCase()}`}
                  style={{
                    fontSize: "13.5px",
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#e8b84a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Badan Informasi Geospasial. Seleksi Jabatan Pimpinan Tinggi.</p>
          <p>Dibangun untuk Pelayanan Publik yang Transparan & Akuntabel</p>
        </div>
      </footer>

      {/* Dialog Aktivasi */}
      <Dialog open={dialogAktivasi} onClose={() => setDialogAktivasi(false)}>
        <DialogTitle>Aktivasi Akun</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message ? message : "Proses aktivasi.."}
            <br />
            {loading ? <LinearProgress /> : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogAktivasi(false)}>Oke</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
