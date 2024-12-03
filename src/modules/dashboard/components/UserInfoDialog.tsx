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
  CircularProgress, // Importa CircularProgress
} from "@mui/material";
import { useTranslation } from "../../../hooks/useTranslations";
import { FiShoppingCart, FiDollarSign, FiBarChart2, FiTrendingUp, FiFileText, FiCalendar, FiRefreshCcw, FiUser } from "react-icons/fi";

// Define la interfaz para los errores del formulario
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
  nif?: string;
  commercialName?: string;
  province?: string;
  [key: string]: string | undefined;
}

// Define las props que recibirá el componente
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
    postalCode: string;
    nif: string;
    commercialName: string;
    province: string;
    mobile: string;
    website: string;
    contactId: string;
    userId: string;
    skills: string;
    experience: string;
    companyName: string;
    companySize: string;
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
  loading, // Desestructura la prop loading
  formData,
  formErrors,
  handleChange,
  handleFormSubmit,
}) => {
  const { t } = useTranslation();

  // Depuración: Imprime formData para verificar su estructura
  React.useEffect(() => {
    console.log("formData recibido en UserInfoDialog:", formData);
  }, [formData]);

  // Maneja la posible estructura de formData (array o objeto)


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontWeight: "700", fontFamily: "Roboto, sans-serif" }}>
        {hasContact ? t("dashboard.editYourInfo") : t("dashboard.completeYourInfo")}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          // Muestra el indicador de carga mientras loading es true
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
          // Muestra el contenido del formulario cuando loading es false
          <>
            <DialogContentText sx={{ fontWeight: "400", fontFamily: "Roboto, sans-serif" }}>
              {hasContact
                ? t("dashboard.editInfoDescription")
                : t("dashboard.completeInfoDescription")}
            </DialogContentText>
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {hasContact ? (
                // Renderizar formulario de edición
                <>
                  {/* Campos ocultos para userId y contactId */}
                  <TextField
                    type="hidden"
                    name="userId"
                    value={formData.userId || ''}
                  />
                  <TextField
                    type="hidden"
                    name="contactId"
                    value={formData.contactId || ''}
                  />

                  {/* Contenedor principal para Perfil y Editar perfil */}
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
                              {formData.name || 'Nombre no disponible'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {formData.email || 'Email no disponible'}
                            </Typography>
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Button
                              variant="outlined"
                              fullWidth
                              sx={{ mb: 1 }}
                              onClick={() => {/* Funcionalidad para cambiar foto */}}
                            >
                              Cambiar foto
                            </Button>
                            <Button
                              variant="text"
                              color="error"
                              fullWidth
                              onClick={() => {/* Funcionalidad para eliminar cuenta */}}
                            >
                              Eliminar cuenta
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>

                    {/* Sección 2: Editar perfil */}
                    <Grid item xs={12} md={8}>
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Editar perfil
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label={t('dashboard.name')}
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
                              label={t('dashboard.email')}
                              name="email"
                              fullWidth
                              variant="outlined"
                              value={formData.email || ''}
                              onChange={handleChange}
                              error={!!formErrors.email}
                              helperText={formErrors.email || ''}
                            />
                          </Grid>

                          {/* Sección: Tipo de usuario */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label={t('dashboard.userType')}
                              name="userType"
                              fullWidth
                              variant="outlined"
                              select
                              value={formData.userType || ''}
                              onChange={handleChange}
                              error={!!formErrors.userType}
                              helperText={formErrors.userType || ''}
                            >
                              <MenuItem value="">Seleccionar tipo</MenuItem>
                              <MenuItem value="freelancer">Freelancer</MenuItem>
                              <MenuItem value="company">Empresa</MenuItem>
                            </TextField>
                          </Grid>
                          {/* Fin de la sección: Tipo de usuario */}

                          {/* Campos comunes */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label={t('dashboard.phone')}
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
                              label={t('dashboard.mobile')}
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
                              label={t('dashboard.website')}
                              name="website"
                              fullWidth
                              variant="outlined"
                              value={formData.website || ''}
                              onChange={handleChange}
                              error={!!formErrors.website}
                              helperText={formErrors.website || ''}
                            />
                          </Grid>

                          {/* Campos específicos para Freelancer */}
                          {formData.userType === 'freelancer' && (
                            <>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={t('dashboard.skills')}
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
                                  label={t('dashboard.experience')}
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
                          )}

                          {/* Campos específicos para Empresa */}
                          {formData.userType === 'company' && (
                            <>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={t('dashboard.companyName')}
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
                                  label={t('dashboard.companySize')}
                                  name="companySize"
                                  fullWidth
                                  variant="outlined"
                                  select
                                  value={formData.companySize || ''}
                                  onChange={handleChange}
                                  error={!!formErrors.companySize}
                                  helperText={formErrors.companySize || ''}
                                >
                                  <MenuItem value="">Seleccionar tamaño</MenuItem>
                                  <MenuItem value="1-10">1-10 empleados</MenuItem>
                                  <MenuItem value="11-50">11-50 empleados</MenuItem>
                                  <MenuItem value="51-200">51-200 empleados</MenuItem>
                                  <MenuItem value="201+">201+ empleados</MenuItem>
                                </TextField>
                              </Grid>
                            </>
                          )}
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
                          >
                            Guardar cambios
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                          >
                            Cambiar contraseña
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 4 }} />

                  {/* Sección 3: Datos fiscales */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Datos fiscales
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.nif')}
                          name="nif"
                          fullWidth
                          variant="outlined"
                          value={formData.nif || ''}
                          onChange={handleChange}
                          error={!!formErrors.nif}
                          helperText={formErrors.nif || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.commercialName')}
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
                          Dirección fiscal:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.fiscalAddress')}
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
                          label={t('dashboard.city')}
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
                          label={t('dashboard.province')}
                          name="province"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.province || ''}
                          onChange={handleChange}
                          error={!!formErrors.province}
                          helperText={formErrors.province || ''}
                        >
                          <MenuItem value="">Seleccionar provincia</MenuItem>
                          <MenuItem value="provincia1">Provincia 1</MenuItem>
                          <MenuItem value="provincia2">Provincia 2</MenuItem>
                          {/* Añade más opciones según sea necesario */}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.postalCode')}
                          name="postalCode"
                          fullWidth
                          variant="outlined"
                          value={formData.postalCode || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.country')}
                          name="country"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.country || ''}
                          onChange={handleChange}
                          error={!!formErrors.country}
                          helperText={formErrors.country || ''}
                        >
                          <MenuItem value="">Seleccionar país</MenuItem>
                          <MenuItem value="es">España</MenuItem>
                          <MenuItem value="fr">Francia</MenuItem>
                          {/* Añade más opciones según sea necesario */}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Sección 4: Datos de contacto */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Datos de contacto
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.phone')}
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
                          label={t('dashboard.email')}
                          name="email"
                          fullWidth
                          variant="outlined"
                          value={formData.email || ''}
                          onChange={handleChange}
                          error={!!formErrors.email}
                          helperText={formErrors.email || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.mobile')}
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
                          label={t('dashboard.website')}
                          name="website"
                          fullWidth
                          variant="outlined"
                          value={formData.website || ''}
                          onChange={handleChange}
                          error={!!formErrors.website}
                          helperText={formErrors.website || ''}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Sección 5: Dirección de envío */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Dirección de envío
                    </Typography>
                    <Grid container spacing={2}>
                      {/* Reutilizamos los mismos campos para Dirección de envío */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.fiscalAddress')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingAddress"
                          fullWidth
                          variant="outlined"
                          value={formData.address || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.city')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingCity"
                          fullWidth
                          variant="outlined"
                          value={formData.city || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.province')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingProvince"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.province || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        >
                          <MenuItem value="">Seleccionar provincia</MenuItem>
                          <MenuItem value="provincia1">Provincia 1</MenuItem>
                          <MenuItem value="provincia2">Provincia 2</MenuItem>
                          {/* Añade más opciones según sea necesario */}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.postalCode')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingPostalCode"
                          fullWidth
                          variant="outlined"
                          value={formData.postalCode || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.country')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingCountry"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.country || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        >
                          <MenuItem value="">Seleccionar país</MenuItem>
                          <MenuItem value="es">España</MenuItem>
                          <MenuItem value="fr">Francia</MenuItem>
                          {/* Añade más opciones según sea necesario */}
                        </TextField>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        onClick={() => {/* Funcionalidad para añadir dirección de envío */}}
                      >
                        Añadir dirección de envío
                      </Button>
                    </Box>
                  </Box>

                  {/* Botones de acciones del diálogo */}
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
                      {t("dashboard.fillOutLater")}
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
                    >
                      {t("dashboard.save")}
                    </Button>
                  </Box>
                </>
              ) : (
                // Renderizar formulario para crear nuevo contacto
                <>
                  {/* Campos ocultos para userId */}
                  <TextField
                    type="hidden"
                    name="userId"
                    value={formData.userId}
                  />

                  {/* Contenedor principal para Perfil y Crear perfil */}
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
                              {formData.name || 'Nombre no disponible'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {formData.email || 'Email no disponible'}
                            </Typography>
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Button
                              variant="outlined"
                              fullWidth
                              sx={{ mb: 1 }}
                              onClick={() => {/* Funcionalidad para cambiar foto */}}
                            >
                              Cambiar foto
                            </Button>
                            <Button
                              variant="text"
                              color="error"
                              fullWidth
                              onClick={() => {/* Funcionalidad para eliminar cuenta */}}
                            >
                              Eliminar cuenta
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>

                    {/* Sección 2: Crear perfil */}
                    <Grid item xs={12} md={8}>
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Crear perfil
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label={t('dashboard.name')}
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
                              label={t('dashboard.email')}
                              name="email"
                              fullWidth
                              variant="outlined"
                              value={formData.email || ''}
                              onChange={handleChange}
                              error={!!formErrors.email}
                              helperText={formErrors.email || ''}
                            />
                          </Grid>

                          {/* Sección: Tipo de usuario */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label={t('dashboard.userType')}
                              name="userType"
                              fullWidth
                              variant="outlined"
                              select
                              value={formData.userType || ''}
                              onChange={handleChange}
                              error={!!formErrors.userType}
                              helperText={formErrors.userType || ''}
                            >
                              <MenuItem value="">Seleccionar tipo</MenuItem>
                              <MenuItem value="freelancer">Freelancer</MenuItem>
                              <MenuItem value="company">Empresa</MenuItem>
                            </TextField>
                          </Grid>
                          {/* Fin de la sección: Tipo de usuario */}

                          {/* Campos comunes */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label={t('dashboard.phone')}
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
                              label={t('dashboard.mobile')}
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
                              label={t('dashboard.website')}
                              name="website"
                              fullWidth
                              variant="outlined"
                              value={formData.website || ''}
                              onChange={handleChange}
                              error={!!formErrors.website}
                              helperText={formErrors.website || ''}
                            />
                          </Grid>

                          {/* Campos específicos para Freelancer */}
                          {formData.userType === 'freelancer' && (
                            <>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={t('dashboard.skills')}
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
                                  label={t('dashboard.experience')}
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
                          )}

                          {/* Campos específicos para Empresa */}
                          {formData.userType === 'company' && (
                            <>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={t('dashboard.companyName')}
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
                                  label={t('dashboard.companySize')}
                                  name="companySize"
                                  fullWidth
                                  variant="outlined"
                                  select
                                  value={formData.companySize || ''}
                                  onChange={handleChange}
                                  error={!!formErrors.companySize}
                                  helperText={formErrors.companySize || ''}
                                >
                                  <MenuItem value="">Seleccionar tamaño</MenuItem>
                                  <MenuItem value="1-10">1-10 empleados</MenuItem>
                                  <MenuItem value="11-50">11-50 empleados</MenuItem>
                                  <MenuItem value="51-200">51-200 empleados</MenuItem>
                                  <MenuItem value="201+">201+ empleados</MenuItem>
                                </TextField>
                              </Grid>
                            </>
                          )}
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
                          >
                            Guardar cambios
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                          >
                            Cambiar contraseña
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 4 }} />

                  {/* Sección 3: Datos fiscales */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Datos fiscales
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.nif')}
                          name="nif"
                          fullWidth
                          variant="outlined"
                          value={formData.nif || ''}
                          onChange={handleChange}
                          error={!!formErrors.nif}
                          helperText={formErrors.nif || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.commercialName')}
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
                          Dirección fiscal:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.fiscalAddress')}
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
                          label={t('dashboard.city')}
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
                          label={t('dashboard.province')}
                          name="province"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.province || ''}
                          onChange={handleChange}
                          error={!!formErrors.province}
                          helperText={formErrors.province || ''}
                        >
                          <MenuItem value="">Seleccionar provincia</MenuItem>
                          <MenuItem value="provincia1">Provincia 1</MenuItem>
                          <MenuItem value="provincia2">Provincia 2</MenuItem>
                          {/* Añade más opciones según sea necesario */}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.postalCode')}
                          name="postalCode"
                          fullWidth
                          variant="outlined"
                          value={formData.postalCode || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.country')}
                          name="country"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.country || ''}
                          onChange={handleChange}
                          error={!!formErrors.country}
                          helperText={formErrors.country || ''}
                        >
                          <MenuItem value="">Seleccionar país</MenuItem>
                          <MenuItem value="es">España</MenuItem>
                          <MenuItem value="fr">Francia</MenuItem>
                          {/* Añade más opciones según sea necesario */}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Sección 4: Datos de contacto */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Datos de contacto
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.phone')}
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
                          label={t('dashboard.email')}
                          name="email"
                          fullWidth
                          variant="outlined"
                          value={formData.email || ''}
                          onChange={handleChange}
                          error={!!formErrors.email}
                          helperText={formErrors.email || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.mobile')}
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
                          label={t('dashboard.website')}
                          name="website"
                          fullWidth
                          variant="outlined"
                          value={formData.website || ''}
                          onChange={handleChange}
                          error={!!formErrors.website}
                          helperText={formErrors.website || ''}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Sección 5: Dirección de envío */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Dirección de envío
                    </Typography>
                    <Grid container spacing={2}>
                      {/* Reutilizamos los mismos campos para Dirección de envío */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.fiscalAddress')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingAddress"
                          fullWidth
                          variant="outlined"
                          value={formData.address || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label={t('dashboard.city')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingCity"
                          fullWidth
                          variant="outlined"
                          value={formData.city || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.province')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingProvince"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.province || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        >
                          <MenuItem value="">Seleccionar provincia</MenuItem>
                          <MenuItem value="provincia1">Provincia 1</MenuItem>
                          <MenuItem value="provincia2">Provincia 2</MenuItem>
                          {/* Añade más opciones según sea necesario */}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.postalCode')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingPostalCode"
                          fullWidth
                          variant="outlined"
                          value={formData.postalCode || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={t('dashboard.country')} // Puedes cambiar la etiqueta si es necesario
                          name="shippingCountry"
                          fullWidth
                          variant="outlined"
                          select
                          value={formData.country || ''}
                          onChange={handleChange}
                          // No agregar error y helperText para evitar duplicaciones
                        >
                          <MenuItem value="">Seleccionar país</MenuItem>
                          <MenuItem value="es">España</MenuItem>
                          <MenuItem value="fr">Francia</MenuItem>
                          {/* Añade más opciones según sea necesario */}
                        </TextField>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        onClick={() => {/* Funcionalidad para añadir dirección de envío */}}
                      >
                        Añadir dirección de envío
                      </Button>
                    </Box>
                  </Box>

                  {/* Botones de acciones del diálogo */}
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
                      {t("dashboard.fillOutLater")}
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
                    >
                      {t("dashboard.save")}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoDialog;
