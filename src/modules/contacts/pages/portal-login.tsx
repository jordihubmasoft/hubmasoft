import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
  const [inputPassword, setInputPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Aquí deberías agregar la lógica de verificación de contraseña
    if (inputPassword === '1234') {
      // Si la contraseña es correcta, redirige al portal del cliente
        window.open('/contacts/portal-clientes');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Inicio de Sesión
      </Typography>
      <TextField
        label="Contraseña"
        type="password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Iniciar Sesión
      </Button>
    </Box>
  );
};

export default Login;

