import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ onLogout, showLogoutIcon }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <AppBar
      position="static"
      color="primary"
      style={{ backgroundColor: "#333" }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1, textAlign: "left" }}>
          Skills
        </Typography>
        {showLogoutIcon && location.pathname === "/home" && (
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
