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
import { useRegister } from "@hooks/userRegister";
import { useRouter } from "next/router";

interface RegisterData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

const initialRegisterData: RegisterData = {
  nombre: "",
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

  useEffect(() => {
    if (data) {
      // If there's data and no error, it means registration was successful
      setOpenSnackbar(true); // Show the success popup
      setTimeout(() => {
        setOpenRegister(false); // Close the registration dialog
        router.push("/login"); // Redirect to the login page after 2 seconds
      }, 2000);
    } else if (error) {
      setErrorMessage(error); // Display the error message if there's an error
    }
  }, [data, error, router]);
  

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setErrorMessage(""); // Limpiar mensajes de error previos

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    const { nombre, email, password } = registerData;
    await register({ username: nombre, email, password }); // Ejecutar la función de registro
  };

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
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Registrarse"}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      
      {/* Snackbar para el registro exitoso */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          ¡Registro exitoso! Redirigiendo al inicio de sesión...
        </Alert>
      </Snackbar>

    </>
  );
};

export default Register;
