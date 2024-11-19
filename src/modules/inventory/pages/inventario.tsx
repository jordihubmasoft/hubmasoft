import { useState } from 'react';
import { 
  Box, Container, Typography, Button, TextField, IconButton, Paper, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  InputAdornment, MenuItem, TableCell, TableRow, TableBody, Table, 
  TableContainer, TableHead, Menu, Snackbar, Alert 
} from '@mui/material';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PrintIcon from '@mui/icons-material/Print';
import { useTranslation } from 'hooks/useTranslations';
import ProductService from '../services/productService'; // Ajusta la ruta según tu estructura de proyecto

// Datos de ejemplo para productos
const initialProductsData = [
  {
    id: 1,
    name: 'Product A',
    description: 'Description of product A',
    reference: 'REF001',
    companyCode: 'COMP001',
    tags: 'Tag1',
    stock: 100,
    price: 50.0,
    purchasePrice: 30.0,
    costValue: 20.0,
    sellsValue: 10.0,
    priceWithoutVAT: 45.0,
    percentageVAT: 10.0,
    contactId: 'contactId123',
  },
  // ... más datos de ejemplo
];

const ProductForm = ({ open, handleClose, product, handleSave }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(product || {
    name: '',
    description: '',
    reference: '',
    companyCode: '',
    tags: '',
    stock: 0,
    price: 0,
    purchasePrice: 0,
    costValue: 0,
    sellsValue: 0,
    priceWithoutVAT: 0,
    percentageVAT: 0,
    contactId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['stock', 'price', 'purchasePrice', 'costValue', 'sellsValue', 'priceWithoutVAT', 'percentageVAT'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = () => {
    handleSave(formData);
    // No llamamos handleClose aquí, ya que handleSave lo hace en el finally
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
        <TextField 
          margin="dense" 
          label={t('inventory.name')} 
          name="name" 
          fullWidth 
          variant="outlined" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.description')} 
          name="description" 
          fullWidth 
          variant="outlined" 
          value={formData.description} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.reference')} 
          name="reference" 
          fullWidth 
          variant="outlined" 
          value={formData.reference} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.companyCode')} 
          name="companyCode" 
          fullWidth 
          variant="outlined" 
          value={formData.companyCode} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.tags')} 
          name="tags" 
          fullWidth 
          variant="outlined" 
          value={formData.tags} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.stock')} 
          name="stock" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.stock} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.price')} 
          name="price" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.price} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.purchasePrice')} 
          name="purchasePrice" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.purchasePrice} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.costValue')} 
          name="costValue" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.costValue} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.sellsValue')} 
          name="sellsValue" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.sellsValue} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.priceWithoutVAT')} 
          name="priceWithoutVAT" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.priceWithoutVAT} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.percentageVAT')} 
          name="percentageVAT" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.percentageVAT} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label={t('inventory.contactId')} 
          name="contactId" 
          fullWidth 
          variant="outlined" 
          value={formData.contactId} 
          onChange={handleChange} 
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose} 
          sx={{ 
            color: '#2666CF', 
            fontWeight: '500', 
            textTransform: 'none', 
            bgcolor: '#ffffff', 
            border: '1px solid #2666CF', 
            borderRadius: 2 
          }}
        >
          {t('inventory.cancel')}
        </Button>
        <Button 
          onClick={handleSubmit} 
          sx={{ 
            color: '#ffffff', 
            fontWeight: '500', 
            textTransform: 'none', 
            bgcolor: '#2666CF', 
            borderRadius: 2 
          }}
        >
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
  const [products, setProducts] = useState(initialProductsData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [error, setError] = useState(''); // Estado para manejar errores

  const handleOpen = (product = null) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = async (product) => {
    try {
      if (selectedProduct) {
        // Aquí podrías implementar la lógica para actualizar un producto existente
        // Por ejemplo:
        // const response = await ProductService.update(selectedProduct.id, product, token);
        // if (response.result.resultNumber === 0) {
        //   setProducts(products.map(p => p.id === selectedProduct.id ? response.data : p));
        // }
        // Por ahora, nos enfocaremos en la creación
      } else {
        // Obtener el token de localStorage o de donde lo tengas almacenado
        const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado aquí
        if (!token) {
          throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
        }

        const response = await ProductService.create(product, token);
        if (response.result.resultNumber === 0) { // Ajusta según tu lógica de respuesta
          setProducts([...products, response.data]); // Agrega el producto creado al estado
        } else {
          setError(response.result.errorMessage);
        }
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setError(error.message || "Ocurrió un problema al guardar el producto.");
    } finally {
      handleClose();
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
                sx={{ 
                  background: 'linear-gradient(90deg, #2666CF, #6A82FB)', 
                  color: '#ffffff', 
                  fontWeight: '500', 
                  textTransform: 'none', 
                  borderRadius: 2, 
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)', 
                  ml: 2 
                }} 
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
                    <TableCell>{t('inventory.companyCode')}</TableCell>
                    <TableCell>{t('inventory.tags')}</TableCell>
                    <TableCell>{t('inventory.stock')}</TableCell>
                    <TableCell>{t('inventory.price')}</TableCell>
                    <TableCell>{t('inventory.purchasePrice')}</TableCell>
                    <TableCell>{t('inventory.costValue')}</TableCell>
                    <TableCell>{t('inventory.sellsValue')}</TableCell>
                    <TableCell>{t('inventory.priceWithoutVAT')}</TableCell>
                    <TableCell>{t('inventory.percentageVAT')}</TableCell>
                    <TableCell>{t('inventory.contactId')}</TableCell>
                    <TableCell>{t('inventory.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.reference}</TableCell>
                      <TableCell>{product.companyCode}</TableCell>
                      <TableCell>{product.tags}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.purchasePrice}</TableCell>
                      <TableCell>{product.costValue}</TableCell>
                      <TableCell>{product.sellsValue}</TableCell>
                      <TableCell>{product.priceWithoutVAT}</TableCell>
                      <TableCell>{product.percentageVAT}</TableCell>
                      <TableCell>{product.contactId}</TableCell>
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
      
      {/* Snackbar para mostrar mensajes de error */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Inventory;
