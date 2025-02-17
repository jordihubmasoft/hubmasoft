import React, { useState } from 'react';
import { Card, Typography, Grid, TextField, Button, Box } from '@mui/material';

interface ContactDataFormProps {
  onSave: (data: any) => void;
}

const ContactDataForm: React.FC<ContactDataFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    website: '',
    mobile: '',
    shippingAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
        bgcolor: '#FFFFFF',
        p: 3,
        mb: 4,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: '#1A1A40', fontWeight: 500, mb: 3, fontFamily: 'Roboto, sans-serif' }}
      >
        Datos de Contacto
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sitio Web"
              variant="outlined"
              name="website"
              value={formData.website}
              onChange={handleChange}
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Móvil"
              variant="outlined"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dirección de Envío"
              variant="outlined"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                height: '56px',
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 'bold',
                borderColor: '#2666CF',
                color: '#2666CF',
                '&:hover': { borderColor: '#1A1A40', color: '#1A1A40' },
              }}
            >
              Añadir Dirección
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#2666CF',
              color: '#FFFFFF',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { bgcolor: '#1A1A40' },
            }}
          >
            Guardar Cambios
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default ContactDataForm;
