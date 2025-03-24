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
  Chip,
  SelectChangeEvent
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
import PrefixConfigService from '../services/PrefixConfigService';
import useAuthStore from '../../../store/useAuthStore';

// Simulación de datos de productos para presupuestos
const productosPresupuesto = [
  { concepto: 'Placa', descripcion: 'Placa de acero inoxidable', precio: 12.50, impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }] },
  { concepto: 'Tuerca', descripcion: 'Tuerca roscada', precio: 0.45, impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }] },
];

// Datos de impuestos disponibles
const impuestosDisponibles = [
  { nombre: 'IVA 21%', valor: 0.21 },
  { nombre: 'Rec. eq. 5.2%', valor: 0.052 },
];

// Tipo para Producto en Presupuesto
interface Producto {
  concepto: string;
  descripcion: string;
  cantidad: number;
  unidades: string;
  precio: number;
  impuestos: { nombre: string; valor: number }[];
  total: number;
}

// Funciones para calcular impuestos y totales
const calcularImpuestos = (precio: number, cantidad: number, impuestos: { nombre: string; valor: number }[]) =>
  impuestos.reduce((acc, impuesto) => acc + (precio * cantidad * impuesto.valor), 0);

const calcularTotal = (subtotal: number, impuestos: number) => subtotal + impuestos;

// Columnas de la tabla de presupuestos
const allColumns = [
  { id: 'numero', label: 'Número' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'validez', label: 'Validez' },
  { id: 'unidades', label: 'Unidades' },
  { id: 'iva', label: 'IVA' },
  { id: 'recargo', label: 'Recargo de Equivalencia' },
  { id: 'subtotal', label: 'Subtotal' },
  { id: 'total', label: 'Total' },
  { id: 'estado', label: 'Estado' },
];

// Datos de ejemplo para la tabla de presupuestos
const budgetsData = [];

