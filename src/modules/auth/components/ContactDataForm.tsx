import React from 'react';
import { Card, Typography, Grid, TextField } from '@mui/material';

interface ContactDataFormProps {
  onChange: (fieldName: string, value: string) => void;
  data: {
    email: string;
    phone: string;
    website: string;
    phone1: string;
    shippingAddress: string;
  };
}

const ContactDataForm: React.FC<ContactDataFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
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
        sx={{
          color: '#1A1A40',
          fontWeight: 500,
          mb: 3,
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Datos de Contacto
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={data.email}
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
            value={data.phone}
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
            value={data.website}
            onChange={handleChange}
            sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Móvil"
            variant="outlined"
            name="phone1"
            value={data.phone}
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
            value={data.shippingAddress}
            onChange={handleChange}
            sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ContactDataForm;
