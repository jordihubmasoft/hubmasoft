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
  SelectChangeEvent,
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

// Simulación de datos de productos para proformas
const productosProformas = [
  { concepto: 'Motor', descripcion: 'Motor eléctrico de 100hp', precio: 5000, impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }] },
  { concepto: 'Turbina', descripcion: 'Turbina industrial', precio: 1200, impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }] },
];

// Datos de impuestos disponibles
const impuestosDisponibles = [
  { nombre: 'IVA 21%', valor: 0.21 },
  { nombre: 'Rec. eq. 5.2%', valor: 0.052 },
];

// Definir el tipo para Producto en Proformas
interface Producto {
  concepto: string;
  descripcion: string;
  cantidad: number;
  unidades: string;
  precio: number;
  impuestos: { nombre: string; valor: number }[];
  total: number;
}

// Función para calcular los impuestos en la proforma
const calcularImpuestos = (precio: number, cantidad: number, impuestos: { nombre: string; valor: number }[]) => {
  return impuestos.reduce((acc, impuesto) => acc + precio * cantidad * impuesto.valor, 0);
};

// Función para calcular el total de la proforma
const calcularTotal = (subtotal: number, impuestos: number, descuento: number = 0) => {
  return subtotal + impuestos - descuento;
};

// Columnas de la tabla de proformas
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

// Datos de ejemplo para la tabla de proformas
const proformasData = [];

// Magia: Función que sugiere descuentos basados en el subtotal
const obtenerSugerenciaDescuento = (subtotal: number) => {
  if (subtotal > 10000) return 10; // 10% de descuento para compras mayores a 10,000€
  if (subtotal > 5000) return 5; // 5% de descuento para compras mayores a 5,000€
  return 0;
};

