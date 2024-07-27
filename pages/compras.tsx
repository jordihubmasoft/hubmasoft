import { useState } from 'react'
import { Box, Container, Grid, Paper, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Menu, MenuItem } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const comprasData = [
  // Datos de ejemplo para compras
  {
    id: 1,
    fecha: '2023-01-01',
    numero: 'COMP001',
    proveedor: 'Proveedor A',
    descripcion: 'Descripción de la compra',
    total: 1000,
    estado: 'PAGADO',
  },
  // ... más datos de ejemplo
]

const ComprasForm = ({ open, handleClose, compra, handleSave }) => {
  const [formData, setFormData] = useState(compra || {
    fecha: '',
    numero: '',
    proveedor: '',
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
      <DialogTitle>{compra ? 'Editar Compra' : 'Agregar Compra'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {compra ? 'Edita la información de la compra' : 'Introduce la información de la nueva compra'}
        </DialogContentText>
        <TextField margin="dense" label="Fecha" name="fecha" fullWidth variant="outlined" value={formData.fecha} onChange={handleChange} />
        <TextField margin="dense" label="Número" name="numero" fullWidth variant="outlined" value={formData.numero} onChange={handleChange} />
        <TextField margin="dense" label="Proveedor" name="proveedor" fullWidth variant="outlined" value={formData.proveedor} onChange={handleChange} />
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

const Compras = () => {
  const [open, setOpen] = useState(false)
  const [selectedCompra, setSelectedCompra] = useState(null)
  const [compras, setCompras] = useState(comprasData)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (compra = null) => {
    setSelectedCompra(compra)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCompra(null)
  }

  const handleSave = (compra) => {
    if (selectedCompra) {
      setCompras(compras.map((c) => (c.id === compra.id ? compra : c)))
    } else {
      compra.id = compras.length + 1
      setCompras([...compras, compra])
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
              Compras
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
                Agregar Compra
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
                    <TableCell>Proveedor</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compras.map((compra) => (
                    <TableRow key={compra.id}>
                      <TableCell>{compra.fecha}</TableCell>
                      <TableCell>{compra.numero}</TableCell>
                      <TableCell>{compra.proveedor}</TableCell>
                      <TableCell>{compra.descripcion}</TableCell>
                      <TableCell>{compra.total}</TableCell>
                      <TableCell>{compra.estado}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(compra)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setCompras(compras.filter((c) => c.id !== compra.id))}>
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
      <ComprasForm open={open} handleClose={handleClose} compra={selectedCompra} handleSave={handleSave} />
    </Box>
  )
}

export default Compras
