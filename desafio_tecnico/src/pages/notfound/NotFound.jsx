import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CssBaseline />
      <Header showLogoutIcon={false} />
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          style={{
            marginBottom: "16px",
            marginTop: 0, 
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          style={{
            marginBottom: "16px",
            marginTop: 0, 
          }}
        >
          Página não encontrada
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          A página que você está procurando não existe. Clique{" "}
          <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
            aqui
          </Link>{" "}
          para voltar à página inicial.
        </Typography>
      </Container>
      <Footer />
    </div>
  );
};

export default NotFound;
