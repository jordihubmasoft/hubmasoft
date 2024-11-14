// src/modules/auth/components/ContactDataForm.tsx
import React, { useState } from 'react';
import { Card, Typography, Grid, TextField, Button } from '@mui/material';

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
        borderRadius: 5,
        boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
        bgcolor: '#FFFFFF',
        p: 3,
        mb: 4,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', mb: 3 }}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" sx={{ width: '100%', height: '56px' }}>
              Añadir Dirección
            </Button>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 4,
            bgcolor: '#1A1A40',
            color: '#FFFFFF',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#333366',
            },
          }}
        >
          Guardar Cambios
        </Button>
      </form>
    </Card>
  );
};

export default ContactDataForm;
