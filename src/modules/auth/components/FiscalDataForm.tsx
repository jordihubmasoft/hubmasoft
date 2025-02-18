import React, { useState, useEffect } from 'react';
import { Card, Typography, Grid, TextField, MenuItem, Button } from '@mui/material';

interface FiscalDataFormProps {
  onSave: (data: any) => void;
  initialData?: {
    companyName: string;
    nif: string;
    commercialName: string;
    vatIdentifier: string;
    address: string;
    postalCode: string;
    province: string;
    country: string;
  };
}

const provinces = [
  { value: 'provincia1', label: 'Provincia 1' },
  { value: 'provincia2', label: 'Provincia 2' },
  // Otras provincias…
];

const countries = [
  { value: 'es', label: 'España' },
  { value: 'fr', label: 'Francia' },
  // Otros países…
];

const FiscalDataForm: React.FC<FiscalDataFormProps> = ({ onSave, initialData }) => {
  // Inicializamos el estado usando las props que provienen del API
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || '',
    nif: initialData?.nif || '',
    commercialName: initialData?.commercialName || '',
    vatIdentifier: initialData?.vatIdentifier || '',
    address: initialData?.address || '',
    postalCode: initialData?.postalCode || '',
    city: initialData?.postalCode || '',
    province: initialData?.province || '',
    country: initialData?.country || '',
  });

  // Cada vez que cambie initialData, actualizamos el estado local
  useEffect(() => {
    setFormData({
      companyName: initialData?.companyName || '',
      nif: initialData?.nif || '',
      commercialName: initialData?.commercialName || '',
      vatIdentifier: initialData?.vatIdentifier || '',
      address: initialData?.address || '',
      postalCode: initialData?.postalCode || '',
      province: initialData?.province || '',
      city: initialData?.postalCode || '',
      country: initialData?.country || '',
    });
  }, [initialData]);

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
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', mb: 3 }}>
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
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
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
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            >
              <MenuItem value="">Seleccionar país</MenuItem>
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
          <TextField
              fullWidth
              label="población"
              variant="outlined"
              name="city"
              value={formData.city}
              onChange={handleChange}
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>

        </Grid>
        
      </form>
    </Card>
  );
};

export default FiscalDataForm;
