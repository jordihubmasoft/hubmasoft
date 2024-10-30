import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
  Snackbar,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  MenuItem,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Store as StoreIcon,
  Close as CloseIcon,
  LocationOn as LocationOnIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Slide } from '@mui/material';
import Header from 'components/Header'; // Asegúrate de que la ruta del componente sea correcta
import Sidebar from 'components/Sidebar'; // Asegúrate de que la ruta del componente sea correcta
import { Chart } from 'react-google-charts';
import { useRouter } from 'next/router';

// Manteniendo la definición de la interfaz Tpv tal como está
interface Tpv {
  id?: number;
  name: string;
  address: string;
  installation: string;
  gerente: string;
  email: string;
  telefono: string;
  mapa: string;
}

// Manteniendo los TPVs iniciales
const initialTpvs: Tpv[] = [
  {
    id: 1,
    name: 'Taller Fermaplastic Centelles',
    address: 'Calle Falsa 123, Centelles, Barcelona',
    installation: 'Almacén Central',
    gerente: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '934567890',
    mapa: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11897.626568940488!2d2.2127778623654937!3d41.797999686771334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4dc0aa3c2f463%3A0x61e1922dfe22a2e3!2s08540%20Centelles%2C%20Barcelona%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1725267002771!5m2!1ses!2sus" width="100%" height="180" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
  },
  {
    id: 2,
    name: 'Taller Fermaplastic Barcelona',
    address: 'Calle Real 456, Barcelona',
    installation: 'Tienda Costa',
    gerente: 'Maria García',
    email: 'maria.garcia@example.com',
    telefono: '934567891',
    mapa: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11897.626568940488!2d2.2127778623654937!3d41.797999686771334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4dc0aa3c2f463%3A0x61e1922dfe22a2e3!2s08540%20Centelles%2C%20Barcelona%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1725267002771!5m2!1ses!2sus" width="100%" height="180" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
  },
];
const installations = [
    { value: 'almacen-central', label: 'Almacén Central' },
    { value: 'tienda-costa', label: 'Tienda Costa' },
    { value: 'almacen-sur', label: 'Almacén Sur' },
];




