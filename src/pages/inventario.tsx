import { useState } from 'react';
import { Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, MenuItem, TableCell, TableRow, TableBody, Table, TableContainer, TableHead, Menu } from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PrintIcon from '@mui/icons-material/Print';
import { useTranslation } from '../hooks/useTranslations';

const productsData = [
  // Example data for products
  {
    id: 1,
    name: 'Product A',
    description: 'Description of product A',
    reference: 'REF001',
    factoryCode: 'CF001',
    variant: 'Variant A',
    tags: 'Tag1',
    type: 'Type A',
    warehouse: 'Warehouse A',
    channel: 'Channel A',
    account: 'Account A',
    stock: 100,
    cost: 10,
    purchasePrice: 12,
    costValue: 1000,
    saleValue: 1200,
    subtotal: 1000,
    vat: 21,
    retention: 0,
    equivalenceSurcharge: 0,
    taxes: 210,
    total: 1210,
  },
  // ... more example data
];

const ProductForm = ({ open, handleClose, product, handleSave }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(product || {
    name: '',
    description: '',
    reference: '',
    factoryCode: '',
    variant: '',
    tags: '',
    type: '',
    warehouse: '',
    channel: '',
    account: '',
    stock: '',
    cost: '',
    purchasePrice: '',
    costValue: '',
    saleValue: '',
    subtotal: '',
    vat: '',
    retention: '',
    equivalenceSurcharge: '',
    taxes: '',
    total: '',
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
        {product ? t('inventory.editProduct') : t('inventory.addProduct')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
          {product ? t('inventory.editProductDialogDescription') : t('inventory.addProductDialogDescription')}
        </DialogContentText>
        <TextField margin="dense" label={t('inventory.name')} name="name" fullWidth variant="outlined" value={formData.name} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.description')} name="description" fullWidth variant="outlined" value={formData.description} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.reference')} name="reference" fullWidth variant="outlined" value={formData.reference} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.factoryCode')} name="factoryCode" fullWidth variant="outlined" value={formData.factoryCode} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.variant')} name="variant" fullWidth variant="outlined" value={formData.variant} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.tags')} name="tags" fullWidth variant="outlined" value={formData.tags} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.type')} name="type" fullWidth variant="outlined" value={formData.type} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.warehouse')} name="warehouse" fullWidth variant="outlined" value={formData.warehouse} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.channel')} name="channel" fullWidth variant="outlined" value={formData.channel} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.account')} name="account" fullWidth variant="outlined" value={formData.account} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.stock')} name="stock" fullWidth variant="outlined" value={formData.stock} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.cost')} name="cost" fullWidth variant="outlined" value={formData.cost} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.purchasePrice')} name="purchasePrice" fullWidth variant="outlined" value={formData.purchasePrice} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.costValue')} name="costValue" fullWidth variant="outlined" value={formData.costValue} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.saleValue')} name="saleValue" fullWidth variant="outlined" value={formData.saleValue} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.subtotal')} name="subtotal" fullWidth variant="outlined" value={formData.subtotal} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.vat')} name="vat" fullWidth variant="outlined" value={formData.vat} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.retention')} name="retention" fullWidth variant="outlined" value={formData.retention} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.equivalenceSurcharge')} name="equivalenceSurcharge" fullWidth variant="outlined" value={formData.equivalenceSurcharge} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.taxes')} name="taxes" fullWidth variant="outlined" value={formData.taxes} onChange={handleChange} />
        <TextField margin="dense" label={t('inventory.total')} name="total" fullWidth variant="outlined" value={formData.total} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#2666CF', fontWeight: '500', textTransform: 'none', bgcolor: '#ffffff', border: '1px solid #2666CF', borderRadius: 2 }}>
          {t('inventory.cancel')}
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#ffffff', fontWeight: '500', textTransform: 'none', bgcolor: '#2666CF', borderRadius: 2 }}>
          {t('inventory.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Inventory = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleOpen = (product = null) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = (product) => {
    if (selectedProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      product.id = products.length + 1;
      setProducts([...products, product]);
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

  const operations = [
    { name: t('inventory.updateStock'), icon: <ImportExportIcon /> },
    { name: t('inventory.transferStock'), icon: <ImportExportIcon /> },
    { name: t('inventory.printBarcodes'), icon: <PrintIcon /> },
    { name: t('inventory.importUpdate'), icon: <ImportExportIcon /> },
  ];

  const productProperties = [
    { name: t('inventory.categories') },
    { name: t('inventory.productFamilies') },
    { name: t('inventory.variantGroups') },
    { name: t('inventory.priceLists') },
    { name: t('inventory.logisticsStages') },
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
              {t('inventory.title')}
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField 
                variant="outlined" 
                placeholder={t('inventory.searchPlaceholder')} 
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
                {t('inventory.newProduct')}
              </Button>
              <IconButton
                sx={{
                  bgcolor: '#FFA500', // Cambiado a un color naranja para resaltar
                  color: '#ffffff',
                  borderRadius: 2,
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    bgcolor: '#FF8C00', // Color de hover para un efecto visual atractivo
                  },
                }}
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {operations.map((operation) => (
                  <MenuItem key={operation.name} onClick={handleMenuClose}>
                    {operation.icon}
                    {operation.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>{t('inventory.name')}</TableCell>
                    <TableCell>{t('inventory.description')}</TableCell>
                    <TableCell>{t('inventory.reference')}</TableCell>
                    <TableCell>{t('inventory.factoryCode')}</TableCell>
                    <TableCell>{t('inventory.variant')}</TableCell>
                    <TableCell>{t('inventory.tags')}</TableCell>
                    <TableCell>{t('inventory.type')}</TableCell>
                    <TableCell>{t('inventory.warehouse')}</TableCell>
                    <TableCell>{t('inventory.channel')}</TableCell>
                    <TableCell>{t('inventory.account')}</TableCell>
                    <TableCell>{t('inventory.stock')}</TableCell>
                    <TableCell>{t('inventory.cost')}</TableCell>
                    <TableCell>{t('inventory.purchasePrice')}</TableCell>
                    <TableCell>{t('inventory.costValue')}</TableCell>
                    <TableCell>{t('inventory.saleValue')}</TableCell>
                    <TableCell>{t('inventory.subtotal')}</TableCell>
                    <TableCell>{t('inventory.vat')}</TableCell>
                    <TableCell>{t('inventory.retention')}</TableCell>
                    <TableCell>{t('inventory.equivalenceSurcharge')}</TableCell>
                    <TableCell>{t('inventory.taxes')}</TableCell>
                    <TableCell>{t('inventory.total')}</TableCell>
                    <TableCell>{t('inventory.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.reference}</TableCell>
                      <TableCell>{product.factoryCode}</TableCell>
                      <TableCell>{product.variant}</TableCell>
                      <TableCell>{product.tags}</TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>{product.warehouse}</TableCell>
                      <TableCell>{product.channel}</TableCell>
                      <TableCell>{product.account}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.cost}</TableCell>
                      <TableCell>{product.purchasePrice}</TableCell>
                      <TableCell>{product.costValue}</TableCell>
                      <TableCell>{product.saleValue}</TableCell>
                      <TableCell>{product.subtotal}</TableCell>
                      <TableCell>{product.vat}</TableCell>
                      <TableCell>{product.retention}</TableCell>
                      <TableCell>{product.equivalenceSurcharge}</TableCell>
                      <TableCell>{product.taxes}</TableCell>
                      <TableCell>{product.total}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(product)} sx={{ color: '#1A1A40' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setProducts(products.filter((p) => p.id !== product.id))} sx={{ color: '#B00020' }}>
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
      <ProductForm open={open} handleClose={handleClose} product={selectedProduct} handleSave={handleSave} />
    </Box>
  );
};

export default Inventory;
