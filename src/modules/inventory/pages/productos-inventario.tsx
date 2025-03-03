import React, { useState, useEffect } from 'react';
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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import { useRouter } from 'next/router';
import useAuthStore from '../../../store/useAuthStore';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import ProductService from '../services/productService';
// Importa el tipo de producto para evitar conflictos
import { Product } from '../types/Product';

// IMPORTANTE: Se importa el servicio y tipo de Instalación
import InstalationService from '../services/instalationService';
import { Instalation } from '../types/instalation';

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

// Formulario de Producto
const ProductFormPage = ({
  product,
  handleBack,
  handleSave,
}: {
  product: Product | null;
  handleBack: () => void;
  handleSave: (p: Product) => void;
}) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.contactId);

  // Estado inicial: si se está editando se carga el producto; si no, se inicializan los campos vacíos
  const [formData, setFormData] = useState<Product>(
    product || {
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
      codigoFabricacion: '',
      peso: '',
      nombreTarifa: '',
      subtotal: '',
      impuestos: '',
      total: '',
      tarifas: '',
      precioRecomendado: '',
      proveedor: '',
      costeMedio: '',
      precioCompraSubtotal: '',
      precioCompraImpuestos: '',
      precioCompraTotal: '',
      almacenPredeterminado: '',
      cantidad: 0,
      contactId: '',
      // Se añade el campo para el id de la instalación como tuple de 1 elemento
      installationId: [''] as [string],
    }
  );

  // Estado para almacenar las instalaciones obtenidas
  const [installations, setInstallations] = useState<Instalation[]>([]);

  // Obtener instalaciones al montar el componente
  useEffect(() => {
    const fetchInstallations = async () => {
      try {
        const instResponse: any = await InstalationService.getAllInstalations(token, user);
        const instData = Array.isArray(instResponse) ? instResponse : instResponse.data;

        if (Array.isArray(instData)) {
          setInstallations(instData);
        } else {
          setInstallations([]);
        }
      } catch (err) {
        console.error("Error al obtener instalaciones:", err);
      }
    };
    if (token) {
      fetchInstallations();
    }
  }, [token, user]);

  // Convertir el valor del campo "cantidad" a número
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | any
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? Number(value) : value,
    }));
  };

  // Al enviar el formulario, se utiliza el objeto de estado (inyectando el ContactId)
  const handleSubmit = () => {
    const productToSave: Product = { ...formData, contactId: user || '' };
    handleSave(productToSave);
    handleBack();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} color="primary" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
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
            {/* Columna de Nombre y Referencia */}
            <Grid item xs={12} sm={4} container direction="column">
              <TextField
                label="Nombre Producto"
                name="nombre"
                variant="outlined"
                fullWidth
                value={formData.nombre}
                onChange={handleChange}
                sx={{ borderRadius: 2, mb: 2 }}
              />
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

            {/* Columna de Descripción */}
            <Grid item xs={12} sm={8}>
              <TextField
                label="Descripción"
                name="descripcion"
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                value={formData.descripcion}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* Fila para Código de Barras, Código de Fabricación y Peso */}
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                label="Código de Fabricación"
                name="codigoFabricacion"
                variant="outlined"
                fullWidth
                value={formData.codigoFabricacion}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Peso en Kg"
                name="peso"
                variant="outlined"
                fullWidth
                value={formData.peso}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* NUEVA SECCIÓN: Desplegable para seleccionar la Instalación */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="installation-label">Instalación</InputLabel>
                <Select
                  labelId="installation-label"
                  label="Instalación"
                  name="installationId"
                  value={formData.installationId ? formData.installationId[0] : ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      // Se actualiza el tuple con el valor seleccionado
                      installationId: [e.target.value as string] as [string],
                    }))
                  }
                >
                  {Array.isArray(installations) &&
                    installations.map((inst) => (
                      <MenuItem key={inst.id} value={inst.id}>
                        {inst.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Sección Categorías (Familia/Subfamilia) */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            Categorías
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
                <InputLabel>Familia</InputLabel>
                <Select
                  label="Familia"
                  name="familia"
                  value={formData.familia || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Familia 1">Familia 1</MenuItem>
                  <MenuItem value="Familia 2">Familia 2</MenuItem>
                  <MenuItem value="Familia 3">Familia 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
                <InputLabel>Sub-familia</InputLabel>
                <Select
                  label="Sub-familia"
                  name="subFamilia"
                  value={formData.subFamilia || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Sub-familia 1">Sub-familia 1</MenuItem>
                  <MenuItem value="Sub-familia 2">Sub-familia 2</MenuItem>
                  <MenuItem value="Sub-familia 3">Sub-familia 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Sección Ventas */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            Ventas
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Nombre tarifa"
                name="nombreTarifa"
                variant="outlined"
                fullWidth
                value={formData.nombreTarifa}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Subtotal"
                name="subtotal"
                variant="outlined"
                fullWidth
                value={formData.subtotal}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Impuestos (IVA 21%)"
                name="impuestos"
                variant="outlined"
                fullWidth
                value={formData.impuestos}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Total"
                name="total"
                variant="outlined"
                fullWidth
                value={formData.total}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Tarifas</InputLabel>
                <Select
                  name="tarifas"
                  value={formData.tarifas || ''}
                  onChange={handleChange}
                  label="Tarifas"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="Tarifa 1">Tarifa 1</MenuItem>
                  <MenuItem value="Tarifa 2">Tarifa 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Precio recomendado</InputLabel>
                <Select
                  name="precioRecomendado"
                  value={formData.precioRecomendado || ''}
                  onChange={handleChange}
                  label="Precio"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="Precio 1">Precio 1</MenuItem>
                  <MenuItem value="Precio 2">Precio 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Sección Compras */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            Compras
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Proveedor"
                name="proveedor"
                variant="outlined"
                fullWidth
                value={formData.proveedor}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Coste Medio"
                name="costeMedio"
                variant="outlined"
                fullWidth
                value={formData.costeMedio}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            Precio Compra
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Subtotal"
                name="precioCompraSubtotal"
                variant="outlined"
                fullWidth
                value={formData.precioCompraSubtotal}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Impuestos (IVA 21%)"
                name="precioCompraImpuestos"
                variant="outlined"
                fullWidth
                value={formData.precioCompraImpuestos}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Total"
                name="precioCompraTotal"
                variant="outlined"
                fullWidth
                value={formData.precioCompraTotal}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Sección Stock */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            Stock
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
                <InputLabel id="almacen-predeterminado-label">
                  Almacén Predeterminado
                </InputLabel>
                <Select
                  labelId="almacen-predeterminado-label"
                  id="almacen-predeterminado"
                  name="almacenPredeterminado"
                  value={formData.almacenPredeterminado || ''}
                  onChange={handleChange}
                  label="Almacén Predeterminado"
                >
                  <MenuItem value="Almacén 1">Almacén 1</MenuItem>
                  <MenuItem value="Almacén 2">Almacén 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cantidad"
                name="cantidad"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.cantidad}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 0 } }}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Gestión de Inventario (Variantes / Lotes) */}
      <Card elevation={3} sx={{ mb: 4, mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
            Gestión de Inventario
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item>
              <ToggleButtonGroup exclusive aria-label="Menú Principal" value="variantes">
                <ToggleButton value="variantes" aria-label="Gestionar variantes">
                  Gestionar Variantes
                </ToggleButton>
                <ToggleButton value="lotes" aria-label="Gestionar lotes">
                  Gestionar Lotes
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          <Box>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item>
                <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
                  Precios de Compra
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" sx={{ borderRadius: 2 }}>
                  Precios de Venta
                </Button>
              </Grid>
              <Grid item xs>
                <TextField
                  name="buscarVariante"  // Added name attribute for autofill/accessibility
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar Variante"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item>
                <IconButton>{/* Icono opcional */}</IconButton>
              </Grid>
            </Grid>

            {/* Tabla de Variantes (ejemplo estático) */}
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table aria-label="tabla de variantes">
                <TableHead>
                  <TableRow>
                    <TableCell>Referencia</TableCell>
                    <TableCell>Cód. Barras</TableCell>
                    <TableCell>Cód. Fábrica</TableCell>
                    <TableCell>Precio Venta</TableCell>
                    <TableCell>Precio Compra</TableCell>
                    <TableCell>Peso</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Fila de ejemplo */}
                  <TableRow>
                    <TableCell>000001</TableCell>
                    <TableCell>123456789012</TableCell>
                    <TableCell>ABCDEF</TableCell>
                    <TableCell>1.555,55€</TableCell>
                    <TableCell>1.999,55€</TableCell>
                    <TableCell>1KG</TableCell>
                    <TableCell>988</TableCell>
                    <TableCell>
                      <IconButton color="primary" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Configuración de Fechas de Lotes (ejemplo estático) */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
              Configuración de Fechas de Lotes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <ToggleButtonGroup exclusive aria-label="Toggle Fechas" value="inicio">
                  <ToggleButton value="inicio" aria-label="Fecha Inicio">
                    10/05/2024
                  </ToggleButton>
                  <ToggleButton value="final" aria-label="Fecha Final">
                    10/11/2024
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>
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
            '&:hover': { bgcolor: 'primary.dark' },
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

const Productos = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  // Estado de hidratación
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Redirección a login si no existe token (después de hidratar)
  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  // Estados para sidebar, carga, errores, productos y edición
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.id)
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Función para obtener productos desde el API
  const fetchProducts = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.getAllProducts(token);
      if (response) {
        const mappedProducts = response.map((p: any) => ({
          referencia: p.reference,
          nombre: p.name,
          descripcion: p.description,
          familia: p.companyCode,
          subFamilia: p.subFamily || '',
          unidadMedida: '',
          precio: p.recommendedPrice?.toString() || '',
          iva: '',
          descuento: '',
          codigoBarras: p.barCode,
          codigoFabricacion: p.manufacturingCode,
          peso: p.weight?.toString() || '',
          nombreTarifa: p.rateName,
          subtotal: '',
          impuestos: '',
          total: '',
          tarifas: '',
          precioRecomendado: p.recommendedPrice?.toString() || '',
          proveedor: p.supplier,
          costeMedio: p.avarageCost?.toString() || '',
          precioCompraSubtotal: '',
          precioCompraImpuestos: '',
          precioCompraTotal: '',
          almacenPredeterminado: p.wareHouse,
          cantidad: p.stock,
          id: p.id,
          contactId: '',
          // Se asigna installationId como tuple de 1 elemento (vacío por defecto)
          installationId: [''] as [string],
        }));
        setProducts(mappedProducts);
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un problema al cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos cuando la app esté hidratada y exista token
  useEffect(() => {
    if (hydrated && token) {
      fetchProducts();
    }
  }, [hydrated, token]);

  // Abrir formulario para crear o editar producto
  const handleOpen = (product: Product | null = null) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  // Volver al listado
  const handleBack = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };

  // Guardar producto (crear o actualizar)
  const handleSave = async (product: Product) => {
    if (!token) return;
    try {
      if (product.id) {
        // Actualizar producto existente
        const response = await ProductService.updateProduct(product, token);
        if (response) {
          setProducts((prev) =>
            prev.map((p) => (p.id === product.id ? response : p))
          );
        }
      } else {
        // Crear nuevo producto
        const response = await ProductService.createProduct(product, token);
        if (response) {
          // Opción A: Actualizar el estado agregando el producto devuelto
          setProducts((prev) => [...prev, response]);
          
          // Opción B (alternativa): Volver a obtener la lista completa desde el backend
          // await fetchProducts();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  // Eliminar producto
  const handleDelete = async (productId: number | string) => {
    if (!token) return;
    try {
      await ProductService.deleteProduct(productId, token);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle de columnas visibles
  const handleColumnToggle = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  // Menú para selección de columnas
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Toggle del sidebar
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      {/* Vista de listado de productos */}
      <Fade in={!isEditing} timeout={300}>
        <Box display={isEditing ? 'none' : 'block'} sx={{ flexGrow: 1 }}>
          <Header isMenuOpen={isMenuOpen} />
          <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
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
                bgcolor: '#F3F4F6',
                p: 3,
                transition: 'margin-left 0.3s ease',
                marginLeft: isMenuOpen ? '240px' : '70px',
                maxWidth: 'calc(100% - 240px)',
              }}
            >
              <Container maxWidth="xl">
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ color: '#1A1A40', fontWeight: '700' }}
                >
                  Productos
                </Typography>

                {loading && (
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Cargando productos...
                  </Typography>
                )}
                {error && (
                  <Typography variant="h6" sx={{ mb: 2, color: 'red' }}>
                    {error}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <TextField
                    name="buscarProducto"  // Added name attribute for autofill/accessibility
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
                    onClick={() => handleOpen(null)}
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
                      '&:hover': { bgcolor: '#FF8C00' },
                      minWidth: '48px',
                      minHeight: '48px',
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
                      style: { maxHeight: '400px', width: '250px' },
                    }}
                  >
                    {allColumns.map((column) => (
                      <DropdownMenuItem key={column.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={visibleColumns.includes(column.id)}
                              onChange={() => handleColumnToggle(column.id)}
                            />
                          }
                          label={column.label}
                        />
                      </DropdownMenuItem>
                    ))}
                  </Menu>
                </Box>

                {/* Tabla de productos */}
                <TableContainer
                  component={Paper}
                  sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                >
                  <Table>
                    <TableHead
                      sx={{
                        bgcolor: '#2666CF',
                        '& th': { color: '#ffffff', fontWeight: '700' },
                      }}
                    >
                      <TableRow>
                        {allColumns.map((column) =>
                          visibleColumns.includes(column.id) ? (
                            <TableCell key={column.id}>{column.label}</TableCell>
                          ) : null
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
                            '&:hover': {
                              bgcolor: '#e3f2fd',
                              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            },
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                          }}
                        >
                          {visibleColumns.map((colId) => (
                            <TableCell key={colId}>
                              {(product as any)[colId]}
                            </TableCell>
                          ))}
                          <TableCell align="center">
                            <IconButton
                              onClick={() => handleOpen(product)}
                              sx={{ color: '#1A1A40', marginRight: 1 }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(product.id!)}
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

      {/* Vista del formulario (para crear/editar) */}
      <Fade in={isEditing} timeout={300}>
        <Box display={isEditing ? 'block' : 'none'}>
          <ProductFormPage
            product={selectedProduct}
            handleBack={handleBack}
            handleSave={handleSave}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default Productos;
