import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Grid,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Slide,
  Tabs,
  Tab,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CardActionArea,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  List as ListIcon,
  GridOn as GridOnIcon,
  Warehouse as WarehouseIcon,
} from '@mui/icons-material';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import InstalationService from '../services/instalationService';
import ProductService from '../services/productService';
import useAuthStore from '../../../store/useAuthStore';
import { Instalation } from '../types/instalation';
import { Product } from '../types/Product';
import { CreateInstalationDto } from '../types/createInstalationDto';
import { useRouter } from 'next/router';
import InstalacionForm from '../components/InstalacionForm';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const chartData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Stock',
      data: [5000, 7000, 4000, 8000, 6000, 7000, 9000, 11000, 8000, 6000, 7000, 9000],
      fill: true,
      backgroundColor: 'rgba(38, 102, 207, 0.2)',
      borderColor: '#2666CF',
      tension: 0.4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#2666CF',
    },
  ],
};

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        callback: (value: any) => `${value}€`,
      },
    },
  },
};

interface NewInstalationForm {
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
}

const Instalaciones = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const contactId = useAuthStore((state) => state.contactId);

  const [hydrated, setHydrated] = useState(false);
  const [instalaciones, setInstalaciones] = useState<Instalation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstalacion, setSelectedInstalacion] = useState<Instalation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<NewInstalationForm>({
    nombre: '',
    email: '',
    telefono: '',
    movil: '',
    direccion: '',
    poblacion: '',
    codigoPostal: '',
    provincia: '',
    pais: '',
    nombreGerente: '',
    emailGerente: '',
    telefonoGerente: '',
    movilGerente: '',
    icono: '',
    color: '#4290b3',
    cuentaContable: '',
    esAlmacenPrincipal: false,
  });

  const [newInstalation, setNewInstalation] = useState<NewInstalationForm>({
    nombre: '',
    email: '',
    telefono: '',
    movil: '',
    direccion: '',
    poblacion: '',
    codigoPostal: '',
    provincia: '',
    pais: '',
    nombreGerente: '',
    emailGerente: '',
    telefonoGerente: '',
    movilGerente: '',
    icono: '',
    color: '#4290b3',
    cuentaContable: '',
    esAlmacenPrincipal: false,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  const fetchInstalaciones = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await InstalationService.getAllInstalations(token, contactId);
      const dataArray = Array.isArray(response) ? response : (response as any).data || [];
      setInstalaciones(dataArray as Instalation[]);
    } catch (err: any) {
      console.error("Error fetching installations:", err);
      setError("Ocurrió un problema al cargar las instalaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hydrated && token) {
      fetchInstalaciones();
    }
  }, [hydrated, token]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCardClick = (instalacion: Instalation) => {
    setSelectedInstalacion(instalacion);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedInstalacion(null);
    setTabIndex(0);
  };

  // Diálogo de Añadir instalación
  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewInstalation({
      nombre: '',
      email: '',
      telefono: '',
      movil: '',
      direccion: '',
      poblacion: '',
      codigoPostal: '',
      provincia: '',
      pais: '',
      nombreGerente: '',
      emailGerente: '',
      telefonoGerente: '',
      movilGerente: '',
      icono: '',
      color: '#4290b3',
      cuentaContable: '',
      esAlmacenPrincipal: false,
    });
  };

  const handleNewInstalationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setNewInstalation((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setNewInstalation((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddInstalacion = async () => {
    if (!token) return;
    try {
      const payload: CreateInstalationDto & { nombreGerente?: string; telefonoGerente?: string; emailGerente?: string } = {
        contactId,
        name: newInstalation.nombre,
        email: newInstalation.email,
        phone: newInstalation.telefono,
        phone1: newInstalation.movil,
        address: {
          direction: newInstalation.direccion,
          city: newInstalation.poblacion,
          postalCode: newInstalation.codigoPostal,
          province: newInstalation.provincia,
          country: newInstalation.pais,
        },
        nombreGerente: newInstalation.nombreGerente,
        telefonoGerente: newInstalation.telefonoGerente,
        emailGerente: newInstalation.emailGerente,
      };

      await InstalationService.createInstalation(payload, token);
      fetchInstalaciones();
      setSnackbarMessage('Nueva instalación añadida');
      setSnackbarOpen(true);
      handleAddDialogClose();
    } catch (err: any) {
      console.error("Error creating installation:", err);
      setSnackbarMessage('Error al añadir la instalación');
      setSnackbarOpen(true);
    }
  };

  // Diálogo de eliminación
  const handleDeleteDialogOpen = (id: string) => {
    setSelectedInstalacion(instalaciones.find(inst => inst.id === id) || null);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await InstalationService.deleteInstalation(id, token);
      setInstalaciones(instalaciones.filter((inst) => inst.id !== id));
      setSnackbarMessage('Instalación eliminada');
      setSnackbarOpen(true);
    } catch (err: any) {
      console.error("Error deleting installation:", err);
      setSnackbarMessage('Error al eliminar la instalación');
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  // Diálogo de edición
  const handleEditDialogOpen = () => {
    if (!selectedInstalacion) return;
    setEditForm({
      nombre: selectedInstalacion.name || '',
      email: selectedInstalacion.email || '',
      telefono: selectedInstalacion.phone || '',
      movil: selectedInstalacion.phone1 || '',
      direccion: selectedInstalacion.address?.direction || '',
      poblacion: selectedInstalacion.address?.city || '',
      codigoPostal: selectedInstalacion.address?.postalCode || '',
      provincia: selectedInstalacion.address?.province || '',
      pais: selectedInstalacion.address?.country || '',
      nombreGerente: '',
      emailGerente: '',
      telefonoGerente: '',
      movilGerente: '',
      icono: '',
      color: '#4290b3',
      cuentaContable: '',
      esAlmacenPrincipal: false,
    });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setEditForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdateInstalacion = async () => {
    if (!token || !selectedInstalacion) return;
    try {
      const updatedInstalation: Instalation = {
        ...selectedInstalacion,
        name: editForm.nombre,
        email: editForm.email,
        phone: editForm.telefono,
        phone1: editForm.movil,
        address: {
          ...selectedInstalacion.address,
          direction: editForm.direccion,
          city: editForm.poblacion,
          postalCode: editForm.codigoPostal,
          province: editForm.provincia,
          country: editForm.pais,
        },
        nombreGerente: editForm.nombreGerente,
        telefonoGerente: editForm.telefonoGerente,
        emailGerente: editForm.emailGerente,
      };

      await InstalationService.updateInstalation(updatedInstalation, token);
      setInstalaciones((prev) =>
        prev.map((inst) => (inst.id === updatedInstalation.id ? updatedInstalation : inst))
      );
      setSelectedInstalacion(updatedInstalation);
      setSnackbarMessage('Instalación actualizada');
      setSnackbarOpen(true);
      handleEditDialogClose();
    } catch (err: any) {
      console.error("Error updating installation:", err);
      setSnackbarMessage('Error al actualizar la instalación');
      setSnackbarOpen(true);
    }
  };

  const fetchProductsForInstallation = async () => {
    if (!token || !selectedInstalacion) return;
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const allProducts = await ProductService.getAllProducts(token);
      const filteredProducts = allProducts.filter((p: Product) =>
        p.installationId && p.installationId.includes(selectedInstalacion.id)
      );
      setProducts(filteredProducts);
    } catch (err) {
      console.error(err);
      setErrorProducts("Error al cargar los productos");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (selectedInstalacion && tabIndex === 1) {
      fetchProductsForInstallation();
    }
  }, [selectedInstalacion, tabIndex, token]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const filteredInstalaciones = instalaciones.filter((instal) =>
    (instal.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isSidebarOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
        <Sidebar isMenuOpen={isSidebarOpen} toggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '100%', bgcolor: '#F3F4F6' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
              Instalaciones
            </Typography>
            <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <TextField
                variant="outlined"
                placeholder="Buscar instalación..."
                fullWidth
                sx={{ flexGrow: 1 }}
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton onClick={toggleViewMode}>
                {viewMode === 'detailed' ? <GridOnIcon /> : <ListIcon />}
              </IconButton>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#2666CF',
                  color: '#ffffff',
                  fontWeight: '500',
                  textTransform: 'none',
                  borderRadius: 2,
                  minWidth: '150px',
                }}
                startIcon={<AddIcon />}
                onClick={handleAddDialogOpen}
              >
                Añadir instalación
              </Button>
            </Box>

            {loading ? (
              <Typography variant="h6" sx={{ color: '#1A1A40' }}>
                Cargando instalaciones...
              </Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ color: 'red' }}>
                {error}
              </Typography>
            ) : (
              <>
                {!selectedInstalacion ? (
                  viewMode === 'detailed' ? (
                    <Box>
                      {filteredInstalaciones.map((almacen) => (
                        <Card
                          key={almacen.id}
                          sx={{
                            mb: 2,
                            borderRadius: 3,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            },
                          }}
                        >
                          <CardActionArea onClick={() => handleCardClick(almacen)}>
                            <CardContent sx={{ p: 3 }}>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 'bold', mb: 2, color: '#1A1A40' }}
                              >
                                {almacen.name}
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 1, fontWeight: 'bold', color: '#555' }}
                                  >
                                    Dirección
                                  </Typography>
                                  {almacen.address ? (
                                    <>
                                      <Typography sx={{ color: '#333' }}>
                                        {almacen.address.direction}, {almacen.address.city},
                                        {` ${almacen.address.province}, ${almacen.address.postalCode}, ${almacen.address.country}`}
                                      </Typography>
                                      <Box sx={{ mt: 1, width: '100%', height: '200px' }}>
                                        <iframe
                                          width="100%"
                                          height="100%"
                                          frameBorder="0"
                                          style={{ border: 0 }}
                                          src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                            `${almacen.address.direction}, ${almacen.address.city}, ${almacen.address.province}, ${almacen.address.postalCode}, ${almacen.address.country}`
                                          )}&output=embed`}
                                          allowFullScreen
                                        ></iframe>
                                      </Box>
                                    </>
                                  ) : (
                                    <Typography sx={{ color: '#666' }}>
                                      Dirección no disponible
                                    </Typography>
                                  )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 1, fontWeight: 'bold', color: '#555' }}
                                  >
                                    Contacto
                                  </Typography>
                                  <Typography sx={{ color: '#333' }}>
                                    <strong>Email:</strong> {almacen.email}
                                  </Typography>
                                  <Typography sx={{ color: '#333' }}>
                                    <strong>Teléfono:</strong> {almacen.phone}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      ))}
                    </Box>
                  ) : (
                    <Box>
                      <Grid container spacing={2}>
                        {filteredInstalaciones.map((almacen) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={almacen.id}>
                            <Card
                              sx={{
                                borderRadius: 3,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                },
                              }}
                            >
                              <CardActionArea onClick={() => handleCardClick(almacen)}>
                                <CardContent
                                  sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    p: 3,
                                  }}
                                >
                                  <WarehouseIcon sx={{ fontSize: 40, color: '#2666CF' }} />
                                  <Typography
                                    variant="h6"
                                    sx={{ mt: 1, fontWeight: 'bold', color: '#1A1A40' }}
                                  >
                                    {almacen.name}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#666' }}>
                                    {almacen.address?.city || 'Sin ciudad'}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )
                ) : (
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      mt: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={handleBack}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 500,
                        }}
                      >
                        Atrás
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditDialogOpen}
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          selectedInstalacion && handleDeleteDialogOpen(selectedInstalacion.id)
                        }
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500 }}
                      >
                        Eliminar
                      </Button>
                    </Box>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1A1A40' }}>
                      {selectedInstalacion.name}
                    </Typography>
                    <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Resumen y Productos">
                      <Tab label="Resumen" />
                      <Tab label="Productos" />
                    </Tabs>
                    {tabIndex === 0 && (
                      <Box sx={{ p: 2 }}>
                        <Grid container spacing={4}>
                          {/* Columna izquierda: Información y contacto */}
                          <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 1 }}>
                              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                                Información
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Dirección:</strong> {selectedInstalacion.address.direction}, {selectedInstalacion.address.city}, {selectedInstalacion.address.province}, {selectedInstalacion.address.postalCode}, {selectedInstalacion.address.country}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Email:</strong> {selectedInstalacion.email}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Teléfono:</strong> {selectedInstalacion.phone}
                              </Typography>
                            </Paper>
                            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 1 }}>
                              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                                Contacto
                              </Typography>
                              <Typography sx={{ mb: 1 }}>
                                <strong>Nombre gerente:</strong> {selectedInstalacion.nombreGerente || '-'}
                              </Typography>
                              <Typography sx={{ mb: 1 }}>
                                <strong>Teléfono:</strong> {selectedInstalacion.telefonoGerente || '-'}
                              </Typography>
                              <Typography sx={{ mb: 1 }}>
                                <strong>Email:</strong> {selectedInstalacion.emailGerente || '-'}
                              </Typography>
                            </Paper>
                          </Grid>
                          {/* Columna derecha: KPIs, gráfico, mapa */}
                          <Grid item xs={12} md={8}>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                              <Grid item xs={6} md={3}>
                                <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center', boxShadow: 1 }}>
                                  <Typography variant="caption" color="text.secondary">Total productos</Typography>
                                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2666CF' }}>170.00</Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6} md={3}>
                                <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center', boxShadow: 1 }}>
                                  <Typography variant="caption" color="text.secondary">Total unidades</Typography>
                                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2666CF' }}>28117.50</Typography>
                                </Paper>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={8}>
                                <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
                                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#1A1A40' }}>
                                    Stock
                                  </Typography>
                                  <Line data={chartData} options={{
                                    ...chartOptions,
                                    plugins: {
                                      ...chartOptions.plugins,
                                      legend: { display: false },
                                    },
                                    elements: {
                                      line: { borderWidth: 3, tension: 0.5 },
                                      point: { radius: 4, backgroundColor: '#2666CF', borderColor: '#fff', borderWidth: 2 },
                                    },
                                    scales: {
                                      x: { grid: { display: false } },
                                      y: { grid: { color: '#F0F0F0' }, ticks: { color: '#888', callback: (value) => `${value}€` } },
                                    },
                                    backgroundColor: 'transparent',
                                  }} />
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 1, borderRadius: 2, boxShadow: 1, height: '100%' }}>
                                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Ubicación
                                  </Typography>
                                  <Box sx={{ width: '100%', height: 200, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                                    <iframe
                                      width="100%"
                                      height="100%"
                                      frameBorder="0"
                                      style={{ border: 0 }}
                                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                        `${selectedInstalacion.address.direction}, ${selectedInstalacion.address.city}, ${selectedInstalacion.address.province}, ${selectedInstalacion.address.postalCode}, ${selectedInstalacion.address.country}`
                                      )}&output=embed`}
                                      allowFullScreen
                                    ></iframe>
                                  </Box>
                                </Paper>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    {tabIndex === 1 && (
                      <Box sx={{ display: 'flex', mt: 4 }}>
                        <Box sx={{ minWidth: '220px', pr: 4 }}>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1A1A40' }}>
                            Productos
                          </Typography>
                          <MenuItem>Exportar a Excel</MenuItem>
                          <MenuItem>Exportar a PDF</MenuItem>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          {loadingProducts ? (
                            <Typography variant="body1">Cargando productos...</Typography>
                          ) : errorProducts ? (
                            <Typography variant="body1" color="error">
                              {errorProducts}
                            </Typography>
                          ) : (
                            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Referencia</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Stock</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {products.map((product) => (
                                    <TableRow key={product.id}>
                                      <TableCell>{product.referencia}</TableCell>
                                      <TableCell>{product.nombre}</TableCell>
                                      <TableCell>{product.descripcion}</TableCell>
                                      <TableCell>{product.precio}</TableCell>
                                      <TableCell>{product.cantidad}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Paper>
                )}
              </>
            )}
          </Container>
        </Box>
      </Box>

      {/* Diálogo para Añadir instalación */}
      <Dialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        aria-labelledby="nuevo-instalación-title"
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 3,
            overflow: 'visible',
          },
        }}
      >
        <DialogTitle id="nuevo-instalación-title" sx={{ fontWeight: 'bold', position: 'relative' }}>
          Nueva instalación
          <IconButton onClick={handleAddDialogClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 2 }}>
          <InstalacionForm formData={newInstalation} handleChange={handleNewInstalationChange} />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleAddDialogClose} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button onClick={handleAddInstalacion} variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Confirmar Eliminación */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar esta instalación? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => selectedInstalacion && handleDelete(selectedInstalacion.id)}
            color="error"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Editar instalación */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="edit-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="edit-dialog-title">Editar instalación</DialogTitle>
        <DialogContent dividers>
          <InstalacionForm formData={editForm} handleChange={handleEditFormChange} />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleEditDialogClose} variant="outlined" sx={{ borderRadius: 2 }}>
            Cancelar
          </Button>
          <Button onClick={handleUpdateInstalacion} variant="contained" sx={{ borderRadius: 2 }}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

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

export default Instalaciones;
