// src/modules/auth/components/ShippingAddressForm.tsx
import React, { useState } from 'react';
import { Card, Typography, Grid, TextField, MenuItem, Button, Box } from '@mui/material';

const provinces = [
  { value: 'provincia1', label: 'Provincia 1' },
  { value: 'provincia2', label: 'Provincia 2' },
  // Añade más provincias según sea necesario
];

const countries = [
  { value: 'es', label: 'España' },
  { value: 'fr', label: 'Francia' },
  // Añade más países según sea necesario
];

interface ShippingAddressFormProps {
  onAddAddress: (data: any) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onAddAddress }) => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAddress(formData);
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
        Dirección de Envío
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ciudad"
              variant="outlined"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Provincia"
              variant="outlined"
              name="province"
              select
              value={formData.province}
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="">Seleccionar provincia</MenuItem>
              {provinces.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Código Postal"
              variant="outlined"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="País"
              variant="outlined"
              name="country"
              select
              value={formData.country}
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="">Seleccionar país</MenuItem>
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => onAddAddress(formData)}
            sx={{ color: '#0066cc', borderColor: '#0066cc' }}
          >
            Añadir Dirección de Envío
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default ShippingAddressForm;
