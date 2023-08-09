import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      style={{
        backgroundColor: "#333",
        top: "auto",
        bottom: 0,
        marginTop: "50px",
      }}
    >
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="body2" style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Skills. Desenvolvido por Gustavo Mariano.{" "}
          <a
            href="https://www.linkedin.com/in/gustav-mariano/"
            target="_blank"
            rel=""
            style={{ color: "inherit" }}
          >
            Contato
          </a>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
