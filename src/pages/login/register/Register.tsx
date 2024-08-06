import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRegister } from "@hooks/userRegister";

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
  const [registerData, setRegisterData] =
    useState<RegisterData>(initialRegisterData);
  const [openRegister, setOpenRegister] = useState<boolean>(true);

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const { nombre, email, password } = registerData;
    await register({ username: nombre, email, password });
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
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
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
