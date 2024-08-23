import { useState, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin } from "hooks/useAuthentication";
import { useRegister } from "hooks/userRegister";
import { Copyright } from "@mui/icons-material";

const theme = createTheme();

const Login = () => {
  const { login, data: loginData, error: loginError, loading: loginLoading } = useLogin();
  const { register, data: registerData, error: registerError, loading: registerLoading } = useRegister();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  useEffect(() => {
    if (loginData && !loginError) {
      router.push("/dashboard");
    }
  }, [loginData, loginError, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage("");

    if (isRegistering) {
      await handleRegisterSubmit();
    } else {
      await handleLoginSubmit();
    }
  };

  const handleLoginSubmit = async () => {
    const user = { username: email, password: password };
    await login(user);

    if (loginError) {
      setErrorMessage(loginError || "Error de inicio de sesión");
    }
  };

  const handleRegisterSubmit = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    await register({
      username: registerForm.nombre,
      email: registerForm.email,
      password: registerForm.password,
    });

    if (registerData && !registerError) {
      setIsRegistering(false);
      router.push("/dashboard");
    } else if (registerError) {
      setErrorMessage(registerError);
    }
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            transition: "all 0.3s ease",
            width: isRegistering ? '450px' : '400px',
          }}
        >
          <Box sx={{ mb: -3 }}>
            <Image src={Logo} alt="Logo" width={200} height={200} />
          </Box>
          <Avatar sx={{ m: 1, bgcolor: "#1A1A40" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isRegistering ? "Regístrate" : "Iniciar Sesión"}
          </Typography>
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {isRegistering && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  autoComplete="name"
                  autoFocus
                  value={registerForm.nombre}
                  onChange={handleRegisterChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="apellidos"
                  label="Apellidos"
                  name="apellidos"
                  autoComplete="surname"
                  value={registerForm.apellidos}
                  onChange={handleRegisterChange}
                />
              </>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus={!isRegistering}
              value={isRegistering ? registerForm.email : email}
              onChange={(e) => {
                isRegistering
                  ? setRegisterForm({ ...registerForm, email: e.target.value })
                  : setEmail(e.target.value);
              }}
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
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete={isRegistering ? "new-password" : "current-password"}
              value={isRegistering ? registerForm.password : password}
              onChange={(e) => {
                isRegistering
                  ? setRegisterForm({ ...registerForm, password: e.target.value })
                  : setPassword(e.target.value);
              }}
              error={passwordError}
              helperText={passwordError && "Contraseña incorrecta"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: passwordError ? "red" : "primary.main",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {isRegistering && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                />
                <FormControlLabel
                  control={<Checkbox value="news" color="primary" />}
                  label="Quiero recibir novedades y ofertas"
                />
              </>
            )}
            {!isRegistering && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loginLoading || registerLoading}
            >
              {isRegistering ? (registerLoading ? <CircularProgress size={24} /> : "Regístrate") : (loginLoading ? <CircularProgress size={24} /> : "Iniciar Sesión")}
            </Button>
            <Grid container>
              <Grid item xs>
                {!isRegistering && (
                  <Link href="#" variant="body2">
                    ¿Has olvidado la contraseña?
                  </Link>
                )}
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering
                    ? "¿Ya tienes cuenta? Inicia sesión."
                    : "¿No tienes cuenta? Regístrate."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
