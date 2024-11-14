// src/modules/auth/components/EditProfileForm.tsx
import React, { useState } from 'react';
import { Card, Typography, Grid, TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface EditProfileFormProps {
  onSave: (data: any) => void;
  onChangePassword: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onSave, onChangePassword }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card
      sx={{
        padding: '30px',
        borderRadius: 5,
        boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', mb: 3 }}>
        Editar Perfil
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellidos"
              variant="outlined"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Correo Electrónico"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mt: 3 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            padding: '12px 0',
            backgroundColor: '#1A1A40',
            '&:hover': {
              backgroundColor: '#333366',
            },
          }}
        >
          Guardar Cambios
        </Button>
        <Button
          type="button"
          variant="text"
          fullWidth
          sx={{
            mt: 2,
            color: '#1A1A40',
            '&:hover': {
              color: '#333366',
            },
          }}
          onClick={onChangePassword}
        >
          Cambiar Contraseña
        </Button>
      </form>
    </Card>
  );
};

export default EditProfileForm;
