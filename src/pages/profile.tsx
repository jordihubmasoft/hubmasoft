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
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const { user, logout } = useAuth(); // Usa el hook useAuth para acceder al usuario y la función de cerrar sesión
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
            overflow: 'auto',
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
                  transition={{ duration: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      padding: '30px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: 5,
                      boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                      background: 'linear-gradient(145deg, #f0f0f0, #cacaca)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Box>
                    <Avatar
                      sx={{
                        bgcolor: '#1A1A40',
                        width: 100,
                        height: 100,
                        fontSize: 50,
                        mx: 'auto',
                        marginBottom: 2,
                        // Remueve la transformación que puede causar el efecto de borrosidad
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          // Ajusta el hover para que no use transform si eso causa el blur
                          transform: 'scale(1.05)', // Ajusta el escalado a un valor menor si es necesario
                        },
                      }}
                    >
                      {user?.name?.charAt(0)}
                    </Avatar>

                      <Typography variant="h6" sx={{ fontWeight: '600' }}>
                        {user?.name || "Nombre no disponible"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                        {user?.email || "Email no disponible"}
                      </Typography>
                    </Box>
                    <Box>
                      <Button variant="outlined" fullWidth sx={{ padding: '10px 20px', marginBottom: 2, borderRadius: 3 }}>
                        Cambiar Foto
                      </Button>
                      <Button
                        variant="text"
                        color="error"
                        fullWidth
                        onClick={logout}
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: '#ff4d4f',
                          },
                        }}
                      >
                        Eliminar Cuenta
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>

              {/* Sección de Editar Perfil */}
              <Grid item xs={12} md={8}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <Card
                    sx={{
                      padding: '30px',
                      flex: 1,
                      borderRadius: 5,
                      // Elimina el boxShadow gris y cambia el background por un color blanco puro
                      boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                      background: '#FFFFFF', // Cambia el fondo a blanco puro
                      // Remueve el backdropFilter para evitar el efecto borroso
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                    }}
                  >
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
                          defaultValue={user?.name || ""}
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
                      defaultValue={user?.email || ""}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        width: '100%',
                        padding: '12px 0',
                        backgroundColor: '#1A1A40',
                        '&:hover': {
                          backgroundColor: '#333366',
                        },
                      }}
                    >
                      Guardar Cambios
                    </Button>
                    <Button
                      variant="text"
                      sx={{
                        width: '100%',
                        marginTop: 2,
                        color: '#1A1A40',
                        '&:hover': {
                          color: '#333366',
                        },
                      }}
                    >
                      Cambiar Contraseña
                    </Button>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Sección: Configuración */}
            <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500' }}>
              Configuración
            </Typography>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                background: 'linear-gradient(145deg, #f0f0f0, #cacaca)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="configuración tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    '& .MuiTabs-flexContainer': {
                      justifyContent: 'space-between',
                    },
                  }}
                >
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
                  <Tab label="Cerrar Sesión" {...a11yProps(14)} sx={{ color: 'red' }} onClick={logout} />
                </Tabs>

                {/* Ejemplo de Contenidos para Cada Pestaña */}
                <Box sx={{ p: 3, maxHeight: '400px', overflow: 'auto' }}>
                  {value === 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Información de la Cuenta</Typography>
                      <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                        Aquí puedes ver y actualizar la información de tu cuenta.
                      </Typography>
                      <TextField fullWidth label="Nombre de Usuario" variant="outlined" defaultValue={user?.name || "Usuario"} sx={{ mb: 2 }} />
                      <TextField fullWidth label="Rol de Usuario" variant="outlined" defaultValue="Administrador" sx={{ mb: 2 }} />
                      <Button variant="outlined" sx={{ width: '100%', mb: 2 }}>Guardar Cambios</Button>
                    </Box>
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
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Configuración de Facturación</Typography>
                      <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                        Configura tus preferencias de facturación y revisa tu historial de pagos.
                      </Typography>
                      <TextField fullWidth label="Dirección de Facturación" variant="outlined" defaultValue="Calle Falsa 123" sx={{ mb: 2 }} />
                      <TextField fullWidth label="Método de Pago Predeterminado" variant="outlined" select defaultValue="Tarjeta de Crédito">
                        <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                        <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                        <option value="PayPal">PayPal</option>
                      </TextField>
                      <Button variant="outlined" sx={{ width: '100%', mt: 2 }}>Actualizar Información de Facturación</Button>
                    </Box>
                  )}
                  {value === 3 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Preferencias de Usuario</Typography>
                      <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                        Ajusta tus preferencias de usuario como idioma, formato de fecha y notificaciones.
                      </Typography>
                      <TextField fullWidth label="Idioma" variant="outlined" select defaultValue="Español" sx={{ mb: 2 }}>
                        <option value="Español">Español</option>
                        <option value="Inglés">Inglés</option>
                        <option value="Francés">Francés</option>
                      </TextField>
                      <TextField fullWidth label="Zona Horaria" variant="outlined" select defaultValue="GMT-5" sx={{ mb: 2 }}>
                        <option value="GMT-5">GMT-5</option>
                        <option value="GMT+0">GMT+0</option>
                        <option value="GMT+1">GMT+1</option>
                      </TextField>
                      <Button variant="outlined" sx={{ width: '100%', mt: 2 }}>Guardar Preferencias</Button>
                    </Box>
                  )}
                  <Box sx={{ p: 3, maxHeight: '400px', overflow: 'auto' }}>
                    {value === 4 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Plantillas de Documentos</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Gestiona y edita tus plantillas de documentos.
                        </Typography>
                        <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                          Añadir Nueva Plantilla
                        </Button>
                        <TextField
                          fullWidth
                          label="Buscar Plantillas"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <Button variant="outlined" sx={{ width: '100%' }}>
                          Ver Plantillas Guardadas
                        </Button>
                      </Box>
                    )}
                    {value === 5 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Formas de Pago</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Configura y actualiza tus métodos de pago.
                        </Typography>
                        <TextField
                          fullWidth
                          label="Añadir Nueva Forma de Pago"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <Button variant="outlined" sx={{ width: '100%', mb: 2 }}>
                          Añadir
                        </Button>
                        <Typography variant="body2" gutterBottom>
                          Formas de pago actuales:
                        </Typography>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Método</TableCell>
                              <TableCell>Detalles</TableCell>
                              <TableCell>Acciones</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Tarjeta de Crédito</TableCell>
                              <TableCell>Visa **** 1234</TableCell>
                              <TableCell>
                                <Button variant="text" color="error">
                                  Eliminar
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                    {value === 6 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Impuestos</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Administra las configuraciones de impuestos para tu cuenta.
                        </Typography>
                        <TextField
                          fullWidth
                          label="Tasa de Impuesto Predeterminada"
                          variant="outlined"
                          sx={{ mb: 2 }}
                          defaultValue="21%"
                        />
                        <Button variant="outlined" sx={{ width: '100%', mb: 2 }}>
                          Actualizar Impuestos
                        </Button>
                        <Typography variant="body2" gutterBottom>
                          Configuraciones de impuestos adicionales:
                        </Typography>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Nombre</TableCell>
                              <TableCell>Tasa</TableCell>
                              <TableCell>Acciones</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>IVA</TableCell>
                              <TableCell>21%</TableCell>
                              <TableCell>
                                <Button variant="text" color="error">
                                  Eliminar
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                    {value === 7 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Certificado Electrónico</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Configura tu certificado electrónico para la firma digital de documentos.
                        </Typography>
                        <Button variant="outlined" sx={{ width: '100%', mb: 2 }}>
                          Subir Certificado
                        </Button>
                        <TextField
                          fullWidth
                          label="Contraseña del Certificado"
                          type="password"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <Button variant="outlined" sx={{ width: '100%' }}>
                          Guardar Certificado
                        </Button>
                      </Box>
                    )}
                    {value === 8 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Suscripción</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Administra tu suscripción y revisa tu plan actual.
                        </Typography>
                        <TextField
                          fullWidth
                          label="Tipo de Suscripción"
                          variant="outlined"
                          defaultValue="Premium"
                          disabled
                          sx={{ mb: 2 }}
                        />
                        <Button variant="outlined" sx={{ width: '100%', mb: 2 }}>
                          Actualizar Plan
                        </Button>
                        <Button variant="outlined" color="error" sx={{ width: '100%' }}>
                          Cancelar Suscripción
                        </Button>
                      </Box>
                    )}
                    {value === 9 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Calendario</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Configura las preferencias de tu calendario.
                        </Typography>
                        <TextField
                          fullWidth
                          label="Zona Horaria"
                          variant="outlined"
                          select
                          defaultValue="GMT-5"
                          sx={{ mb: 2 }}
                        >
                          <option value="GMT-5">GMT-5</option>
                          <option value="GMT+0">GMT+0</option>
                          <option value="GMT+1">GMT+1</option>
                        </TextField>
                        <Button variant="outlined" sx={{ width: '100%' }}>
                          Guardar Configuración del Calendario
                        </Button>
                      </Box>
                    )}
                    {value === 10 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Contactos Recomendados</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Revisa y administra tus contactos recomendados.
                        </Typography>
                        <TextField
                          fullWidth
                          label="Buscar Contacto"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <Button variant="outlined" sx={{ width: '100%' }}>
                          Buscar
                        </Button>
                        <Typography variant="body2" gutterBottom>
                          Contactos recomendados:
                        </Typography>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Nombre</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Acciones</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Juan Pérez</TableCell>
                              <TableCell>juan.perez@example.com</TableCell>
                              <TableCell>
                                <Button variant="text" color="error">
                                  Eliminar
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                    {value === 11 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Importar</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Importa datos desde otros servicios o archivos.
                        </Typography>
                        <Button variant="outlined" sx={{ width: '100%', mb: 2 }}>
                          Importar desde Excel
                        </Button>
                        <Button variant="outlined" sx={{ width: '100%' }}>
                          Importar desde Google Sheets
                        </Button>
                      </Box>
                    )}
                    {value === 12 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Votar Mejoras</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Vota por nuevas características o mejoras en la plataforma.
                        </Typography>
                        <TextField
                          fullWidth
                          label="Buscar Sugerencias"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <Button variant="outlined" sx={{ width: '100%' }}>
                          Ver Sugerencias
                        </Button>
                      </Box>
                    )}
                    {value === 13 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Añadir Cuenta</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          Añade una nueva cuenta de usuario al sistema.
                        </Typography>
                        <TextField
                          fullWidth
                          label="Email de la Nueva Cuenta"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <Button variant="outlined" sx={{ width: '100%' }}>
                          Añadir Cuenta
                        </Button>
                      </Box>
                    )}
                    {value === 14 && (
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Cerrar Sesión</Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: 'textSecondary', mb: 2 }}>
                          ¿Seguro que quieres cerrar sesión?
                        </Typography>
                        <Button variant="contained" color="error" sx={{ width: '100%' }} onClick={logout}>
                          Cerrar Sesión
                        </Button>
                      </Box>
                    )}
                  </Box>

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
