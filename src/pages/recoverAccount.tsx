import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importa useRouter
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
import AuthenticatorService from "@services/AuthenticatorService";
import Alert, { AlertColor } from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Image from "next/image";
import Logo from "@public/img/Logo.svg"; 
import { useResetPassword } from "../hooks/useAuthentication"; 
import useAuthStore from "../store/useAuthStore"; 

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
  const { resetPasswordToken } = useAuthStore(); 
  const { resetPassword, loading, error } = useResetPassword(); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  
  const [pin, setPin] = useState(""); 
  const [isPinValidated, setIsPinValidated] = useState(false); 
  const router = useRouter(); // Inicializa useRouter

  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const allRequirementsMet = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    setHasMinLength(password.length >= 8);
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecialChar(/[\W_]/.test(password));
  }, [password]);

  const handlePinSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const isValid = await AuthenticatorService.validateToken(pin); // Usa el servicio
  
      if (isValid) {
        setIsPinValidated(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("¡PIN validado con éxito!");
        setOpenSnackbar(true);
      } else {
        throw new Error("Token inválido");
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("PIN inválido. Intenta nuevamente.");
      setOpenSnackbar(true);
    }
  };
  
  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/UpdatePass`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password, 
          token: pin          
        }),
      });

      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage("¡Contraseña actualizada con éxito!");

        // Redirigir al login después de un pequeño retraso para permitir mostrar el Snackbar
        setTimeout(() => {
          router.push('/login'); // Redirige al login
        }, 2000);  // Espera 2 segundos antes de redirigir

      } else {
        throw new Error('Error al actualizar la contraseña');
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message || "Ocurrió un error al actualizar la contraseña.");
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
            {isPinValidated ? "Recuperar Contraseña" : "Introduce el PIN"}
          </Typography>

          {/* Mostrar formulario de PIN si no ha sido validado */}
          {!isPinValidated && (
            <Box component="form" onSubmit={handlePinSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="pin"
                label="Introduce el PIN"
                type="text"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Validar PIN
              </Button>
            </Box>
          )}

          {/* Mostrar formulario de nueva contraseña si el PIN ha sido validado */}
          {isPinValidated && (
            <Box component="form" onSubmit={handlePasswordSubmit} noValidate sx={{ mt: 1 }}>
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
          )}
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
