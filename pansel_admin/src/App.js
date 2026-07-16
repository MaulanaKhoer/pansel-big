import { useEffect, useState } from "react";
import { getCookie } from "./Helpers";
import Config from "./config.json";
import { HashRouter as Router } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProfileDialog from "./components/ProfileDialog";
import LeftMenu from "./components/LeftMenu";
import Login from "./components/Login";
import MenuRouting from "./MenuRouting";

function App() {
  const [auth, setAuth] = useState(false);
  const token = getCookie("OPERATOR_TOKEN");
  const [tokenValid, setTokenValid] = useState(false);
  const url_valid = Config.api_domain + "/auth/validOperator";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const validate = async () => {
      try {
        const response = await fetch(url_valid, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const json = await response.json();
        if (response.status === 200 && json.status === "success") {
          setTokenValid(true);
          setAuth(true);
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error(`Auth error: ${error}`);
      }
    };
    validate();
  }, [token, tokenValid, url_valid]);

  if (!auth) {
    return (
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar auth={false} setOpen={() => {}} />
          <Login setAuth={setAuth} />
          <Footer />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="admin-layout">
        {/* Navbar */}
        <Navbar auth={auth} setOpen={(e) => setOpen(e)} />
        <ProfileDialog open={open} setOpen={(e) => setOpen(e)} />

        {/* Body */}
        <div className="admin-body">
          {/* Sidebar */}
          <div className="admin-sidebar">
            <LeftMenu />
          </div>

          {/* Content */}
          <div className="admin-content">
            <MenuRouting />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
