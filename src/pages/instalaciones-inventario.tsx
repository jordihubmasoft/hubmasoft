import React, { useState } from 'react';
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
  DialogContentText,
  DialogTitle,
  Snackbar,
  Slide,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Card,
  CardContent,
  Pagination,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  List as ListIcon,
  GridOn as GridOnIcon,
  Warehouse as WarehouseIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Header from 'componentes/Header';
import Sidebar from 'componentes/Sidebar';

// Registering necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const instalacionesData = [
  {
    id: 1,
    nombre: 'Taller Fermaplastic Centelles',
    ubicacion: 'Centelles, Barcelona',
    gerente: 'Juan Pérez',
    contactoGerente: 'juan.perez@example.com',
    email: 'centelles@example.com',
    direccion: 'Calle Falsa 123',
    poblacion: 'Centelles',
    codigoPostal: '08540',
    provincia: 'Barcelona',
    pais: 'España',
    telefono: '934567890',
    esAlmacenPorDefecto: true,
    mapa: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11897.626568940488!2d2.2127778623654937!3d41.797999686771334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4dc0aa3c2f463%3A0x61e1922dfe22a2e3!2s08540%20Centelles%2C%20Barcelona%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1725267002771!5m2!1ses!2sus" width="300" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  {
    id: 2,
    nombre: 'Taller Fermaplastic Barcelona',
    ubicacion: 'Barcelona, Barcelona',
    gerente: 'Maria García',
    contactoGerente: 'maria.garcia@example.com',
    email: 'barcelona@example.com',
    direccion: 'Calle Real 456',
    poblacion: 'Barcelona',
    codigoPostal: '08001',
    provincia: 'Barcelona',
    pais: 'España',
    telefono: '934567891',
    esAlmacenPorDefecto: false,
    mapa: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24749.810913712652!2d-0.4505824931708784!3d39.15820496397091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61b00a9e6e6bef%3A0xd7b5683204bd9559!2s46600%20Alzira%2C%20Valencia%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1725266742706!5m2!1ses!2sus" width="300" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
];

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

const chartOptions = {
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
        callback: function (value) {
          return value + '€';
        },
      },
    },
  },
};

