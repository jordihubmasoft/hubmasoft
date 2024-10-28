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
  Divider
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
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'hooks/useTranslations';

const salesData = [
  {
    id: 1,
    date: '2023-01-01',
    number: 'INV001',
    client: 'Client A',
    description: 'Invoice description',
    total: 1000,
    status: 'PAID',
    unidades: 5,
    iva: 210,
    recargoEquivalencia: 30,
    subtotal: 760,
    totalFacturado: 1240,
    estado: 'Pendiente',
    facturado: 'No facturado',
  },
  // ... more example data
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
  invoicesToBill: { count: 10, amount: 1500 }, // Modificación aquí
  salesInvoices: 20,
  otherMetric: 5,
  salesAccounts: [
    { account: '482', amount: '38,850.54€', percentage: '100%' },
    { account: '653.3', amount: '4,658.71€', percentage: '100%' },
    { account: 'Ventas de mercaderías', amount: '0.00€', percentage: '0%' },
    { account: 'Prestaciones de servicios', amount: '0.00€', percentage: '0%' },
    { account: 'Devoluciones de ventas de mercaderías', amount: '0.00€', percentage: '0%' },
  ],
};

const SalesForm = ({ open, handleClose, sale, handleSave }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(sale || {
    date: '',
    number: '',
    client: '',
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
        {sale ? t('sales.editSale') : t('sales.addSaleDialog')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif', mb: 2 }}>
          {sale ? t('sales.editSaleDialogDescription') : t('sales.addSaleDialogDescription')}
        </DialogContentText>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
          <TextField
            margin="dense"
            label={t('sales.date')}
            name="date"
            fullWidth
            variant="outlined"
            value={formData.date}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.number')}
            name="number"
            fullWidth
            variant="outlined"
            value={formData.number}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.client')}
            name="client"
            fullWidth
            variant="outlined"
            value={formData.client}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.description')}
            name="description"
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.total')}
            name="total"
            fullWidth
            variant="outlined"
            value={formData.total}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          {/* New Fields */}
          <TextField
            margin="dense"
            label={t('sales.unidades')}
            name="unidades"
            fullWidth
            variant="outlined"
            value={formData.unidades}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.iva')}
            name="iva"
            fullWidth
            variant="outlined"
            value={formData.iva}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.recargoEquivalencia')}
            name="recargoEquivalencia"
            fullWidth
            variant="outlined"
            value={formData.recargoEquivalencia}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.subtotal')}
            name="subtotal"
            fullWidth
            variant="outlined"
            value={formData.subtotal}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.totalFacturado')}
            name="totalFacturado"
            fullWidth
            variant="outlined"
            value={formData.totalFacturado}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.estado')}
            name="estado"
            fullWidth
            variant="outlined"
            value={formData.estado}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
          <TextField
            margin="dense"
            label={t('sales.facturado')}
            name="facturado"
            fullWidth
            variant="outlined"
            value={formData.facturado}
            onChange={handleChange}
            sx={{ bgcolor: '#F4F6F8', borderRadius: 1 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          {t('sales.cancel')}
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          {t('sales.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Sales = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [sales, setSales] = useState(salesData);
  const [filteredChartData, setFilteredChartData] = useState(chartData); // Nuevo estado para datos filtrados del gráfico
  const [anchorEl, setAnchorEl] = useState(null);
  const [widgetAnchorEl, setWidgetAnchorEl] = useState(null); // Nuevo estado para el anclaje del menú de widgets
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [widgets, setWidgets] = useState({
    salesGraph: true,
    pendingPayments: true,
    revenueBreakdown: true,
    salesAccounts: true,
  });

  const [columnsVisibility, setColumnsVisibility] = useState({
    date: true,
    number: true,
    client: true,
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

  const [dateRange, setDateRange] = useState('lastDay'); // Estado para el rango de fechas

  const handleOpen = (sale = null) => {
    setSelectedSale(sale);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSale(null);
  };

  const handleSave = (sale) => {
    if (selectedSale) {
      setSales(sales.map((s) => (s.id === sale.id ? sale : s)));
    } else {
      sale.id = sales.length + 1;
      setSales([...sales, sale]);
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

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    updateDataBasedOnDateRange(range);
  };

  const updateDataBasedOnDateRange = (range) => {
    let filteredSalesData;
    let filteredChartData;
    const currentDate = new Date();

    switch (range) {
      case 'lastDay':
        filteredSalesData = salesData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setDate(currentDate.getDate() - 1))
        );
        filteredChartData = chartData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setDate(currentDate.getDate() - 1))
        );
        break;
      case 'lastWeek':
        filteredSalesData = salesData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setDate(currentDate.getDate() - 7))
        );
        filteredChartData = chartData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setDate(currentDate.getDate() - 7))
        );
        break;
      case 'lastMonth':
        filteredSalesData = salesData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
        filteredChartData = chartData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
        break;
      case 'lastQuarter':
        filteredSalesData = salesData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setMonth(currentDate.getMonth() - 3))
        );
        filteredChartData = chartData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setMonth(currentDate.getMonth() - 3))
        );
        break;
      case 'lastYear':
        filteredSalesData = salesData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
        );
        filteredChartData = chartData.filter(data =>
          new Date(data.date) >= new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
        );
        break;
      default:
        filteredSalesData = salesData;
        filteredChartData = chartData;
        break;
    }

    setSales(filteredSalesData); // Actualiza los datos de ventas según el rango seleccionado
    setFilteredChartData(filteredChartData); // Actualiza los datos del gráfico según el rango seleccionado
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
                {t('sales.title')}
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
                    label={t(`sales.${widget}`)}
                  />
                </MenuItem>
              ))}
            </Menu>

            {/* Menú para seleccionar el rango de fechas */}
            <IconButton onClick={handleMenuClick} sx={{ color: '#1A1A40' }}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={() => handleDateRangeChange('lastDay')}
                selected={dateRange === 'lastDay'}
                sx={dateRange === 'lastDay' ? { fontWeight: 'bold' } : {}}
              >
                {t('Último día')}
              </MenuItem>
              <MenuItem
                onClick={() => handleDateRangeChange('lastWeek')}
                selected={dateRange === 'lastWeek'}
                sx={dateRange === 'lastWeek' ? { fontWeight: 'bold' } : {}}
              >
                {t('Última semana')}
              </MenuItem>
              <MenuItem
                onClick={() => handleDateRangeChange('lastMonth')}
                selected={dateRange === 'lastMonth'}
                sx={dateRange === 'lastMonth' ? { fontWeight: 'bold' } : {}}
              >
                {t('Último mes')}
              </MenuItem>
              <MenuItem
                onClick={() => handleDateRangeChange('lastQuarter')}
                selected={dateRange === 'lastQuarter'}
                sx={dateRange === 'lastQuarter' ? { fontWeight: 'bold' } : {}}
              >
                {t('Último trimestre')}
              </MenuItem>
              <MenuItem
                onClick={() => handleDateRangeChange('lastYear')}
                selected={dateRange === 'lastYear'}
                sx={dateRange === 'lastYear' ? { fontWeight: 'bold' } : {}}
              >
                {t('Último año')}
              </MenuItem>
            </Menu>

            {/* Informative Widgets */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {widgets.salesGraph && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                      {t('sales.salesGraph')}
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={filteredChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cobradas" fill="#2666CF" name="Cobradas" />
                        <Bar dataKey="pendientes" fill="#5B8FF9" name="Pendientes" />
                        <Bar dataKey="vencidas" fill="#FF4D4D" name="Vencidas" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              )}
            </Grid>

            {/* Dashboard Widgets */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {widgets.pendingPayments && (
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1 }}>
                      {t('sales.invoicesToBill')}
                    </Typography>
                    {/* Mostrar el número de facturas y el total en euros */}
                    <Typography variant="h4" sx={{ fontWeight: '700', color: '#1A1A40' }}>
                      {widgetData.invoicesToBill.count} ({widgetData.invoicesToBill.amount}€)
                    </Typography>
                  </Paper>
                </Grid>
              )}
              {widgets.revenueBreakdown && (
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1 }}>
                      {t('sales.salesInvoices')}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: '700', color: '#1A1A40' }}>
                      {widgetData.salesInvoices}
                    </Typography>
                  </Paper>
                </Grid>
              )}
              {widgets.salesAccounts && (
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1 }}>
                      {t('sales.otherMetric')}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: '700', color: '#1A1A40' }}>
                      {widgetData.otherMetric}
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>

            {/* Ordered Sales Accounts */}
            {widgets.salesAccounts && (
              <Paper sx={{ p: 3, mb: 3, borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
                <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                  {t('sales.salesAccounts')}
                </Typography>
                <Table>
                  <TableBody>
                    {widgetData.salesAccounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell>{account.account}</TableCell>
                        <TableCell>{account.amount}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <Box sx={{ width: `${parseFloat(account.percentage)}%`, height: 8, bgcolor: index % 2 === 0 ? '#2666CF' : '#5B8FF9', borderRadius: 1 }} />
                            </Box>
                            <Typography variant="body2" color="textSecondary">{account.percentage}</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            )}

            {/* Buttons for Adding Sales and Filtering Columns, moved above the table */}
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
                        label={t(`sales.${column}`)}
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
                  {t('sales.addSale')}
                </Button>
              </Box>
            </Box>

            {/* Sales Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' } }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    {columnsVisibility.date && <TableCell>{t('sales.date')}</TableCell>}
                    {columnsVisibility.number && <TableCell>{t('sales.number')}</TableCell>}
                    {columnsVisibility.client && <TableCell>{t('sales.client')}</TableCell>}
                    {columnsVisibility.description && <TableCell>{t('sales.description')}</TableCell>}
                    {columnsVisibility.total && <TableCell>{t('sales.total')}</TableCell>}
                    {columnsVisibility.unidades && <TableCell>{t('sales.unidades')}</TableCell>}
                    {columnsVisibility.iva && <TableCell>{t('sales.iva')}</TableCell>}
                    {columnsVisibility.recargoEquivalencia && <TableCell>{t('sales.recargoEquivalencia')}</TableCell>}
                    {columnsVisibility.subtotal && <TableCell>{t('sales.subtotal')}</TableCell>}
                    {columnsVisibility.totalFacturado && <TableCell>{t('sales.totalFacturado')}</TableCell>}
                    {columnsVisibility.estado && <TableCell>{t('sales.estado')}</TableCell>}
                    {columnsVisibility.facturado && <TableCell>{t('sales.facturado')}</TableCell>}
                    <TableCell>{t('sales.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      {columnsVisibility.date && <TableCell>{sale.date}</TableCell>}
                      {columnsVisibility.number && <TableCell>{sale.number}</TableCell>}
                      {columnsVisibility.client && <TableCell>{sale.client}</TableCell>}
                      {columnsVisibility.description && <TableCell>{sale.description}</TableCell>}
                      {columnsVisibility.total && <TableCell>{sale.total}</TableCell>}
                      {columnsVisibility.unidades && <TableCell>{sale.unidades}</TableCell>}
                      {columnsVisibility.iva && <TableCell>{sale.iva}</TableCell>}
                      {columnsVisibility.recargoEquivalencia && <TableCell>{sale.recargoEquivalencia}</TableCell>}
                      {columnsVisibility.subtotal && <TableCell>{sale.subtotal}</TableCell>}
                      {columnsVisibility.totalFacturado && <TableCell>{sale.totalFacturado}</TableCell>}
                      {columnsVisibility.estado && <TableCell sx={{ bgcolor: getStatusColor(sale.estado) }}>{sale.estado}</TableCell>}
                      {columnsVisibility.facturado && <TableCell sx={{ bgcolor: getFacturadoColor(sale.facturado) }}>{sale.facturado}</TableCell>}
                      <TableCell>
                        <IconButton onClick={() => handleOpen(sale)} sx={{ color: '#1A1A40' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setSales(sales.filter((s) => s.id !== sale.id))} sx={{ color: '#B00020' }}>
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
      <SalesForm open={open} handleClose={handleClose} sale={selectedSale} handleSave={handleSave} />
    </Box>
  );
};

export default Sales;
