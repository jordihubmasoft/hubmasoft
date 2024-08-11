import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  TextField, 
  Divider, 
  Card, 
  CardContent, 
  Avatar, 
  Grid, 
  Tabs, 
  Tab,
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#E5E5E5' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        <Box
          component="nav"
          sx={{
            width: isMenuOpen ? '240px' : '70px',
            flexShrink: 0,
            bgcolor: '#1A1A40',
            borderRight: 'none',
            overflow: 'hidden',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1201,
            position: 'fixed',
            height: '100%',
            transition: 'width 0.3s ease',
          }}
        >
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            transition: 'margin-left 0.3s ease',
            marginLeft: isMenuOpen ? '240px' : '70px',
            bgcolor: '#F9FAFC',
            borderRadius: 3,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: 'bold' }}>
              Configuración de Perfil
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
              {/* Sección de Perfil */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <Card sx={{ textAlign: 'center', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Avatar
                        sx={{ bgcolor: '#1A1A40', width: 100, height: 100, fontSize: 50, mx: 'auto', marginBottom: 2 }}
                      >
                        J
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: '600' }}>Juan Pérez</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>juan.perez@empresa.com</Typography>
                    </Box>
                    <Box>
                      <Button variant="outlined" fullWidth sx={{ padding: '10px 20px', marginBottom: 2 }}>Cambiar Foto</Button>
                      <Button variant="text" color="error" fullWidth>Eliminar Cuenta</Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>

              {/* Sección de Editar Perfil */}
              <Grid item xs={12} md={8}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <Card sx={{ padding: '20px', flex: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500' }}>
                      Editar Perfil
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          variant="outlined"
                          sx={{ marginBottom: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Apellidos"
                          variant="outlined"
                          sx={{ marginBottom: 2 }}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      variant="outlined"
                      sx={{ marginBottom: 3 }}
                    />
                    <Button variant="contained" sx={{ width: '100%', padding: '12px 0' }}>Guardar Cambios</Button>
                    <Button variant="text" sx={{ width: '100%', marginTop: 2 }}>Cambiar Contraseña</Button>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Sección: Configuración */}
            <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500' }}>
              Configuración
            </Typography>
            <Card>
              <CardContent>
                <Tabs value={value} onChange={handleChange} aria-label="configuración tabs">
                  <Tab label="Cuenta" {...a11yProps(0)} />
                  <Tab label="Email" {...a11yProps(1)} />
                  <Tab label="Facturación" {...a11yProps(2)} />
                  <Tab label="Preferencias" {...a11yProps(3)} />
                  <Tab label="Plantillas de Documentos" {...a11yProps(4)} />
                  <Tab label="Formas de Pago" {...a11yProps(5)} />
                  <Tab label="Impuestos" {...a11yProps(6)} />
                  <Tab label="Certificado Electrónico" {...a11yProps(7)} />
                  <Tab label="Suscripción" {...a11yProps(8)} />
                  <Tab label="Calendario" {...a11yProps(9)} />
                  <Tab label="Contactos Recomendados" {...a11yProps(10)} />
                  <Tab label="Importar" {...a11yProps(11)} />
                  <Tab label="Votar Mejoras" {...a11yProps(12)} />
                  <Tab label="Añadir Cuenta" {...a11yProps(13)} />
                  <Tab label="Cerrar Sesión" {...a11yProps(14)} sx={{ color: 'red' }} />
                </Tabs>

                {/* Ejemplo de Contenidos para Cada Pestaña */}
                <Box sx={{ p: 3 }}>
                  {value === 0 && (
                    <Typography variant="body1">
                      Información sobre la cuenta, incluyendo historial de cambios, seguridad, etc.
                    </Typography>
                  )}
                  {value === 1 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Envío de emails</Typography>
                      <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                        Escoge y configura el método de envío según tu proveedor de servicios de email.
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Sistema de envío" variant="outlined" select defaultValue="Enviar desde Holded">
                            <option value="Enviar desde Holded">Enviar desde Holded</option>
                            <option value="Otro">Otro</option>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button variant="outlined" sx={{ width: '100%' }}>Historial</Button>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Nombre del email" variant="outlined" defaultValue="Fermaplastics" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Responder a" variant="outlined" defaultValue="info@fermaplastics.com" />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Enviar desde" variant="outlined" defaultValue="info@fermaplastics.com" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="CC" variant="outlined" defaultValue="" />
                        </Grid>
                      </Grid>
                      <TextField fullWidth label="BCC - Correos en copia no visibles" variant="outlined" defaultValue="" sx={{ mt: 2 }} />
                    </Box>
                  )}
                  {value === 2 && (
                    <Typography variant="body1">
                      Configuración de facturación, métodos de pago, historial de pagos, etc.
                    </Typography>
                  )}
                  {value === 3 && (
                    <Typography variant="body1">
                      Preferencias del usuario, como idioma, formato de fecha, notificaciones, etc.
                    </Typography>
                  )}
                  {/* Añadir más ejemplos según las pestañas */}
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
