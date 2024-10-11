import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Image from "next/image";
import Logo from "@public/img/Logo.svg";  // Asegúrate de que la ruta del logo sea correcta
import { useResetPassword } from "../hooks/useAuthentication"; // Hook que maneja la lógica de resetear contraseña
import useAuthStore from "../store/useAuthStore"; // Auth store para manejar el token de reset

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    fontSize: 14,
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
    },
  },
});

const PasswordReset = () => {
  const { resetPasswordToken } = useAuthStore(); // Recupera el token de reset almacenado en el store
  const { resetPassword, loading, error } = useResetPassword(); // Hook personalizado para llamar a la API
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  // Requisitos de la contraseña
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const allRequirementsMet = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  const passwordsMatch = password === confirmPassword;

  // Validaciones de contraseña
  useEffect(() => {
    setHasMinLength(password.length >= 8);
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecialChar(/[\W_]/.test(password));
  }, [password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmPasswordError(false);
    setPasswordError(false);

    if (!passwordsMatch) {
      setConfirmPasswordError(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Las contraseñas no coinciden");
      setOpenSnackbar(true);
      return;
    }

    if (!allRequirementsMet) {
      setPasswordError(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("La contraseña no cumple con los requisitos");
      setOpenSnackbar(true);
      return;
    }

    try {
      await resetPassword(resetPasswordToken || '', password); // Asegúrate de tener el token de reset
      setSnackbarSeverity("success");
      setSnackbarMessage("¡Contraseña actualizada con éxito!");
    } catch (e) {
      setSnackbarSeverity("error");
      setSnackbarMessage(error || "Ocurrió un error al actualizar la contraseña.");
    } finally {
      setOpenSnackbar(true);
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
            transition: "all 0.3s ease",
            position: 'relative',
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 3 }}>
            <Image src={Logo} alt="Logo" width={150} height={150} />
          </Box>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperar Contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nueva Contraseña"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setAnchorEl(e.currentTarget)}
              onBlur={() => setAnchorEl(null)}
              error={passwordError}
              helperText={passwordError && "Contraseña no válida"}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Contraseña"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              helperText={confirmPasswordError && "Las contraseñas no coinciden"}
            />

            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement="right-start"
            >
              <Grow in={Boolean(anchorEl)}>
                <Box
                  sx={{
                    width: '280px',
                    padding: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #d1d1d1',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
                  <Typography variant="body2" sx={{ color: hasMinLength ? "green" : "red" }}>
                    Mínimo 8 caracteres
                  </Typography>
                  <Typography variant="body2" sx={{ color: hasUpperCase ? "green" : "red" }}>
                    Al menos una letra mayúscula
                  </Typography>
                  <Typography variant="body2" sx={{ color: hasLowerCase ? "green" : "red" }}>
                    Al menos una letra minúscula
                  </Typography>
                  <Typography variant="body2" sx={{ color: hasNumber ? "green" : "red" }}>
                    Al menos un número
                  </Typography>
                  <Typography variant="body2" sx={{ color: hasSpecialChar ? "green" : "red" }}>
                    Al menos un carácter especial
                  </Typography>
                </Box>
              </Grow>
            </Popper>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!allRequirementsMet || !passwordsMatch || loading} // Botón desactivado si no se cumplen requisitos
            >
              {loading ? "Cargando..." : "Restablecer Contraseña"}
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default PasswordReset;
