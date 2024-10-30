import { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  SelectChangeEvent,
  Chip
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
import { useRouter } from 'next/router';

// Simulación de datos de productos en inventario
const productosInventario = [
  { concepto: 'Arandela', descripcion: 'Arandela metálica', precio: 0.13, impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }] },
  { concepto: 'Tornillo', descripcion: 'Tornillo acero', precio: 0.25, impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }] },
];

// Datos de impuestos disponibles
const impuestosDisponibles = [
  { nombre: 'IVA 21%', valor: 0.21 },
  { nombre: 'Rec. eq. 5.2%', valor: 0.052 },
];

// Definir el tipo para Producto
interface Producto {
  concepto: string;
  descripcion: string;
  cantidad: number;
  unidades: string;
  precio: number;
  impuestos: { nombre: string; valor: number }[];
  total: number;
}

// Función para calcular el total de impuestos
const calcularImpuestos = (precio: number, cantidad: number, impuestos: { nombre: string; valor: number }[]) => {
  return impuestos.reduce((acc, impuesto) => acc + (precio * cantidad * impuesto.valor), 0);
};

// Función para calcular el coste total
const calcularTotal = (subtotal: number, impuestos: number) => {
  return subtotal + impuestos;
};

// Columnas de la tabla de pedidos de compras
const allColumns = [
  { id: 'numero', label: 'Número' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'recogida', label: 'Recogida' },
  { id: 'proveedor', label: 'Proveedor' }, // Cambiado a proveedor
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
];

// Datos de ejemplo para la tabla de pedidos
const ordersData = [];

