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
  Grid,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Fade,
  Divider,
  InputAdornment,
  Menu,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from 'componentes/Header';
import Sidebar from 'componentes/Sidebar';

// Sample recurring invoice data
const recurringInvoicesData = [
  { id: 1, contacto: 'Contacto 1', intervalo: '1 mes', fechaInicio: '2023-09-01', fechaFin: '2024-09-01' },
  { id: 2, contacto: 'Contacto 2', intervalo: '3 meses', fechaInicio: '2023-01-01', fechaFin: '2024-01-01' },
];

const initialEmails = [
  'info@fermaplastic.com',
  'admin@fermaplastic.com',
  'contacto@fermaplastic.com',
  'compras@fermaplastic.com',
  'ventas@fermaplastic.com',
  'atencioncliente@fermaplastic.com',
];

const allColumns = [
  { id: 'contacto', label: 'Contacto' },
  { id: 'intervalo', label: 'Intervalo' },
  { id: 'fechaInicio', label: 'Fecha Inicio' },
  { id: 'fechaFin', label: 'Fecha Fin' },
];

const RecurringInvoiceForm = ({ order, handleBack, handleSave }) => {
  const [formData, setFormData] = useState({
    contacto: '',
    numeroDocumento: '',
    fechaInicio: '',
    fechaFin: '',
    metodoPago: '',
    intervaloTiempo: '',
    intervaloVencimiento: '',
    autoCreate: false,
    autoSend: false,
    selectedEmails: [],
    newEmail: '',
  });

  const [availableEmails, setAvailableEmails] = useState(initialEmails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleBack();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} color="primary" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {order ? 'Editar Factura Recurrente' : 'Nueva Factura Recurrente'}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        {/* Form Fields for Recurring Invoice */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Contacto</InputLabel>
              <Select
                name="contacto"
                value={formData.contacto}
                onChange={handleInputChange}
                label="Contacto"
              >
                <MenuItem value="Contacto1">Contacto 1</MenuItem>
                <MenuItem value="Contacto2">Contacto 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Número de Documento"
              name="numeroDocumento"
              variant="outlined"
              fullWidth
              value={formData.numeroDocumento}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Fecha de Inicio"
              name="fechaInicio"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fechaInicio}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Fecha de Fin"
              name="fechaFin"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fechaFin}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Intervalo de Tiempo</InputLabel>
              <Select
                name="intervaloTiempo"
                value={formData.intervaloTiempo}
                onChange={handleInputChange}
                label="Intervalo de Tiempo"
              >
                <MenuItem value="1 mes">Cada 1 mes</MenuItem>
                <MenuItem value="3 meses">Cada 3 meses</MenuItem>
                <MenuItem value="6 meses">Cada 6 meses</MenuItem>
                <MenuItem value="1 año">Cada 1 año</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Vencimiento</InputLabel>
              <Select
                name="intervaloVencimiento"
                value={formData.intervaloVencimiento}
                onChange={handleInputChange}
                label="Vencimiento"
              >
                <MenuItem value="1 día">1 día</MenuItem>
                <MenuItem value="3 días">3 días</MenuItem>
                <MenuItem value="5 días">5 días</MenuItem>
                <MenuItem value="7 días">7 días</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Invoice Item Table */}
        <Divider sx={{ mt: 3, mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
          Conceptos
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Concepto</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>IVA</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Example item */}
              <TableRow>
                <TableCell>Producto X</TableCell>
                <TableCell>Descripción del producto</TableCell>
                <TableCell>5</TableCell>
                <TableCell>10,00€</TableCell>
                <TableCell>21%</TableCell>
                <TableCell>60,50€</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button startIcon={<AddIcon />} sx={{ mt: 2 }}>
          Añadir Concepto
        </Button>

        {/* Payment Methods Section */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
          Método de pago
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Forma de Pago</InputLabel>
              <Select
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleInputChange}
                label="Forma de Pago"
              >
                <MenuItem value="stripe">Stripe</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="transferencia">Transferencia Bancaria</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const FacturasRecurrentesVentas = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [recurringInvoices, setRecurringInvoices] = useState(recurringInvoicesData);
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

  const handleSave = (invoice) => {
    if (selectedOrder) {
      setRecurringInvoices(
        recurringInvoices.map((inv) => (inv.id === selectedOrder.id ? invoice : inv))
      );
    } else {
      invoice.id = recurringInvoices.length + 1;
      setRecurringInvoices([...recurringInvoices, invoice]);
    }
  };

  const handleDelete = (id) => {
    setRecurringInvoices(recurringInvoices.filter((inv) => inv.id !== id));
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Fade in={!isEditing} timeout={300}>
        <Box display={isEditing ? 'none' : 'block'}>
          <Header isMenuOpen={true} />
          <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
            <Box
              component="nav"
              sx={{
                width: isMenuOpen ? '240px' : '70px',
                flexShrink: 0,
                bgcolor: '#1A1A40',
                borderRight: 'none',
                overflow: 'hidden',
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
                bgcolor: '#F3F4F6',
                p: 3,
                transition: 'margin-left 0.3s ease',
                marginLeft: isMenuOpen ? '240px' : '70px',
              }}
            >
              <Container maxWidth="lg">
                <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Facturas Recurrentes de Ventas
                </Typography>

                {/* Search bar and Add Button */}
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
                    Añadir Factura Recurrente
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
                      <MenuItem key={column.id}>
                        <FormControlLabel
                          control={<Checkbox checked={visibleColumns.includes(column.id)} onChange={() => handleColumnToggle(column.id)} />}
                          label={column.label}
                        />
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                {/* Table of Recurring Invoices */}
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', mt: 4 }}>
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
                      {recurringInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          {visibleColumns.map((column) => (
                            <TableCell key={column}>{invoice[column]}</TableCell>
                          ))}
                          <TableCell>
                            <IconButton onClick={() => handleOpen(invoice)} sx={{ color: '#1A1A40' }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(invoice.id)} sx={{ color: '#B00020' }}>
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
          <RecurringInvoiceForm order={selectedOrder} handleBack={handleBack} handleSave={handleSave} />
        </Box>
      </Fade>
    </Box>
  );
};

export default FacturasRecurrentesVentas;
