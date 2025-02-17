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
        p: 3,
        borderRadius: 2,
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
        bgcolor: '#FFFFFF',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', mb: 3 }}>
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
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
          required
          sx={{ mt: 3, bgcolor: '#F3F4F6', borderRadius: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            bgcolor: '#1A1A40',
            color: '#FFFFFF',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': { bgcolor: '#333366' },
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
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': { color: '#333366' },
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