const TpvDetails = ({ tpv, handleBack }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const toggleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const router = useRouter();
    
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <Box
            component="nav"
            sx={{
            width: isSidebarOpen ? '240px' : '70px',
            flexShrink: 0,
            bgcolor: '#1A1A40',
            position: 'fixed',
            height: '100%',
            transition: 'width 0.3s ease',
            }}
        >
            <Sidebar isMenuOpen={isSidebarOpen} toggleMenu={toggleMenu} />
        </Box>
    
        {/* Main content */}
        <Box
            sx={{
            flexGrow: 1,
            bgcolor: '#F4F6F8',
            marginLeft: isSidebarOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease',
            paddingTop: '10px', // Para que el contenido no se superponga al header
            }}
        >
            <Header isMenuOpen={isSidebarOpen} />
    
            <Container sx={{ paddingTop: '80px' }}>
            {/* Contenedor del botón de volver y el título */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton
                onClick={handleBack}
                sx={{
                    backgroundColor: '#F4F6F8', 
                    color: '#2666CF', 
                    mr: 2,
                    borderRadius: '50%',
                    border: 'none',
                    '&:hover': { backgroundColor: '#E0E0E0' },
                }}
                >
                <ArrowBackIcon />
                </IconButton>
    
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#333' }}>
                {tpv.name}
                </Typography>
            </Box>
    
            {/* Contenedor principal con las dos cajas unificadas */}
            <Paper
                elevation={6}
                sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                minHeight: 'auto',
                }}
            >
                <Grid container spacing={2}>
                {/* Información de la tienda */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#2666CF' }}>
                        Información de la tienda y el mapa debajo
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: '#555' }}>
                        <strong>Dirección:</strong> {tpv.address}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: '#555' }}>
                        <strong>Gerente:</strong> {tpv.gerente}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: '#555' }}>
                        <strong>Email:</strong> {tpv.email}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: '#555' }}>
                        <strong>Teléfono:</strong> {tpv.telefono}
                    </Typography>
                    <Typography sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary', colour: '#999' }}>
                        {tpv.installation
                        ? `Instalación que administra: ${tpv.installation}`
                        : 'Sin instalación asignada'}
                    </Typography>
    
                    {/* Mapa ajustado a la parte visible */}
                    <Box
                        sx={{
                        mt: 3,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                        height: 'auto',
                        }}
                    >
                        <div dangerouslySetInnerHTML={{ __html: tpv.mapa }} />
                    </Box>
                    </Box>
                </Grid>
    
                {/* Acceder a TPV y cuentas */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#2666CF' }}>
                        Cuentas y cajas registradoras
                        </Typography>
                        <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#2666CF',
                            color: '#ffffff',
                            borderRadius: '8px',
                            textTransform: 'none',
                            '&:hover': { bgcolor: '#1E5BB8' },
                        }}
                        onClick={() => router.push('/restauracion-tpv')}
                        >
                        Acceder a TPV
                        </Button>
                    </Box>
    
                    <Divider sx={{ my: 2 }} />
    
                    <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
                        Pago en caja registradora:
                    </Typography>
    
                    <Grid container spacing={2}>
                        {/* Caja registradora 1 */}
                        <Grid item xs={6}>
                        <Box
                            sx={{
                            border: '2px solid #ddd',
                            borderRadius: '12px',
                            p: 3,
                            textAlign: 'center',
                            backgroundColor: '#F8FAFC',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            '&:hover': {
                                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                            },
                            }}
                        >
                            <Box>
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Logo Registradora"
                                style={{ marginBottom: '16px', width: '60px', height: '60px' }}
                            />
                            <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                                Caja registradora Jardi Domotic 1
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#2666CF', mb: 2 }}>
                                <a href="#" style={{ textDecoration: 'none', color: '#2666CF' }}>
                                Caja principal Jardi Domotic
                                </a>
                            </Typography>
                            </Box>
                            <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            sx={{
                                textTransform: 'none',
                                color: '#2666CF',
                                borderColor: '#2666CF',
                                '&:hover': {
                                borderColor: '#1E5BB8',
                                backgroundColor: '#f0f5ff',
                                },
                            }}
                            >
                            Editar
                            </Button>
                        </Box>
                        </Grid>
    
                        {/* Caja registradora 2 */}
                        <Grid item xs={6}>
                        <Box
                            sx={{
                            border: '2px solid #ddd',
                            borderRadius: '12px',
                            p: 3,
                            textAlign: 'center',
                            backgroundColor: '#F8FAFC',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            '&:hover': {
                                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                            },
                            }}
                        >
                            <Box>
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Logo Registradora"
                                style={{ marginBottom: '16px', width: '60px', height: '60px' }}
                            />
                            <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                                Caja registradora Jardi Domotic 2
                            </Typography>
                            </Box>
                            <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            sx={{
                                textTransform: 'none',
                                color: '#2666CF',
                                borderColor: '#2666CF',
                                '&:hover': {
                                borderColor: '#1E5BB8',
                                backgroundColor: '#f0f5ff',
                                },
                            }}
                            >
                            Editar
                            </Button>
                        </Box>
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
                </Grid>
            </Paper>
    
            {/* Tabla de sesiones de cajas registradoras */}
            <Paper
                elevation={6}
                sx={{
                mt: 4,
                p: 3,
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2666CF', mb: 2 }}>
                Sesiones de cajas registradoras:
                </Typography>
                <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                    fullWidth
                    select
                    label="Seleccionar caja registradora"
                    variant="outlined"
                    SelectProps={{
                        native: true,
                    }}
                    >
                    <option value="todas">Todas las cajas</option>
                    <option value="jardi1">Jardi Domotic 1</option>
                    <option value="jardi2">Jardi Domotic 2</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                    fullWidth
                    select
                    label="Seleccionar empleado"
                    variant="outlined"
                    SelectProps={{
                        native: true,
                    }}
                    >
                    <option value="todos">Todos los empleados</option>
                    <option value="empleado1">Félix Martínez</option>
                    <option value="empleado2">Jordi Puig</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                    fullWidth
                    select
                    label="Últimos 30 días"
                    variant="outlined"
                    SelectProps={{
                        native: true,
                    }}
                    >
                    <option value="hoy">Hoy</option>
                    <option value="semana">Última semana</option>
                    <option value="30dias">Últimos 30 días</option>
                    <option value="trimestre">Último trimestre</option>
                    </TextField>
                </Grid>
                </Grid>
    
                {/* Tabla de resultados */}
                <TableContainer sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre de la caja</TableCell>
                        <TableCell>Empleado</TableCell>
                        <TableCell>Inicio sesión</TableCell>
                        <TableCell>Cierre sesión</TableCell>
                        <TableCell>Total facturado</TableCell>
                        <TableCell>Tarjeta</TableCell>
                        <TableCell>Efectivo</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <TableCell>Jardi Domotic 1</TableCell>
                        <TableCell>Félix Martínez</TableCell>
                        <TableCell>9:00</TableCell>
                        <TableCell>14:00</TableCell>
                        <TableCell>1,256.88€</TableCell>
                        <TableCell>981.33€</TableCell>
                        <TableCell>255.55€</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </Paper>
    
            {/* Sección de empleados */}
            <Paper
                elevation={6}
                sx={{
                mt: 4,
                p: 3,
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2666CF', mb: 2 }}>
                Empleados:
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                <Grid item xs={4} md={2} sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: '#F56A6A', width: 56, height: 56, mb: 2 }}>FM</Avatar>
                    <Typography variant="body1">Félix Martínez</Typography>
                    <Typography variant="body2" sx={{ color: '#999' }}>Sin acceso</Typography>
                </Grid>
                <Grid item xs={4} md={2} sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: '#66BB6A', width: 56, height: 56, mb: 2 }}>JP</Avatar>
                    <Typography variant="body1">Jordi Puig</Typography>
                    <Typography variant="body2" sx={{ color: '#999' }}>Administrativo</Typography>
                </Grid>
                <Grid item xs={4} md={2} sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: '#42A5F5', width: 56, height: 56, mb: 2 }}>BJ</Avatar>
                    <Typography variant="body1">Bernardo Jimenez</Typography>
                    <Typography variant="body2" sx={{ color: '#999' }}>Vendedor</Typography>
                </Grid>
                </Grid>
            </Paper>
            </Container>
        </Box>
        </Box>
    );
    };
      
  
  

