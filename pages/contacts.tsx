import { useState } from 'react'
import { Box, Container, Grid, Paper, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const contactsData = [
  {
    id: 1,
    nombre: 'Empresa A',
    nif: '12345678A',
    direccion: 'Calle Falsa 123',
    poblacion: 'Ciudad',
    codigoPostal: '12345',
    provincia: 'Provincia',
    pais: 'País',
    email: 'contacto@empresaA.com',
    telefono: '123456789',
    movil: '987654321',
    sitioWeb: 'www.empresaA.com',
    nombreComercial: 'Empresa A',
    identificacionVAT: 'VAT12345678',
    tags: 'cliente',
    tipoContacto: 'Cliente',
  },
  // ... más datos de ejemplo
]

const ContactForm = ({ open, handleClose, contact, handleSave }) => {
  const [formData, setFormData] = useState(contact || {
    nombre: '',
    nif: '',
    direccion: '',
    poblacion: '',
    codigoPostal: '',
    provincia: '',
    pais: '',
    email: '',
    telefono: '',
    movil: '',
    sitioWeb: '',
    nombreComercial: '',
    identificacionVAT: '',
    tags: '',
    tipoContacto: '',
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
      <DialogTitle>{contact ? 'Editar Contacto' : 'Agregar Contacto'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contact ? 'Edita la información del contacto' : 'Introduce la información del nuevo contacto'}
        </DialogContentText>
        <TextField margin="dense" label="Nombre" name="nombre" fullWidth variant="outlined" value={formData.nombre} onChange={handleChange} />
        <TextField margin="dense" label="NIF" name="nif" fullWidth variant="outlined" value={formData.nif} onChange={handleChange} />
        <TextField margin="dense" label="Dirección" name="direccion" fullWidth variant="outlined" value={formData.direccion} onChange={handleChange} />
        <TextField margin="dense" label="Población" name="poblacion" fullWidth variant="outlined" value={formData.poblacion} onChange={handleChange} />
        <TextField margin="dense" label="Código Postal" name="codigoPostal" fullWidth variant="outlined" value={formData.codigoPostal} onChange={handleChange} />
        <TextField margin="dense" label="Provincia" name="provincia" fullWidth variant="outlined" value={formData.provincia} onChange={handleChange} />
        <TextField margin="dense" label="País" name="pais" fullWidth variant="outlined" value={formData.pais} onChange={handleChange} />
        <TextField margin="dense" label="Email" name="email" fullWidth variant="outlined" value={formData.email} onChange={handleChange} />
        <TextField margin="dense" label="Teléfono" name="telefono" fullWidth variant="outlined" value={formData.telefono} onChange={handleChange} />
        <TextField margin="dense" label="Móvil" name="movil" fullWidth variant="outlined" value={formData.movil} onChange={handleChange} />
        <TextField margin="dense" label="Sitio Web" name="sitioWeb" fullWidth variant="outlined" value={formData.sitioWeb} onChange={handleChange} />
        <TextField margin="dense" label="Nombre Comercial" name="nombreComercial" fullWidth variant="outlined" value={formData.nombreComercial} onChange={handleChange} />
        <TextField margin="dense" label="Identificación VAT" name="identificacionVAT" fullWidth variant="outlined" value={formData.identificacionVAT} onChange={handleChange} />
        <TextField margin="dense" label="Tags" name="tags" fullWidth variant="outlined" value={formData.tags} onChange={handleChange} />
        <TextField margin="dense" label="Tipo de Contacto" name="tipoContacto" fullWidth variant="outlined" value={formData.tipoContacto} onChange={handleChange} />
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

const Contacts = () => {
  const [open, setOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [contacts, setContacts] = useState(contactsData)

  const handleOpen = (contact = null) => {
    setSelectedContact(contact)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedContact(null)
  }

  const handleSave = (contact) => {
    if (selectedContact) {
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)))
    } else {
      contact.id = contacts.length + 1
      setContacts([...contacts, contact])
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
              Contactos
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
                Agregar Contacto
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>NIF</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Población</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.nombre}</TableCell>
                      <TableCell>{contact.nif}</TableCell>
                      <TableCell>{contact.direccion}</TableCell>
                      <TableCell>{contact.poblacion}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.telefono}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(contact)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setContacts(contacts.filter((c) => c.id !== contact.id))}>
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
      <ContactForm open={open} handleClose={handleClose} contact={selectedContact} handleSave={handleSave} />
    </Box>
  )
}

export default Contacts
