// src/modules/auth/components/PreferencesForm.tsx
import React, { useState } from 'react';
import {
  Card,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';

interface PreferencesFormProps {
  onSave: (data: PreferencesData) => void;
}

export interface PreferencesData {
  currency: string;
  numberFormat: string;
  decimals: number;
  timezone: string;
  language: string;
  dateFormat: string;
  corporateColor: string;
}

const currencies = [
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'USD', label: 'Dólar (USD)' },
  { value: 'GBP', label: 'Libra (GBP)' },
  // Añade más monedas según sea necesario
];

const numberFormats = [
  { value: '1,593.50', label: '1,593.50' },
  { value: '1.593,50', label: '1.593,50' },
];

const decimalOptions = [
  { value: 0, label: '0 (1500)' },
  { value: 1, label: '1 (1500.1)' },
  { value: 2, label: '2 (1500.15)' },
];

const timezones = [
  { value: 'Europe/Madrid', label: 'Europe/Madrid' },
  { value: 'America/New_York', label: 'America/New_York' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
  // Añade más zonas horarias según sea necesario
];

const languages = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'Inglés' },
  { value: 'fr', label: 'Francés' },
  // Añade más idiomas según sea necesario
];

const dateFormats = [
  { value: 'dd/mm/yyyy', label: 'dd/mm/yyyy' },
  { value: 'mm/dd/yyyy', label: 'mm/dd/yyyy' },
  { value: 'yyyy-mm-dd', label: 'yyyy-mm-dd' },
];

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<PreferencesData>({
    currency: 'EUR',
    numberFormat: '1,593.50',
    decimals: 2,
    timezone: 'Europe/Madrid',
    language: 'es',
    dateFormat: 'dd/mm/yyyy',
    corporateColor: '#f24141',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'decimals'
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card
      sx={{
        bgcolor: '#FFFFFF',
        p: 4,
        borderRadius: 3,
        boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
        mb: 4,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: 500, mb: 3 }}>
        Preferencias
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Moneda */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Moneda"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Formato numérico */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Formato numérico"
              name="numberFormat"
              value={formData.numberFormat}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {numberFormats.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Decimales */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Decimales"
              name="decimals"
              value={formData.decimals}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {decimalOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Zona horaria */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Zona horaria"
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {timezones.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Idioma */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Idioma"
              name="language"
              value={formData.language}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Formato de fecha */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Formato de fecha"
              name="dateFormat"
              value={formData.dateFormat}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {dateFormats.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Color corporativo */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="color"
              label="Color corporativo"
              name="corporateColor"
              value={formData.corporateColor}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: '56px',
                  padding: 0,
                },
              }}
            />
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
          fullWidth
        >
          Guardar Cambios
        </Button>
      </form>
    </Card>
  );
};

export default PreferencesForm;