const Instalaciones = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInstalacion, setSelectedInstalacion] = useState(null);
  const [instalaciones, setInstalaciones] = useState(instalacionesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('detailed');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [newInstalacion, setNewInstalacion] = useState({
    nombre: '',
    ubicacion: '',
    gerente: '',
    contactoGerente: '',
    email: '',
    direccion: '',
    poblacion: '',
    codigoPostal: '',
    provincia: '',
    pais: '',
    telefono: '',
    esAlmacenPorDefecto: false,
    mapa: '',
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleOpen = (instalacion = null) => {
    setSelectedInstalacion(instalacion);
    setIsEditing(true);
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewInstalacion({
      nombre: '',
      ubicacion: '',
      gerente: '',
      contactoGerente: '',
      email: '',
      direccion: '',
      poblacion: '',
      codigoPostal: '',
      provincia: '',
      pais: '',
      telefono: '',
      esAlmacenPorDefecto: false,
      mapa: '',
    });
  };

  const handleNewInstalacionChange = (e) => {
    const { name, value } = e.target;
    setNewInstalacion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddInstalacion = () => {
    const newId = instalaciones.length + 1;
    setInstalaciones([...instalaciones, { ...newInstalacion, id: newId }]);
    setSnackbarMessage('Nueva instalación añadida');
    setSnackbarOpen(true);
    handleAddDialogClose();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedInstalacion(null);
  };

  const handleSave = (instalacion) => {
    if (selectedInstalacion) {
      setInstalaciones(instalaciones.map((inst) => (inst.id === instalacion.id ? instalacion : inst)));
      setSnackbarMessage('Instalación actualizada exitosamente');
    } else {
      instalacion.id = instalaciones.length + 1;
      setInstalaciones([...instalaciones, instalacion]);
      setSnackbarMessage('Nueva instalación añadida');
    }
    handleBack();
    setSnackbarOpen(true);
  };

  const handleDelete = (id) => {
    setInstalaciones(instalaciones.filter((inst) => inst.id !== id));
    setDeleteDialogOpen(false);
    setSnackbarMessage('Instalación eliminada');
    setSnackbarOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInstalaciones = instalaciones.filter((instalacion) =>
    instalacion.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDialogOpen = (id) => {
    setSelectedInstalacion(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed');
  };

  const handleCardClick = (instalacion) => {
    setSelectedInstalacion(instalacion);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isSidebarOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
        <Sidebar isMenuOpen={isSidebarOpen} toggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F3F4F6', p: 3, marginLeft: '0', maxWidth: '100%' }}>
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
            {!selectedInstalacion ? (
              viewMode === 'detailed' ? (
                <Box>
                  {filteredInstalaciones.map((instalacion) => (
                    <Paper key={instalacion.id} sx={{ mb: 2, p: 2, borderRadius: 2, cursor: 'pointer' }} onClick={() => handleCardClick(instalacion)}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {instalacion.nombre} {instalacion.esAlmacenPorDefecto && <Typography component="span" sx={{ color: 'primary.main', fontWeight: 'normal' }}>Almacén por defecto</Typography>}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" sx={{ mb: 1 }}>Ubicación</Typography>
                          <div dangerouslySetInnerHTML={{ __html: instalacion.mapa }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" sx={{ mb: 1 }}>Información</Typography>
                          <Typography><strong>Gerente:</strong> {instalacion.gerente}</Typography>
                          <Typography><strong>Email de contacto:</strong> {instalacion.email}</Typography>
                          <Typography><strong>Teléfono:</strong> {instalacion.telefono}</Typography>
                          <Typography><strong>Dirección completa:</strong> {instalacion.direccion}, {instalacion.poblacion}, {instalacion.provincia}, {instalacion.codigoPostal}, {instalacion.pais}</Typography>
                          <Typography sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
                            {instalacion.esAlmacenPorDefecto ? 'Esta instalación actúa como el almacén por defecto.' : 'Instalación secundaria.'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {filteredInstalaciones.map((instalacion) => (
                    <Grid item xs={12} sm={6} md={4} key={instalacion.id}>
                      <Card
                        sx={{
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                        onClick={() => handleCardClick(instalacion)}
                      >
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: '#2666CF', mb: 2 }}>
                            <WarehouseIcon />
                          </Avatar>
                          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            {instalacion.nombre}
                          </Typography>
                          <Typography sx={{ mb: 1.5, textAlign: 'center', color: 'text.secondary' }}>
                            {instalacion.ubicacion}
                          </Typography>
                          {instalacion.esAlmacenPorDefecto && (
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ mt: 1, color: '#2666CF', borderColor: '#2666CF' }}
                            >
                              Almacén por defecto
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )
            ) : (
              <Paper sx={{ p: 3, borderRadius: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={handleBack}
                  sx={{ mb: 2 }}
                >
                  Atrás
                </Button>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  {selectedInstalacion.nombre}
                </Typography>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Resumen y Productos">
                  <Tab label="Resumen" />
                  <Tab label="Productos" />
                </Tabs>
                {tabIndex === 0 && (
                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Ubicación</Typography>
                        <div dangerouslySetInnerHTML={{ __html: selectedInstalacion.mapa }} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Información</Typography>
                        <Typography><strong>Gerente:</strong> {selectedInstalacion.gerente}</Typography>
                        <Typography><strong>Email de contacto:</strong> {selectedInstalacion.email}</Typography>
                        <Typography><strong>Teléfono:</strong> {selectedInstalacion.telefono}</Typography>
                        <Typography><strong>Dirección completa:</strong> {selectedInstalacion.direccion}, {selectedInstalacion.poblacion}, {selectedInstalacion.provincia}, {selectedInstalacion.codigoPostal}, {selectedInstalacion.pais}</Typography>
                        <Typography sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
                          {selectedInstalacion.esAlmacenPorDefecto ? 'Esta instalación actúa como el almacén por defecto.' : 'Instalación secundaria.'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>Información sobre productos</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F5F5F5' }}>
                            <Typography variant="body1"><strong>Total productos:</strong> 244</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F5F5F5' }}>
                            <Typography variant="body1"><strong>Total unidades:</strong> 15,897</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F5F5F5' }}>
                            <Typography variant="body1"><strong>Valor del stock:</strong> 142,004.34€</Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Stock</Typography>
                        <Line data={chartData} />
                      </Box>
                    </Box>
                  </Box>
                )}
                {tabIndex === 1 && (
                  <Box sx={{ display: 'flex', mt: 4 }}>
                    <Box sx={{ minWidth: '220px', pr: 4 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1A1A40' }}>Productos</Typography>
                      <Button fullWidth sx={{ justifyContent: 'flex-start', mb: 1, color: '#2666CF', textTransform: 'none' }}>Todos</Button>
                      <Button fullWidth sx={{ justifyContent: 'flex-start', mb: 1, color: '#2666CF', textTransform: 'none' }}>Producto simple</Button>
                      <Button fullWidth sx={{ justifyContent: 'flex-start', mb: 1, color: '#2666CF', textTransform: 'none' }}>Producto con variantes</Button>
                      <Button fullWidth sx={{ justifyContent: 'flex-start', mb: 1, color: '#2666CF', textTransform: 'none' }}>Familias</Button>
                      <Button fullWidth sx={{ justifyContent: 'flex-start', mb: 1, color: '#2666CF', textTransform: 'none' }}>Categorías</Button>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <TextField
                          variant="outlined"
                          placeholder="Buscar producto..."
                          fullWidth
                          sx={{ backgroundColor: '#fff', borderRadius: 1, boxShadow: 1 }}
                          value={searchQuery}
                          onChange={handleSearchChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button variant="contained" sx={{ ml: 2, bgcolor: '#2666CF', color: '#fff', fontWeight: 'bold', textTransform: 'none' }}>
                          Filtrar por fecha
                        </Button>
                        <IconButton sx={{ ml: 2 }} onClick={handleMenuClick}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleMenuClose}>Exportar a Excel</MenuItem>
                          <MenuItem onClick={handleMenuClose}>Exportar a PDF</MenuItem>
                        </Menu>
                      </Box>
                      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Almacén Stock</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Costo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Precio venta</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Valor coste</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Subtotal</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Impuestos</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow hover>
                                <TableCell>TAPA TENSOR V2 CON BACORD</TableCell>
                                <TableCell>37.01.02N</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0.30€</TableCell>
                                <TableCell>1.00€</TableCell>
                                <TableCell>0.00€</TableCell>
                                <TableCell>0.37€</TableCell>
                                <TableCell>0.02€</TableCell>
                                <TableCell>0.39€</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  </Box>
                )}
              </Paper>
            )}
            <Pagination count={Math.ceil(filteredInstalaciones.length / 6)} page={currentPage} onChange={handleChangePage} sx={{ mt: 3, justifyContent: 'center', display: 'flex' }} />
          </Container>
        </Box>
      </Box>

      {/* Dialogo para Añadir Instalación */}
      <Dialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Añadir Nueva Instalación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={newInstalacion.nombre}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="ubicacion"
            label="Ubicación"
            type="text"
            fullWidth
            value={newInstalacion.ubicacion}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="gerente"
            label="Gerente"
            type="text"
            fullWidth
            value={newInstalacion.gerente}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="contactoGerente"
            label="Contacto Gerente"
            type="email"
            fullWidth
            value={newInstalacion.contactoGerente}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newInstalacion.email}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="direccion"
            label="Dirección"
            type="text"
            fullWidth
            value={newInstalacion.direccion}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="poblacion"
            label="Población"
            type="text"
            fullWidth
            value={newInstalacion.poblacion}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="codigoPostal"
            label="Código Postal"
            type="text"
            fullWidth
            value={newInstalacion.codigoPostal}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="provincia"
            label="Provincia"
            type="text"
            fullWidth
            value={newInstalacion.provincia}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="pais"
            label="País"
            type="text"
            fullWidth
            value={newInstalacion.pais}
            onChange={handleNewInstalacionChange}
          />
          <TextField
            margin="dense"
            name="telefono"
            label="Teléfono"
            type="text"
            fullWidth
            value={newInstalacion.telefono}
            onChange={handleNewInstalacionChange}
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de que desea eliminar esta instalación? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDelete(selectedInstalacion)} color="error" autoFocus>
            Eliminar
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
