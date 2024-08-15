import { useState } from 'react';
import {
  Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment,
  MenuItem, FormControl, Select, InputLabel, TableCell, TableRow, TableBody, Table, TableContainer, TableHead, Checkbox, FormControlLabel, Menu, MenuItem as DropdownMenuItem, Grid
} from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PortalIcon from '@mui/icons-material/Language';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

const allColumns = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'nombreComercial', label: 'Nombre Comercial' },
  { id: 'nif', label: 'NIF' },
  { id: 'direccion', label: 'Dirección' },
  { id: 'poblacion', label: 'Población' },
  { id: 'codigoPostal', label: 'Código Postal' },
  { id: 'provincia', label: 'Provincia' },
  { id: 'pais', label: 'País' },
  { id: 'email', label: 'Email' },
  { id: 'telefono', label: 'Teléfono' },
  { id: 'movil', label: 'Móvil' },
  { id: 'sitioWeb', label: 'Sitio Web' },
  { id: 'identificacionVAT', label: 'Identificación VAT' },
  { id: 'tags', label: 'Tags' },
  { id: 'tipoContacto', label: 'Tipo de Contacto' },
  { id: 'idioma', label: 'Idioma' },
  { id: 'moneda', label: 'Moneda' },
  { id: 'formaPago', label: 'Forma de Pago' },
  { id: 'diasVencimiento', label: 'Días de Vencimiento' },
  { id: 'diaVencimiento', label: 'Día de Vencimiento' },
  { id: 'tarifa', label: 'Tarifa' },
  { id: 'descuento', label: 'Descuento' },
  { id: 'cuentaCompras', label: 'Cuenta Compras' },
  { id: 'cuentaPagos', label: 'Cuenta Pagos' },
  { id: 'swift', label: 'Swift' },
  { id: 'iban', label: 'IBAN' },
  { id: 'refMandato', label: 'Ref. Mandato' },
  { id: 'referenciaInterna', label: 'Referencia Interna' },
  { id: 'comercialAsignado', label: 'Comercial Asignado' },
  { id: 'tipoIVA', label: 'Tipo de IVA' },
];

const contactsData = [
  // ...tus datos de contactos aquí
];

