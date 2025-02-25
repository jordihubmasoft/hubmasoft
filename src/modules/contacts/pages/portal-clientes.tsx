import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PortalIcon from '@mui/icons-material/Language';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, LineChart, Line } from 'recharts';
import router from 'next/router';

const ClientSidebar = ({ isMenuOpen, toggleMenu, setCurrentPage }) => {
  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#F8F9FA', // Fondo claro para el sidebar
            color: '#6C757D', // Color gris para los íconos y texto
            height: 'calc(100vh - 64px)', // Ajustar altura para que esté debajo del header
            width: isMenuOpen ? '240px' : '70px', // Ancho ajustable del sidebar
            transition: 'width 0.3s ease', // Transición suave
            position: 'fixed', // Sidebar fijo
            top: '64px', // Posicionar debajo del header (asumiendo que el header mide 64px)
            left: 0, // Pegado a la izquierda
            zIndex: 1, // Asegurar que esté por debajo del header
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)', // Sombra ligera
            overflowX: 'hidden',
        }}
        >
        <List sx={{ color: '#6C757D', flexGrow: 1 }}>
            {/* Flecha para abrir/cerrar el sidebar */}
            <ListItem
            onClick={toggleMenu}
            sx={{
                justifyContent: 'center', // Centrar horizontalmente
                alignItems: 'center', // Centrar verticalmente
                padding: '10px 16px',
                '&:hover': {
                backgroundColor: '#e0e0e0', // Fondo gris claro al hacer hover
                },
            }}
            >
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                {isMenuOpen ? (
                <ChevronLeftIcon sx={{ color: '#1A73E8', fontSize: '24px' }} /> // Flecha azul claro
                ) : (
                <MenuIcon sx={{ color: '#1A73E8', fontSize: '24px' }} /> // Icono azul claro
                )}
            </ListItemIcon>
            </ListItem>

            {/* Panel de Control */}
            <ListItem
            onClick={() => setCurrentPage('dashboard')}
            sx={{
                padding: '10px 16px',
                '&:hover': {
                backgroundColor: '#e0e0e0', // Fondo gris claro al hacer hover
                },
            }}
            >
            <ListItemIcon>
                <DashboardIcon sx={{ color: '#6C757D' }} /> {/* Color gris oscuro para íconos */}
            </ListItemIcon>
            {isMenuOpen && <ListItemText primary="Panel de Control" sx={{ color: '#6C757D' }} />} {/* Mostrar texto si está expandido */}
            </ListItem>


            {/* Catálogo */}
            <ListItem
            onClick={() => setCurrentPage('catalogo')}
            sx={{
                padding: '10px 16px',
                '&:hover': {
                backgroundColor: '#e0e0e0',
                },
            }}
            >
            <ListItemIcon>
                <InventoryIcon sx={{ color: '#6C757D' }} />
            </ListItemIcon>
            {isMenuOpen && <ListItemText primary="Catálogo" sx={{ color: '#6C757D' }} />}
            </ListItem>

            {/* Ventas */}
            <ListItem
            onClick={() => setCurrentPage('ventas')}
            sx={{
                padding: '10px 16px',
                '&:hover': {
                backgroundColor: '#e0e0e0',
                },
            }}
            >
            <ListItemIcon>
                <BusinessCenterIcon sx={{ color: '#6C757D' }} />
            </ListItemIcon>
            {isMenuOpen && <ListItemText primary="Ventas" sx={{ color: '#6C757D' }} />}
            </ListItem>

            {/* Compras */}
            <ListItem
            onClick={() => setCurrentPage('compras')}
            sx={{
                padding: '10px 16px',
                '&:hover': {
                backgroundColor: '#e0e0e0',
                },
            }}
            >
            <ListItemIcon>
                <ShoppingCartIcon sx={{ color: '#6C757D' }} />
            </ListItemIcon>
            {isMenuOpen && <ListItemText primary="Compras" sx={{ color: '#6C757D' }} />}
            </ListItem>

            {/* Suscribirse */}
            <ListItem
            onClick={() => setCurrentPage('suscribirse')}
            sx={{
                padding: '10px 16px',
                '&:hover': {
                backgroundColor: '#e0e0e0',
                },
            }}
            >
            <ListItemIcon>
                <PortalIcon sx={{ color: '#6C757D' }} />
            </ListItemIcon>
            {isMenuOpen && <ListItemText primary="Suscribirse" sx={{ color: '#6C757D' }} />}
            </ListItem>

            {/* Cerrar Sesión */}
            <ListItem
            onClick={() => setCurrentPage('logout')}
            sx={{
                padding: '10px 16px',
                '&:hover': {
                backgroundColor: '#e0e0e0',
                },
            }}
            >
            <ListItemIcon>
                <LogoutIcon sx={{ color: '#6C757D' }} />
            </ListItemIcon>
            {isMenuOpen && <ListItemText primary="Cerrar Sesión" sx={{ color: '#6C757D' }} />}
            </ListItem>
        </List>
        </Box>
  );
};

