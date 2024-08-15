import { useState } from 'react';
import { Box, Container, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Menu, MenuItem } from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from '../hooks/useTranslations';

const salesData = [
  // Example data for sales
  {
    id: 1,
    date: '2023-01-01',
    number: 'INV001',
    client: 'Client A',
    description: 'Invoice description',
    total: 1000,
    status: 'PAID',
  },
  // ... more example data
];

const SalesForm = ({ open, handleClose, sale, handleSave }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(sale || {
    date: '',
    number: '',
    client: '',
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
        {sale ? t('sales.editSale') : t('sales.addSaleDialog')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
          {sale ? t('sales.editSaleDialogDescription') : t('sales.addSaleDialogDescription')}
        </DialogContentText>
        <TextField margin="dense" label={t('sales.date')} name="date" fullWidth variant="outlined" value={formData.date} onChange={handleChange} />
        <TextField margin="dense" label={t('sales.number')} name="number" fullWidth variant="outlined" value={formData.number} onChange={handleChange} />
        <TextField margin="dense" label={t('sales.client')} name="client" fullWidth variant="outlined" value={formData.client} onChange={handleChange} />
        <TextField margin="dense" label={t('sales.description')} name="description" fullWidth variant="outlined" value={formData.description} onChange={handleChange} />
        <TextField margin="dense" label={t('sales.total')} name="total" fullWidth variant="outlined" value={formData.total} onChange={handleChange} />
        <TextField margin="dense" label={t('sales.status')} name="status" fullWidth variant="outlined" value={formData.status} onChange={handleChange} />
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const subcategories = ['Quotes', 'Orders', 'Delivery Notes', 'Proforma Invoices', 'Invoices'];

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
            maxWidth: isMenuOpen ? 'calc(100% - 240px)' : 'calc(100% - 70px)', // Ajuste para expandirse y cubrir toda la página
          }}
        >
          <Container maxWidth="lg" sx={{ maxWidth: '100%' }}> {/* Se asegura que el contenedor cubra todo el ancho posible */}
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
              {t('sales.title')}
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField 
                variant="outlined" 
                placeholder={t('sales.searchPlaceholder')} 
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
                sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', ml: 2 }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                {t('sales.addSale')}
              </Button>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleMenuClick}
                variant="outlined"
                sx={{ color: '#2666CF', borderColor: '#2666CF', fontWeight: '500' }}
              >
                {t('sales.subcategories')}
                <MoreVertIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory} onClick={handleMenuClose}>
                    {subcategory}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>{t('sales.date')}</TableCell>
                    <TableCell>{t('sales.number')}</TableCell>
                    <TableCell>{t('sales.client')}</TableCell>
                    <TableCell>{t('sales.description')}</TableCell>
                    <TableCell>{t('sales.total')}</TableCell>
                    <TableCell>{t('sales.status')}</TableCell>
                    <TableCell>{t('sales.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>{sale.number}</TableCell>
                      <TableCell>{sale.client}</TableCell>
                      <TableCell>{sale.description}</TableCell>
                      <TableCell>{sale.total}</TableCell>
                      <TableCell>{sale.status}</TableCell>
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
