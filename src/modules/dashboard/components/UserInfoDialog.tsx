import React, { useState, useEffect } from 'react';
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
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

// Define la interfaz para formErrors
interface FormErrors {
  name?: string;
  email?: string;
  country?: string;
  city?: string;
  phone?: string;
  userType?: string;
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
  [key: string]: string | undefined;
}

// Define un tipo específico para los campos de dirección de envío
type ShippingAddressField = 'direction' | 'city' | 'province' | 'postalCode' | 'country';

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
    userType: string;  // "freelancer" o "company"
    phone: string;
    address: string;
    shippingAddress: string;
    postalCode: string;
    nie: string;
    commercialName: string;
    province: string;
    phone1: string;
    website: string;
    contactId?: string;
    userId: string;
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
  // Estado para manejar múltiples direcciones de envío
  const [shippingAddresses, setShippingAddresses] = useState<
    Array<{
      id: string;
      direction: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
    }>
  >(
    formData.shippingAddress
      ? [
          {
            id: "initial",
            direction: formData.shippingAddress,
            city: formData.shippingCity,
            province: formData.shippingProvince,
            postalCode: formData.shippingPostalCode,
            country: formData.shippingCountry,
          },
        ]
      : []
  );

  // Efecto para inicializar shippingAddresses cuando lleguen datos de formData
  useEffect(() => {
    if (
      formData.shippingAddress &&
      formData.shippingCity &&
      formData.shippingProvince &&
      formData.shippingPostalCode &&
      formData.shippingCountry &&
      shippingAddresses.length === 0
    ) {
      setShippingAddresses([
        {
          id: "initial",
          direction: formData.shippingAddress,
          city: formData.shippingCity,
          province: formData.shippingProvince,
          postalCode: formData.shippingPostalCode,
          country: formData.shippingCountry,
        },
      ]);
    }
  }, [
    formData.shippingAddress,
    formData.shippingCity,
    formData.shippingProvince,
    formData.shippingPostalCode,
    formData.shippingCountry,
    shippingAddresses.length,
  ]);

  // Sincroniza los cambios en shippingAddresses con formData usando handleChange
  useEffect(() => {
    if (shippingAddresses.length > 0) {
      const firstAddress = shippingAddresses[0];
      handleChange({ target: { name: "shippingAddress", value: firstAddress.direction } } as React.ChangeEvent<HTMLInputElement>);
      handleChange({ target: { name: "shippingCity", value: firstAddress.city } } as React.ChangeEvent<HTMLInputElement>);
      handleChange({ target: { name: "shippingProvince", value: firstAddress.province } } as React.ChangeEvent<HTMLInputElement>);
      handleChange({ target: { name: "shippingPostalCode", value: firstAddress.postalCode } } as React.ChangeEvent<HTMLInputElement>);
      handleChange({ target: { name: "shippingCountry", value: firstAddress.country } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [shippingAddresses, handleChange]);

  // Función para agregar una nueva dirección de envío
  const addShippingAddress = () => {
    setShippingAddresses([
      ...shippingAddresses,
      {
        id: new Date().getTime().toString(),
        direction: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
      },
    ]);
  };

  // Función para eliminar una dirección de envío
  const removeShippingAddress = (id: string) => {
    setShippingAddresses(shippingAddresses.filter((address) => address.id !== id));
  };

  // Función para manejar cambios en las direcciones de envío
  const handleShippingAddressChange = (
    id: string,
    field: ShippingAddressField,
    value: string
  ) => {
    setShippingAddresses((prev) =>
      prev.map((address) =>
        address.id === id ? { ...address, [field]: value } : address
      )
    );
  };

  // Función para renderizar campos específicos según el tipo de usuario
  const renderUserTypeFields = () => {
    if (formData.userType === 'freelancer') {
      // Campos adicionales para autónomo, si los hubiera
      return null;
    }

    if (formData.userType === 'company') {
      // Campos adicionales para empresa
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
              required={false}
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
              required={false}
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
                            // Funcionalidad para cambiar foto de perfil
                          }}
                        >
                          Cambiar Foto
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          fullWidth
                          onClick={() => {
                            // Funcionalidad para eliminar cuenta
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
                          required={false}
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
                          required={false}
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
                          required={false}
                        >
                          <MenuItem value="">Selecciona Tipo</MenuItem>
                          <MenuItem value="freelancer">Autónomo</MenuItem>
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
                          required={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Móvil"
                          name="phone1"
                          fullWidth
                          variant="outlined"
                          value={formData.phone1 || ''}
                          onChange={handleChange}
                          error={!!formErrors.phone1}
                          helperText={formErrors.phone1 || ''}
                          required={false}
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
                          required={false}
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
                          // Funcionalidad para cambiar contraseña
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
                      required={false}
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
                      required={false}
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
                      required={false}
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
                      required={false}
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
                      required={false}
                    >
                      <MenuItem value="">Selecciona Provincia</MenuItem>
                      <MenuItem value="provincia1">Provincia 1</MenuItem>
                      <MenuItem value="provincia2">Provincia 2</MenuItem>
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
                      required={false}
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
                      required={false}
                    >
                      <MenuItem value="">Selecciona País</MenuItem>
                      <MenuItem value="es">España</MenuItem>
                      <MenuItem value="fr">Francia</MenuItem>
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
                {shippingAddresses.map((address) => (
                  <Box key={address.id} sx={{ mb: 2, border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Dirección de Envío"
                          name="shippingAddress"
                          fullWidth
                          variant="outlined"
                          value={address.direction}
                          onChange={(e) => handleShippingAddressChange(address.id, 'direction', e.target.value)}
                          error={!!formErrors.shippingAddress}
                          helperText={formErrors.shippingAddress || ''}
                          required={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Ciudad de Envío"
                          name="shippingCity"
                          fullWidth
                          variant="outlined"
                          value={address.city}
                          onChange={(e) => handleShippingAddressChange(address.id, 'city', e.target.value)}
                          error={!!formErrors.shippingCity}
                          helperText={formErrors.shippingCity || ''}
                          required={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Provincia de Envío"
                          name="shippingProvince"
                          fullWidth
                          variant="outlined"
                          select
                          value={address.province}
                          onChange={(e) => handleShippingAddressChange(address.id, 'province', e.target.value)}
                          error={!!formErrors.shippingProvince}
                          helperText={formErrors.shippingProvince || ''}
                          required={false}
                        >
                          <MenuItem value="">Selecciona Provincia</MenuItem>
                          <MenuItem value="provincia1">Provincia 1</MenuItem>
                          <MenuItem value="provincia2">Provincia 2</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Código Postal de Envío"
                          name="shippingPostalCode"
                          fullWidth
                          variant="outlined"
                          value={address.postalCode}
                          onChange={(e) => handleShippingAddressChange(address.id, 'postalCode', e.target.value)}
                          error={!!formErrors.shippingPostalCode}
                          helperText={formErrors.shippingPostalCode || ''}
                          required={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="País de Envío"
                          name="shippingCountry"
                          fullWidth
                          variant="outlined"
                          select
                          value={address.country}
                          onChange={(e) => handleShippingAddressChange(address.id, 'country', e.target.value)}
                          error={!!formErrors.shippingCountry}
                          helperText={formErrors.shippingCountry || ''}
                          required={false}
                        >
                          <MenuItem value="">Selecciona País</MenuItem>
                          <MenuItem value="es">España</MenuItem>
                          <MenuItem value="fr">Francia</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                    {shippingAddresses.length > 1 && (
                    
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <IconButton color="error" onClick={() => removeShippingAddress(address.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={addShippingAddress}
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
