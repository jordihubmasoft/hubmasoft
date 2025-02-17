// src/modules/auth/components/EditProfileForm.tsx
import React, { useState, useEffect } from 'react';
import { Card, Typography, Grid, TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface EditProfileFormProps {
  /**
   * Indica si estamos en proceso de carga/guardado (se muestra un texto "Cargando...").
   */
  loading: boolean;
  /**
   * Indica si el contacto ya existe en BD; si es `false` se mostrará un aviso al usuario.
   */
  hasContact: boolean;
  /**
   * Datos del formulario que llegan desde el padre (componente contenedor).
   */
  formData: {
    name: string;
    surname: string;
    email: string;
    /**
     * Agrega aquí los demás campos que edites en este mismo formulario:
     * phone, country, etc. solo si los necesitas renderizar/editarlos desde este componente.
     */
  };
  /**
   * Se dispara cada vez que cambia algún campo del formulario.
   * El primer parámetro es el nombre del campo, el segundo es su nuevo valor.
   */
  onChange: (fieldName: string, value: string) => void;
  /**
   * Se dispara al dar clic en el botón "Guardar Cambios".
   */
  onSubmit: () => void;
  /**
   * Se dispara al dar clic en "Cambiar Contraseña".
   */
  onChangePassword: () => void;
}

/**
 * Formulario para editar el perfil de usuario.
 */
const EditProfileForm: React.FC<EditProfileFormProps> = ({
  loading,
  hasContact,
  formData,
  onChange,
  onSubmit,
  onChangePassword,
}) => {
  /**
   * OJO: Eliminamos el estado local y el useEffect que había anteriormente,
   * para que el componente sea "controlado" por las props del padre.
   * Ahora cada cambio se notifica con onChange, y el submit con onSubmit.
   */

  // Manejador de cambios en los TextField
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

  // Manejador del submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        bgcolor: '#FFFFFF',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: '#1A1A40', fontWeight: '600', mb: 3 }}
      >
        Editar Perfil
      </Typography>

      {/* Indicador de carga */}
      {loading && (
        <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
          Cargando...
        </Typography>
      )}

      {/* Aviso si no hay contacto todavía */}
      {!hasContact && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Aún no existe este contacto en la base de datos, se creará uno nuevo.
        </Typography>
      )}

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
          disabled={loading}
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