// Header Component
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#1A1A40', fontWeight: 'bold' }}>
          Portal de Clientes
        </Typography>
        <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
          <NotificationsIcon sx={{ color: '#1A1A40' }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
        </Menu>
        <IconButton size="large" edge="end" color="inherit" sx={{ ml: 2 }}>
          <LanguageIcon sx={{ color: '#1A1A40' }} />
        </IconButton>
        <IconButton size="large" edge="end" color="inherit" sx={{ ml: 2 }}>
          <AccountCircleIcon sx={{ color: '#1A1A40' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const DashboardPage = () => {
    const [salesData] = useState([
      { month: 'Enero', sales: 4000, profit: 2400, expenses: 2400 },
      { month: 'Febrero', sales: 3000, profit: 1398, expenses: 2210 },
      { month: 'Marzo', sales: 2000, profit: 9800, expenses: 2290 },
      { month: 'Abril', sales: 2780, profit: 3908, expenses: 2000 },
      { month: 'Mayo', sales: 1890, profit: 4800, expenses: 2181 },
      { month: 'Junio', sales: 2390, profit: 3800, expenses: 2500 },
      { month: 'Julio', sales: 3490, profit: 4300, expenses: 2100 },
    ]);
  
    const [recentActivity] = useState([
      { id: 1, description: 'Factura #1001', amount: '€1000', status: 'Pagada' },
      { id: 2, description: 'Presupuesto #2005', amount: '€1500', status: 'Pendiente' },
      { id: 3, description: 'Pedido #3003', amount: '€900', status: 'Entregado' },
    ]);
  
    return (
      <Box sx={{ padding: 3 }}>
        {/* Título Principal */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1A1A40' }}>
          Panel de Control
        </Typography>
  
        {/* Sección de tarjetas informativas */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {[
            { label: 'Ventas Totales', value: '€10,000', color: '#2666CF' },
            { label: 'Compras Totales', value: '€5,000', color: '#2666CF' },
            { label: 'Beneficio', value: '€3,000', color: '#27AE60' },
            { label: 'Saldo', value: '€8,000', color: '#FFC107' }
          ].map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: '500', color: '#555' }}>
                  {card.label}
                </Typography>
                <Typography variant="h4" sx={{ color: card.color, fontWeight: 'bold' }}>
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
  
        {/* Gráfico de Barras - Ventas por Mes */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1A1A40' }}>
          Ventas por Mes
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip children={undefined} title={''} />
              <Legend />
              <Bar dataKey="sales" fill="#2666CF" />
              <Bar dataKey="profit" fill="#27AE60" />
              <Bar dataKey="expenses" fill="#FFC107" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
  
        {/* Gráfico de Líneas - Ingresos vs Gastos */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, mt: 5, color: '#1A1A40' }}>
          Ingresos vs Gastos
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip children={undefined} title={''} />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke="#27AE60" strokeWidth={3} />
              <Line type="monotone" dataKey="expenses" stroke="#FFC107" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
  
        {/* Actividad Reciente */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, mt: 5, color: '#1A1A40' }}>
          Actividad Reciente
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.id}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{activity.amount}</TableCell>
                  <TableCell>{activity.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
  
        {/* Botón para ver más detalles */}
        <Box sx={{ textAlign: 'right', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#2666CF',
              '&:hover': { backgroundColor: '#1A4E8B' },
              fontWeight: 'bold',
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            Ver Más Detalles
          </Button>
        </Box>
      </Box>
    );
  };
  
  const sampleProducts = [
    
    // Puedes añadir más productos aquí
  ];
  
  // Página del Catálogo
  const CatalogPage = () => {
    const [products, setProducts] = useState(sampleProducts);
    const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
  
    useEffect(() => {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedCategory === '' || product.category === selectedCategory)
      );
      setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory]);
  
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          Catálogo de Bebidas
        </Typography>
  
        {/* Opciones de búsqueda y filtro */}
        <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
          <TextField
            variant="outlined"
            label="Buscar Producto"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Categoría"
            >
              <MenuItem value="">Todas las Categorías</MenuItem>
              <MenuItem value="Refrescos">Refrescos</MenuItem>
              <MenuItem value="Cerveza">Cerveza</MenuItem>
              <MenuItem value="Agua">Agua</MenuItem>
              <MenuItem value="Energéticas">Energéticas</MenuItem>
              <MenuItem value="Vino">Vino</MenuItem>
              {/* Agrega más categorías si es necesario */}
            </Select>
          </FormControl>
        </Box>
  
        {/* Grid de productos */}
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    €{product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button variant="contained" color="primary">
                    Pedir Ahora
                  </Button>
                  <Button variant="outlined" color="primary">
                    Solicitar Presupuesto
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  const sampleSalesData = [
    { month: 'Enero', sales: 4000, quotes: 2400 },
    { month: 'Febrero', sales: 3000, quotes: 1398 },
    { month: 'Marzo', sales: 5000, quotes: 2000 },
    { month: 'Abril', sales: 2780, quotes: 3908 },
    { month: 'Mayo', sales: 1890, quotes: 4800 },
    { month: 'Junio', sales: 2390, quotes: 3800 },
    { month: 'Julio', sales: 3490, quotes: 4300 },
  ];
  
  const sampleSales = [
    { id: 1, customer: 'Cliente 1', amount: '€1,000', status: 'Pagado', dueDate: '2024-01-15' },
    { id: 2, customer: 'Cliente 2', amount: '€2,000', status: 'Pendiente', dueDate: '2024-02-10' },
    { id: 3, customer: 'Cliente 3', amount: '€900', status: 'Atrasado', dueDate: '2024-01-05' },
    // Add more data as needed
  ];
  
  const SalesPage = () => {
    const [filteredSales, setFilteredSales] = useState(sampleSales);
    const [filterStatus, setFilterStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      const filtered = sampleSales.filter(
        (sale) =>
          sale.customer.toLowerCase().includes(e.target.value.toLowerCase()) &&
          (filterStatus === '' || sale.status === filterStatus)
      );
      setFilteredSales(filtered);
    };
  
    const handleStatusChange = (e) => {
      setFilterStatus(e.target.value);
      const filtered = sampleSales.filter(
        (sale) =>
          sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (e.target.value === '' || sale.status === e.target.value)
      );
      setFilteredSales(filtered);
    };
  
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1A1A40' }}>
          Ventas
        </Typography>
  
        {/* Sales Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {[
            { label: 'Ventas Totales', value: '€50,000', color: '#2666CF' },
            { label: 'Presupuestos Totales', value: '€25,000', color: '#2666CF' },
            { label: 'Pagos Pendientes', value: '€8,000', color: '#FF5722' },
          ].map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: '500', color: '#555' }}>
                  {card.label}
                </Typography>
                <Typography variant="h4" sx={{ color: card.color, fontWeight: 'bold' }}>
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
  
        {/* Sales Performance Chart */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1A1A40' }}>
          Rendimiento de Ventas
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)', mb: 4 }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip children={undefined} title={''} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#2666CF" strokeWidth={3} />
              <Line type="monotone" dataKey="quotes" stroke="#FFC107" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
  
        {/* Search and Filter Options */}
        <Box sx={{ display: 'flex', mb: 4, gap: 2 }}>
          <TextField
            variant="outlined"
            label="Buscar por Cliente"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select value={filterStatus} onChange={handleStatusChange} label="Estado">
              <MenuItem value="">Todos los Estados</MenuItem>
              <MenuItem value="Pagado">Pagado</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Atrasado">Atrasado</MenuItem>
            </Select>
          </FormControl>
        </Box>
  
        {/* Sales Table */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1A1A40' }}>
          Historial de Ventas
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Fecha de Vencimiento</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.amount}</TableCell>
                  <TableCell>{sale.status}</TableCell>
                  <TableCell>{sale.dueDate}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small">
                      Ver Detalles
                    </Button>
                    {sale.status === 'Pendiente' && (
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        Marcar como Pagado
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
  
        {/* Action Buttons */}
        <Box sx={{ textAlign: 'right', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#2666CF',
              '&:hover': { backgroundColor: '#1A4E8B' },
              fontWeight: 'bold',
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            Crear Presupuesto
          </Button>
        </Box>
      </Box>
    );
  };
  

  const samplePurchaseData = [
    { month: 'Enero', purchases: 3000, orders: 1500 },
    { month: 'Febrero', purchases: 4000, orders: 2000 },
    { month: 'Marzo', purchases: 5000, orders: 2500 },
    { month: 'Abril', purchases: 2780, orders: 1200 },
    { month: 'Mayo', purchases: 4890, orders: 3000 },
    { month: 'Junio', purchases: 3490, orders: 2700 },
    { month: 'Julio', purchases: 4300, orders: 3200 },
  ];
  
  const samplePurchases = [
    { id: 1, supplier: 'Proveedor 1', amount: '€1,200', status: 'Pagado', deliveryDate: '2024-01-20' },
    { id: 2, supplier: 'Proveedor 2', amount: '€3,400', status: 'Pendiente', deliveryDate: '2024-02-15' },
    { id: 3, supplier: 'Proveedor 3', amount: '€2,900', status: 'Atrasado', deliveryDate: '2024-01-10' },
    // Add more data as needed
  ];
  
  const PurchasesPage = () => {
    const [filteredPurchases, setFilteredPurchases] = useState(samplePurchases);
    const [filterStatus, setFilterStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      const filtered = samplePurchases.filter(
        (purchase) =>
          purchase.supplier.toLowerCase().includes(e.target.value.toLowerCase()) &&
          (filterStatus === '' || purchase.status === filterStatus)
      );
      setFilteredPurchases(filtered);
    };
  
    const handleStatusChange = (e) => {
      setFilterStatus(e.target.value);
      const filtered = samplePurchases.filter(
        (purchase) =>
          purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (e.target.value === '' || purchase.status === e.target.value)
      );
      setFilteredPurchases(filtered);
    };
  
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1A1A40' }}>
          Compras
        </Typography>
  
        {/* Purchases Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {[
            { label: 'Compras Totales', value: '€75,000', color: '#28A745', icon: 'shopping_cart' },
            { label: 'Órdenes Totales', value: '€45,000', color: '#007BFF', icon: 'receipt_long' },
            { label: 'Pagos Pendientes', value: '€15,000', color: '#DC3545', icon: 'warning' },
          ].map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '500', color: '#555', mb: 2 }}>
                  <span className="material-icons" style={{ marginRight: '8px', color: card.color }}>{card.icon}</span>
                  {card.label}
                </Typography>
                <Typography variant="h4" sx={{ color: card.color, fontWeight: 'bold' }}>
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
  
        {/* Purchases Performance Chart */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1A1A40' }}>
          Rendimiento de Compras
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)', mb: 4 }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={samplePurchaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip children={undefined} title={''} />
              <Legend />
              <Line type="monotone" dataKey="purchases" stroke="#28A745" strokeWidth={3} />
              <Line type="monotone" dataKey="orders" stroke="#007BFF" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
  
        {/* Search and Filter Options */}
        <Box sx={{ display: 'flex', mb: 4, gap: 2 }}>
          <TextField
            variant="outlined"
            label="Buscar por Proveedor"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select value={filterStatus} onChange={handleStatusChange} label="Estado">
              <MenuItem value="">Todos los Estados</MenuItem>
              <MenuItem value="Pagado">Pagado</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Atrasado">Atrasado</MenuItem>
            </Select>
          </FormControl>
        </Box>
  
        {/* Purchases Table */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1A1A40' }}>
          Historial de Compras
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Proveedor</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Fecha de Entrega</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1A1A40' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.id}</TableCell>
                  <TableCell>{purchase.supplier}</TableCell>
                  <TableCell>{purchase.amount}</TableCell>
                  <TableCell>{purchase.status}</TableCell>
                  <TableCell>{purchase.deliveryDate}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small">
                      Ver Detalles
                    </Button>
                    {purchase.status === 'Pendiente' && (
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        Marcar como Pagado
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
  
        {/* Action Buttons */}
        <Box sx={{ textAlign: 'right', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#007BFF',
              '&:hover': { backgroundColor: '#0056b3' },
              fontWeight: 'bold',
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            Crear Orden de Compra
          </Button>
        </Box>
      </Box>
    );
  };
  
  const SubscribePage = () => {
    const subscriptionPlans = [
      {
        id: 1,
        title: 'Básico',
        price: '€9.99 / mes',
        features: ['Gestión de clientes', 'Facturación básica', 'Soporte vía email'],
      },
      {
        id: 2,
        title: 'Profesional',
        price: '€19.99 / mes',
        features: [
          'Gestión avanzada de clientes',
          'Facturación automatizada',
          'Soporte vía email y teléfono',
          'Acceso a análisis de datos',
        ],
      },
      {
        id: 3,
        title: 'Empresarial',
        price: '€49.99 / mes',
        features: [
          'Todas las funciones del plan Profesional',
          'Acceso a múltiples usuarios',
          'Integraciones personalizadas',
          'Soporte dedicado 24/7',
        ],
      },
    ];
  
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          Suscríbete a Hubmasoft
        </Typography>
  
        {/* Subscription Plans */}
        <Grid container spacing={4} justifyContent="center">
          {subscriptionPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Paper
                sx={{
                  padding: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  },
                  backgroundColor: plan.title === 'Empresarial' ? '#F5F5F5' : '#FFFFFF',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1A1A40' }}>
                  {plan.title}
                </Typography>
                <Typography variant="h4" sx={{ color: '#2666CF', fontWeight: 'bold', mb: 2 }}>
                  {plan.price}
                </Typography>
  
                <List sx={{ mb: 3 }}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ justifyContent: 'center', py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 'auto', color: '#4CAF50', mr: 1 }}>
                        <CheckCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
  
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#2666CF',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A4E8B',
                    },
                  }}
                >
                  Elegir Plan
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
  
        {/* Benefits Section */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#1A1A40' }}
          >
            ¿Por qué elegir Hubmasoft?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Ahorra Tiempo',
                description:
                  'Automatiza tus procesos y reduce el tiempo dedicado a tareas repetitivas.',
                icon: 'alarm_on',
                bgcolor: '#F4F6F8',
              },
              {
                title: 'Aumenta la Productividad',
                description: 'Optimiza tu flujo de trabajo con nuestras herramientas integradas.',
                icon: 'trending_up',
                bgcolor: '#F4F6F8',
              },
              {
                title: 'Soporte Dedicado',
                description: 'Obtén asistencia personalizada siempre que la necesites con nuestro equipo de soporte.',
                icon: 'support_agent',
                bgcolor: '#F4F6F8',
              },
            ].map((benefit, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    textAlign: 'center',
                    backgroundColor: benefit.bgcolor,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="material-icons" style={{ marginRight: '8px', color: '#2666CF' }}>
                      {benefit.icon}
                    </span>
                    {benefit.title}
                  </Typography>
                  <Typography sx={{ color: '#555' }}>{benefit.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  };
  

// Pagina de Logout con Popup de Confirmación
const LogoutPage = ({ handleLogout }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Cerrar Sesión</Typography>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Cerrar Sesión
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea cerrar sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleLogout();
              handleClose();
            }}
            color="error"
            autoFocus
          >
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Componente principal
export default function PortalClientes() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard'); // Página inicial

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // Redirigir a la página de login
    window.location.href = '/auth/login'; // Ruta a la página de inicio de sesión
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'catalogo':
        return <CatalogPage />;
      case 'ventas':
        return <SalesPage />;
      case 'compras':
        return <PurchasesPage />;
      case 'suscribirse':
        return <SubscribePage />;
      case 'logout':
        return <LogoutPage handleLogout={handleLogout} />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ClientSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} setCurrentPage={setCurrentPage} />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isMenuOpen ? '240px' : '70px',
          transition: 'margin-left 0.3s ease',
          backgroundColor: '#F4F6F8',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Box sx={{ mt: 8 }}>
          {/* Renderiza la página según el estado */}
          {renderPage()}
        </Box>
      </Box>
    </Box>
  );
}
