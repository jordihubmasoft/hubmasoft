import React from 'react';
import { Card, Typography, Grid, TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface EditProfileFormProps {
  loading: boolean;
  hasContact: boolean;
  formData: {
    name: string;
    surname: string;
    email: string;
    phone?: string;
    language?: string;
  };
  onChange: (fieldName: string, value: string) => void;
  onSubmit: () => void;
  onChangePassword: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  loading,
  hasContact,
  formData,
  onChange,
  onSubmit,
  onChangePassword,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

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
      <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', mb: 3 }}>
        Editar Perfil
      </Typography>

      {loading && (
        <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
          Cargando...
        </Typography>
      )}

      {!hasContact && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Aún no existe este contacto en la base de datos, se creará uno nuevo.
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Apellidos"
              variant="outlined"
              name="surname"
              value={formData.surname || ''}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Idioma"
              variant="outlined"
              name="language"
              value={formData.language || ''}
              onChange={handleChange}
              select
              SelectProps={{ native: true }}
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            >
              <option value="">Selecciona</option>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
              <option value="fr">Francés</option>
            </TextField>
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

        {/* Sección de contraseña */}
        <Card sx={{ mt: 4, p: 2, bgcolor: '#F8F9FB', borderRadius: 2, boxShadow: 'none' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#1A1A40', fontWeight: 600 }}>
            CONTRASEÑA
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
            Modifica la contraseña con la que accedes actualmente a tu cuenta.
          </Typography>
          <Button
            type="button"
            variant="outlined"
            sx={{
              color: '#2666CF',
              borderColor: '#2666CF',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { backgroundColor: 'rgba(38, 102, 207, 0.1)', borderColor: '#6A82FB' },
            }}
            onClick={onChangePassword}
          >
            Cambiar contraseña
          </Button>
        </Card>

        {/* Sección de verificación en dos pasos (2FA) */}
        <Card sx={{ mt: 3, p: 2, bgcolor: '#F8F9FB', borderRadius: 2, boxShadow: 'none' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#1A1A40', fontWeight: 600 }}>
            VERIFICACIÓN EN DOS PASOS (2FA)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
            Aumenta la seguridad de tu cuenta con la verificación en dos pasos. Próximamente disponible.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth disabled sx={{ textTransform: 'none' }}>
                Verificación por email
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth disabled sx={{ textTransform: 'none' }}>
                Verificación por SMS
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Card>
  );
};

export default EditProfileForm;
