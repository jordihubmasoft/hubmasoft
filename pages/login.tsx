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
import Logo from "../public/img/Logo.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Copyright } from "@mui/icons-material";
import AuthenticationService from "./services/AuthenticatorService";
import { LoginResponse, UserLogin } from "./types/UserLogin";

const theme = createTheme();

const Login = () => {
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

  const handleLogin = async () => {};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage("");
    try {
      console.log("Enviando solicitud de inicio de sesión con", {
        email,
        password,
      });
      /*  const response = await axios.post(
        "https://hubmasoftapi-dpaph6a7h5bja0cr.eastus-01.azurewebsites.net/user/login",
        {
          email,
          password,
        }
      );*/
      const userLogin: UserLogin = {
        userName: email,
        password: password,
      };
      let response: LoginResponse;
      await AuthenticationService.userLogin(userLogin).then(async (data) => {
        const token = data.data.token;
        console.log("Token:", token);
      });
      console.log("Respuesta recibida:", response);
      //if (response.status === 200) {
      //  localStorage.setItem("token", response.data.token);
      //  router.push("/dashboard");
      //}
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
      setEmailError(true);
      setPasswordError(true);
      setErrorMessage(
        "Error al iniciar sesión: Verifique sus credenciales e intente nuevamente."
      );
    }
  };

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      console.log("Enviando solicitud de registro con", registerData);
      const response = await axios.post(
        "https://hubmasoftapi-dpaph6a7h5bja0cr.eastus-01.azurewebsites.net/user/register",
        registerData
      );
      console.log("Respuesta recibida:", response);
      if (response.status === 200) {
        setOpenRegister(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      if (error.response) {
        console.log("Error data:", error.response.data);
        setErrorMessage("Error al registrar: " + error.response.data.message);
      } else {
        setErrorMessage("Error al registrar: " + error.message);
      }
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
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
              Iniciar Sesión
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

      {/* Dialog para Registro */}
      <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
        <DialogTitle>Regístrate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Completa los siguientes campos para crear tu cuenta.
          </DialogContentText>
          <Box
            component="form"
            onSubmit={handleRegisterSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="name"
              autoFocus
              value={registerData.nombre}
              onChange={handleRegisterChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              value={registerData.password}
              onChange={handleRegisterChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="Número de Teléfono (opcional)"
              type="tel"
              id="phone"
              autoComplete="tel"
              value={registerData.phone}
              onChange={handleRegisterChange}
            />
            <DialogActions>
              <Button onClick={() => setOpenRegister(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Registrarse
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default Login;