const OrderPage = ({ order, handleBack, handleSave }) => {
  const [formData, setFormData] = useState(order || {
    proveedor: '', // Cambiado a proveedor
    numeroDocumento: '',
    fechaDocumento: '',
    fechaVencimiento: '',
    metodoPago: '',
    cuentaContable: '' // Campo para la cuenta contable
  });

  // Estado para manejar la tabla de productos
  const [productos, setProductos] = useState<Producto[]>([
    {
      concepto: 'Arandela',
      descripcion: 'Arandela metálica',
      cantidad: 400,
      unidades: 'unidades',
      precio: 1.13,
      impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }],
      total: 61.92
    }
  ]);

  // Estado para totales
  const [subtotal, setSubtotal] = useState(452);
  const [totalImpuestos, setTotalImpuestos] = useState(94.92);
  const [total, setTotal] = useState(546.92);

  // Estado para el diálogo de creación de producto
  const [openDialog, setOpenDialog] = useState(false);

  // Manejador para agregar una nueva fila a la tabla
  const handleAddRow = () => {
    setProductos([...productos, { concepto: '', descripcion: '', cantidad: 0, unidades: '', precio: 0, impuestos: [], total: 0 }]);
  };

  // Función para eliminar una fila de productos
  const handleDeleteRow = (index: number) => {
    const updatedProductos = productos.filter((_, i) => i !== index);
    setProductos(updatedProductos);
    recalcularTotales(updatedProductos);
  };

  // Función para actualizar los valores de las celdas de la tabla
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const updatedProductos: Producto[] = [...productos];
    const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;

    if (name === 'concepto' || name === 'descripcion' || name === 'unidades') {
      updatedProductos[index][name as 'concepto' | 'descripcion' | 'unidades'] = value;
    } else if (name === 'impuestos') {
      updatedProductos[index].impuestos = value as unknown as { nombre: string; valor: number }[];
    } else {
      console.warn(`El campo "${name}" no es una propiedad válida del objeto Producto.`);
    }

    setProductos(updatedProductos);
    recalcularTotales(updatedProductos);
  };

  // Función para manejar el autocompletado del producto
  const handleProductoSeleccionado = (index: number, newValue: string | null) => {
    if (!newValue) return;
    const productoSeleccionado = productosInventario.find(p => p.concepto === newValue);
    if (productoSeleccionado) {
      const updatedProductos = [...productos];
      updatedProductos[index] = {
        ...updatedProductos[index],
        concepto: productoSeleccionado.concepto,
        descripcion: productoSeleccionado.descripcion,
        precio: productoSeleccionado.precio,
        impuestos: productoSeleccionado.impuestos,
        total: productoSeleccionado.precio * updatedProductos[index].cantidad
      };
      setProductos(updatedProductos);
      recalcularTotales(updatedProductos);
    }
  };

  // Función para recalcular subtotal, impuestos y total
  const recalcularTotales = (productosActualizados: Producto[]) => {
    const nuevoSubtotal = productosActualizados.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const nuevoTotalImpuestos = productosActualizados.reduce((acc, producto) => acc + calcularImpuestos(producto.precio, producto.cantidad, producto.impuestos), 0);
    const nuevoTotal = calcularTotal(nuevoSubtotal, nuevoTotalImpuestos);

    setSubtotal(nuevoSubtotal);
    setTotalImpuestos(nuevoTotalImpuestos);
    setTotal(nuevoTotal);
  };

  const handleSubmit = () => {
    handleSave({ ...formData, productos });
    handleBack();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Botón para volver atrás */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} color="primary" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {order ? 'Editar Pedido' : 'Nuevo Pedido de Compra'}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        {/* Sección de datos del pedido */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Proveedor</InputLabel> {/* Cambiado a Proveedor */}
              <Select
                name="proveedor"
                value={formData.proveedor}
                onChange={(event) => handleInputChange(0, event)}
                label="Proveedor"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="Proveedor1">Proveedor 1</MenuItem>
                <MenuItem value="Proveedor2">Proveedor 2</MenuItem>
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
              onChange={(event) => handleInputChange(0, event)}
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
              onChange={(event) => handleInputChange(0, event)}
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
              onChange={(event) => handleInputChange(0, event)}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        </Grid>

        {/* Tabla de productos */}
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
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos.map((producto, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Autocomplete
                        freeSolo
                        options={productosInventario.map(p => p.concepto)}
                        value={producto.concepto}
                        onChange={(event, newValue) => handleProductoSeleccionado(index, newValue as string)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Concepto"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              style: { minWidth: 200 },
                            }}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="cantidad"
                        type="number"
                        value={producto.cantidad}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        name="unidades"
                        value={producto.unidades}
                        onChange={(event) => handleInputChange(index, event)}
                        fullWidth
                      >
                        <MenuItem value="unidades">Unidades</MenuItem>
                        <MenuItem value="kg">Kg</MenuItem>
                        <MenuItem value="litros">Litros</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="precio"
                        type="number"
                        value={producto.precio}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        multiple
                        options={impuestosDisponibles}
                        getOptionLabel={(option) => option.nombre}
                        value={producto.impuestos}
                        onChange={(event, newValue) => {
                          const updatedProductos = [...productos];
                          updatedProductos[index].impuestos = newValue as { nombre: string; valor: number }[];
                          setProductos(updatedProductos);
                          recalcularTotales(updatedProductos);
                        }}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip label={option.nombre} {...getTagProps({ index })} />
                          ))
                        }
                        renderInput={(params) => <TextField {...params} variant="outlined" label="Impuestos" />}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="total"
                        type="number"
                        value={producto.total.toFixed(2)}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteRow(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Botón para añadir filas */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddRow}
            sx={{ borderRadius: 2 }}
          >
            Añadir Producto
          </Button>
        </Box>
        <Divider sx={{ my: 4 }} />

        {/* Sección de Método de Pago, Cuenta Contable y Totales */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Columna izquierda: Forma de pago y cuenta contable */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Método de pago</Typography>
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel>Selecciona una forma de pago</InputLabel>
              <Select
                name="metodoPago"
                value={formData.metodoPago}
                onChange={(event) => handleInputChange(0, event)}
                label="Selecciona una forma de pago"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="forma1">Forma de pago 1</MenuItem>
                <MenuItem value="forma2">Forma de pago 2</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Categorización</Typography>
            <TextField
              label="Cuenta contable"
              name="cuentaContable"
              variant="outlined"
              fullWidth
              value={formData.cuentaContable}
              onChange={(event) => handleInputChange(0, event)}
              sx={{ borderRadius: 2 }}
            />
          </Grid>

          {/* Columna derecha: Totales */}
          <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
            <Box sx={{ width: '300px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Subtotal</Typography>
              <Typography variant="body1">{subtotal.toFixed(2)}€</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Impuestos</Typography>
              <Typography variant="body1">{totalImpuestos.toFixed(2)}€</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{total.toFixed(2)}€</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

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
      </Paper>
    </Container>
  );
};

const PedidosCompras = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(ordersData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();
  const { new: isNew } = router.query;

  useEffect(() => {
    if (isNew) {
      handleOpen();
    }
  }, [isNew]);

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
                  Pedidos de Compras
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
                    Añadir Pedido
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
                          visibleColumns.includes(column.id) ? <TableCell key={column.id}>{column.label}</TableCell> : null
                        )}
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                          {visibleColumns.map((column) => (
                            <TableCell key={column}>{order[column]}</TableCell>
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

export default PedidosCompras;
