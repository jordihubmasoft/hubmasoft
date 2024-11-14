// src/modules/auth/components/FiscalDataForm.tsx
import React, { useState } from 'react';
import { Card, Typography, Grid, TextField, MenuItem, Button } from '@mui/material';

interface FiscalDataFormProps {
  onSave: (data: any) => void;
}

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

const FiscalDataForm: React.FC<FiscalDataFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    nif: '',
    commercialName: '',
    vatIdentifier: '',
    address: '',
    postalCode: '',
    province: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        Datos Fiscales
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre de la Empresa"
              variant="outlined"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="NIF"
              variant="outlined"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre Comercial"
              variant="outlined"
              name="commercialName"
              value={formData.commercialName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Identificador VAT"
              variant="outlined"
              name="vatIdentifier"
              value={formData.vatIdentifier}
              onChange={handleChange}
            />
          </Grid>
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

export default FiscalDataForm;