const ContactForm = ({ open, handleClose, contact, handleSave }) => {
  const [formData, setFormData] = useState(contact || {
    nombre: '',
    nombreComercial: '',
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
    identificacionVAT: '',
    tags: '',
    tipoContacto: '',
    idioma: '',
    moneda: '',
    formaPago: '',
    diasVencimiento: '',
    diaVencimiento: '',
    tarifa: '',
    descuento: '',
    cuentaCompras: '',
    cuentaPagos: '',
    swift: '',
    iban: '',
    refMandato: '',
    referenciaInterna: '',
    comercialAsignado: '',
    tipoIVA: [], // Asegúrate de que este campo comience como un array vacío
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.multiple ? [...value] : value, // Si el campo es múltiple, asegúrate de manejar el valor como un array
    });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>{contact ? 'Editar Contacto' : 'Agregar Contacto'}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
          {contact ? 'Edita la información del contacto' : 'Introduce la información del nuevo contacto'}
        </DialogContentText>

        <Typography variant="h6" sx={{ mt: 3 }}>Información: Datos Fiscales</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField margin="dense" label="Nombre" name="nombre" fullWidth variant="outlined" value={formData.nombre} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Nombre Comercial" name="nombreComercial" fullWidth variant="outlined" value={formData.nombreComercial} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="NIF" name="nif" fullWidth variant="outlined" value={formData.nif} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Dirección" name="direccion" fullWidth variant="outlined" value={formData.direccion} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Población" name="poblacion" fullWidth variant="outlined" value={formData.poblacion} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Código Postal" name="codigoPostal" fullWidth variant="outlined" value={formData.codigoPostal} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Provincia</InputLabel>
              <Select name="provincia" value={formData.provincia} onChange={handleChange}>
                <MenuItem value="Provincia1">Provincia 1</MenuItem>
                <MenuItem value="Provincia2">Provincia 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>País</InputLabel>
              <Select name="pais" value={formData.pais} onChange={handleChange}>
                <MenuItem value="Pais1">País 1</MenuItem>
                <MenuItem value="Pais2">País 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 3 }}>Información de Contacto (Empresa)</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField margin="dense" label="Email" name="email" fullWidth variant="outlined" value={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Teléfono" name="telefono" fullWidth variant="outlined" value={formData.telefono} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Móvil" name="movil" fullWidth variant="outlined" value={formData.movil} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Sitio Web" name="sitioWeb" fullWidth variant="outlined" value={formData.sitioWeb} onChange={handleChange} />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 3 }}>Temas de IVA</Typography>
        <TextField margin="dense" label="Identificación VAT" name="identificacionVAT" fullWidth variant="outlined" value={formData.identificacionVAT} onChange={handleChange} />
        <FormControl fullWidth margin="dense">
          <InputLabel>Tipo de IVA</InputLabel>
          <Select
            name="tipoIVA"
            value={formData.tipoIVA}
            onChange={handleChange}
            multiple
          >
            <MenuItem value="IVA 1">IVA 1</MenuItem>
            <MenuItem value="IVA 2">IVA 2</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" sx={{ mt: 3 }}>Cosas Internas</Typography>
        <TextField margin="dense" label="Tags" name="tags" fullWidth variant="outlined" value={formData.tags} onChange={handleChange} />
        <TextField margin="dense" label="Referencia Interna" name="referenciaInterna" fullWidth variant="outlined" value={formData.referenciaInterna} onChange={handleChange} />
        <TextField margin="dense" label="Comercial Asignado" name="comercialAsignado" fullWidth variant="outlined" value={formData.comercialAsignado} onChange={handleChange} />

        <FormControl fullWidth margin="dense">
          <InputLabel>Tipo de Contacto</InputLabel>
          <Select name="tipoContacto" value={formData.tipoContacto} onChange={handleChange}>
            <MenuItem value="Cliente">Cliente</MenuItem>
            <MenuItem value="Proveedor">Proveedor</MenuItem>
            <MenuItem value="Lead">Lead</MenuItem>
            <MenuItem value="Deudor">Deudor</MenuItem>
            <MenuItem value="Acreedor">Acreedor</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" sx={{ mt: 3 }}>Preferencias</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Idioma</InputLabel>
              <Select name="idioma" value={formData.idioma} onChange={handleChange}>
                <MenuItem value="Español">Español</MenuItem>
                <MenuItem value="Inglés">Inglés</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Moneda</InputLabel>
              <Select name="moneda" value={formData.moneda} onChange={handleChange}>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Forma de Pago</InputLabel>
              <Select name="formaPago" value={formData.formaPago} onChange={handleChange}>
                <MenuItem value="Transferencia">Transferencia</MenuItem>
                <MenuItem value="Tarjeta">Tarjeta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Días de Vencimiento" name="diasVencimiento" fullWidth variant="outlined" value={formData.diasVencimiento} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Día de Vencimiento" name="diaVencimiento" fullWidth variant="outlined" value={formData.diaVencimiento} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Tarifa" name="tarifa" fullWidth variant="outlined" value={formData.tarifa} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Descuento" name="descuento" fullWidth variant="outlined" value={formData.descuento} onChange={handleChange} />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 3 }}>Información Bancaria</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField margin="dense" label="Cuenta Compras" name="cuentaCompras" fullWidth variant="outlined" value={formData.cuentaCompras} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Cuenta Pagos" name="cuentaPagos" fullWidth variant="outlined" value={formData.cuentaPagos} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="Swift" name="swift" fullWidth variant="outlined" value={formData.swift} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="dense" label="IBAN" name="iban" fullWidth variant="outlined" value={formData.iban} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField margin="dense" label="Ref. Mandato" name="refMandato" fullWidth variant="outlined" value={formData.refMandato} onChange={handleChange} />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 3 }}>Información Adicional</Typography>
        <TextField
          margin="dense"
          label="Información Adicional"
          name="informacionAdicional"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={formData.informacionAdicional}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#2666CF', fontWeight: '500', textTransform: 'none', bgcolor: '#ffffff', border: '1px solid #2666CF', borderRadius: 2 }}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#ffffff', fontWeight: '500', textTransform: 'none', bgcolor: '#2666CF', borderRadius: 2 }}>
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
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
              Contactos
            </Typography>
            <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap', gap: 1 }}>
              <TextField 
                variant="outlined" 
                placeholder="Buscar..." 
                fullWidth 
                sx={{ flexGrow: 1 }}
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
                sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', minWidth: '120px' }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                Agregar
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: '#2666CF', borderColor: '#2666CF', fontWeight: '500', minWidth: '120px' }} 
                startIcon={<ImportExportIcon />}
              >
                Importar/Exportar
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: '#2666CF', borderColor: '#2666CF', fontWeight: '500', minWidth: '120px' }} 
                startIcon={<PortalIcon />}
              >
                Portal
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
                  minWidth: '48px',
                  minHeight: '48px'
                }}
                onClick={handleMenuOpen}
              >
                <ViewColumnIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    maxHeight: '400px',
                    width: '250px',
                  },
                }}
              >
                {allColumns.map((column) => (
                  <DropdownMenuItem key={column.id}>
                    <FormControlLabel
                      control={<Checkbox checked={visibleColumns.includes(column.id)} onChange={() => handleColumnToggle(column.id)} />}
                      label={column.label}
                    />
                  </DropdownMenuItem>
                ))}
              </Menu>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    {allColumns.map((column) =>
                      visibleColumns.includes(column.id) ? <TableCell key={column.id}>{column.label}</TableCell> : null
                    )}
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      {visibleColumns.map((column) => (
                        <TableCell key={column}>{contact[column]}</TableCell>
                      ))}
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
