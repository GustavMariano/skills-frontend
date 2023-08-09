import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Api } from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import ToastError from '../../components/toasts/ToastError';
import ToastSuccess from '../../components/toasts/ToastSuccess';
import { ToastContainer } from 'react-toastify';

const defaultTheme = createTheme();

export default function Login() {
  const [rememberPassword, setRememberPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginData = {
      login: data.get('login'),
      senha: data.get('senha'),
    };

    try {
      const response = await Api.post('/login', loginData);
      const token = response.data.token;
      const userId = response.data.userId

      localStorage.setItem('userId', userId)
      localStorage.setItem('token', token);

      if (rememberPassword) {
        localStorage.setItem('senha', loginData.senha);
      } else {
        localStorage.removeItem('senha');
      }

      ToastSuccess({ message: 'Login efetuado com sucesso!' });
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      ToastError({ message: 'Login ou senha incorretos' });
    }
  };

  React.useEffect(() => {
    const storedSenha = localStorage.getItem('senha');
    if (storedSenha) {
      document.getElementById('senha').value = storedSenha;
      setRememberPassword(true);
    }
  }, []);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '15vh'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                type={showPassword ? 'text' : 'password'}
                id="senha"
                autoComplete="current-senha"
                InputProps={{
                  endAdornment: (
                    <Button onClick={handleShowPassword} color="primary">
                      {showPassword ? 'Esconder Senha' : 'Mostrar Senha'}
                    </Button>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar senha"
                onChange={(e) => setRememberPassword(e.target.checked)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/cadastro" variant="body2">
                    {"Ainda não tem uma conta? cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}
