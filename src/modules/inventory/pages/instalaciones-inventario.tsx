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
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  List as ListIcon,
  GridOn as GridOnIcon,
  Warehouse as WarehouseIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { Instalation } from '../types/instalation';
import InstalationService from '../services/instalationService';
import { CreateInstalationDto } from '../types/createInstalationDto';
import { useRouter } from 'next/router';
import useAuthStore from '../../../store/useAuthStore';

// Registro y configuración de Chart.js
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
      position: 'bottom' as const,
    },
    tooltip: {
      mode: 'index' as const,
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
  name: string;
  email: string;
  phone: string;
  direction: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}

const Instalaciones = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const contactId = useAuthStore((state) => state.contactId); // Se obtiene el contactId del usuario autenticado
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // -- Estados para la edición --
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<NewInstalationForm>({
    name: '',
    email: '',
    phone: '',
    direction: '',
    city: '',
    postalCode: '',
    province: '',
    country: '',
  });

  // Estado para el formulario de creación
  const [newInstalation, setNewInstalation] = useState<NewInstalationForm>({
    name: '',
    email: '',
    phone: '',
    direction: '',
    city: '',
    postalCode: '',
    province: '',
    country: '',
  });

  // Evitamos errores en SSR
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Redirigir al login si no hay token
  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  // Cargar instalaciones
  const fetchInstalaciones = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await InstalationService.getAllInstalations(token);
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

  // Manejo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Al hacer clic en una card, se selecciona la instalación para verla en detalle
  const handleCardClick = (instalacion: Instalation) => {
    setSelectedInstalacion(instalacion);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedInstalacion(null);
    setTabIndex(0);
  };

  // -- Crear instalación --
  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewInstalation({
      name: '',
      email: '',
      phone: '',
      direction: '',
      city: '',
      postalCode: '',
      province: '',
      country: '',
    });
  };

  const handleNewInstalationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInstalation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddInstalacion = async () => {
    if (!token) return;
    try {
      const payload: CreateInstalationDto = {
        contactId, // Se asigna el contactId del usuario autenticado
        name: newInstalation.name,
        email: newInstalation.email,
        phone: newInstalation.phone,
        phone1: "123456789",
        address: {
          direction: newInstalation.direction,
          city: newInstalation.city,
          postalCode: newInstalation.postalCode,
          province: newInstalation.province,
          country: newInstalation.country,
        },
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

  // -- Eliminar instalación --
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

  // -- Editar instalación --
  const handleEditDialogOpen = () => {
    if (!selectedInstalacion) return;

    // Pre-cargamos el formulario con los datos de la instalación seleccionada
    setEditForm({
      name: selectedInstalacion.name || '',
      email: selectedInstalacion.email || '',
      phone: selectedInstalacion.phone || '',
      direction: selectedInstalacion.address?.direction || '',
      city: selectedInstalacion.address?.city || '',
      postalCode: selectedInstalacion.address?.postalCode || '',
      province: selectedInstalacion.address?.province || '',
      country: selectedInstalacion.address?.country || '',
    });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInstalacion = async () => {
    if (!token || !selectedInstalacion) return;

    try {
      // Construimos un objeto Instalation completo, usando la instalación original
      // y mezclando los valores del formulario de edición
      const updatedInstalation: Instalation = {
        ...selectedInstalacion,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        address: {
          ...selectedInstalacion.address,
          direction: editForm.direction,
          city: editForm.city,
          postalCode: editForm.postalCode,
          province: editForm.province,
          country: editForm.country,
        },
      };

      await InstalationService.updateInstalation(updatedInstalation, token);
      fetchInstalaciones();
      setSnackbarMessage('Instalación actualizada');
      setSnackbarOpen(true);
      handleEditDialogClose();
    } catch (err: any) {
      console.error("Error updating installation:", err);
      setSnackbarMessage('Error al actualizar la instalación');
      setSnackbarOpen(true);
    }
  };

  // -- Otros --
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Filtrar instalaciones por nombre
  const filteredInstalaciones = instalaciones.filter((inst) =>
    (inst.name || '').toLowerCase().includes(searchQuery.toLowerCase())
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
                sx={{ bgcolor: '#2666CF', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, minWidth: '150px' }} 
                startIcon={<AddIcon />} 
                onClick={handleAddDialogOpen}
              >
                Añadir instalación
              </Button>
            </Box>

            {loading ? (
              <Typography variant="h6" sx={{ color: '#1A1A40' }}>Cargando instalaciones...</Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>
            ) : (
              <>
                {!selectedInstalacion ? (
                  viewMode === 'detailed' ? (
                    // VISTA DETALLADA
                    <Box>
                      {filteredInstalaciones.map((instalacion) => (
                        <Paper 
                          key={instalacion.id} 
                          sx={{ mb: 2, p: 2, borderRadius: 2, cursor: 'pointer' }}
                          onClick={() => handleCardClick(instalacion)}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {instalacion.name}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Dirección</Typography>
                              {instalacion.address ? (
                                <>
                                  <Typography>
                                    {instalacion.address.direction}, {instalacion.address.city}, {instalacion.address.province}, {instalacion.address.postalCode}, {instalacion.address.country}
                                  </Typography>
                                  <Box sx={{ mt: 1, width: '100%', height: '200px' }}>
                                    <iframe
                                      width="100%"
                                      height="100%"
                                      frameBorder="0"
                                      style={{ border: 0 }}
                                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                        `${instalacion.address.direction}, ${instalacion.address.city}, ${instalacion.address.province}, ${instalacion.address.postalCode}, ${instalacion.address.country}`
                                      )}&output=embed`}
                                      allowFullScreen
                                    ></iframe>
                                  </Box>
                                </>
                              ) : (
                                <Typography>Dirección no disponible</Typography>
                              )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Contacto</Typography>
                              <Typography><strong>Email:</strong> {instalacion.email}</Typography>
                              <Typography><strong>Teléfono:</strong> {instalacion.phone}</Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    // VISTA COMPACTA
                    <Box>
                      <Grid container spacing={2}>
                        {filteredInstalaciones.map((instalacion) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={instalacion.id}>
                            <Paper
                              sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                p: 2,
                                borderRadius: 2,
                              }}
                              onClick={() => handleCardClick(instalacion)}
                            >
                              <WarehouseIcon sx={{ fontSize: 40, color: '#2666CF' }} />
                              <Typography variant="h6" sx={{ mt: 1 }}>
                                {instalacion.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {instalacion.address?.city || 'Sin ciudad'}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )
                ) : (
                  // VISTA DE DETALLE DE UNA INSTALACIÓN SELECCIONADA
                  <Paper sx={{ p: 3, borderRadius: 2, mt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={handleBack}
                      >
                        Atrás
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditDialogOpen}
                      >
                        Editar
                      </Button>
                    </Box>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                      {selectedInstalacion.name}
                    </Typography>
                    <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Resumen y Productos">
                      <Tab label="Resumen" />
                      <Tab label="Productos" />
                    </Tabs>
                    {tabIndex === 0 && (
                      <Box sx={{ p: 2 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>Dirección</Typography>
                            <Typography>
                              {selectedInstalacion.address.direction}, {selectedInstalacion.address.city}, {selectedInstalacion.address.province}, {selectedInstalacion.address.postalCode}, {selectedInstalacion.address.country}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>Contacto</Typography>
                            <Typography><strong>Email:</strong> {selectedInstalacion.email}</Typography>
                            <Typography><strong>Teléfono:</strong> {selectedInstalacion.phone}</Typography>
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 4 }}>
                          <Typography variant="h6" sx={{ mb: 2 }}>Stock</Typography>
                          <Line data={chartData} options={chartOptions} />
                        </Box>
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
                          <Typography variant="body1">Tabla de productos</Typography>
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

      {/* Diálogo para Añadir Instalación */}
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Añadir Nueva Instalación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            value={newInstalation.name}
            onChange={handleNewInstalationChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newInstalation.email}
            onChange={handleNewInstalationChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Teléfono"
            type="text"
            fullWidth
            value={newInstalation.phone}
            onChange={handleNewInstalationChange}
          />
          <TextField
            margin="dense"
            name="direction"
            label="Dirección"
            type="text"
            fullWidth
            value={newInstalation.direction}
            onChange={handleNewInstalationChange}
          />
          <TextField
            margin="dense"
            name="city"
            label="Ciudad"
            type="text"
            fullWidth
            value={newInstalation.city}
            onChange={handleNewInstalationChange}
          />
          <TextField
            margin="dense"
            name="postalCode"
            label="Código Postal"
            type="text"
            fullWidth
            value={newInstalation.postalCode}
            onChange={handleNewInstalationChange}
          />
          <TextField
            margin="dense"
            name="province"
            label="Provincia"
            type="text"
            fullWidth
            value={newInstalation.province}
            onChange={handleNewInstalationChange}
          />
          <TextField
            margin="dense"
            name="country"
            label="País"
            type="text"
            fullWidth
            value={newInstalation.country}
            onChange={handleNewInstalationChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddInstalacion} color="primary">
            Añadir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Confirmar Eliminación */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} aria-labelledby="alert-dialog-title">
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

      {/* Diálogo para Editar Instalación */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} aria-labelledby="edit-dialog-title">
        <DialogTitle id="edit-dialog-title">Editar Instalación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            value={editForm.name}
            onChange={handleEditFormChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={editForm.email}
            onChange={handleEditFormChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Teléfono"
            type="text"
            fullWidth
            value={editForm.phone}
            onChange={handleEditFormChange}
          />
          <TextField
            margin="dense"
            name="direction"
            label="Dirección"
            type="text"
            fullWidth
            value={editForm.direction}
            onChange={handleEditFormChange}
          />
          <TextField
            margin="dense"
            name="city"
            label="Ciudad"
            type="text"
            fullWidth
            value={editForm.city}
            onChange={handleEditFormChange}
          />
          <TextField
            margin="dense"
            name="postalCode"
            label="Código Postal"
            type="text"
            fullWidth
            value={editForm.postalCode}
            onChange={handleEditFormChange}
          />
          <TextField
            margin="dense"
            name="province"
            label="Provincia"
            type="text"
            fullWidth
            value={editForm.province}
            onChange={handleEditFormChange}
          />
          <TextField
            margin="dense"
            name="country"
            label="País"
            type="text"
            fullWidth
            value={editForm.country}
            onChange={handleEditFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateInstalacion} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
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
