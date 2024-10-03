import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRegister } from "@hooks/userRegister"; // Hook personalizado para el registro
import { useRouter } from "next/router";

interface RegisterData {
  nombre: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

const initialRegisterData: RegisterData = {
  nombre: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const Register: React.FC = () => {
  const { register, data, error, loading } = useRegister();
  const router = useRouter();
  const [registerData, setRegisterData] = useState<RegisterData>(initialRegisterData);
  const [openRegister, setOpenRegister] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Añadimos los errores de email
  const [emailError, setEmailError] = useState(false);

  // Función para validar que el email tiene un formato válido
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainBlacklist = ["example.com", "test.com"]; // Dominios no permitidos
    const emailDomain = email.split("@")[1];

    if (!emailRegex.test(email)) {
      return false; // Si no cumple el formato básico
    }

    if (domainBlacklist.includes(emailDomain)) {
      return false; // Si el dominio está en la lista negra
    }

    return true; // Devuelve verdadero si cumple todas las condiciones
  };

  // Efecto para manejar el éxito o error en el registro
  useEffect(() => {
    if (data) {
      setSnackbarSeverity('success');
      setOpenSnackbar(true); // Mostrar mensaje de éxito
      setTimeout(() => {
        setOpenRegister(false); // Cerrar el diálogo
        router.push("/login"); // Redirigir al inicio de sesión
      }, 2000);
    } else if (error) {
      setSnackbarSeverity('error');
      setErrorMessage(error); // Mostrar mensaje de error
      setOpenSnackbar(true);
    }
  }, [data, error, router]);

  // Manejar la lógica del formulario de registro
  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(""); // Limpiar mensajes de error previos

    // Validar que el correo electrónico sea válido
    if (!validateEmail(registerData.email)) {
      setEmailError(true); // Mostrar error en el campo del correo electrónico
      setErrorMessage("El correo electrónico no es válido o está en la lista de dominios no permitidos");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Validar que las contraseñas coincidan
    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Ejecutar la función de registro
    const { nombre, surname, email, password } = registerData;
    await register({
      name: nombre,
      surname: surname,
      email: email,
      password: password,
    });
  };

  // Manejar cambios en los campos de texto
  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
        <DialogTitle>Regístrate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Completa los siguientes campos para crear tu cuenta.
          </DialogContentText>
          {errorMessage && (
            <DialogContentText color="error">
              {errorMessage}
            </DialogContentText>
          )}
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
              id="surname"
              label="Apellidos"
              name="surname"
              autoComplete="surname"
              value={registerData.surname}
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
              error={emailError}
              helperText={emailError && "Correo electrónico inválido"}
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
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Registrarse"}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarSeverity === 'success' ? "¡Registro exitoso! Redirigiendo al inicio de sesión..." : errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
