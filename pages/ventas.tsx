import { useState } from 'react'
import { Box, Container, Grid, Paper, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Menu, MenuItem } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const ventasData = [
  // Datos de ejemplo para ventas
  {
    id: 1,
    fecha: '2023-01-01',
    numero: 'FAC001',
    cliente: 'Cliente A',
    descripcion: 'Descripción de la factura',
    total: 1000,
    estado: 'PAGADO',
  },
  // ... más datos de ejemplo
]

const VentasForm = ({ open, handleClose, venta, handleSave }) => {
  const [formData, setFormData] = useState(venta || {
    fecha: '',
    numero: '',
    cliente: '',
    descripcion: '',
    total: '',
    estado: '',
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
      <DialogTitle>{venta ? 'Editar Venta' : 'Agregar Venta'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {venta ? 'Edita la información de la venta' : 'Introduce la información de la nueva venta'}
        </DialogContentText>
        <TextField margin="dense" label="Fecha" name="fecha" fullWidth variant="outlined" value={formData.fecha} onChange={handleChange} />
        <TextField margin="dense" label="Número" name="numero" fullWidth variant="outlined" value={formData.numero} onChange={handleChange} />
        <TextField margin="dense" label="Cliente" name="cliente" fullWidth variant="outlined" value={formData.cliente} onChange={handleChange} />
        <TextField margin="dense" label="Descripción" name="descripcion" fullWidth variant="outlined" value={formData.descripcion} onChange={handleChange} />
        <TextField margin="dense" label="Total" name="total" fullWidth variant="outlined" value={formData.total} onChange={handleChange} />
        <TextField margin="dense" label="Estado" name="estado" fullWidth variant="outlined" value={formData.estado} onChange={handleChange} />
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

const Ventas = () => {
  const [open, setOpen] = useState(false)
  const [selectedVenta, setSelectedVenta] = useState(null)
  const [ventas, setVentas] = useState(ventasData)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (venta = null) => {
    setSelectedVenta(venta)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedVenta(null)
  }

  const handleSave = (venta) => {
    if (selectedVenta) {
      setVentas(ventas.map((v) => (v.id === venta.id ? venta : v)))
    } else {
      venta.id = ventas.length + 1
      setVentas([...ventas, venta])
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const subcategories = ['Presupuestos', 'Pedidos', 'Albaranes', 'Facturas Proformas', 'Facturas']

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
              Ventas
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
                Agregar Venta
              </Button>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleMenuClick}
                variant="outlined"
                sx={{ color: '#000000', borderColor: '#000000' }}
              >
                Subcategorías
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Número</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ventas.map((venta) => (
                    <TableRow key={venta.id}>
                      <TableCell>{venta.fecha}</TableCell>
                      <TableCell>{venta.numero}</TableCell>
                      <TableCell>{venta.cliente}</TableCell>
                      <TableCell>{venta.descripcion}</TableCell>
                      <TableCell>{venta.total}</TableCell>
                      <TableCell>{venta.estado}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(venta)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setVentas(ventas.filter((v) => v.id !== venta.id))}>
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
      <VentasForm open={open} handleClose={handleClose} venta={selectedVenta} handleSave={handleSave} />
    </Box>
  )
}

export default Ventas
