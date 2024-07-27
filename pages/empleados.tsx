import { useState } from 'react'
import { Box, Container, Grid, Paper, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const empleadosData = [
  // Datos de ejemplo para empleados
  {
    id: 1,
    nombre: 'Empleado A',
    puesto: 'Operario de Logística',
    salario: 30000,
    irpf: 15,
    seguridadSocial: 6,
    email: 'empleadoA@empresa.com',
    telefono: '123456789',
    acceso: ['inventario'],
  },
  // ... más datos de ejemplo
]

const EmpleadoForm = ({ open, handleClose, empleado, handleSave }) => {
  const [formData, setFormData] = useState(empleado || {
    nombre: '',
    puesto: '',
    salario: '',
    irpf: '',
    seguridadSocial: '',
    email: '',
    telefono: '',
    acceso: [],
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        acceso: [...formData.acceso, e.target.name],
      })
    } else {
      setFormData({
        ...formData,
        acceso: formData.acceso.filter((item) => item !== e.target.name),
      })
    }
  }

  const handleSubmit = () => {
    handleSave(formData)
    handleClose()
  }

  const accesos = [
    { name: 'inventario', label: 'Inventario' },
    { name: 'ventas', label: 'Ventas' },
    { name: 'compras', label: 'Compras' },
    { name: 'clientes', label: 'Clientes' },
    // Agrega más accesos según sea necesario
  ]

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{empleado ? 'Editar Empleado' : 'Agregar Empleado'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {empleado ? 'Edita la información del empleado' : 'Introduce la información del nuevo empleado'}
        </DialogContentText>
        <TextField margin="dense" label="Nombre" name="nombre" fullWidth variant="outlined" value={formData.nombre} onChange={handleChange} />
        <TextField margin="dense" label="Puesto" name="puesto" fullWidth variant="outlined" value={formData.puesto} onChange={handleChange} />
        <TextField margin="dense" label="Salario" name="salario" fullWidth variant="outlined" value={formData.salario} onChange={handleChange} />
        <TextField margin="dense" label="IRPF (%)" name="irpf" fullWidth variant="outlined" value={formData.irpf} onChange={handleChange} />
        <TextField margin="dense" label="Seguridad Social (%)" name="seguridadSocial" fullWidth variant="outlined" value={formData.seguridadSocial} onChange={handleChange} />
        <TextField margin="dense" label="Email" name="email" fullWidth variant="outlined" value={formData.email} onChange={handleChange} />
        <TextField margin="dense" label="Teléfono" name="telefono" fullWidth variant="outlined" value={formData.telefono} onChange={handleChange} />
        <Typography variant="subtitle1" gutterBottom>Accesos:</Typography>
        {accesos.map((acceso) => (
          <FormControlLabel
            key={acceso.name}
            control={<Checkbox checked={formData.acceso.includes(acceso.name)} onChange={handleCheckboxChange} name={acceso.name} />}
            label={acceso.label}
          />
        ))}
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

const Empleados = () => {
  const [open, setOpen] = useState(false)
  const [selectedEmpleado, setSelectedEmpleado] = useState(null)
  const [empleados, setEmpleados] = useState(empleadosData)

  const handleOpen = (empleado = null) => {
    setSelectedEmpleado(empleado)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedEmpleado(null)
  }

  const handleSave = (empleado) => {
    if (selectedEmpleado) {
      setEmpleados(empleados.map((e) => (e.id === empleado.id ? empleado : e)))
    } else {
      empleado.id = empleados.length + 1
      setEmpleados([...empleados, empleado])
    }
  }

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
              Empleados
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
                Agregar Empleado
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Puesto</TableCell>
                    <TableCell>Salario</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {empleados.map((empleado) => (
                    <TableRow key={empleado.id}>
                      <TableCell>{empleado.nombre}</TableCell>
                      <TableCell>{empleado.puesto}</TableCell>
                      <TableCell>{empleado.salario}</TableCell>
                      <TableCell>{empleado.email}</TableCell>
                      <TableCell>{empleado.telefono}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(empleado)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setEmpleados(empleados.filter((e) => e.id !== empleado.id))}>
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
      <EmpleadoForm open={open} handleClose={handleClose} empleado={selectedEmpleado} handleSave={handleSave} />
    </Box>
  )
}

export default Empleados
