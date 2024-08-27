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
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import Popper from '@mui/material/Popper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useLogin } from "hooks/useAuthentication";
import { useRegister } from "hooks/userRegister";
import LinearProgress from "@mui/material/LinearProgress";
import Grow from "@mui/material/Grow";

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    fontSize: 14,
    body1: {
      fontWeight: 500,
    },
    body2: {
      color: "#555",
      fontSize: "0.875rem",
    },
  },
  palette: {
    primary: {
      main: '#1a73e8',
    },
    success: {
      main: '#34a853',
    },
    error: {
      main: '#ea4335',
    }
  }
});

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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const allRequirementsMet = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  useEffect(() => {
    if (loginData && !loginError) {
      //guardar el inicio de sesión
      localStorage.setItem("user", JSON.stringify(loginData));
      setSnackbarSeverity("success");
      setSnackbarMessage("¡Inicio de sesión exitoso! Redirigiendo...");
      setOpenSnackbar(true);
      router.push("/dashboard");
    } else if (loginError) {
      setSnackbarSeverity("error");
      setSnackbarMessage(loginError || "Error de inicio de sesión");
      setOpenSnackbar(true);
    }
  }, [loginData, loginError, router]);

  useEffect(() => {
    const password = registerForm.password;
    setHasMinLength(password.length >= 8);
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecialChar(/[\W_]/.test(password));
  }, [registerForm.password]);

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
  };

  const handleRegisterSubmit = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setSnackbarSeverity("error");
      setSnackbarMessage("Las contraseñas no coinciden");
      setOpenSnackbar(true);
      return;
    }

    if (!allRequirementsMet) {
      setErrorMessage("La contraseña no es lo suficientemente fuerte");
      setSnackbarSeverity("error");
      setSnackbarMessage("La contraseña no es lo suficientemente fuerte");
      setOpenSnackbar(true);
      return;
    }

    await register({
      username: registerForm.nombre,
      email: registerForm.email,
      password: registerForm.password,
    });

    if (registerData && !registerError) {
      setIsRegistering(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("¡Registro exitoso! Por favor, inicia sesión.");
      setOpenSnackbar(true);
      router.push("/login");
    } else if (registerError) {
      setErrorMessage(registerError);
      setSnackbarSeverity("error");
      setSnackbarMessage(registerError);
      setOpenSnackbar(true);
    }
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordFocus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePasswordBlur = () => {
    setAnchorEl(null);
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
            width: isRegistering ? "450px" : "400px",
            position: 'relative',
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
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
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
            
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement="right-start"
              modifiers={[
                { name: 'offset', options: { offset: [0, 100] } },
              ]}
              style={{
                position: 'fixed',
                top: '50%',
                right: '20%',
                transform: 'translateY(-50%)',
                zIndex: 1000
              }}
            >
              <Grow in={Boolean(anchorEl)} timeout={300}>
                <Box
                  sx={{
                    width: '280px',
                    padding: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #d1d1d1',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={
                      (Number(hasMinLength) +
                      Number(hasUpperCase) +
                      Number(hasLowerCase) +
                      Number(hasNumber) +
                      Number(hasSpecialChar)) / 5 * 100
                    }
                    sx={{
                      mb: 2,
                      backgroundColor: allRequirementsMet ? 'success.main' : 'error.main',
                    }}
                  />
                  <div className="space-y-2">
                    <Typography variant="body2" className={`flex items-center text-sm ${hasMinLength ? 'text-green-600' : 'text-red-600'}`}>
                      {hasMinLength ? <CheckCircleOutlineIcon fontSize="small" className="mr-2" /> : <RadioButtonUncheckedIcon fontSize="small" className="mr-2" />} Mínimo 8 caracteres
                    </Typography>
                    <Typography variant="body2" className={`flex items-center text-sm ${hasUpperCase ? 'text-green-600' : 'text-red-600'}`}>
                      {hasUpperCase ? <CheckCircleOutlineIcon fontSize="small" className="mr-2" /> : <RadioButtonUncheckedIcon fontSize="small" className="mr-2" />} Al menos una letra mayúscula
                    </Typography>
                    <Typography variant="body2" className={`flex items-center text-sm ${hasLowerCase ? 'text-green-600' : 'text-red-600'}`}>
                      {hasLowerCase ? <CheckCircleOutlineIcon fontSize="small" className="mr-2" /> : <RadioButtonUncheckedIcon fontSize="small" className="mr-2" />} Al menos una letra minúscula
                    </Typography>
                    <Typography variant="body2" className={`flex items-center text-sm ${hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                      {hasNumber ? <CheckCircleOutlineIcon fontSize="small" className="mr-2" /> : <RadioButtonUncheckedIcon fontSize="small" className="mr-2" />} Al menos un número
                    </Typography>
                    <Typography variant="body2" className={`flex items-center text-sm ${hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
                      {hasSpecialChar ? <CheckCircleOutlineIcon fontSize="small" className="mr-2" /> : <RadioButtonUncheckedIcon fontSize="small" className="mr-2" />} Al menos un carácter especial
                    </Typography>
                  </div>
                </Box>
              </Grow>
            </Popper>

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
              disabled={registerLoading || (isRegistering && !allRequirementsMet)}
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
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Box component="footer" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          © {new Date().getFullYear()} Hubmasoft. All rights reserved.
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
