import { useState } from 'react'
import { Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, FormControlLabel, Menu, MenuItem, TableRow, TableContainer, TableHead, Table, TableCell, TableBody } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import PrintIcon from '@mui/icons-material/Print'

const productosData = [
  // Datos de ejemplo para productos
  {
    id: 1,
    nombre: 'Producto A',
    descripcion: 'Descripción del producto A',
    referencia: 'REF001',
    codigoFabrica: 'CF001',
    variante: 'Variante A',
    tags: 'Tag1',
    tipo: 'Tipo A',
    almacen: 'Almacén A',
    canal: 'Canal A',
    cuenta: 'Cuenta A',
    stock: 100,
    coste: 10,
    precioCompra: 12,
    valorCoste: 1000,
    valorVenta: 1200,
    subtotal: 1000,
    iva: 21,
    retencion: 0,
    recargoEquivalencia: 0,
    impuestos: 210,
    total: 1210,
  },
  // ... más datos de ejemplo
]

const ProductoForm = ({ open, handleClose, producto, handleSave }) => {
  const [formData, setFormData] = useState(producto || {
    nombre: '',
    descripcion: '',
    referencia: '',
    codigoFabrica: '',
    variante: '',
    tags: '',
    tipo: '',
    almacen: '',
    canal: '',
    cuenta: '',
    stock: '',
    coste: '',
    precioCompra: '',
    valorCoste: '',
    valorVenta: '',
    subtotal: '',
    iva: '',
    retencion: '',
    recargoEquivalencia: '',
    impuestos: '',
    total: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    handleSave(formData)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{producto ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {producto ? 'Edita la información del producto' : 'Introduce la información del nuevo producto'}
        </DialogContentText>
        <TextField margin="dense" label="Nombre" name="nombre" fullWidth variant="outlined" value={formData.nombre} onChange={handleChange} />
        <TextField margin="dense" label="Descripción" name="descripcion" fullWidth variant="outlined" value={formData.descripcion} onChange={handleChange} />
        <TextField margin="dense" label="Referencia" name="referencia" fullWidth variant="outlined" value={formData.referencia} onChange={handleChange} />
        <TextField margin="dense" label="Código de Fábrica" name="codigoFabrica" fullWidth variant="outlined" value={formData.codigoFabrica} onChange={handleChange} />
        <TextField margin="dense" label="Variante" name="variante" fullWidth variant="outlined" value={formData.variante} onChange={handleChange} />
        <TextField margin="dense" label="Tags" name="tags" fullWidth variant="outlined" value={formData.tags} onChange={handleChange} />
        <TextField margin="dense" label="Tipo" name="tipo" fullWidth variant="outlined" value={formData.tipo} onChange={handleChange} />
        <TextField margin="dense" label="Almacén" name="almacen" fullWidth variant="outlined" value={formData.almacen} onChange={handleChange} />
        <TextField margin="dense" label="Canal" name="canal" fullWidth variant="outlined" value={formData.canal} onChange={handleChange} />
        <TextField margin="dense" label="Cuenta" name="cuenta" fullWidth variant="outlined" value={formData.cuenta} onChange={handleChange} />
        <TextField margin="dense" label="Stock" name="stock" fullWidth variant="outlined" value={formData.stock} onChange={handleChange} />
        <TextField margin="dense" label="Coste" name="coste" fullWidth variant="outlined" value={formData.coste} onChange={handleChange} />
        <TextField margin="dense" label="Precio de Compra" name="precioCompra" fullWidth variant="outlined" value={formData.precioCompra} onChange={handleChange} />
        <TextField margin="dense" label="Valor Coste" name="valorCoste" fullWidth variant="outlined" value={formData.valorCoste} onChange={handleChange} />
        <TextField margin="dense" label="Valor Venta" name="valorVenta" fullWidth variant="outlined" value={formData.valorVenta} onChange={handleChange} />
        <TextField margin="dense" label="Subtotal" name="subtotal" fullWidth variant="outlined" value={formData.subtotal} onChange={handleChange} />
        <TextField margin="dense" label="IVA (%)" name="iva" fullWidth variant="outlined" value={formData.iva} onChange={handleChange} />
        <TextField margin="dense" label="Retención" name="retencion" fullWidth variant="outlined" value={formData.retencion} onChange={handleChange} />
        <TextField margin="dense" label="Recargo de Equivalencia" name="recargoEquivalencia" fullWidth variant="outlined" value={formData.recargoEquivalencia} onChange={handleChange} />
        <TextField margin="dense" label="Impuestos" name="impuestos" fullWidth variant="outlined" value={formData.impuestos} onChange={handleChange} />
        <TextField margin="dense" label="Total" name="total" fullWidth variant="outlined" value={formData.total} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Inventario = () => {
  const [open, setOpen] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState(null)
  const [productos, setProductos] = useState(productosData)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (producto = null) => {
    setSelectedProducto(producto)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProducto(null)
  }

  const handleSave = (producto) => {
    if (selectedProducto) {
      setProductos(productos.map((p) => (p.id === producto.id ? producto : p)))
    } else {
      producto.id = productos.length + 1
      setProductos([...productos, producto])
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const operaciones = [
    { name: 'Actualizar Stock', icon: <ImportExportIcon /> },
    { name: 'Transferir Stock', icon: <ImportExportIcon /> },
    { name: 'Imprimir Códigos de Barra', icon: <PrintIcon /> },
    { name: 'Importar/Actualizar a través de Excel', icon: <ImportExportIcon /> },
  ]

  const propiedadesProducto = [
    { name: 'Categorías' },
    { name: 'Familias de Producto' },
    { name: 'Grupos de Variantes' },
    { name: 'Listados de Precios' },
    { name: 'Etapas Logísticas' },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#EFFFFD' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          component="nav"
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: '#1A1A40',
            borderRight: 1,
            borderColor: 'divider'
          }}
        >
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#EFFFFD',
            p: 3,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
              Inventario
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField 
                variant="outlined" 
                placeholder="Buscar..." 
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
                sx={{ bgcolor: '#ffffff', color: '#000000', ml: 2 }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                Nuevo Producto
              </Button>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {operaciones.map((operacion) => (
                  <MenuItem key={operacion.name} onClick={handleMenuClose}>
                    {operacion.icon}
                    {operacion.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Referencia</TableCell>
                    <TableCell>Código de Fábrica</TableCell>
                    <TableCell>Variante</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Almacén</TableCell>
                    <TableCell>Canal</TableCell>
                    <TableCell>Cuenta</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Coste</TableCell>
                    <TableCell>Precio de Compra</TableCell>
                    <TableCell>Valor Coste</TableCell>
                    <TableCell>Valor Venta</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>IVA (%)</TableCell>
                    <TableCell>Retención</TableCell>
                    <TableCell>Recargo de Equivalencia</TableCell>
                    <TableCell>Impuestos</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.descripcion}</TableCell>
                      <TableCell>{producto.referencia}</TableCell>
                      <TableCell>{producto.codigoFabrica}</TableCell>
                      <TableCell>{producto.variante}</TableCell>
                      <TableCell>{producto.tags}</TableCell>
                      <TableCell>{producto.tipo}</TableCell>
                      <TableCell>{producto.almacen}</TableCell>
                      <TableCell>{producto.canal}</TableCell>
                      <TableCell>{producto.cuenta}</TableCell>
                      <TableCell>{producto.stock}</TableCell>
                      <TableCell>{producto.coste}</TableCell>
                      <TableCell>{producto.precioCompra}</TableCell>
                      <TableCell>{producto.valorCoste}</TableCell>
                      <TableCell>{producto.valorVenta}</TableCell>
                      <TableCell>{producto.subtotal}</TableCell>
                      <TableCell>{producto.iva}</TableCell>
                      <TableCell>{producto.retencion}</TableCell>
                      <TableCell>{producto.recargoEquivalencia}</TableCell>
                      <TableCell>{producto.impuestos}</TableCell>
                      <TableCell>{producto.total}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(producto)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setProductos(productos.filter((p) => p.id !== producto.id))}>
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
      <ProductoForm open={open} handleClose={handleClose} producto={selectedProducto} handleSave={handleSave} />
    </Box>
  )
}

export default Inventario
