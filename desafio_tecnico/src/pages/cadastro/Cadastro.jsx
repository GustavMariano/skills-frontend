import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Api } from "../../services/Api";
import ToastError from "../../components/toasts/ToastError";
import ToastSuccess from "../../components/toasts/ToastSuccess";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Cadastro() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get("login").trim();
    const senha = data.get("senha").trim();

    if (senha !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    if (login.length < 6) {
      ToastError({ message: "O login deve ter pelo menos 6 caracteres." });
      return;
    }

    if (senha.length < 8) {
      ToastError({ message: "A senha deve ter pelo menos 8 caracteres." });
      return;
    }

    if (login === "" || senha === "") {
      ToastError({ message: "O login e a senha não podem estar vazios." });
      return;
    }

    try {
      const response = await Api.post("/usuarios/registrar", { login, senha });
      ToastSuccess({ message: "Cadastro realizado com sucesso!" });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      ToastError({ message: "Erro ao cadastrar. Tente novamente mais tarde." });
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="senha"
              autoComplete="current-senha"
              InputProps={{
                endAdornment: (
                  <Button onClick={handlePasswordToggle} color="primary">
                    {showPassword ? "Esconder Senha" : "Mostrar Senha"}
                  </Button>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmarSenha"
              label="Confirmar Senha"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmarSenha"
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!passwordsMatch}
              helperText={!passwordsMatch && "As senhas não coincidem"}
              InputProps={{
                endAdornment: (
                  <Button onClick={handleConfirmPasswordToggle} color="primary">
                    {showConfirmPassword ? "Esconder Senha" : "Mostrar Senha"}
                  </Button>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Já tem uma conta? Entre agora."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=1600)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}
