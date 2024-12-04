// src/components/UserInfoDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Divider,
  Avatar,
  MenuItem,
  CircularProgress,
} from "@mui/material";

// Define la interfaz para formErrors
interface FormErrors {
  name?: string;
  email?: string;
  country?: string;
  city?: string;
  phone?: string;
  userType?: string;
  skills?: string;
  experience?: string;
  companyName?: string;
  companySize?: string;
  nie?: string;
  commercialName?: string;
  province?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  shippingCity?: string;
  shippingAddress?: string;
  shippingProvince?: string;
  address?: string;
  postalCode?: string;
  website?: string;
  mobile?: string;
  [key: string]: string | undefined;
}

// Define las props para el componente
interface UserInfoDialogProps {
  open: boolean;
  handleClose: () => void;
  hasContact: boolean;
  loading: boolean; // Nueva prop para indicar carga
  formData: {
    name: string;
    email: string;
    country: string;
    city: string;
    userType: string;
    phone: string;
    address: string;
    shippingAddress: string;
    postalCode: string;
    nie: string;
    commercialName: string;
    province: string;
    mobile: string;
    website: string;
    contactId?: string; // Hacer opcional
    userId: string;
    skills: string;
    experience: string;
    companyName: string;
    companySize: string;
    shippingCity: string;
    shippingProvince: string;
    shippingPostalCode: string;
    shippingCountry: string;
  };
  formErrors: FormErrors;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
}