const ProformaPage = ({ proforma, handleBack, handleSave }) => {
  const [formData, setFormData] = useState(proforma || {
    cliente: '',
    numeroDocumento: '',
    fechaDocumento: '',
    fechaValidez: '',
  });

  const [productos, setProductos] = useState<Producto[]>([
    {
      concepto: 'Motor',
      descripcion: 'Motor eléctrico de 100hp',
      cantidad: 1,
      unidades: 'unidades',
      precio: 5000,
      impuestos: [{ nombre: 'IVA 21%', valor: 0.21 }],
      total: 6050,
    },
  ]);

  const [subtotal, setSubtotal] = useState(5000);
  const [totalImpuestos, setTotalImpuestos] = useState(1050);
  const [total, setTotal] = useState(6050);
  const [descuento, setDescuento] = useState(0);

  // Estado para mostrar la sugerencia de descuento
  const [sugerenciaDescuento, setSugerenciaDescuento] = useState(0);

  useEffect(() => {
    // Sugerencia de descuento dinámica
    const nuevoDescuento = obtenerSugerenciaDescuento(subtotal);
    setSugerenciaDescuento(nuevoDescuento);
  }, [subtotal]);

  const recalcularTotales = (productosActualizados: Producto[]) => {
    const nuevoSubtotal = productosActualizados.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    const nuevoTotalImpuestos = productosActualizados.reduce((acc, producto) => acc + calcularImpuestos(producto.precio, producto.cantidad, producto.impuestos), 0);
    const nuevoTotal = calcularTotal(nuevoSubtotal, nuevoTotalImpuestos, descuento);

    setSubtotal(nuevoSubtotal);
    setTotalImpuestos(nuevoTotalImpuestos);
    setTotal(nuevoTotal);
  };

  // Define a type for input changes
    // Modify handleInputChange to accept either an event or a manual name-value pair
// Update handleInputChange to handle both SelectChangeEvent and ChangeEvent
    const handleInputChange = (
        index: number,
        eventOrName: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | string,
        value?: string
    ) => {
        const updatedProductos = [...productos];
    
        if (typeof eventOrName === 'string') {
        // If it's a string (from Autocomplete), directly update the field.
        updatedProductos[index][eventOrName as 'concepto' | 'descripcion'] = value || '';
        } else if ('target' in eventOrName) {
        // If it's a regular event, extract the target name and value.
        const { name, value: eventValue } = eventOrName.target as HTMLInputElement | HTMLSelectElement;
        updatedProductos[index][name as 'concepto' | 'descripcion' | 'unidades'] = eventValue;
        }
    
        setProductos(updatedProductos);
        recalcularTotales(updatedProductos);
    };
  const handleAddRow = () => {
    setProductos([...productos, { concepto: '', descripcion: '', cantidad: 0, unidades: '', precio: 0, impuestos: [], total: 0 }]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedProductos = productos.filter((_, i) => i !== index);
    setProductos(updatedProductos);
    recalcularTotales(updatedProductos);
  };

  const handleDescuentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoDescuento = parseFloat(event.target.value) || 0;
    setDescuento(nuevoDescuento);
    recalcularTotales(productos);
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
          {proforma ? 'Editar Proforma' : 'Nueva Proforma'}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        {/* Sección de datos de la proforma */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Cliente"
              name="cliente"
              variant="outlined"
              fullWidth
              value={formData.cliente}
              onChange={(event) => handleInputChange(0, event)}
              sx={{ borderRadius: 2 }}
            />
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
              label="Fecha de la proforma"
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
              label="Fecha de validez"
              name="fechaValidez"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.fechaValidez}
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
                    options={productosProformas.map((p) => p.concepto)}
                    value={producto.concepto}
                    onChange={(event, newValue) => {
                        handleInputChange(index, 'concepto', newValue as string);
                    }}
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

        {/* Botón para añadir filas */}
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={handleAddRow} sx={{ borderRadius: 2 }}>
            Añadir Producto
          </Button>
        </Box>
        <Divider sx={{ my: 4 }} />

        {/* Sección de Totales y Sugerencias de Descuento */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Box sx={{ width: '300px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Subtotal</Typography>
              <Typography variant="body1">{subtotal.toFixed(2)}€</Typography>

              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Impuestos</Typography>
              <Typography variant="body1">{totalImpuestos.toFixed(2)}€</Typography>

              <Divider sx={{ my: 2 }} />

              {/* Descuento Dinámico */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Descuento</Typography>
                <TextField
                  name="descuento"
                  type="number"
                  value={descuento}
                  onChange={handleDescuentoChange}
                  variant="outlined"
                  sx={{ width: '100px' }}
                />
              </Box>
              {sugerenciaDescuento > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
                    Sugerencia: Aplica un {sugerenciaDescuento}% de descuento por un subtotal superior a {subtotal > 10000 ? '10,000' : '5,000'}€.
                  </Typography>
                </Box>
              )}

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

const Proformas = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProforma, setSelectedProforma] = useState(null);
  const [proformas, setProformas] = useState(proformasData);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();
  const { new: isNew } = router.query;

  useEffect(() => {
    if (isNew) {
      handleOpen(); // Abre el formulario para crear una nueva proforma
    }
  }, [isNew]);

  const handleOpen = (proforma = null) => {
    setSelectedProforma(proforma);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedProforma(null);
  };

  const handleSave = (proforma) => {
    if (selectedProforma) {
      setProformas(proformas.map((p) => (p.id === proforma.id ? proforma : p)));
    } else {
      proforma.id = proformas.length + 1;
      setProformas([...proformas, proforma]);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) =>
        prev.includes(column)
          ? prev.filter((col) => col !== column)
          : [...prev, column]
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
                  <Sidebar isMenuOpen={true} toggleMenu={undefined} />
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
                      Proformas de Ventas
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
                        sx={{
                          bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                          color: '#ffffff',
                          fontWeight: '500',
                          textTransform: 'none',
                          borderRadius: 2,
                          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                          minWidth: '120px',
                        }}
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                      >
                        Añadir Proforma
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
                          {proformas.map((proforma) => (
                            <TableRow key={proforma.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                              {visibleColumns.map((column) => (
                                <TableCell key={column}>{proforma[column]}</TableCell>
                              ))}
                              <TableCell>
                                <IconButton onClick={() => handleOpen(proforma)} sx={{ color: '#1A1A40' }}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => setProformas(proformas.filter((p) => p.id !== proforma.id))} sx={{ color: '#B00020' }}>
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
              <ProformaPage proforma={selectedProforma} handleBack={handleBack} handleSave={handleSave} />
            </Box>
          </Fade>
        </Box>
      );
    };
    
    export default Proformas;