import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip as MuiTooltip,
  Menu,
  MenuItem,
  Switch,
} from '@mui/material';

// Iconos de MUI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UpdateIcon from '@mui/icons-material/Update';
import HistoryIcon from '@mui/icons-material/History';
import StoreIcon from '@mui/icons-material/Store';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

// Importaciones de Recharts (para el gráfico interactivo)
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/** Interfaz de datos */
interface Product {
  id?: number | string;
  nombre: string;          // p. ej. "COLLARÍN"
  referencia: string;      // p. ej. "CO986"
  descripcion: string;     // breve descripción
  familia: string;         // p. ej. "G620"
  subFamilia: string;      // p. ej. "Cloruro..."
  stockTotal?: number;     
  stockVendidoMes?: number;
  stockDisponible?: number;
  stockPorAlmacen?: {
    nombreAlmacen: string;
    cantidad: number;
  }[];
  // Precios de venta y compra
  preciosVenta?: {
    tarifa: string;
    subtotal: number;
    impuestos: number;
    total: number;
  }[];
  preciosCompra?: {
    tarifa: string;
    subtotal: number;
    impuestos: number;
    total: number;
  }[];
}

// Props del componente
interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

// Datos de ejemplo para el gráfico de stock
const stockData = [
  { name: 'Ene', stock: 1200 },
  { name: 'Feb', stock: 1100 },
  { name: 'Mar', stock: 1400 },
  { name: 'Abr', stock: 1300 },
  { name: 'May', stock: 1500 },
  { name: 'Jun', stock: 1700 },
  { name: 'Jul', stock: 1650 },
  { name: 'Ago', stock: 1800 },
  { name: 'Sep', stock: 2000 },
  { name: 'Oct', stock: 2200 },
  { name: 'Nov', stock: 2150 },
  { name: 'Dic', stock: 2300 },
];

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  if (!product) return null;

  // Estado para el menú de opciones (3 puntos)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Estado para el switch "Punto de venta"
  const [isTPV, setIsTPV] = React.useState(false);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Encabezado */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={onClose}
              sx={{
                mr: 1,
                bgcolor: '#fff',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s',
                '&:hover': { bgcolor: '#f1f1f1' },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              {product.nombre}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <MuiTooltip title="Actualizar stock" arrow>
              <Button
                variant="outlined"
                startIcon={<UpdateIcon />}
                sx={{
                  mr: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s, transform 0.3s',
                  '&:hover': { backgroundColor: '#f8f9fe', transform: 'scale(1.02)' },
                }}
              >
                Actualizar stock
              </Button>
            </MuiTooltip>

            <IconButton
              onClick={handleMenuOpen}
              sx={{
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': { backgroundColor: '#f8f9fe', transform: 'scale(1.02)' },
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Editar</MenuItem>
              <MenuItem onClick={handleMenuClose}>Asignar alarma de stock</MenuItem>
              <MenuItem onClick={handleMenuClose}>Imprimir código de barras</MenuItem>
              <MenuItem onClick={handleMenuClose}>Clonar producto</MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ color: 'red' }}>
                Eliminar
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Columna Izquierda: Imagen y datos rápidos */}
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}
            >
              <CardContent>
                {/* Imagen del producto */}
                <Box
                  sx={{
                    width: '100%',
                    height: 220,
                    borderRadius: 2,
                    bgcolor: '#e9eff5',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    [Imagen del producto]
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Detalles rápidos */}
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Referencia:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                  {product.referencia}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Familia:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                  {product.familia}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Sub-Familia:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {product.subFamilia}
                </Typography>

                {/* Sección adicional (TPV, Imágenes, Notas, Archivos, Informes) */}
                <Divider sx={{ my: 2 }} />

                <Box>
                  {/* Switch TPV */}
                  <Box display="flex" alignItems="center" mb={1}>
                    <Switch
                      checked={isTPV}
                      onChange={(e) => setIsTPV(e.target.checked)}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Punto de venta
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Activa esta opción para mostrar este producto en tu app TPV.
                  </Typography>

                  {/* Imágenes */}
                  <Box mt={3}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Imágenes
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                    >
                      Añadir imagen
                    </Button>
                  </Box>

                  {/* Notas */}
                  <Box mt={3}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Notas
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                    >
                      Nueva nota
                    </Button>
                  </Box>

                  {/* Archivos */}
                  <Box mt={3}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Archivos
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                    >
                      Subir archivo
                    </Button>
                  </Box>

                  {/* Informes de producto */}
                  <Box mt={4}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Informes de producto
                    </Typography>
                    <Box display="grid" gridTemplateColumns="1fr" gap={1}>
                      <Button variant="contained" color="primary" size="small">
                        Compradores del producto
                      </Button>
                      <Button variant="contained" color="primary" size="small">
                        Presupuestado
                      </Button>
                      <Button variant="contained" color="primary" size="small">
                        Proveedores del producto
                      </Button>
                      <Button variant="contained" color="primary" size="small">
                        Histórico precio de compra
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Columna Derecha: Resumen y Gráfico */}
          <Grid item xs={12} md={9}>
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Resumen
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        bgcolor: '#F5F8FF',
                        p: 3,
                        borderRadius: 2,
                        textAlign: 'center',
                        transition: 'all 0.3s',
                        '&:hover': {
                          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Typography variant="subtitle2" color="textSecondary">
                        Total stock
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                        {product.stockTotal ?? 0} Unidades
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        bgcolor: '#F5F8FF',
                        p: 3,
                        borderRadius: 2,
                        textAlign: 'center',
                        transition: 'all 0.3s',
                        '&:hover': {
                          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Typography variant="subtitle2" color="textSecondary">
                        Vendido este mes
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                        {product.stockVendidoMes ?? 0} Unidades
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        bgcolor: '#F5F8FF',
                        p: 3,
                        borderRadius: 2,
                        textAlign: 'center',
                        transition: 'all 0.3s',
                        '&:hover': {
                          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Typography variant="subtitle2" color="textSecondary">
                        Stock disponible
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                        {product.stockDisponible ?? 0} Unidades
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Gráfico interactivo de stock */}
                <Box sx={{ mt: 4, mb: 3 }}>
                  <Typography variant="body2" color="textSecondary">
                    Gráfico de stock
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 220,
                      borderRadius: 2,
                      bgcolor: '#ECEFF1',
                      mt: 1,
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                      overflow: 'hidden',
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis stroke="#8884d8" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="stock"
                          stroke="#8884d8"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Stock por almacén */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                      Stock por almacén
                    </Typography>
                    {product.stockPorAlmacen?.map((almacen, idx) => (
                      <Box key={idx} display="flex" alignItems="center" mt={1}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2">
                          {almacen.nombreAlmacen}: {almacen.cantidad} Unidades
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Lista de precios de venta */}
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Lista de precios de venta
                  </Typography>
                  <Button variant="text" sx={{ textTransform: 'none', fontWeight: 600 }}>
                    Gestionar tarifas
                  </Button>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table size="small">
                    <TableHead
                      sx={{
                        bgcolor: '#F5F5F5',
                        '& th': {
                          fontWeight: 'bold',
                          color: 'text.secondary',
                          py: 1,
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>Tarifa</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell>Impuestos</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.preciosVenta?.length ? (
                        product.preciosVenta.map((pv, idx) => (
                          <TableRow
                            key={idx}
                            sx={{
                              transition: 'background-color 0.2s',
                              '&:hover': {
                                backgroundColor: '#f0f8ff',
                              },
                            }}
                          >
                            <TableCell>{pv.tarifa}</TableCell>
                            <TableCell>{pv.subtotal.toFixed(2)}€</TableCell>
                            <TableCell>{pv.impuestos.toFixed(2)}%</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              {pv.total.toFixed(2)}€
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            No hay tarifas definidas
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Lista de precios de compra */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Lista de precios de compra
                  </Typography>
                  <Button variant="text" sx={{ textTransform: 'none', fontWeight: 600 }}>
                    Gestionar tarifas
                  </Button>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table size="small">
                    <TableHead
                      sx={{
                        bgcolor: '#F5F5F5',
                        '& th': {
                          fontWeight: 'bold',
                          color: 'text.secondary',
                          py: 1,
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>Tarifa</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell>Impuestos</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.preciosCompra?.length ? (
                        product.preciosCompra.map((pc, idx) => (
                          <TableRow
                            key={idx}
                            sx={{
                              transition: 'background-color 0.2s',
                              '&:hover': {
                                backgroundColor: '#f0f8ff',
                              },
                            }}
                          >
                            <TableCell>{pc.tarifa}</TableCell>
                            <TableCell>{pc.subtotal.toFixed(2)}€</TableCell>
                            <TableCell>{pc.impuestos.toFixed(2)}%</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              {pc.total.toFixed(2)}€
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            No hay tarifas definidas
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
