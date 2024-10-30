import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add'; // Import AddIcon
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Corrected import
import QrCodeIcon from '@mui/icons-material/QrCode'; // Import QrCodeIcon
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import CloudUploadIcon
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';


const InventoryControlPanel: React.FC = () => {
  const [openUpdateStockDialog, setOpenUpdateStockDialog] = useState(false);
  const [openTransferStockDialog, setOpenTransferStockDialog] = useState(false);
  const [openPrintBarcodeDialog, setOpenPrintBarcodeDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleDialogClose = () => {
    setOpenUpdateStockDialog(false);
    setOpenTransferStockDialog(false);
    setOpenPrintBarcodeDialog(false);
    setOpenImportDialog(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header - Fixed at the top */}
      <Header isMenuOpen={isMenuOpen} />

      {/* Sidebar and Content */}
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}> {/* Ensure the content starts below the header */}
        {/* Sidebar - Fixed to the left */}
        <Box
          sx={{
            width: isMenuOpen ? '240px' : '70px',
            flexShrink: 0,
            bgcolor: '#1A1A40',
            position: 'fixed',
            top: '64px', // Start below the header
            bottom: 0,
            zIndex: 1201,
            transition: 'width 0.3s ease',
          }}
        >
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </Box>

        {/* Main Content - Starts to the right of the Sidebar */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            marginLeft: isMenuOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease',
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', mb: 4 }}>
              Panel de Control del Inventario
            </Typography>

            {/* Widgets */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Card sx={{ boxShadow: 3, textAlign: 'center', bgcolor: '#FFFFFF' }}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#2666CF' }}><WarehouseIcon /></Avatar>}
                    title="Total Stock"
                    subheader="20,455"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ boxShadow: 3, textAlign: 'center', bgcolor: '#FFFFFF' }}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#4CAF50' }}><MonetizationOnIcon /></Avatar>}
                    title="Total Valor"
                    subheader="€104,607"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ boxShadow: 3, textAlign: 'center', bgcolor: '#FFFFFF' }}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#FFA500' }}><PriceCheckIcon /></Avatar>}
                    title="Coste Medio"
                    subheader="€121.71"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ boxShadow: 3, textAlign: 'center', bgcolor: '#FFFFFF' }}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#FF5722' }}><ShoppingCartIcon /></Avatar>}
                    title="Pedidos Pendientes"
                    subheader="Ver Detalles"
                  />
                </Card>
              </Grid>
            </Grid>

            
            {/* Product Summary Table */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Productos</Typography>
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>Instalaciones</TableCell>
                    <TableCell>Total Stock</TableCell>
                    <TableCell>Total Valor</TableCell>
                    <TableCell>Coste Medio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                    <TableCell>Taller Madrid</TableCell>
                    <TableCell>20,455</TableCell>
                    <TableCell>€104,607</TableCell>
                    <TableCell>€121.71</TableCell>
                  </TableRow>
                  <TableRow hover sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                    <TableCell>Taller Barcelona</TableCell>
                    <TableCell>2,354</TableCell>
                    <TableCell>€14,976</TableCell>
                    <TableCell>€10.89</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Orders Summary Table (Pedidos) */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Pedidos (últimos 30 días)</Typography>
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>Instalaciones</TableCell>
                    <TableCell>Pedidos de venta (Unidades)</TableCell>
                    <TableCell>Pedidos de venta (Cuantía)</TableCell>
                    <TableCell>Pedidos de compra (Unidades)</TableCell>
                    <TableCell>Pedidos de compra (Cuantía)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                    <TableCell>Taller Madrid</TableCell>
                    <TableCell>1,500</TableCell>
                    <TableCell>€9,876.00</TableCell>
                    <TableCell>1,987</TableCell>
                    <TableCell>€8,876.31</TableCell>
                  </TableRow>
                  <TableRow hover sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                    <TableCell>Taller Barcelona</TableCell>
                    <TableCell>300</TableCell>
                    <TableCell>€567.98</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>€345.78</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
           
            {/* Delivery Notes (Albaranes) Summary Table */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Albaranes (Últimos 30 días)</Typography>
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>Instalaciones</TableCell>
                    <TableCell>Albaranes de venta (Unidades)</TableCell>
                    <TableCell>Albaranes de venta (Cuantía)</TableCell>
                    <TableCell>Albaranes de compra (Unidades)</TableCell>
                    <TableCell>Albaranes de compra (Cuantía)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                    <TableCell>Taller Madrid</TableCell>
                    <TableCell>1,200</TableCell>
                    <TableCell>€8,500.00</TableCell>
                    <TableCell>1,800</TableCell>
                    <TableCell>€7,800.31</TableCell>
                  </TableRow>
                  <TableRow hover sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                    <TableCell>Taller Barcelona</TableCell>
                    <TableCell>200</TableCell>
                    <TableCell>€400.00</TableCell>
                    <TableCell>150</TableCell>
                    <TableCell>€300.78</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Operation Buttons */}
            <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenUpdateStockDialog(true)}
                    sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    borderRadius: 2,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                    },
                    }}
                >
                    Actualizar stock
                </Button>
                </Grid>
                <Grid item xs={6} md={3}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<SwapHorizIcon />}
                    onClick={() => setOpenTransferStockDialog(true)}
                    sx={{
                    background: 'linear-gradient(45deg, #FFA726 30%, #FF7043 90%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    borderRadius: 2,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #FF7043 30%, #FFA726 90%)',
                    },
                    }}
                >
                    Transferir stock
                </Button>
                </Grid>
                <Grid item xs={6} md={3}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<QrCodeIcon />}
                    onClick={() => setOpenPrintBarcodeDialog(true)}
                    sx={{
                    background: 'linear-gradient(45deg, #66BB6A 30%, #43A047 90%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                    borderRadius: 2,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #43A047 30%, #66BB6A 90%)',
                    },
                    }}
                >
                    Imprimir códigos de barras
                </Button>
                </Grid>
                <Grid item xs={6} md={3}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => setOpenImportDialog(true)}
                    sx={{
                    background: 'linear-gradient(45deg, #AB47BC 30%, #8E24AA 90%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    boxShadow: '0 3px 5px 2px rgba(171, 71, 188, .3)',
                    borderRadius: 2,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #8E24AA 30%, #AB47BC 90%)',
                    },
                    }}
                >
                    Importar
                </Button>
                </Grid>
            </Grid>
            </Box>

            {/* Dialog for Updating Stock */}
            <Dialog open={openUpdateStockDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Actualizar Stock</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Almacén afectado</InputLabel>
                    <Select>
                        <MenuItem value="Taller Fermaplastic">Taller Fermaplastic</MenuItem>
                        <MenuItem value="Taller Jardí Domòtic">Taller Jardí Domòtic</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField
                    fullWidth
                    label="Fecha"
                    type="date"
                    defaultValue="2024-01-19"
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                    fullWidth
                    label="Descripción"
                    placeholder="Opcional"
                    sx={{ mb: 2 }}
                    />
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>SKU</TableCell>
                            <TableCell>Código de barras</TableCell>
                            <TableCell>Stock en Taller</TableCell>
                            <TableCell>Añadir como predeterminado</TableCell>
                            <TableCell>Cantidad</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell>Producto A</TableCell>
                            <TableCell>1234567890123</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>
                            <Button variant="outlined">Añadir</Button>
                            <Button variant="outlined" sx={{ ml: 1 }}>Establecer</Button>
                            </TableCell>
                            <TableCell>
                            <TextField type="number" size="small" sx={{ width: '100px' }} />
                            </TableCell>
                        </TableRow>
                        {/* Repeat for more products as needed */}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancelar</Button>
                    <Button onClick={handleDialogClose} variant="contained">Actualizar stock</Button>
                </DialogActions>
                </Dialog>


            {/* Dialog for Transferring Stock */}
            <Dialog open={openTransferStockDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Transferir Stock</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Almacén de origen</InputLabel>
                    <Select>
                        <MenuItem value="Taller Jardí Domòtic">Taller Jardí Domòtic</MenuItem>
                        <MenuItem value="Taller Fermaplastic">Taller Fermaplastic</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Almacén de destino</InputLabel>
                    <Select>
                        <MenuItem value="Taller Jardí Domòtic">Taller Jardí Domòtic</MenuItem>
                        <MenuItem value="Taller Fermaplastic">Taller Fermaplastic</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField
                    fullWidth
                    label="Fecha"
                    type="date"
                    defaultValue="2024-01-19"
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                    fullWidth
                    label="Descripción"
                    placeholder="Opcional"
                    sx={{ mb: 2 }}
                    />
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>SKU</TableCell>
                            <TableCell>Código de barras</TableCell>
                            <TableCell>Stock en Origen</TableCell>
                            <TableCell>Stock en Destino</TableCell>
                            <TableCell>Cantidad</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell>Producto A</TableCell>
                            <TableCell>1234567890123</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>9</TableCell>
                            <TableCell>
                            <TextField type="number" size="small" sx={{ width: '100px' }} />
                            </TableCell>
                        </TableRow>
                        {/* Repeat for more products as needed */}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancelar</Button>
                    <Button onClick={handleDialogClose} variant="contained">Transferir stock</Button>
                </DialogActions>
                </Dialog>


            {/* Dialog for Printing Barcodes */}
            <Dialog open={openPrintBarcodeDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Imprimir código de barras</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Producto</InputLabel>
                    <Select>
                        <MenuItem value="Producto 1">Producto 1</MenuItem>
                        <MenuItem value="Producto 2">Producto 2</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField
                    fullWidth
                    label="Cantidad"
                    type="number"
                    defaultValue="10"
                    sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Formato etiqueta</InputLabel>
                    <Select>
                        <MenuItem value="Avery 7651/8651 - [A4] 65 por página">Avery 7651/8651 - [A4] 65 por página</MenuItem>
                        <MenuItem value="Avery 7160 - [A4] 21 por página">Avery 7160 - [A4] 21 por página</MenuItem>
                        <MenuItem value="Avery 6572 - [Carta] 15 por página">Avery 6572 - [Carta] 15 por página</MenuItem>
                        <MenuItem value="Dymo Etiqueta 99010">Dymo Etiqueta 99010</MenuItem>
                        <MenuItem value="Zebra V364315 - 57 x 32 mm ancho x alto">Zebra V364315 - 57 x 32 mm ancho x alto</MenuItem>
                        <MenuItem value="Zebra 2000D - 31 x 22 mm ancho x alto">Zebra 2000D - 31 x 22 mm ancho x alto</MenuItem>
                        <MenuItem value="CSV">CSV</MenuItem>
                        {/* Add more options as necessary */}
                    </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Formato del código de barras</InputLabel>
                    <Select>
                        <MenuItem value="Code 128 Auto">Code 128 Auto</MenuItem>
                        <MenuItem value="Code 39">Code 39</MenuItem>
                        {/* Add more options as necessary */}
                    </Select>
                    </FormControl>
                    <TextField
                    fullWidth
                    label="Texto a mostrar 1"
                    defaultValue="Nombre"
                    sx={{ mb: 2 }}
                    />
                    <TextField
                    fullWidth
                    label="Texto a mostrar 2"
                    placeholder="--"
                    sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancelar</Button>
                    <Button onClick={handleDialogClose} variant="contained">Imprimir</Button>
                </DialogActions>
                </Dialog>


            {/* Dialog for Importing Inventory */}
            <Dialog open={openImportDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Importar Datos</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                    Aquí puedes importar los datos desde un archivo Excel para actualizarlos de manera masiva en el sistema.
                    </Typography>

                    {/* Dropdown for selecting the import type */}
                    <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Tipo de Importación</InputLabel>
                    <Select defaultValue="">
                        <MenuItem value="Ventas">Ventas</MenuItem>
                        <MenuItem value="Compras">Compras</MenuItem>
                        <MenuItem value="Gastos">Gastos</MenuItem>
                        <MenuItem value="Contactos">Contactos</MenuItem>
                        <MenuItem value="Inventario">Inventario</MenuItem>
                        {/* Add more options as necessary */}
                    </Select>
                    </FormControl>

                    {/* File input for uploading Excel files */}
                    <TextField
                    fullWidth
                    type="file"
                    inputProps={{ accept: '.csv, .xlsx, .xls' }}
                    sx={{ mb: 3 }}
                    helperText="Selecciona un archivo Excel (.csv, .xlsx, .xls) para importar los datos."
                    />

                    {/* Template download link */}
                    <Typography variant="body2" color="textSecondary">
                    <a href="/path/to/template.xlsx" download>
                        Descarga la plantilla de Excel aquí
                    </a> para asegurarte de que tu archivo tiene el formato correcto.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={handleDialogClose} variant="contained" color="primary">
                    Importar
                    </Button>
                </DialogActions>
                </Dialog>


          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryControlPanel;
