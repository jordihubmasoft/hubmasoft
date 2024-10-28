import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem as DropdownMenuItem,
  Grid,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Divider,
  MenuItem,
  Fade,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

// Columnas de la tabla de albaranes
const allColumns = [
  { id: 'numero', label: 'Número' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'recogida', label: 'Recogida' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'formaPago', label: 'Forma de Pago' },
  { id: 'proyecto', label: 'Proyecto' },
  { id: 'unidades', label: 'Unidades' },
  { id: 'iva', label: 'IVA' },
  { id: 'recargo', label: 'Recargo de Equivalencia' },
  { id: 'subtotal', label: 'Subtotal' },
  { id: 'total', label: 'Total' },
  { id: 'estado', label: 'Estado' },
  { id: 'facturado', label: 'Facturado' },
  { id: 'totalFacturado', label: 'Total Facturado' },
  { id: 'envio', label: 'Envío' },  // Nueva columna para 'Envío'
];

// Datos de ejemplo para la tabla de albaranes
const ordersData = [];

const OrderPage = ({ order, handleBack, handleSave }) => {
  const [formData, setFormData] = useState(order || {
    contacto: '',
    numeroDocumento: '',
    fechaDocumento: '',
    fechaVencimiento: '',
    metodoPago: '',
    cuentaContable: '',
    envio: 'noEnviado',  // Estado inicial del envío
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleBack();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Botón para volver atrás */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} color="primary" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {order ? 'Editar Albarán' : 'Nuevo Albarán de Venta'}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        {/* Sección de datos del albarán */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Contacto</InputLabel>
              <Select
                name="contacto"
                value={formData.contacto}
                onChange={handleChange}
                label="Contacto"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="Contacto1">Contacto 1</MenuItem>
                <MenuItem value="Contacto2">Contacto 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Número de documento"
              name="numeroDocumento"
              variant="outlined"
              fullWidth
              value={formData.numeroDocumento}
              onChange={handleChange}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Fecha documento"
              name="fechaDocumento"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fechaDocumento}
              onChange={handleChange}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Fecha vencimiento"
              name="fechaVencimiento"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fechaVencimiento}
              onChange={handleChange}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Envío</InputLabel>
              <Select
                name="envio"
                value={formData.envio}
                onChange={handleChange}
                label="Envío"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="noEnviado">No enviado</MenuItem>
                <MenuItem value="enCamino">En camino</MenuItem>
                <MenuItem value="entregado">Entregado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Tabla de conceptos */}
        <Box sx={{ mt: 4 }}>
          <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Concepto</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Unidades</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Impuestos</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Aquí puedes mapear los conceptos si los tienes */}
                <TableRow>
                  <TableCell>Arandela</TableCell>
                  <TableCell>Desc</TableCell>
                  <TableCell>400</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>0,13</TableCell>
                  <TableCell>X IVA 21%</TableCell>
                  <TableCell>62,92€</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Opciones adicionales */}
        <Box sx={{ mt: 3 }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Añadir texto en el documento"
            sx={{ mr: 3 }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Añadir mensaje al final"
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Sección de Método de Pago */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
          Método de pago
        </Typography>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Selecciona una forma de pago</InputLabel>
              <Select
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleChange}
                label="Selecciona una forma de pago"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="forma1">Forma de pago 1</MenuItem>
                <MenuItem value="forma2">Forma de pago 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Sección de Categorización */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
          Categorización
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Cuenta contable"
              name="cuentaContable"
              variant="outlined"
              fullWidth
              value={formData.cuentaContable}
              onChange={handleChange}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Botón de Guardar */}
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            borderRadius: 2,
          }}
        >
          Guardar
        </Button>
      </Box>
    </Container>
  );
};

const AlbaranesVentas = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(ordersData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (order = null) => {
    setSelectedOrder(order);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedOrder(null);
  };

  const handleSave = (order) => {
    if (selectedOrder) {
      setOrders(orders.map((o) => (o.id === order.id ? order : o)));
    } else {
      order.id = orders.length + 1;
      setOrders([...orders, order]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderEnvioCell = (envio) => {
    let color;
    switch (envio) {
      case 'noEnviado':
        color = 'yellow';
        break;
      case 'enCamino':
        color = 'blue';
        break;
      case 'entregado':
        color = 'green';
        break;
      default:
        color = 'default';
    }

    return (
      <TableCell sx={{ bgcolor: color, color: '#fff', fontWeight: 'bold' }}>
        {envio === 'noEnviado' ? 'No enviado' : envio === 'enCamino' ? 'En camino' : 'Entregado'}
      </TableCell>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Fade in={!isEditing} timeout={300}>
        <Box display={isEditing ? 'none' : 'block'}>
          <Header isMenuOpen={true} />
          <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
            <Box
              component="nav"
              sx={{
                width: '240px',
                flexShrink: 0,
                bgcolor: '#1A1A40',
                borderRight: 'none',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1201,
                position: 'fixed',
                height: '100%',
                transition: 'width 0.3s ease',
              }}
            >
              <Sidebar isMenuOpen={true} toggleMenu={toggleMenu} />
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: '#F3F4F6',
                p: 3,
                transition: 'margin-left 0.3s ease',
                marginLeft: '240px',
                maxWidth: 'calc(100% - 240px)',
              }}
            >
              <Container maxWidth="lg">
                <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Albaranes de Ventas
                </Typography>
                <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap', gap: 1 }}>
                  <TextField 
                    variant="outlined" 
                    placeholder="Buscar..." 
                    fullWidth 
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }} 
                  />
                  <Button 
                    variant="contained" 
                    sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', minWidth: '120px' }} 
                    startIcon={<AddIcon />} 
                    onClick={() => handleOpen()}
                  >
                    Añadir Albarán
                  </Button>
                  <IconButton
                    sx={{
                      bgcolor: '#FFA500',
                      color: '#ffffff',
                      borderRadius: 2,
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        bgcolor: '#FF8C00',
                      },
                      minWidth: '48px',
                      minHeight: '48px'
                    }}
                    onClick={handleMenuOpen}
                  >
                    <ViewColumnIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      style: {
                        maxHeight: '400px',
                        width: '250px',
                      },
                    }}
                  >
                    {allColumns.map((column) => (
                      <DropdownMenuItem key={column.id}>
                        <FormControlLabel
                          control={<Checkbox checked={visibleColumns.includes(column.id)} onChange={() => handleColumnToggle(column.id)} />}
                          label={column.label}
                        />
                      </DropdownMenuItem>
                    ))}
                  </Menu>
                </Box>
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
                  <Table>
                    <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                      <TableRow>
                        {allColumns.map((column) =>
                          visibleColumns.includes(column.id) ? (
                            <TableCell key={column.id}>{column.label}</TableCell>
                          ) : null
                        )}
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                          {visibleColumns.map((column) => (
                            column === 'envio'
                              ? renderEnvioCell(order[column])
                              : <TableCell key={column}>{order[column]}</TableCell>
                          ))}
                          <TableCell>
                            <IconButton onClick={() => handleOpen(order)} sx={{ color: '#1A1A40' }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => setOrders(orders.filter((o) => o.id !== order.id))} sx={{ color: '#B00020' }}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </Box>
          </Box>
        </Box>
      </Fade>

      <Fade in={isEditing} timeout={300}>
        <Box display={isEditing ? 'block' : 'none'}>
          <OrderPage order={selectedOrder} handleBack={handleBack} handleSave={handleSave} />
        </Box>
      </Fade>
    </Box>
  );
};

export default AlbaranesVentas;
