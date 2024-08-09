import { useState } from 'react';
import { Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, MenuItem, FormControl, Select, InputLabel, TableCell, TableRow, TableBody, Table, TableContainer, TableHead } from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PortalIcon from '@mui/icons-material/Language';

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
];

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
        {contact ? 'Editar Contacto' : 'Agregar Contacto'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
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
        <FormControl fullWidth margin="dense">
          <InputLabel>Tipo de Contacto</InputLabel>
          <Select
            label="Tipo de Contacto"
            name="tipoContacto"
            value={formData.tipoContacto}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Cliente">Cliente</MenuItem>
            <MenuItem value="Proveedor">Proveedor</MenuItem>
            <MenuItem value="Lead">Lead</MenuItem>
            <MenuItem value="Deudor">Deudor</MenuItem>
            <MenuItem value="Acreedor">Acreedor</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Contacts = () => {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState(contactsData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleOpen = (contact = null) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
  };

  const handleSave = (contact) => {
    if (selectedContact) {
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
    } else {
      contact.id = contacts.length + 1;
      setContacts([...contacts, contact]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen}/>
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
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
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
                sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', ml: 2 }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                Agregar Contacto
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: '#2666CF', borderColor: '#2666CF', fontWeight: '500', ml: 2 }} 
                startIcon={<ImportExportIcon />}
              >
                Importar/Exportar
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: '#2666CF', borderColor: '#2666CF', fontWeight: '500', ml: 2 }} 
                startIcon={<PortalIcon />}
              >
                Portal Cliente
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
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
                    <TableRow key={contact.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      <TableCell>{contact.nombre}</TableCell>
                      <TableCell>{contact.nif}</TableCell>
                      <TableCell>{contact.direccion}</TableCell>
                      <TableCell>{contact.poblacion}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.telefono}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(contact)} sx={{ color: '#1A1A40' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setContacts(contacts.filter((c) => c.id !== contact.id))} sx={{ color: '#B00020' }}>
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
  );
};

export default Contacts;
