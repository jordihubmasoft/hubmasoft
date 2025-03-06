import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  IconButton
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TuneIcon from '@mui/icons-material/Tune';

export interface InstalacionFormProps {
  formData: {
    nombre: string;
    email: string;
    telefono: string;
    movil: string;
    direccion: string;
    poblacion: string;
    codigoPostal: string;
    provincia: string;
    pais: string;
    nombreGerente: string;
    emailGerente: string;
    telefonoGerente: string;
    movilGerente: string;
    icono: string;
    color: string;
    cuentaContable: string;
    esAlmacenPrincipal: boolean;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InstalacionForm: React.FC<InstalacionFormProps> = ({ formData, handleChange }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 900,
        mx: 'auto',
        my: 3,
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: '#fff'
      }}
    >
      {/* Título principal */}
      

      {/* Fila 1: Almacén / Gerencia */}
      <Grid container spacing={4} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <StoreIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Almacén
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="nombre"
                placeholder="Ej: Almacén Central"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                placeholder="Ej: almacen@empresa.com"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Teléfono"
                name="telefono"
                placeholder="Ej: 912345678"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Móvil"
                name="movil"
                placeholder="Ej: 600123456"
                value={formData.movil}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <ManageAccountsIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Gerencia
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre gerente"
                name="nombreGerente"
                placeholder="Ej: Carlos García"
                value={formData.nombreGerente}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email gerente"
                name="emailGerente"
                placeholder="Ej: cgarcia@empresa.com"
                value={formData.emailGerente}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Teléfono gerente"
                name="telefonoGerente"
                placeholder="Ej: 917654321"
                value={formData.telefonoGerente}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Móvil gerente"
                name="movilGerente"
                placeholder="Ej: 688112233"
                value={formData.movilGerente}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Fila 2: Dirección / Opciones */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <LocationOnIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Dirección
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Dirección"
                name="direccion"
                placeholder="Ej: Calle Falsa 123"
                value={formData.direccion}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Población"
                name="poblacion"
                placeholder="Ej: Madrid"
                value={formData.poblacion}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Código postal"
                name="codigoPostal"
                placeholder="Ej: 28080"
                value={formData.codigoPostal}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Provincia"
                name="provincia"
                placeholder="Ej: Madrid"
                value={formData.provincia}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="País"
                name="pais"
                placeholder="Ej: España"
                value={formData.pais}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <TuneIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Opciones adicionales
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Icono"
                name="icono"
                placeholder="Ej: fas fa-warehouse"
                value={formData.icono}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color"
                name="color"
                type="color"
                value={formData.color}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                inputProps={{
                  style: {
                    height: '40px',
                    padding: 0,
                    cursor: 'pointer'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cuenta contable"
                name="cuentaContable"
                placeholder="Selecciona la cuenta"
                value={formData.cuentaContable}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.esAlmacenPrincipal}
                  onChange={handleChange}
                  name="esAlmacenPrincipal"
                  color="primary"
                />
              }
              label="Marcar como almacén principal"
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              No puedes eliminar el almacén principal
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstalacionForm;
