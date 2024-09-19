import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Grid,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Popover,
  Stack,
  Divider,
  Icon
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from '../hooks/useTranslations';

// Ejemplo de datos de compras
const purchasesData = [
  {
    id: 1,
    date: '2023-01-01',
    number: 'PUR001',
    supplier: 'Proveedor A',
    description: 'Descripción de la compra',
    total: 1000,
    status: 'PAGADO',
    unidades: 10,
    iva: 210,
    recargoEquivalencia: 30,
    subtotal: 760,
    totalFacturado: 1240,
    estado: 'Pendiente',
    facturado: 'No facturado',
  },
  // Más datos de ejemplo...
];

const chartData = [
  { name: 'Enero', cobradas: 2400, pendientes: 2400, vencidas: 200, date: '2023-01-01' },
  { name: 'Febrero', cobradas: 1398, pendientes: 2210, vencidas: 300, date: '2023-02-01' },
  { name: 'Marzo', cobradas: 9800, pendientes: 2290, vencidas: 1500, date: '2023-03-01' },
  { name: 'Abril', cobradas: 3908, pendientes: 2000, vencidas: 500, date: '2023-04-01' },
  { name: 'Mayo', cobradas: 4800, pendientes: 2181, vencidas: 700, date: '2023-05-01' },
  { name: 'Junio', cobradas: 3800, pendientes: 2500, vencidas: 1200, date: '2023-06-01' },
  { name: 'Julio', cobradas: 4300, pendientes: 2100, vencidas: 800, date: '2023-07-01' },
];

const widgetData = {
  invoicesToBill: { count: 10, amount: 1500 },
  purchaseInvoices: 20,
  otherMetric: 5,
  purchaseAccounts: [
    { account: '600', amount: '15,000.00€', percentage: '100%' },
    { account: '610', amount: '8,000.00€', percentage: '50%' },
    { account: 'Compras de materiales', amount: '3,000.00€', percentage: '20%' },
    { account: 'Compras de suministros', amount: '1,000.00€', percentage: '10%' },
    { account: 'Gastos varios', amount: '500.00€', percentage: '5%' },
  ],
};

