import { useState } from 'react';
import {
  Box, Container, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Menu, MenuItem, Grid, Switch, FormControlLabel
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from '../hooks/useTranslations';

const purchasesData = [
  // Datos de ejemplo para compras
  {
    id: 1,
    date: '2023-01-01',
    number: 'PUR001',
    supplier: 'Supplier A',
    description: 'Purchase description',
    total: 1000,
    status: 'PAID',
  },
  // ... más datos de ejemplo
];

// Datos de ejemplo para gráficos
const chartData = [
  { name: 'Enero', compras: 4000, gastos: 2400, amt: 2400 },
  { name: 'Febrero', compras: 3000, gastos: 1398, amt: 2210 },
  { name: 'Marzo', compras: 2000, gastos: 9800, amt: 2290 },
  { name: 'Abril', compras: 2780, gastos: 3908, amt: 2000 },
  { name: 'Mayo', compras: 1890, gastos: 4800, amt: 2181 },
  { name: 'Junio', compras: 2390, gastos: 3800, amt: 2500 },
  { name: 'Julio', compras: 3490, gastos: 4300, amt: 2100 },
];

const PurchasesForm = ({ open, handleClose, purchase, handleSave }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(purchase || {
    date: '',
    number: '',
    supplier: '',
    description: '',
    total: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>
        {purchase ? t('purchases.edit') : t('purchases.add')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
          {purchase ? t('purchases.editSaleDialogDescription') : t('purchases.addSaleDialogDescription')}
        </DialogContentText>
        <TextField margin="dense" label={t('purchases.date')} name="date" fullWidth variant="outlined" value={formData.date} onChange={handleChange} />
        <TextField margin="dense" label={t('purchases.number')} name="number" fullWidth variant="outlined" value={formData.number} onChange={handleChange} />
        <TextField margin="dense" label={t('purchases.supplier')} name="supplier" fullWidth variant="outlined" value={formData.supplier} onChange={handleChange} />
        <TextField margin="dense" label={t('purchases.description')} name="description" fullWidth variant="outlined" value={formData.description} onChange={handleChange} />
        <TextField margin="dense" label={t('purchases.total')} name="total" fullWidth variant="outlined" value={formData.total} onChange={handleChange} />
        <TextField margin="dense" label={t('purchases.status')} name="status" fullWidth variant="outlined" value={formData.status} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#1A1A40', fontWeight: '500', textTransform: 'none', bgcolor: '#ffffff', border: '1px solid #2666CF', borderRadius: 2 }}>
          {t('purchases.cancel')}
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#ffffff', fontWeight: '500', textTransform: 'none', bgcolor: '#2666CF', borderRadius: 2 }}>
          {t('purchases.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Purchases = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [purchases, setPurchases] = useState(purchasesData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [widgets, setWidgets] = useState({
    purchasesGraph: true,
    expensesBreakdown: true,
  });

  const handleOpen = (purchase = null) => {
    setSelectedPurchase(purchase);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPurchase(null);
  };

  const handleSave = (purchase) => {
    if (selectedPurchase) {
      setPurchases(purchases.map((p) => (p.id === purchase.id ? purchase : p)));
    } else {
      purchase.id = purchases.length + 1;
      setPurchases([...purchases, purchase]);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleWidgetToggle = (widget) => {
    setWidgets((prevWidgets) => ({
      ...prevWidgets,
      [widget]: !prevWidgets[widget],
    }));
  };

  const subcategories = [
    t('purchases.quotes'),
    t('purchases.orders'),
    t('purchases.deliveryNotes'),
    t('purchases.proformas'),
    t('purchases.invoices')
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        <Box
          component="nav"
          sx={{
            width: isMenuOpen ? '240px' : '70px',
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
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            transition: 'margin-left 0.3s ease, max-width 0.3s ease',
            marginLeft: isMenuOpen ? '240px' : '70px',
            maxWidth: isMenuOpen ? 'calc(100% - 240px)' : 'calc(100% - 70px)',
          }}
        >
          <Container maxWidth="lg" sx={{ maxWidth: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h3" sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
                {t('purchases.title')}
              </Typography>
              <IconButton onClick={handleMenuClick} sx={{ color: '#1A1A40' }}>
                <SettingsIcon />
              </IconButton>
            </Box>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={widgets.purchasesGraph}
                      onChange={() => handleWidgetToggle('purchasesGraph')}
                      color="primary"
                    />
                  }
                  label={t('purchases.purchasesGraph')}
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={widgets.expensesBreakdown}
                      onChange={() => handleWidgetToggle('expensesBreakdown')}
                      color="primary"
                    />
                  }
                  label={t('purchases.expensesBreakdown')}
                />
              </MenuItem>
            </Menu>

            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField
                variant="outlined"
                placeholder={t('purchases.searchPlaceholder')}
                fullWidth
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
                sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', ml: 2, fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', padding: '10px 20px' }}
                startIcon={<AddIcon />}
                onClick={() => handleOpen()}
              >
                {t('purchases.addPurchase')}
              </Button>
            </Box>

            {/* Dashboard de Widgets */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {widgets.purchasesGraph && (
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                      {t('purchases.purchasesGraph')}
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="compras" stroke="#2666CF" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="gastos" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              )}
              {widgets.expensesBreakdown && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                      {t('purchases.expensesBreakdown')}
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="compras" fill="#2666CF" />
                        <Bar dataKey="gastos" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              )}
            </Grid>

            {/* Tabla de Compras */}
            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>{t('purchases.date')}</TableCell>
                    <TableCell>{t('purchases.number')}</TableCell>
                    <TableCell>{t('purchases.supplier')}</TableCell>
                    <TableCell>{t('purchases.description')}</TableCell>
                    <TableCell>{t('purchases.total')}</TableCell>
                    <TableCell>{t('purchases.status')}</TableCell>
                    <TableCell>{t('purchases.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      <TableCell>{purchase.date}</TableCell>
                      <TableCell>{purchase.number}</TableCell>
                      <TableCell>{purchase.supplier}</TableCell>
                      <TableCell>{purchase.description}</TableCell>
                      <TableCell>{purchase.total}</TableCell>
                      <TableCell>{purchase.status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(purchase)} sx={{ color: '#1A1A40' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setPurchases(purchases.filter((p) => p.id !== purchase.id))} sx={{ color: '#B00020' }}>
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
      <PurchasesForm open={open} handleClose={handleClose} purchase={selectedPurchase} handleSave={handleSave} />
    </Box>
  );
};

export default Purchases;
