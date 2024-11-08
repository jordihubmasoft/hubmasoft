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
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { SiVisa } from 'react-icons/si';

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);


  React.useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Redirigiendo al login...</Typography>
      </Box>
    );
  }

  const tabs = [
    'Perfil',
    'Preferencias',
    'Plantillas de Documentos',
    'Formas de Pago',
    'Impuestos',
    'Suscripción',
    'Importar',
    'Votar Mejoras',
    'Añadir Cuenta',
    'Cerrar Sesión'
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}> {/* Fondo oscuro aplicado a todo */}
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        {/* Sidebar principal */}
        <Box
          component="nav"
          sx={{
            width: isMenuOpen ? '240px' : '70px',
            flexShrink: 0,
            bgcolor: '#d4d4d9',
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
  
        {/* Mini Sidebar */}
        <Box
          component="nav"
          sx={{
            width: isMenuOpen ? '240px' : '80px',
            background: 'linear-gradient(180deg, #f9f9fc, #e0e3ea)',
            borderRight: '1px solid rgba(0, 0, 0, 0.15)',
            position: 'fixed',
            left: isMenuOpen ? '260px' : '90px',
            top: '50%',
            transform: 'translateY(-50%)',
            pt: 2,
            pb: 2,
            px: 1.5,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            maxHeight: '80vh',
            transition: 'width 0.3s ease, left 0.3s ease',
            '&:hover': {
              overflowY: 'auto',
            },
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.3)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#B0B3BC',
              borderRadius: 6,
              '&:hover': {
                background: '#9094A1',
              },
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#1A1A40',
              px: 2,
              py: 1,
              mb: 1.5,
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '1.1rem',
              textAlign: isMenuOpen ? 'left' : 'center',
            }}
          >
            {isMenuOpen ? 'Configuración' : '⚙️'}
          </Typography>
  
          {tabs.map((label, index) => (
            <Button
              key={label}
              onClick={() => handleTabChange(index)}
              sx={{
                justifyContent: isMenuOpen ? 'flex-start' : 'center',
                width: '100%',
                py: 1.5,
                px: isMenuOpen ? 2.5 : 1,
                color: selectedTab === index ? '#FFFFFF' : '#1A1A40',
                bgcolor: selectedTab === index ? '#3A3A8A' : 'transparent',
                textAlign: 'left',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: selectedTab === index ? 'bold' : 'medium',
                transition: 'background-color 0.2s ease, color 0.2s ease',
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  bgcolor: selectedTab === index ? '#3A3A8A' : 'rgba(58, 58, 138, 0.15)',
                  color: selectedTab === index ? '#FFFFFF' : '#1A1A40',
                },
                boxShadow: selectedTab === index ? '0px 4px 6px rgba(58, 58, 138, 0.2)' : 'none',
              }}
            >
              {isMenuOpen && label}
            </Button>
          ))}
        </Box>
  
        {/* Área de contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            marginLeft: isMenuOpen ? '440px' : '270px',
            transition: 'margin-left 0.3s ease',
            bgcolor: 'transparent', // Hacer el fondo transparente para que use el fondo del contenedor externo
            borderRadius: 3,
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg">
          {selectedTab === 0 && (
            <Box>
              <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: 'bold' }}>
                Configuración de Perfil
              </Typography>

              <Grid container spacing={3}>
                {/* Sección Editar Perfil */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      padding: '30px',
                      borderRadius: 5,
                      boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                      bgcolor: '#f0f0f0',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#1A1A40',
                        width: 100,
                        height: 100,
                        fontSize: 50,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {user?.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                      {user?.name || "Nombre no disponible"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                      {user?.email || "Email no disponible"}
                    </Typography>
                    <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                      Cambiar Foto
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      fullWidth
                      onClick={logout}
                      sx={{
                        '&:hover': {
                          color: '#ff4d4f',
                        },
                      }}
                    >
                      Eliminar Cuenta
                    </Button>
                  </Card>
                </Grid>

                {/* Sección de Formulario para Editar Perfil */}
                <Grid item xs={12} md={8}>
                  <Card
                    sx={{
                      padding: '30px',
                      borderRadius: 5,
                      boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                      bgcolor: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', mb: 3 }}>
                      Editar Perfil
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Nombre" variant="outlined" defaultValue={user?.name || ""} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Apellidos" variant="outlined" />
                      </Grid>
                    </Grid>
                    <TextField fullWidth label="Correo Electrónico" variant="outlined" defaultValue={user?.email || ""} sx={{ mt: 3 }} />
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 3,
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
                      fullWidth
                      sx={{
                        mt: 2,
                        color: '#1A1A40',
                        '&:hover': {
                          color: '#333366',
                        },
                      }}
                    >
                      Cambiar Contraseña
                    </Button>
                  </Card>
                </Grid>
              </Grid>

              {/* Sección Datos Fiscales */}
              <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', mt: 5 }}>
                Datos Fiscales
              </Typography>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                  bgcolor: '#FFFFFF',
                  p: 3,
                  mb: 4,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Nombre de la Empresa" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="NIF" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Nombre Comercial" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Identificador VAT" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Dirección" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Código Postal" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Provincia" variant="outlined" select>
                      {/* Aquí puedes añadir opciones */}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="País" variant="outlined" select>
                      {/* Aquí puedes añadir opciones */}
                    </TextField>
                  </Grid>
                </Grid>
              </Card>

              {/* Sección Datos de Contacto */}
              <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500' }}>
                Datos de Contacto
              </Typography>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                  bgcolor: '#FFFFFF',
                  p: 3,
                  mb: 4,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Teléfono" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Sitio Web" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Móvil" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Dirección de Envío" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button variant="outlined" sx={{ width: '100%' }}>Añadir Dirección</Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          )}


            
            {selectedTab === 1 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC', // Fondo suave para diferenciar
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Preferencias
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Moneda"
                      variant="outlined"
                      select
                      defaultValue="EUR"
                      sx={{
                        bgcolor: '#FFFFFF', // Fondo blanco en los selectores
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1A1A40',
                        },
                      }}
                    >
                      <MenuItem value="EUR">Euro (EUR)</MenuItem>
                      <MenuItem value="USD">Dólar (USD)</MenuItem>
                      <MenuItem value="GBP">Libra (GBP)</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Formato numérico"
                      variant="outlined"
                      select
                      defaultValue="1,593.50"
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1A1A40',
                        },
                      }}
                    >
                      <MenuItem value="1,593.50">1,593.50</MenuItem>
                      <MenuItem value="1.593,50">1.593,50</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Decimales"
                      variant="outlined"
                      select
                      defaultValue="2"
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1A1A40',
                        },
                      }}
                    >
                      <MenuItem value="0">0</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Zona horaria"
                      variant="outlined"
                      select
                      defaultValue="Europe/Madrid"
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1A1A40',
                        },
                      }}
                    >
                      <MenuItem value="Europe/Madrid">Europa/Madrid</MenuItem>
                      <MenuItem value="America/New_York">América/Nueva York</MenuItem>
                      <MenuItem value="Asia/Tokyo">Asia/Tokio</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Idioma"
                      variant="outlined"
                      select
                      defaultValue="Español"
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1A1A40',
                        },
                      }}
                    >
                      <MenuItem value="Español">Español</MenuItem>
                      <MenuItem value="Inglés">Inglés</MenuItem>
                      <MenuItem value="Francés">Francés</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Formato de fecha"
                      variant="outlined"
                      select
                      defaultValue="dd/mm/yyyy"
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1A1A40',
                        },
                      }}
                    >
                      <MenuItem value="dd/mm/yyyy">dd/mm/yyyy</MenuItem>
                      <MenuItem value="mm/dd/yyyy">mm/dd/yyyy</MenuItem>
                      <MenuItem value="yyyy-mm-dd">yyyy-mm-dd</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Color corporativo"
                      variant="outlined"
                      type="color"
                      defaultValue="#f24141"
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d3d3d3',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
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
              </Box>
            )}
            {selectedTab === 5 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '800px', // Limitar el ancho
                  margin: '0 auto' // Centrar
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Suscripción
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {/* Plan Actual */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Plan actual:</Typography>
                  <Typography variant="h6" sx={{ color: '#333366' }}>Autónomo básico</Typography>
                  <Typography variant="body2" sx={{ color: '#555', display: 'flex', alignItems: 'center', mt: 1 }}>
                    <span>4,99€</span>
                    <span style={{ marginLeft: '5px', color: '#1A1A40' }}>/mes</span>
                    <Button
                      onClick={() => alert("Redirigiendo a comparar planes...")}
                      sx={{ ml: 'auto', color: '#0066cc', fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                      Comparar planes
                    </Button>
                  </Typography>
                </Box>

                {/* Extras del Plan */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Extras del plan:</Typography>
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <Typography>Plan trabajador 5</Typography>
                      <Typography variant="body2" sx={{ color: '#333366' }}>4,99€/mes</Typography>
                    </Card>
                    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <Typography>Inventario</Typography>
                      <Typography variant="body2" sx={{ color: '#333366' }}>25,00€/mes</Typography>
                    </Card>
                  </Box>
                </Box>

                {/* Información de Pago */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Información de pago:</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#0066cc', mb: 1, cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => alert("Redirigiendo a ver facturas...")}
                  >
                    Ver facturas
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Próxima factura: 34,98€ - 15/11/2024</Typography>

                  {/* Forma de Pago */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#e0e3ea',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        gap: 2,
                        minWidth: '280px'
                      }}
                    >
                      {/* Usar icono de Visa */}
                      <SiVisa color="#1A1A40" size={28} />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>VISA</Typography>
                        <Typography sx={{ fontSize: '0.9rem' }}>Acabada en 8727 - Expira 08/2029</Typography>
                      </Box>
                      <Button onClick={() => alert("Establecer como predeterminado")} sx={{ color: '#0066cc', fontSize: '0.75rem', ml: 'auto' }}>
                        Predeterminada
                      </Button>
                    </Box>
                    <Button
                      variant="outlined"
                      onClick={() => alert("Añadir nuevo método de pago")}
                      sx={{ color: '#0066cc', borderColor: '#0066cc' }}
                    >
                      Añadir
                    </Button>
                  </Box>
                </Box>

                {/* Dirección de Facturación */}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Dirección de facturación:</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Félix Martínez Fernández <br />
                    info@hubmasoft.com <br />
                    48095109T <br />
                    Avda. Juan Carlos, 103, Vic, 08500, Barcelona <br />
                    España, ES
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => alert("Editar dirección de facturación")}
                    sx={{ color: '#0066cc', borderColor: '#0066cc', mt: 1 }}
                  >
                    Editar
                  </Button>
                </Box>
              </Box>
            )}
            {selectedTab === 4 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '900px',
                  margin: '0 auto',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Impuestos
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {/* Botón para añadir impuestos */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => alert("Abrir modal para añadir impuesto")}
                    sx={{
                      bgcolor: '#1A1A40',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: '#333366',
                      },
                      borderRadius: 2,
                      paddingX: 3,
                      paddingY: 1,
                    }}
                  >
                    + Añadir impuesto
                  </Button>
                </Box>

                {/* Tabla de Impuestos */}
                <Box sx={{ overflowX: 'auto' }}>
                  <Table sx={{ minWidth: 650, bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40', borderBottom: '2px solid #d3d3d3' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40', borderBottom: '2px solid #d3d3d3' }}>Valor</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40', borderBottom: '2px solid #d3d3d3' }}>Ámbito</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40', borderBottom: '2px solid #d3d3d3' }}>Grupo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40', borderBottom: '2px solid #d3d3d3' }}>Cuenta</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Ejemplo de filas de datos */}
                      <TableRow>
                        <TableCell sx={{ color: '#333366' }}>IVA 21%</TableCell>
                        <TableCell sx={{ color: '#333366' }}>+21%</TableCell>
                        <TableCell sx={{ color: '#333366' }}>VENTAS</TableCell>
                        <TableCell sx={{ color: '#333366' }}>IVA</TableCell>
                        <TableCell sx={{ color: '#333366' }}>47700000 - Hacienda Pública, IVA repercutido</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ color: '#333366' }}>RET 19%</TableCell>
                        <TableCell sx={{ color: '#333366' }}>-19%</TableCell>
                        <TableCell sx={{ color: '#333366' }}>VENTAS</TableCell>
                        <TableCell sx={{ color: '#333366' }}>RETENCIÓN</TableCell>
                        <TableCell sx={{ color: '#333366' }}>47510000 - Retenciones practicadas</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ color: '#333366' }}>REC 5.2%</TableCell>
                        <TableCell sx={{ color: '#333366' }}>+5.2%</TableCell>
                        <TableCell sx={{ color: '#333366' }}>COMPRAS</TableCell>
                        <TableCell sx={{ color: '#333366' }}>REC. DE EQ.</TableCell>
                        <TableCell sx={{ color: '#333366' }}>47710000 - IVA soportado</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            )}



            {selectedTab === 3 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC', // Fondo suave para diferenciar
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Formas de pago
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="body1" sx={{ color: '#1A1A40' }}>
                    Aquí puedes añadir o ver los métodos de pago para tus documentos.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#1A1A40',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#333366' },
                    }}
                    onClick={() => setOpenModal(true)} // Abre el modal para añadir métodos de pago
                  >
                    + Añadir método de pago
                  </Button>
                </Box>
            
                <Grid container spacing={3}>
                  {/* Ejemplo de método de pago */}
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ padding: 3, borderRadius: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <Typography variant="h6" sx={{ fontWeight: '600', color: '#1A1A40' }}>
                        Transferencia a 30 días
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                        Transferencia a 30 días. <br />
                        <span style={{ fontWeight: 'bold' }}>Cuenta:</span> ESXX XXXX XXXX XXXX XXXX
                      </Typography>
                    </Card>
                  </Grid>
                  {/* Añade otros métodos de pago aquí si es necesario */}
                </Grid>
              </Box>
            )}


          </Container>
          {openModal && (
            <Box
              onClick={() => setOpenModal(false)} // Cerrar modal al hacer clic en el fondo oscuro
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1300, // Asegura que el modal esté por encima de otros elementos
              }}
            >
              {/* Detiene la propagación de clics para evitar el cierre del modal al hacer clic dentro de él */}
              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  width: '90%',
                  maxWidth: 600,
                  bgcolor: '#FFFFFF',
                  borderRadius: 3,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Añadir método de pago manual
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Nombre interno"
                  placeholder="Nombre del método de pago"
                  variant="outlined"
                  sx={{
                    bgcolor: '#F3F4F6',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3d3d3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1A1A40',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1A1A40',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Texto que se muestra en el documento"
                  placeholder="Ejemplo: Pagar por transferencia a..."
                  multiline
                  minRows={3}
                  variant="outlined"
                  sx={{
                    bgcolor: '#F3F4F6',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3d3d3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1A1A40',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1A1A40',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Banco"
                  select
                  placeholder="Seleccionar banco"
                  sx={{
                    bgcolor: '#F3F4F6',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3d3d3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1A1A40',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1A1A40',
                      },
                    },
                  }}
                >
                  <MenuItem value="Banco1">Banco 1</MenuItem>
                  <MenuItem value="Banco2">Banco 2</MenuItem>
                </TextField>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    label="Vencimiento"
                    select
                    fullWidth
                    placeholder="Días de vencimiento"
                    sx={{
                      bgcolor: '#F3F4F6',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1A1A40',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1A1A40',
                        },
                      },
                    }}
                  >
                    <MenuItem value={15}>15 días</MenuItem>
                    <MenuItem value={30}>30 días</MenuItem>
                    <MenuItem value={60}>60 días</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Incluir el IBAN del cliente debajo del texto:
                  </Typography>
                  <TextField
                    type="checkbox"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1A1A40',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1A1A40',
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={() => setOpenModal(false)} sx={{ color: '#555' }}>
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#1A1A40',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      '&:hover': { bgcolor: '#333366' },
                    }}
                    onClick={() => setOpenModal(false)}
                  >
                    Guardar
                  </Button>
                </Box>
              </Box>
            </Box>
          )}



        </Box>
      </Box>
    </Box>
    
    


  );
};

export default Profile;