// Formulario de Compras
const PurchasesForm = ({ open, handleClose, purchase, handleSave }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(purchase || {
    date: '',
    number: '',
    supplier: '',
    description: '',
    total: '',
    status: '',
    unidades: '',
    iva: '',
    recargoEquivalencia: '',
    subtotal: '',
    totalFacturado: '',
    estado: '',
    facturado: '',
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
        {purchase ? t('purchases.editPurchase') : t('purchases.addPurchaseDialog')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif', mb: 2 }}>
          {purchase ? t('purchases.editPurchaseDialogDescription') : t('purchases.addPurchaseDialogDescription')}
        </DialogContentText>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
          <TextField
            margin="dense"
            label={t('purchases.date')}
            name="date"
            fullWidth
            variant="outlined"
            value={formData.date}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.number')}
            name="number"
            fullWidth
            variant="outlined"
            value={formData.number}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.supplier')}
            name="supplier"
            fullWidth
            variant="outlined"
            value={formData.supplier}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.description')}
            name="description"
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.total')}
            name="total"
            fullWidth
            variant="outlined"
            value={formData.total}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.unidades')}
            name="unidades"
            fullWidth
            variant="outlined"
            value={formData.unidades}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.iva')}
            name="iva"
            fullWidth
            variant="outlined"
            value={formData.iva}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.recargoEquivalencia')}
            name="recargoEquivalencia"
            fullWidth
            variant="outlined"
            value={formData.recargoEquivalencia}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.subtotal')}
            name="subtotal"
            fullWidth
            variant="outlined"
            value={formData.subtotal}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.totalFacturado')}
            name="totalFacturado"
            fullWidth
            variant="outlined"
            value={formData.totalFacturado}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.estado')}
            name="estado"
            fullWidth
            variant="outlined"
            value={formData.estado}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('purchases.facturado')}
            name="facturado"
            fullWidth
            variant="outlined"
            value={formData.facturado}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8',
              borderRadius: 1 }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#1A1A40', fontWeight: '500' }}>
              {t('purchases.cancel')}
            </Button>
            <Button onClick={handleSubmit} sx={{ color: '#1A1A40', fontWeight: '500' }}>
              {t('purchases.save')}
            </Button>
          </DialogActions>
        </Dialog>
      );
    };
    
    // Componente principal de Compras
    const Purchases = () => {
      const { t } = useTranslation();
      const [open, setOpen] = useState(false);
      const [selectedPurchase, setSelectedPurchase] = useState(null);
      const [purchases, setPurchases] = useState(purchasesData);
      const [filteredChartData, setFilteredChartData] = useState(chartData); // Estado para datos filtrados del gráfico
      const [anchorEl, setAnchorEl] = useState(null);
      const [widgetAnchorEl, setWidgetAnchorEl] = useState(null);
      const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
      const [isMenuOpen, setIsMenuOpen] = useState(true);
      const [widgets, setWidgets] = useState({
        purchasesGraph: true,
        pendingInvoices: true,
        purchaseAccounts: true,
      });
    
      const [columnsVisibility, setColumnsVisibility] = useState({
        date: true,
        number: true,
        supplier: true,
        description: true,
        total: true,
        unidades: true,
        iva: true,
        recargoEquivalencia: true,
        subtotal: true,
        totalFacturado: true,
        estado: true,
        facturado: true,
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
    
      const handleWidgetMenuClick = (event) => {
        setWidgetAnchorEl(event.currentTarget);
      };
    
      const handleWidgetMenuClose = () => {
        setWidgetAnchorEl(null);
      };
    
      const handlePopoverClick = (event) => {
        setPopoverAnchorEl(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
        setPopoverAnchorEl(null);
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
    
      const handleColumnVisibilityChange = (event) => {
        setColumnsVisibility({
          ...columnsVisibility,
          [event.target.name]: event.target.checked,
        });
      };
    
      const getStatusColor = (status) => {
        switch (status) {
          case 'Pendiente': return '#FFEBEE';
          case 'Confirmada': return '#FFF3E0';
          case 'En preparación': return '#FFFDE7';
          case 'En envío': return '#E3F2FD';
          case 'Terminado': return '#E8F5E9';
          default: return '#FFFFFF';
        }
      };
    
      const getFacturadoColor = (facturado) => {
        switch (facturado) {
          case 'No facturado': return '#FFEBEE';
          case 'Parcialmente facturado': return '#FFF3E0';
          case 'Facturado': return '#E8F5E9';
          default: return '#FFFFFF';
        }
      };
    
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
                  {/* Icono de ajustes para controlar widgets */}
                  <IconButton onClick={handleWidgetMenuClick} sx={{ color: '#1A1A40' }}>
                    <SettingsIcon />
                  </IconButton>
                </Box>
    
                {/* Menú de ajustes para widgets */}
                <Menu
                  anchorEl={widgetAnchorEl}
                  open={Boolean(widgetAnchorEl)}
                  onClose={handleWidgetMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  {Object.keys(widgets).map((widget) => (
                    <MenuItem key={widget}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={widgets[widget]}
                            onChange={() => handleWidgetToggle(widget)}
                          />
                        }
                        label={t(`purchases.${widget}`)}
                      />
                    </MenuItem>
                  ))}
                </Menu>
    
                {/* Informative Widgets */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {widgets.purchasesGraph && (
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                        <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                          {t('purchases.purchasesGraph')}
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={filteredChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cobradas" fill="#007BFF" name="Cobradas" />
                            <Bar dataKey="pendientes" fill="#28A745" name="Pendientes" />
                            <Bar dataKey="vencidas" fill="#FFC107" name="Vencidas" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
    
                {/* Dashboard Widgets */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {widgets.pendingInvoices && (
                    <Grid item xs={12} md={4}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                        height: '100%',
                      }}
                    >
                      {/* Title */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Icon sx={{ fontSize: 40, color: '#2666CF', mr: 1 }} />
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: '600', color: '#1A1A40', textAlign: 'center' }}
                        >
                          {t('purchases.pendingInvoices')}
                        </Typography>
                      </Box>
                  
                      {/* Circular Box for number */}
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          border: '2px solid #2666CF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 'bold', color: '#2666CF' }}
                        >
                          {widgetData.invoicesToBill.count}
                        </Typography>
                      </Box>
                  
                      {/* Amount in euros */}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: '600', color: '#1A1A40', mb: 2 }}
                      >
                        {widgetData.invoicesToBill.amount}€
                      </Typography>
                  
                      {/* Optional progress bar */}
                      <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography variant="caption" sx={{ color: '#888' }}>
                          {t('Progress')}
                        </Typography>
                        <Box sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px', height: '8px', width: '100%', overflow: 'hidden', mt: 1 }}>
                          <Box
                            sx={{
                              width: `${(widgetData.invoicesToBill.count / 100) * 100}%`,
                              height: '100%',
                              backgroundColor: '#2666CF',
                            }}
                          />
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  
                  
                  
                  
                  
                  
                  )}
                  {widgets.purchaseAccounts && (
                    <Grid item xs={12} md={8}> {/* This stretches the widget to occupy two columns */}
                      <Paper sx={{ 
                        p: 3, 
                        flex: 1, 
                        borderRadius: 4, 
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', 
                        transition: 'box-shadow 0.3s ease', 
                        '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' },
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: '600', mb: 1 }}>
                          {t('purchases.purchaseAccounts')}
                        </Typography>
                        <Table>
                          <TableBody>
                            {widgetData.purchaseAccounts.map((account, index) => (
                              <TableRow key={index}>
                                <TableCell>{account.account}</TableCell>
                                <TableCell>{account.amount}</TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%', mr: 1 }}>
                                      <Box sx={{ width: `${parseFloat(account.percentage)}%`, height: 8, bgcolor: index % 2 === 0 ? '#007BFF' : '#28A745', borderRadius: 1 }} />
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">{account.percentage}</Typography>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Paper>
                    </Grid>
                  )}
                </Grid>


  
              {/* Buttons for Adding Purchases and Filtering Columns */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  {/* Column Filter Button */}
                  <IconButton
                    onClick={handlePopoverClick}
                    sx={{
                      bgcolor: '#FFA000',
                      color: '#fff',
                      borderRadius: 1,
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                      '&:hover': { bgcolor: '#FFB300' },
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  {/* Popover for Column Filters */}
                  <Popover
                    open={Boolean(popoverAnchorEl)}
                    anchorEl={popoverAnchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <FormGroup sx={{ p: 2 }}>
                      {Object.keys(columnsVisibility).map((column) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={columnsVisibility[column]}
                              onChange={handleColumnVisibilityChange}
                              name={column}
                              color="primary"
                            />
                          }
                          label={t(`purchases.${column}`)}
                          key={column}
                        />
                      ))}
                    </FormGroup>
                  </Popover>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                      color: '#ffffff',
                      fontWeight: '500',
                      textTransform: 'none',
                      borderRadius: 2,
                      boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                      mr: 2
                    }}
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                  >
                    {t('purchases.addPurchase')}
                  </Button>
                </Box>
              </Box>
  
              {/* Purchases Table */}
              <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                    <TableRow>
                      {columnsVisibility.date && <TableCell>{t('purchases.date')}</TableCell>}
                      {columnsVisibility.number && <TableCell>{t('purchases.number')}</TableCell>}
                      {columnsVisibility.supplier && <TableCell>{t('purchases.supplier')}</TableCell>}
                      {columnsVisibility.description && <TableCell>{t('purchases.description')}</TableCell>}
                      {columnsVisibility.total && <TableCell>{t('purchases.total')}</TableCell>}
                      {columnsVisibility.unidades && <TableCell>{t('purchases.unidades')}</TableCell>}
                      {columnsVisibility.iva && <TableCell>{t('purchases.iva')}</TableCell>}
                      {columnsVisibility.recargoEquivalencia && <TableCell>{t('purchases.recargoEquivalencia')}</TableCell>}
                      {columnsVisibility.subtotal && <TableCell>{t('purchases.subtotal')}</TableCell>}
                      {columnsVisibility.totalFacturado && <TableCell>{t('purchases.totalFacturado')}</TableCell>}
                      {columnsVisibility.estado && <TableCell>{t('purchases.estado')}</TableCell>}
                      {columnsVisibility.facturado && <TableCell>{t('purchases.facturado')}</TableCell>}
                      <TableCell>{t('purchases.actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {purchases.map((purchase) => (
                      <TableRow key={purchase.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                        {columnsVisibility.date && <TableCell>{purchase.date}</TableCell>}
                        {columnsVisibility.number && <TableCell>{purchase.number}</TableCell>}
                        {columnsVisibility.supplier && <TableCell>{purchase.supplier}</TableCell>}
                        {columnsVisibility.description && <TableCell>{purchase.description}</TableCell>}
                        {columnsVisibility.total && <TableCell>{purchase.total}</TableCell>}
                        {columnsVisibility.unidades && <TableCell>{purchase.unidades}</TableCell>}
                        {columnsVisibility.iva && <TableCell>{purchase.iva}</TableCell>}
                        {columnsVisibility.recargoEquivalencia && <TableCell>{purchase.recargoEquivalencia}</TableCell>}
                        {columnsVisibility.subtotal && <TableCell>{purchase.subtotal}</TableCell>}
                        {columnsVisibility.totalFacturado && <TableCell>{purchase.totalFacturado}</TableCell>}
                        {columnsVisibility.estado && <TableCell sx={{ bgcolor: getStatusColor(purchase.estado) }}>{purchase.estado}</TableCell>}
                        {columnsVisibility.facturado && <TableCell sx={{ bgcolor: getFacturadoColor(purchase.facturado) }}>{purchase.facturado}</TableCell>}
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