// Componente que gestiona la creación/edición de un presupuesto
const BudgetPage = ({ budget, handleBack, handleSave }) => {
  const [formData, setFormData] = useState(budget || {
    cliente: '',
    numeroDocumento: '',
    fechaDocumento: '',
    fechaValidez: '',
  });

  // Estado para la tabla de productos
  const [productos, setProductos] = useState<Producto[]>([
    {
      concepto: 'Placa',
      descripcion: 'Placa de acero inoxidable',
      cantidad: 10,
      unidades: 'unidades',
      precio: 12.50,
      impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }],
      total: 151.25,
    },
  ]);

  // Estados para totales
  const [subtotal, setSubtotal] = useState(125.00);
  const [totalImpuestos, setTotalImpuestos] = useState(26.25);
  const [total, setTotal] = useState(151.25);

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

  // Función para actualizar los valores de las celdas
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ name?: string; value: unknown; }> | SelectChangeEvent<string>
  ) => {
    const updatedProductos: Producto[] = [...productos];
    const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;
    
    if (name === 'concepto' || name === 'descripcion' || name === 'unidades') {
      updatedProductos[index][name as 'concepto' | 'descripcion' | 'unidades'] = value;
    } else if (name === 'cantidad' || name === 'precio') {
      updatedProductos[index][name as 'cantidad' | 'precio'] = parseFloat(value as string);
    } else {
      console.warn(`El campo "${name}" no es una propiedad válida del objeto Producto.`);
    }

    setProductos(updatedProductos);
    recalcularTotales(updatedProductos);
  };

  // Función para manejar el autocompletado del producto
  const handleProductoSeleccionado = (index: number, newValue: string | null) => {
    if (!newValue) return;
    const productoSeleccionado = productosPresupuesto.find(p => p.concepto === newValue);
    if (productoSeleccionado) {
      const updatedProductos = [...productos];
      updatedProductos[index] = {
        ...updatedProductos[index],
        concepto: productoSeleccionado.concepto,
        descripcion: productoSeleccionado.descripcion,
        precio: productoSeleccionado.precio,
        impuestos: productoSeleccionado.impuestos,
        total: productoSeleccionado.precio * updatedProductos[index].cantidad,
      };
      setProductos(updatedProductos);
      recalcularTotales(updatedProductos);
    }
  };

  // Función para recalcular subtotal, impuestos y total
  const recalcularTotales = (productosActualizados: Producto[]) => {
    const nuevoSubtotal = productosActualizados.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const nuevoTotalImpuestos = productosActualizados.reduce(
      (acc, producto) => acc + calcularImpuestos(producto.precio, producto.cantidad, producto.impuestos),
      0
    );
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
          {budget ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        {/* Sección de datos del presupuesto */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Cliente"
              name="cliente"
              variant="outlined"
              fullWidth
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Número de presupuesto"
              name="numeroDocumento"
              variant="outlined"
              fullWidth
              value={formData.numeroDocumento}
              onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Fecha del presupuesto"
              name="fechaDocumento"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fechaDocumento}
              onChange={(e) => setFormData({ ...formData, fechaDocumento: e.target.value })}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Fecha de validez"
              name="fechaValidez"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fechaValidez}
              onChange={(e) => setFormData({ ...formData, fechaValidez: e.target.value })}
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
                        options={productosPresupuesto.map((p) => p.concepto)}
                        value={producto.concepto}
                        onChange={(event, newValue) => handleProductoSeleccionado(index, newValue as string)}
                        renderInput={(params) => (
                          <TextField {...params} label="Concepto" variant="outlined" fullWidth />
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
                          value.map((option, idx) => {
                            const { key, ...other } = getTagProps({ index: idx });
                            return <Chip key={key} label={option.nombre} {...other} />;
                          })
                        }
                        renderInput={(params) => <TextField {...params} variant="outlined" label="Impuestos" />}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="total"
                        type="number"
                        value={producto.total.toFixed(2)}
                        variant="outlined"
                        fullWidth
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={() => handleDeleteRow(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

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

        {/* Sección de Totales */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
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
              '&:hover': { bgcolor: 'primary.dark' },
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

const Presupuestos = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const contactId = useAuthStore((state) => state.contactId);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [budgets, setBudgets] = useState(budgetsData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);

  const { new: isNew } = router.query;

  useEffect(() => {
    if (isNew) {
      handleOpen();
    }
  }, [isNew]);

  const handleOpen = async (budget = null) => {
    if (!budget) {
      try {
        // Se utiliza el token y contactId reales del usuario
        const prefixConfigs = await PrefixConfigService.getByContactId(token, contactId);
        const firstPrefix = prefixConfigs[0]?.prefix || 'BUD-XXXX';
        
        setSelectedBudget({
          cliente: '',
          numeroDocumento: firstPrefix,
          fechaDocumento: '',
          fechaValidez: '',
        });
      } catch (error) {
        console.error('Error fetching prefix config:', error);
        setSelectedBudget({
          cliente: '',
          numeroDocumento: '',
          fechaDocumento: '',
          fechaValidez: '',
        });
      }
    } else {
      setSelectedBudget(budget);
    }
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedBudget(null);
  };

  const handleSave = (budget) => {
    if (selectedBudget && selectedBudget.id) {
      setBudgets(budgets.map((b) => (b.id === budget.id ? budget : b)));
    } else {
      budget.id = budgets.length + 1;
      setBudgets([...budgets, budget]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
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
                  Presupuestos
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
                    Añadir Presupuesto
                  </Button>
                  <IconButton
                    sx={{
                      bgcolor: '#FFA500',
                      color: '#ffffff',
                      borderRadius: 2,
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'background-color 0.3s ease',
                      '&:hover': { bgcolor: '#FF8C00' },
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
                    PaperProps={{ style: { maxHeight: '400px', width: '250px' } }}
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
                      {budgets.map((budget) => (
                        <TableRow key={budget.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                          {visibleColumns.map((column) => (
                            <TableCell key={column}>{budget[column]}</TableCell>
                          ))}
                          <TableCell>
                            <IconButton onClick={() => handleOpen(budget)} sx={{ color: '#1A1A40' }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => setBudgets(budgets.filter((b) => b.id !== budget.id))} sx={{ color: '#B00020' }}>
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
          <BudgetPage budget={selectedBudget} handleBack={handleBack} handleSave={handleSave} />
        </Box>
      </Fade>
    </Box>
  );
};

export default Presupuestos;
