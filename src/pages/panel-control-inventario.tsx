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
  Snackbar,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from 'componentes/Header';
import Sidebar from 'componentes/Sidebar';

// Columnas de la tabla de inventario
const inventoryColumns = [
  { id: 'ref', label: 'Ref. Pro.' },
  { id: 'nombre', label: 'Nombre' },
  { id: 'codigoBarras', label: 'Código de Barras' },
  { id: 'stock', label: 'Stock' },
  { id: 'precio', label: 'Precio' },
  { id: 'acciones', label: 'Acciones' },
];

// Ejemplo de datos para la tabla de inventario
const inventoryData = [
  { id: 1, ref: 'A001', nombre: 'Producto A', codigoBarras: '1234567890123', stock: 100, precio: '€50.00' },
  { id: 2, ref: 'B002', nombre: 'Producto B', codigoBarras: '1234567890456', stock: 50, precio: '€30.00' },
  { id: 3, ref: 'C003', nombre: 'Producto C', codigoBarras: '1234567890789', stock: 200, precio: '€20.00' },
  { id: 4, ref: 'D004', nombre: 'Producto D', codigoBarras: '1234567891011', stock: 0, precio: '€15.00' },
];

const InventoryControlPanel = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventory, setInventory] = useState(inventoryData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState(inventoryColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);
  const [stockMovement, setStockMovement] = useState({
    warehouse: '',
    date: '',
    description: '',
  });
  const [stockTransfer, setStockTransfer] = useState({
    sourceWarehouse: '',
    destinationWarehouse: '',
    date: '',
    description: '',
  });
  const [barcodeSettings, setBarcodeSettings] = useState({
    product: '',
    quantity: 1,
    labelFormat: '',
    barcodeFormat: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpen = (item = null) => {
    setSelectedItem(item);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedItem(null);
    setStockMovement({ warehouse: '', date: '', description: '' });
    setStockTransfer({ sourceWarehouse: '', destinationWarehouse: '', date: '', description: '' });
  };

  const handleSave = (item) => {
    if (selectedItem) {
      setInventory(inventory.map((i) => (i.id === item.id ? item : i)));
      setSnackbar({ open: true, message: 'Item actualizado con éxito', severity: 'success' });
    } else {
      item.id = inventory.length + 1;
      setInventory([...inventory, item]);
      setSnackbar({ open: true, message: 'Nuevo item añadido con éxito', severity: 'success' });
    }
    handleBack();
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter((i) => i.id !== id));
    setSnackbar({ open: true, message: 'Item eliminado con éxito', severity: 'error' });
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

  const handleStockMovementChange = (field, value) => {
    setStockMovement((prev) => ({ ...prev, [field]: value }));
  };

  const handleStockTransferChange = (field, value) => {
    setStockTransfer((prev) => ({ ...prev, [field]: value }));
  };

  const handleBarcodeSettingsChange = (field, value) => {
    setBarcodeSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
    item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
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
                  Panel de Control del Inventario
                </Typography>
                <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap', gap: 1 }}>
                  <TextField 
                    variant="outlined" 
                    placeholder="Buscar productos..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                    Nuevo Producto
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
                    {inventoryColumns.map((column) => (
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
                        {inventoryColumns.map((column) =>
                          visibleColumns.includes(column.id) ? <TableCell key={column.id}>{column.label}</TableCell> : null
                        )}
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredInventory.map((item) => (
                        <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                          {visibleColumns.map((column) => (
                            <TableCell key={column}>{item[column]}</TableCell>
                          ))}
                          <TableCell>
                            <IconButton onClick={() => handleOpen(item)} sx={{ color: '#1A1A40' }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(item.id)} sx={{ color: '#B00020' }}>
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

      {/* Edición o creación de un nuevo item de inventario */}
      <Fade in={isEditing} timeout={300}>
        <Box display={isEditing ? 'block' : 'none'}>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <IconButton onClick={handleBack} color="primary" sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                {selectedItem ? 'Editar Item de Inventario' : 'Nuevo Movimiento de Inventario'}
              </Typography>
            </Box>

            {/* Aquí iría el formulario para la actualización del stock */}
            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
              <Grid container spacing={4}>
                {/* Campos para actualizar stock */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Instalación afectada</InputLabel>
                    <Select
                      value={stockMovement.warehouse}
                      onChange={(e) => handleStockMovementChange('warehouse', e.target.value)}
                    >
                      <MenuItem value="Taller Madrid">Taller Madrid</MenuItem>
                      <MenuItem value="Taller Barcelona">Taller Barcelona</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha"
                    type="date"
                    value={stockMovement.date}
                    onChange={(e) => handleStockMovementChange('date', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Descripción del movimiento"
                    value={stockMovement.description}
                    onChange={(e) => handleStockMovementChange('description', e.target.value)}
                    multiline
                    rows={2}
                    fullWidth
                  />
                </Grid>
                {/* Campos para transferencia de stock */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Almacén de origen</InputLabel>
                    <Select
                      value={stockTransfer.sourceWarehouse}
                      onChange={(e) => handleStockTransferChange('sourceWarehouse', e.target.value)}
                    >
                      <MenuItem value="Taller Madrid">Taller Madrid</MenuItem>
                      <MenuItem value="Taller Barcelona">Taller Barcelona</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Almacén de destino</InputLabel>
                    <Select
                      value={stockTransfer.destinationWarehouse}
                      onChange={(e) => handleStockTransferChange('destinationWarehouse', e.target.value)}
                    >
                      <MenuItem value="Taller Madrid">Taller Madrid</MenuItem>
                      <MenuItem value="Taller Barcelona">Taller Barcelona</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Fecha de transferencia"
                    type="date"
                    value={stockTransfer.date}
                    onChange={(e) => handleStockTransferChange('date', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Descripción de la transferencia"
                    value={stockTransfer.description}
                    onChange={(e) => handleStockTransferChange('description', e.target.value)}
                    multiline
                    rows={2}
                    fullWidth
                  />
                </Grid>
              </Grid>

              {/* Opciones adicionales y acciones */}
              <Divider sx={{ my: 4 }} />

              {/* Botón de Guardar */}
              <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave(selectedItem)}
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
            </Paper>
          </Container>
        </Box>
      </Fade>

      {/* Snackbar para retroalimentación */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InventoryControlPanel;
