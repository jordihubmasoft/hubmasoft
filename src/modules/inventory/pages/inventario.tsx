import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, TextField, IconButton, Paper, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  InputAdornment, TableCell, TableRow, TableBody, Table, 
  TableContainer, TableHead, Menu, MenuItem, Snackbar, Alert, CircularProgress 
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
import ProductService from '../../../services/ProductService';
import { Product } from '../../../types/Product';

interface ProductFormProps {
  open: boolean;
  handleClose: () => void;
  product: Product | null;
  handleSave: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ open, handleClose, product, handleSave }) => {
  const [formData, setFormData] = useState<Product>({
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
    contactId: '', // Este campo no se muestra, será asignado implícitamente.
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
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
        contactId: '', // Valor inicial vacío
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {product ? 'Editar Producto' : 'Agregar Producto'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
          {product ? 'Edita la información del producto a continuación.' : 'Ingresa la información del nuevo producto a continuación.'}
        </DialogContentText>
        <TextField 
          margin="dense" 
          label="Nombre" 
          name="name" 
          fullWidth 
          variant="outlined" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Descripción" 
          name="description" 
          fullWidth 
          variant="outlined" 
          value={formData.description} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Referencia" 
          name="reference" 
          fullWidth 
          variant="outlined" 
          value={formData.reference} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Código de Empresa" 
          name="companyCode" 
          fullWidth 
          variant="outlined" 
          value={formData.companyCode} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Etiquetas" 
          name="tags" 
          fullWidth 
          variant="outlined" 
          value={formData.tags} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Stock" 
          name="stock" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.stock} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Precio" 
          name="price" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.price} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Precio de Compra" 
          name="purchasePrice" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.purchasePrice} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Valor de Costo" 
          name="costValue" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.costValue} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Valor de Ventas" 
          name="sellsValue" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.sellsValue} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Precio sin IVA" 
          name="priceWithoutVAT" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.priceWithoutVAT} 
          onChange={handleChange} 
        />
        <TextField 
          margin="dense" 
          label="Porcentaje de IVA" 
          name="percentageVAT" 
          type="number" 
          fullWidth 
          variant="outlined" 
          value={formData.percentageVAT} 
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
          Cancelar
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
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Inventory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [error, setError] = useState<string>(''); // Estado para manejar errores
  const [loading, setLoading] = useState<boolean>(false); // Estado para manejar la carga
  const [token, setToken] = useState<string>(''); // Estado para almacenar el token

  // Obtener el token desde localStorage en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token') || '';
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return; // No intentar fetch si no hay token

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await ProductService.getAllProducts(token);
        setProducts(productsData);
      } catch (error: any) {
        console.error("Error al obtener los productos:", error);
        setError(error.message || "Ocurrió un problema al obtener los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleOpen = (product: Product | null = null) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = async (product: Product) => {
    try {
      // Obtener el contactId del usuario autenticado
      const userContactId = '6eeb9caa-e07b-4e9f-2959-08dcf7e949ef'; // Cambia esto por la lógica de usuario autenticado
  
      // Asignar el contactId al producto antes de enviarlo
      const productWithContactId = {
        ...product,
        contactId: userContactId,
      };
  
      if (selectedProduct && selectedProduct.id) {
        // Actualizar producto
        const updatedProduct = await ProductService.updateProduct(selectedProduct.id, productWithContactId, token);
        setProducts(products.map((p) => (p.id === selectedProduct.id ? updatedProduct : p)));
      } else {
        // Crear nuevo producto
        const newProduct = await ProductService.createProduct(productWithContactId, token);
        setProducts([...products, newProduct]);
      }
    } catch (error: any) {
      console.error("Error al guardar el producto:", error);
      setError(error.message || "Ocurrió un problema al guardar el producto.");
    } finally {
      handleClose();
    }
  };
  
  

  const handleDelete = async (productId: string) => {
    try {
      setLoading(true);
      await ProductService.deleteProduct(productId, token);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error: any) {
      console.error("Error al eliminar el producto:", error);
      setError(error.message || "Ocurrió un problema al eliminar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const operations = [
    { name: 'Actualizar Stock', icon: <ImportExportIcon /> },
    { name: 'Transferir Stock', icon: <ImportExportIcon /> },
    { name: 'Imprimir Códigos de Barras', icon: <PrintIcon /> },
    { name: 'Importar/Actualizar', icon: <ImportExportIcon /> },
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
            width: '100%',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
              Inventario
            </Typography>
            <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
              <TextField 
                variant="outlined" 
                placeholder="Buscar productos..." 
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
                Nuevo Producto
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
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Descripción</TableCell>
                      <TableCell>Referencia</TableCell>
                      <TableCell>Código de Empresa</TableCell>
                      <TableCell>Etiquetas</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell>Precio de Compra</TableCell>
                      <TableCell>Valor de Costo</TableCell>
                      <TableCell>Valor de Ventas</TableCell>
                      <TableCell>Precio sin IVA</TableCell>
                      <TableCell>Porcentaje de IVA</TableCell>
                      
                      <TableCell>Acciones</TableCell>
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
                        
                        <TableCell>
                          <IconButton onClick={() => handleOpen(product)} sx={{ color: '#1A1A40' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(product.id!)} sx={{ color: '#B00020' }}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
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
