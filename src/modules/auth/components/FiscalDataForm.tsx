// FiscalDataForm.tsx
import React, { useState, useEffect } from 'react';
import { Card, Typography, Grid, TextField, MenuItem } from '@mui/material';

interface FiscalDataFormProps {
  onSave: (data: any) => void;
  /**
   * Función que se llama cada vez que se modifica un campo.
   */
  onChange?: (fieldName: string, value: string) => void;
  initialData?: {
    companyName: string;
    nif: string;
    commercialName: string;
    vatIdentification: string;
    address: string;
    postalCode: string;
    province: string;
    country: string;
  };
  // Nuevo: valor de contactProfile y el nombre normal
  contactProfile?: number;
  name?: string;
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

const FiscalDataForm: React.FC<FiscalDataFormProps> = ({
  onSave,
  onChange,
  initialData,
  contactProfile,
  name,
}) => {
  // Estado local para el formulario fiscal
  const [formData, setFormData] = useState({
    // Si contactProfile es 2 se usa companyName, sino se usa el nombre normal (name)
    companyName: contactProfile === 2 ? (initialData?.companyName || '') : (name || ''),
    nif: initialData?.nif || '',
    commercialName: initialData?.commercialName || '',
    vatIdentification: initialData?.vatIdentification || '',
    address: initialData?.address || '',
    postalCode: initialData?.postalCode || '',
    province: initialData?.province || '',
    country: initialData?.country || '',
    // Puedes incluir otros campos si fuese necesario
  });

  // Cada vez que cambie initialData o contactProfile, actualizamos el estado local
  useEffect(() => {
    setFormData({
      companyName: contactProfile === 2 ? (initialData?.companyName || '') : (name || ''),
      nif: initialData?.nif || '',
      commercialName: initialData?.commercialName || '',
      vatIdentification: initialData?.vatIdentification || '',
      address: initialData?.address || '',
      postalCode: initialData?.postalCode || '',
      province: initialData?.province || '',
      country: initialData?.country || '',
    });
  }, [initialData, contactProfile, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Se eleva el cambio al componente padre
    if (onChange) {
      onChange(name, value);
    }
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
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: '#1A1A40', fontWeight: '600', mb: 3 }}
      >
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
              // Aquí se decide qué valor mostrar según contactProfile
              value={formData.companyName}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          {/* Resto de los campos */}
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
              value={formData.vatIdentification}
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
              label="Población"
              variant="outlined"
              name="city"
              value={formData.postalCode}  // Nota: revisa si este campo corresponde a "población" o es un error
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
