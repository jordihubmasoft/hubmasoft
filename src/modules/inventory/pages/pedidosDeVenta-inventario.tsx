import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  Grid,
  Tooltip,
  Card,
  CardHeader,
  Avatar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

// Example data for sales orders
const salesOrdersData = [
  { id: 1, customer: 'Cliente A', amount: '€5,000', status: 'Completado', date: '2024-01-15' },
  { id: 2, customer: 'Cliente B', amount: '€3,200', status: 'Pendiente', date: '2024-01-12' },
  { id: 3, customer: 'Cliente C', amount: '€4,800', status: 'Completado', date: '2024-01-10' },
  { id: 4, customer: 'Cliente D', amount: '€1,400', status: 'Cancelado', date: '2024-01-08' },
];

// Color scheme for pie chart
const COLORS = ['#4CAF50', '#FFA500', '#FF5722'];

// Function to get the pie chart data based on the order status
const getStatusDataForChart = () => {
  const statusCount = { Completado: 0, Pendiente: 0, Cancelado: 0 };
  salesOrdersData.forEach((order) => {
    statusCount[order.status]++;
  });

  return Object.keys(statusCount).map((status) => ({
    name: status,
    value: statusCount[status],
  }));
};

const PedidosDeVenta: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    amount: '',
    status: '',
    date: '',
  });

  const filteredOrders = salesOrdersData.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleFormSubmit = () => {
    console.log(formData);  // Aquí deberías implementar la lógica para añadir el pedido
    setOpenForm(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header isMenuOpen={true} />

      {/* Sidebar and Content */}
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        {/* Sidebar */}
        <Sidebar isMenuOpen={true} toggleMenu={() => {}} />

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            marginLeft: '0px',
            maxWidth: 'calc(100% - 260px)',
            transition: 'margin-left 0.3s ease',
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '700' }}>
              Pedidos de Venta
            </Typography>

            {/* Sales Summary Widgets */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ boxShadow: 3, textAlign: 'center', bgcolor: '#FFFFFF' }}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#4CAF50' }}><MonetizationOnIcon /></Avatar>}
                    title="Total de Ventas"
                    subheader="€14,400"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ boxShadow: 3, textAlign: 'center', bgcolor: '#FFFFFF' }}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#FFA500' }}><TrendingUpIcon /></Avatar>}
                    title="Pedidos Pendientes"
                    subheader="€3,200"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ boxShadow: 3, textAlign: 'center', bgcolor: '#FFFFFF' }}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#FF5722' }}><TrendingUpIcon /></Avatar>}
                    title="Pedidos Cancelados"
                    subheader="€1,400"
                  />
                </Card>
              </Grid>
            </Grid>

            {/* Search Bar and Add Button */}
            <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Buscar por cliente..."
                fullWidth
                sx={{ flexGrow: 1, maxWidth: '400px' }}
                value={searchTerm}
                onChange={handleSearchChange}
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
                onClick={handleOpenForm}
              >
                Añadir Pedido
              </Button>
            </Box>

            {/* Sales Orders Table */}
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} hover sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pie Chart: Distribution of Orders by Status */}
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                Distribución de Pedidos por Estado
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={getStatusDataForChart()}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {getStatusDataForChart().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Formulario para añadir un nuevo pedido */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>Añadir Nuevo Pedido</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cliente"
                name="customer"
                value={formData.customer}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Monto (€)"
                name="amount"
                value={formData.amount}
                onChange={handleFormChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={formData.status}
                  name="status"
                  required
                >
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                  <MenuItem value="Completado">Completado</MenuItem>
                  <MenuItem value="Cancelado">Cancelado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Fecha"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">Cancelar</Button>
          <Button onClick={handleFormSubmit} variant="contained" color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PedidosDeVenta;
