import React, { useState } from 'react';
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
  Menu,
  MenuItem as DropdownMenuItem,
  Grid,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
  Fade,
  MenuItem,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Header from 'componentes/Header';
import Sidebar from 'componentes/Sidebar';

// Columnas de la tabla de productos
const allColumns = [
  { id: 'referencia', label: 'Referencia' },
  { id: 'nombre', label: 'Nombre' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'familia', label: 'Familia' },
  { id: 'subFamilia', label: 'Sub-familia' },
  { id: 'unidadMedida', label: 'Unidad de Medida' },
  { id: 'precio', label: 'Precio' },
  { id: 'iva', label: 'IVA' },
  { id: 'descuento', label: 'Descuento' },
  { id: 'codigoBarras', label: 'Código de Barras' },
];

// Datos de ejemplo para la tabla de productos
const productsData = [
  {
    id: 1,
    referencia: 'P001',
    nombre: 'Producto A',
    descripcion: 'Descripción del producto A',
    familia: 'Familia 1',
    subFamilia: 'Sub-familia 1',
    unidadMedida: 'Kg',
    precio: '100€',
    iva: '21%',
    descuento: '5%',
    codigoBarras: '1234567890123',
  },
  {
    id: 2,
    referencia: 'P002',
    nombre: 'Producto B',
    descripcion: 'Descripción del producto B',
    familia: 'Familia 2',
    subFamilia: 'Sub-familia 2',
    unidadMedida: 'Litros',
    precio: '80€',
    iva: '21%',
    descuento: '0%',
    codigoBarras: '1234567890456',
  },
  {
    id: 3,
    referencia: 'P003',
    nombre: 'Producto C',
    descripcion: 'Descripción del producto C',
    familia: 'Familia 1',
    subFamilia: 'Sub-familia 1',
    unidadMedida: 'Unidades',
    precio: '120€',
    iva: '21%',
    descuento: '3%',
    codigoBarras: '1234567890111',
  },
];

// Página del formulario de productos
const ProductFormPage = ({ product, handleBack, handleSave }) => {
  const [formData, setFormData] = useState(product || {
    referencia: '',
    nombre: '',
    descripcion: '',
    familia: '',
    subFamilia: '',
    unidadMedida: '',
    precio: '',
    iva: '',
    descuento: '',
    codigoBarras: '',
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} color="primary" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {product ? 'Editar Producto' : 'Nuevo Producto'}
        </Typography>
      </Box>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            Información del Producto
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Referencia"
                name="referencia"
                variant="outlined"
                fullWidth
                value={formData.referencia}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre del Producto"
                name="nombre"
                variant="outlined"
                fullWidth
                value={formData.nombre}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={formData.descripcion}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            Detalles de Ventas
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Familia</InputLabel>
                <Select
                  name="familia"
                  value={formData.familia}
                  onChange={handleChange}
                  label="Familia"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="Familia 1">Familia 1</MenuItem>
                  <MenuItem value="Familia 2">Familia 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sub-familia</InputLabel>
                <Select
                  name="subFamilia"
                  value={formData.subFamilia}
                  onChange={handleChange}
                  label="Sub-familia"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="Sub-familia 1">Sub-familia 1</MenuItem>
                  <MenuItem value="Sub-familia 2">Sub-familia 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Unidad de Medida</InputLabel>
                <Select
                  name="unidadMedida"
                  value={formData.unidadMedida}
                  onChange={handleChange}
                  label="Unidad de Medida"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="Kg">Kg</MenuItem>
                  <MenuItem value="Litros">Litros</MenuItem>
                  <MenuItem value="Unidades">Unidades</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio"
                name="precio"
                variant="outlined"
                fullWidth
                value={formData.precio}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="IVA"
                name="iva"
                variant="outlined"
                fullWidth
                value={formData.iva}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Descuento"
                name="descuento"
                variant="outlined"
                fullWidth
                value={formData.descuento}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código de Barras"
                name="codigoBarras"
                variant="outlined"
                fullWidth
                value={formData.codigoBarras}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Botón de Guardar */}
      <Box display="flex" justifyContent="flex-end">
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
            paddingX: 4,
            paddingY: 1.5,
            fontSize: '1rem',
          }}
        >
          Guardar Producto
        </Button>
      </Box>
    </Container>
  );
};

// Página principal de productos
const Productos = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (product = null) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handleSave = (product) => {
    if (selectedProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      product.id = products.length + 1;
      setProducts([...products, product]);
    }
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
        <Box display={isEditing ? 'none' : 'block'} sx={{ flexGrow: 1 }}>
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
              <Sidebar isMenuOpen={true} toggleMenu={() => {}} />
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
              <Container maxWidth="xl">
                <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '700' }}>
                  Productos
                </Typography>
                <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <TextField 
                    variant="outlined" 
                    placeholder="Buscar..." 
                    fullWidth 
                    sx={{ flexGrow: 1, maxWidth: '400px' }}
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
                    sx={{ 
                      bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', 
                      color: '#ffffff', 
                      fontWeight: '600', 
                      textTransform: 'none', 
                      borderRadius: 2, 
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
                      minWidth: '150px',
                      paddingY: 1,
                      '&:hover': {
                        bgcolor: 'linear-gradient(90deg, #1B4F72, #5063AF)',
                      },
                    }} 
                    startIcon={<AddIcon />} 
                    onClick={() => handleOpen()}
                  >
                    Añadir Producto
                  </Button>
                  <IconButton
                    sx={{
                      bgcolor: '#FFA500',
                      color: '#ffffff',
                      borderRadius: 2,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                  <Table>
                    <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '700' } }}>
                      <TableRow>
                        {allColumns.map((column) =>
                          visibleColumns.includes(column.id) ? <TableCell key={column.id}>{column.label}</TableCell> : null
                        )}
                        <TableCell align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product, index) => (
                        <TableRow 
                          key={product.id} 
                          sx={{ 
                            bgcolor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                            '&:hover': { bgcolor: '#e3f2fd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                          }}
                        >
                          {visibleColumns.map((column) => (
                            <TableCell key={column}>{product[column]}</TableCell>
                          ))}
                          <TableCell align="center">
                            <IconButton onClick={() => handleOpen(product)} sx={{ color: '#1A1A40', marginRight: 1 }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              onClick={() => setProducts(products.filter((p) => p.id !== product.id))} 
                              sx={{ color: '#B00020' }}
                            >
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
          <ProductFormPage product={selectedProduct} handleBack={handleBack} handleSave={handleSave} />
        </Box>
      </Fade>
    </Box>
  );
};

export default Productos;
