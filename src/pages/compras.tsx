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
            transition: 'margin-left 0.3s ease',
            marginLeft: isMenuOpen ? '240px' : '70px',
            maxWidth: 'calc(100% - 240px)', // Ajuste para que se vea todo
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
              {t('purchases.title')}
            </Typography>
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
            <Box sx={{ mb: 3 }}>
              <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleMenuClick}
                variant="outlined"
                sx={{ color: '#2666CF', borderColor: '#2666CF', fontWeight: '500', textTransform: 'none', borderRadius: 2 }}
              >
                {t('purchases.subcategories')}
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
                    <TableRow key={purchase.id}>
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
                        <IconButton onClick={() => setPurchases(purchases.filter((p) => p.id !== purchase.id))} sx={{ color: '#1A1A40' }}>
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