const TPV = () => {
  const [tpvs, setTpvs] = useState<Tpv[]>(initialTpvs);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Tpv>>({});

  const [selectedTpv, setSelectedTpv] = useState<Tpv | null>(null);
  const [newTpv, setNewTpv] = useState<Tpv>({
    name: '',
    address: '',
    installation: '',
    gerente: '',
    email: '',
    telefono: '',
    mapa: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [viewDetails, setViewDetails] = useState(false);
  const [tpvInDetail, setTpvInDetail] = useState<Tpv | null>(null);

  // Validación del formulario de TPV
  const validateForm = () => {
    const newErrors: Partial<Tpv> = {};
    if (!newTpv.name) newErrors.name = 'El nombre de la tienda es obligatorio';
    if (!newTpv.address) newErrors.address = 'La dirección es obligatoria';
    if (!newTpv.installation) newErrors.installation = 'La instalación es obligatoria';
    if (!newTpv.gerente) newErrors.gerente = 'El gerente es obligatorio';
    if (!newTpv.email) newErrors.email = 'El email es obligatorio';
    if (!newTpv.telefono) newErrors.telefono = 'El teléfono es obligatorio';
    if (!newTpv.mapa.startsWith('<iframe')) newErrors.mapa = 'Debe proporcionar un iframe de Google Maps válido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Abrir el diálogo para crear o editar TPV
  const handleOpen = () => {
    setSelectedTpv(null); 
    setNewTpv({ name: '', address: '', installation: '', gerente: '', email: '', telefono: '', mapa: '' });
    setOpen(true);
  };

  // Editar TPV seleccionado
  const handleEdit = (tpv: Tpv) => {
    setSelectedTpv(tpv); 
    setNewTpv(tpv); 
    setOpen(true); 
  };

  // Cerrar el diálogo
  const handleClose = () => {
    setOpen(false); 
    setNewTpv({ name: '', address: '', installation: '', gerente: '', email: '', telefono: '', mapa: '' });
  };

  // Guardar cambios del TPV (nuevo o editado)
  const handleSaveTpv = () => {
    if (!validateForm()) return; 

    if (selectedTpv) {
      setSnackbarMessage('TPV actualizado con éxito');
    } else {
      setTpvs([...tpvs, { ...newTpv, id: tpvs.length + 1 }]); 
      setSnackbarMessage('Nuevo TPV creado con éxito');
    }
    setOpen(false); 
    setSnackbarOpen(true); 
  };

  // Cerrar Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Cambiar entre pestañas (Vista detallada y Vista lista)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Manejar clic en una tarjeta de TPV para ver los detalles
  const handleCardClick = (tpv: Tpv) => {
    setTpvInDetail(tpv);
    setViewDetails(true);
  };

  // Manejar regreso a la vista principal
  const handleBack = () => {
    setViewDetails(false);
  };

  // Si estamos en la vista de detalles, mostramos el componente correspondiente
  if (viewDetails && tpvInDetail) {
    return <TpvDetails tpv={tpvInDetail} handleBack={handleBack} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isSidebarOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
        <Sidebar isMenuOpen={isSidebarOpen} toggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            marginLeft: isSidebarOpen ? '0' : '0',
            transition: 'all 0.3s ease',
            width: `calc(100% - ${isSidebarOpen ? '240px' : '0px'})`,
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                Punto de venta TPV
              </Typography>

              <Button
                variant="contained"
                sx={{
                  bgcolor: '#2666CF',
                  color: '#ffffff',
                  fontWeight: '500',
                  textTransform: 'none',
                  borderRadius: 2,
                  minWidth: '180px',
                }}
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Añadir instalación
              </Button>
            </Box>

            {/* Tabs */}
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Vista de TPVs">
              <Tab label="Vista detallada" />
              <Tab label="Vista de lista" />
            </Tabs>

            {/* Vista detallada de TPVs */}
            {tabIndex === 0 && tpvs.length > 0 && (
              <Box sx={{ mt: 3 }}>
                {tpvs.map((tpv) => (
                  <Paper key={tpv.id} sx={{ p: 3, mb: 2 }}>
                    <Typography variant="h6">{tpv.name}</Typography>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                          <strong>Dirección:</strong> {tpv.address}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Gerente:</strong> {tpv.gerente}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Email:</strong> {tpv.email}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Teléfono:</strong> {tpv.telefono}
                        </Typography>
                        <Typography sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
                          {tpv.installation ? `Instalación que administra: ${tpv.installation}` : 'Sin instalación asignada'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box
                          dangerouslySetInnerHTML={{ __html: tpv.mapa }}
                          sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>
            )}

            {/* Vista en lista de TPVs */}
            {tabIndex === 1 && (
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {tpvs.map((tpv) => (
                    <Grid item xs={12} sm={6} md={4} key={tpv.id}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}> {/* Elevación más alta y centrado */}
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            {/* Avatar con ícono */}
                            <Avatar sx={{ bgcolor: '#2666CF', mb: 2, width: 56, height: 56 }}>
                            <StoreIcon fontSize="large" />
                            </Avatar>

                            {/* Título del TPV */}
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {tpv.name}
                            </Typography>

                            {/* Dirección del TPV */}
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            {tpv.address}
                            </Typography>

                            {/* Botón "Almacén por defecto" si aplica */}
                            <Button
                            variant="outlined"
                            sx={{
                                color: '#2666CF',
                                borderColor: '#2666CF',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                mb: 2, // Margen inferior para dar espacio
                            }}
                            >
                            Almacén por defecto
                            </Button>

                            {/* Botón Administrar con funcionalidad */}
                            <Button
                            startIcon={<EditIcon />}
                            variant="outlined"
                            sx={{ color: '#2666CF', borderColor: '#2666CF', textTransform: 'none' }}
                            onClick={() => handleCardClick(tpv)} // Manteniendo la funcionalidad del clic
                            >
                            Administrar
                            </Button>
                        </Box>
                        </Paper>
                    </Grid>
                    ))}
                </Grid>
                )}

            {/* Si no hay TPVs */}
            {tpvs.length === 0 && (
              <Typography align="center" sx={{ mt: 4 }}>
                Actualmente no hay creada ninguna tienda.
              </Typography>
            )}
          </Container>
        </Box>
      </Box>

      {/* Diálogo para añadir o editar TPV */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {selectedTpv ? 'Editar tienda' : 'Crear tienda'}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Cree una tienda y gestione el inventario de los almacenes que seleccione, optimizando el tiempo en la gestión de existencias y pedidos.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Nombre de la tienda"
              value={newTpv.name}
              onChange={(e) => setNewTpv({ ...newTpv, name: e.target.value })}
              error={Boolean(errors.name)}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StoreIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Dirección de la tienda"
              value={newTpv.address}
              onChange={(e) => setNewTpv({ ...newTpv, address: e.target.value })}
              error={Boolean(errors.address)}
              helperText={errors.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              select
              label="Instalación que administra"
              value={newTpv.installation}
              onChange={(e) => setNewTpv({ ...newTpv, installation: e.target.value })}
              error={Boolean(errors.installation)}
              helperText={errors.installation}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ArrowDropDownIcon color="action" />
                  </InputAdornment>
                ),
              }}
            >
              {installations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveTpv} variant="contained" color="primary">
            {selectedTpv ? 'Guardar cambios' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificación tipo snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        TransitionComponent={Slide}
      />
    </Box>
  );
};

export default TPV;
