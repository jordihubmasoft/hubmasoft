import { useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Logo from "@public/img/Logo.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Copyright } from "@mui/icons-material";
import AuthenticationService from "../services/AuthenticatorService";
import { LoginResponse, UserLogin } from "../types/UserLogin";
import { useLogin } from "hooks/useAuthentication";
import { useRegister } from "hooks/userRegister";
import Register from "./login/register/Register";
import { CircularProgress } from "@mui/material";

const theme = createTheme();

const Login = () => {
  const { login, data, error, loading } = useLogin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openRegister, setOpenRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage("");
    event.preventDefault();
    const user: UserLogin = { username: email, password: password };
    await login(user);
    if (data) {
      router.push("/dashboard");
    } else {
      setErrorMessage(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f5f4f2",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Image src={Logo} alt="Logo" width={150} height={150} />
          </Box>
          <Avatar sx={{ m: 1, bgcolor: "#1A1A40" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError && "Correo electrónico incorrecto"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: emailError ? "red" : "primary.main",
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError && "Contraseña incorrecta"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: passwordError ? "red" : "primary.main",
                  },
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ ml: 2 }} />
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Has olvidado la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setOpenRegister(true)}
                >
                  {"Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>

      {openRegister && <Register />}
    </ThemeProvider>
  );
};

export default Login;