const UserInfoDialog: React.FC<UserInfoDialogProps> = ({
  open,
  handleClose,
  hasContact,
  loading,
  formData,
  formErrors,
  handleChange,
  handleFormSubmit,
}) => {
  // Función para renderizar campos específicos según el tipo de usuario
  const renderUserTypeFields = () => {
    if (formData.userType === 'freelancer') {
      return (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Habilidades"
              name="skills"
              fullWidth
              variant="outlined"
              value={formData.skills || ''}
              onChange={handleChange}
              error={!!formErrors.skills}
              helperText={formErrors.skills || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Experiencia"
              name="experience"
              fullWidth
              variant="outlined"
              value={formData.experience || ''}
              onChange={handleChange}
              error={!!formErrors.experience}
              helperText={formErrors.experience || ''}
            />
          </Grid>
        </>
      );
    }

    if (formData.userType === 'company') {
      return (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre de la Empresa"
              name="companyName"
              fullWidth
              variant="outlined"
              value={formData.companyName || ''}
              onChange={handleChange}
              error={!!formErrors.companyName}
              helperText={formErrors.companyName || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tamaño de la Empresa"
              name="companySize"
              fullWidth
              variant="outlined"
              select
              value={formData.companySize || ''}
              onChange={handleChange}
              error={!!formErrors.companySize}
              helperText={formErrors.companySize || ''}
            >
              <MenuItem value="">Selecciona Tamaño</MenuItem>
              <MenuItem value="1-10">1-10</MenuItem>
              <MenuItem value="11-50">11-50</MenuItem>
              <MenuItem value="51-200">51-200</MenuItem>
              <MenuItem value="201+">201+</MenuItem>
            </TextField>
          </Grid>
        </>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontWeight: "700", fontFamily: "Roboto, sans-serif" }}>
        {hasContact ? "Edita tu Información" : "Completa tu Información"}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          // Mostrar indicador de carga cuando loading es true
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : (
          // Mostrar contenido del formulario cuando loading es false
          <>
            <DialogContentText sx={{ fontWeight: "400", fontFamily: "Roboto, sans-serif" }}>
              {hasContact
                ? "Edita la descripción de tu información."
                : "Completa la descripción de tu información."}
            </DialogContentText>
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* Campos ocultos */}
              <TextField
                type="hidden"
                name="userId"
                value={formData.userId || ''}
              />
              {hasContact && (
                <TextField
                  type="hidden"
                  name="contactId"
                  value={formData.contactId || ''}
                />
              )}

              {/* Contenedor Principal */}
              <Grid container spacing={4}>
                {/* Sección 1: Perfil */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Perfil
                    </Typography>
                    <Grid container direction="column" spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar
                          sx={{ width: 100, height: 100 }}
                        >
                          {!formData.name ? 'NA' : formData.name.charAt(0).toUpperCase()}
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          {formData.name || "Nombre no disponible"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {formData.email || "Email no disponible"}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ width: '100%' }}>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 1 }}
                          onClick={() => {
                            // Implementar funcionalidad para cambiar foto de perfil
                            // Por ejemplo, abrir un diálogo para subir una nueva foto
                          }}
                        >
                          Cambiar Foto
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          fullWidth
                          onClick={() => {
                            // Implementar funcionalidad para eliminar cuenta
                            // Por ejemplo, confirmar acción y llamar a la API para eliminar
                          }}
                        >
                          Eliminar Cuenta
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                {/* Sección 2: Editar/Crear Perfil */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {hasContact ? "Editar Perfil" : "Crear Perfil"}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Nombre"
                          name="name"
                          fullWidth
                          variant="outlined"
                          value={formData.name || ''}
                          onChange={handleChange}
                          error={!!formErrors.name}
                          helperText={formErrors.name || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          name="email"
                          fullWidth
                          variant="outlined"
                          value={formData.email || ''}
                          onChange={handleChange}
                          error={!!formErrors.email}
                          helperText={formErrors.email || ''}
                        />
                      </Grid>

                      {/* Sección Tipo de Usuario */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Tipo de Usuario"
                          name="userType"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.userType || ''}
                          onChange={handleChange}
                          error={!!formErrors.userType}
                          helperText={formErrors.userType || ''}
                        >
                          <MenuItem value="">Selecciona Tipo</MenuItem>
                          <MenuItem value="freelancer">Freelancer</MenuItem>
                          <MenuItem value="company">Empresa</MenuItem>
                        </TextField>
                      </Grid>
                      {/* Fin de Sección Tipo de Usuario */}

                      {/* Campos Comunes */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Teléfono"
                          name="phone"
                          fullWidth
                          variant="outlined"
                          value={formData.phone || ''}
                          onChange={handleChange}
                          error={!!formErrors.phone}
                          helperText={formErrors.phone || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Móvil"
                          name="mobile"
                          fullWidth
                          variant="outlined"
                          value={formData.mobile || ''}
                          onChange={handleChange}
                          error={!!formErrors.mobile}
                          helperText={formErrors.mobile || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Sitio Web"
                          name="website"
                          fullWidth
                          variant="outlined"
                          value={formData.website || ''}
                          onChange={handleChange}
                          error={!!formErrors.website}
                          helperText={formErrors.website || ''}
                        />
                      </Grid>
                      {/* Fin de Campos Comunes */}

                      {/* Campos Específicos según Tipo de Usuario */}
                      {renderUserTypeFields()}
                      {/* Fin de Campos Específicos */}
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Button
                        type="submit"
                        sx={{
                          background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                          color: '#ffffff',
                          fontWeight: '500',
                          textTransform: 'none',
                          borderRadius: 2,
                          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                          minWidth: '120px',
                        }}
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : (hasContact ? "Actualizar" : "Guardar")}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                          // Implementar funcionalidad para cambiar contraseña
                          // Por ejemplo, abrir un diálogo para cambiar la contraseña
                        }}
                      >
                        Cambiar Contraseña
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Sección 3: Datos Fiscales */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Datos Fiscales
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="NIF"
                      name="nie"
                      fullWidth
                      variant="outlined"
                      value={formData.nie || ''}
                      onChange={handleChange}
                      error={!!formErrors.nie}
                      helperText={formErrors.nie || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nombre Comercial"
                      name="commercialName"
                      fullWidth
                      variant="outlined"
                      value={formData.commercialName || ''}
                      onChange={handleChange}
                      error={!!formErrors.commercialName}
                      helperText={formErrors.commercialName || ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, mt: 2 }}>
                      Dirección Fiscal
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Dirección Fiscal"
                      name="address"
                      fullWidth
                      variant="outlined"
                      value={formData.address || ''}
                      onChange={handleChange}
                      error={!!formErrors.address}
                      helperText={formErrors.address || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Ciudad"
                      name="city"
                      fullWidth
                      variant="outlined"
                      value={formData.city || ''}
                      onChange={handleChange}
                      error={!!formErrors.city}
                      helperText={formErrors.city || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Provincia"
                      name="province"
                      fullWidth
                      variant="outlined"
                      select
                      value={formData.province || ''}
                      onChange={handleChange}
                      error={!!formErrors.province}
                      helperText={formErrors.province || ''}
                    >
                      <MenuItem value="">Selecciona Provincia</MenuItem>
                      <MenuItem value="provincia1">Provincia 1</MenuItem>
                      <MenuItem value="provincia2">Provincia 2</MenuItem>
                      {/* Añade más opciones según sea necesario */}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Código Postal"
                      name="postalCode"
                      fullWidth
                      variant="outlined"
                      value={formData.postalCode || ''}
                      onChange={handleChange}
                      error={!!formErrors.postalCode}
                      helperText={formErrors.postalCode || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="País"
                      name="country"
                      fullWidth
                      variant="outlined"
                      select
                      value={formData.country || ''}
                      onChange={handleChange}
                      error={!!formErrors.country}
                      helperText={formErrors.country || ''}
                    >
                      <MenuItem value="">Selecciona País</MenuItem>
                      <MenuItem value="es">España</MenuItem>
                      <MenuItem value="fr">Francia</MenuItem>
                      {/* Añade más opciones según sea necesario */}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Sección 4: Dirección de Envío */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Dirección de Envío
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Dirección de Envío"
                      name="shippingAddress"
                      fullWidth
                      variant="outlined"
                      value={formData.shippingAddress || ''}
                      onChange={handleChange}
                      error={!!formErrors.shippingAddress}
                      helperText={formErrors.shippingAddress || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Ciudad de Envío"
                      name="shippingCity"
                      fullWidth
                      variant="outlined"
                      value={formData.shippingCity || ''}
                      onChange={handleChange}
                      error={!!formErrors.shippingCity}
                      helperText={formErrors.shippingCity || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Provincia de Envío"
                      name="shippingProvince"
                      fullWidth
                      variant="outlined"
                      select
                      value={formData.shippingProvince || ''}
                      onChange={handleChange}
                      error={!!formErrors.shippingProvince}
                      helperText={formErrors.shippingProvince || ''}
                    >
                      <MenuItem value="">Selecciona Provincia</MenuItem>
                      <MenuItem value="provincia1">Provincia 1</MenuItem>
                      <MenuItem value="provincia2">Provincia 2</MenuItem>
                      {/* Añade más opciones según sea necesario */}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Código Postal de Envío"
                      name="shippingPostalCode"
                      fullWidth
                      variant="outlined"
                      value={formData.shippingPostalCode || ''}
                      onChange={handleChange}
                      error={!!formErrors.shippingPostalCode}
                      helperText={formErrors.shippingPostalCode || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="País de Envío"
                      name="shippingCountry"
                      fullWidth
                      variant="outlined"
                      select
                      value={formData.shippingCountry || ''}
                      onChange={handleChange}
                      error={!!formErrors.shippingCountry}
                      helperText={formErrors.shippingCountry || ''}
                    >
                      <MenuItem value="">Selecciona País</MenuItem>
                      <MenuItem value="es">España</MenuItem>
                      <MenuItem value="fr">Francia</MenuItem>
                      {/* Añade más opciones según sea necesario */}
                    </TextField>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      // Implementar funcionalidad para añadir una dirección de envío adicional
                      // Por ejemplo, abrir otro formulario o añadir campos dinámicamente
                    }}
                  >
                    Añadir Dirección de Envío
                  </Button>
                </Box>
              </Box>

              {/* Botones de Acción */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  onClick={handleClose}
                  sx={{
                    color: "#2666CF",
                    fontWeight: "500",
                    textTransform: "none",
                    bgcolor: "#ffffff",
                    border: "1px solid #2666CF",
                    borderRadius: 2,
                  }}
                >
                  Completar Después
                </Button>
                <Button
                  type="submit"
                  sx={{
                    background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                    color: '#ffffff',
                    fontWeight: '500',
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    minWidth: '120px',
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (hasContact ? "Actualizar" : "Guardar")}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoDialog;
