import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment,
  MenuItem, FormControl, Select, InputLabel, TableCell, TableRow, TableBody, Table, TableContainer, TableHead, Checkbox, FormControlLabel, Menu, MenuItem as DropdownMenuItem, Grid, FormHelperText,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Drawer } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import MapIcon from '@mui/icons-material/Map';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useRouter } from 'next/router';
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

const initialFormData = {
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
  tipoIVA: [],
  informacionAdicional: ''
};

const contactsData = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    nombreComercial: 'JP Business',
    nif: '12345678Z',
    direccion: 'Calle Falsa 123',
    poblacion: 'Madrid',
    codigoPostal: '28001',
    provincia: 'Madrid',
    pais: 'España',
    email: 'juan@example.com',
    telefono: '912345678',
    movil: '600123456',
    sitioWeb: 'https://www.jp-business.com',
    identificacionVAT: 'ES12345678Z',
    tags: 'Cliente VIP',
    tipoContacto: 'Cliente',
    idioma: 'Español',
    moneda: 'EUR',
    formaPago: 'Transferencia',
    diasVencimiento: '30',
    diaVencimiento: '15',
    tarifa: 'Normal',
    descuento: '10',
    cuentaCompras: '4001',
    cuentaPagos: '5001',
    swift: 'BBVAESMMXXX',
    iban: 'ES7620770024003102575766',
    refMandato: '12345',
    referenciaInterna: 'REF001',
    comercialAsignado: 'Luis Gómez',
    tipoIVA: ['IVA 1'],
    informacionAdicional: 'Cliente con historial impecable.'
  },
  {
    id: 2,
    nombre: 'María González',
    nombreComercial: 'Distribuciones MG',
    nif: '87654321Y',
    direccion: 'Avenida Principal 45',
    poblacion: 'Barcelona',
    codigoPostal: '08001',
    provincia: 'Barcelona',
    pais: 'España',
    email: 'maria@example.com',
    telefono: '931234567',
    movil: '650123789',
    sitioWeb: 'https://www.mg-distribuciones.com',
    identificacionVAT: 'ES87654321Y',
    tags: 'Proveedor Regular',
    tipoContacto: 'Proveedor',
    idioma: 'Español',
    moneda: 'EUR',
    formaPago: 'Domiciliación Bancaria',
    diasVencimiento: '60',
    diaVencimiento: '20',
    tarifa: 'Especial',
    descuento: '5',
    cuentaCompras: '4100',
    cuentaPagos: '5100',
    swift: 'CAIXESBBXXX',
    iban: 'ES9020800066101234567891',
    refMandato: '98765',
    referenciaInterna: 'REF002',
    comercialAsignado: 'Carlos Martínez',
    tipoIVA: ['IVA 2'],
    informacionAdicional: 'Proveedor puntual y confiable.'
  }
];

const ContactForm = ({ open, handleClose, contact, handleSave }) => {
  const [formData, setFormData] = useState(contact || initialFormData);
  const [shippingAddresses, setShippingAddresses] = useState([{ direccion: '', poblacion: '', codigoPostal: '', provincia: '', pais: '' }]);


  const [errors, setErrors] = useState({
    nombre: false,
    nif: false,
    direccion: false,
    pais: false,
    codigoPostal: false,
    provincia: false,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.multiple ? [...value] : value,
    });
  };

  const addShippingAddress = () => {
    setShippingAddresses([...shippingAddresses, { direccion: '', poblacion: '', codigoPostal: '', provincia: '', pais: '' }]);
  };

  const handleShippingChange = (index, e) => {
    const updatedAddresses = [...shippingAddresses];
    updatedAddresses[index][e.target.name] = e.target.value;
    setShippingAddresses(updatedAddresses);
  };

  const validateForm = () => {
    const newErrors = {
      nombre: !formData.nombre,
      nif: !formData.nif,
      direccion: !formData.direccion,
      codigoPostal: !formData.codigoPostal,
      pais: !formData.pais,
      provincia: !formData.provincia,
    };
  
    setErrors(newErrors);
  
    // Si algún campo tiene un error, devolvemos false
    return !Object.values(newErrors).some((error) => error);
  };
  

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave(formData);
      handleClose();
    }
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
  
        {/* Información: Datos Fiscales */}
        <Typography variant="h6" sx={{ mt: 3 }}>Información: Datos Fiscales</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              fullWidth
              variant="outlined"
              value={formData.nombre}
              onChange={handleChange}
              required
              error={errors.nombre}
              helperText={errors.nombre ? "Este campo es obligatorio" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Nombre Comercial"
              name="nombreComercial"
              fullWidth
              variant="outlined"
              value={formData.nombreComercial}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="NIF"
              name="nif"
              fullWidth
              variant="outlined"
              value={formData.nif}
              onChange={handleChange}
              required
              error={errors.nif}
              helperText={errors.nif ? "Este campo es obligatorio" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Dirección"
              name="direccion"
              fullWidth
              variant="outlined"
              value={formData.direccion}
              onChange={handleChange}
              required
              error={errors.direccion}
              helperText={errors.direccion ? "Este campo es obligatorio" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Código Postal"
              name="codigoPostal"
              fullWidth
              variant="outlined"
              value={formData.codigoPostal}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Población"
              name="poblacion"
              fullWidth
              variant="outlined"
              value={formData.poblacion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={errors.provincia}>
              <InputLabel>Provincia</InputLabel>
              <Select
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                required
              >
                <MenuItem value="Predeterminada">Predeterminada</MenuItem>
              </Select>
              {errors.provincia && <FormHelperText>Este campo es obligatorio</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={errors.pais}>
              <InputLabel>País</InputLabel>
              <Select
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                required
              >
                <MenuItem value="Predeterminada">Predeterminada</MenuItem>
              </Select>
              {errors.pais && <FormHelperText>Este campo es obligatorio</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
  
        {/* Información de Contacto (Empresa) */}
        <Typography variant="h6" sx={{ mt: 3 }}>Información de Contacto (Empresa)</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Teléfono"
              name="telefono"
              fullWidth
              variant="outlined"
              value={formData.telefono}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Móvil"
              name="movil"
              fullWidth
              variant="outlined"
              value={formData.movil}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Sitio Web"
              name="sitioWeb"
              fullWidth
              variant="outlined"
              value={formData.sitioWeb}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
  
        {/* Temas de IVA */}
        <Typography variant="h6" sx={{ mt: 3 }}>Temas de IVA</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Identificación VAT"
              name="identificacionVAT"
              fullWidth
              variant="outlined"
              value={formData.identificacionVAT}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Tipo de IVA</InputLabel>
              <Select
                name="tipoIVA"
                value={formData.tipoIVA}
                onChange={handleChange}
                multiple
                required
              >
                <MenuItem value="IVA 1">IVA 1</MenuItem>
                <MenuItem value="IVA 2">IVA 2</MenuItem>
              </Select>
              <FormHelperText>Selecciona al menos un tipo de IVA.</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
  
        {/* Dirección de Envío */}
        <Typography variant="h6" sx={{ mt: 3 }}>Dirección de Envío</Typography>
        {shippingAddresses.map((address, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                name="direccion"
                value={address.direccion}
                onChange={(e) => handleShippingChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Población"
                name="poblacion"
                value={address.poblacion}
                onChange={(e) => handleShippingChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código Postal"
                name="codigoPostal"
                value={address.codigoPostal}
                onChange={(e) => handleShippingChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Provincia</InputLabel>
                <Select
                  name="provincia"
                  value={address.provincia}
                  onChange={(e) => handleShippingChange(index, e)}
                >
                  <MenuItem value="Predeterminada">Predeterminada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>País</InputLabel>
                <Select
                  name="pais"
                  value={address.pais}
                  onChange={(e) => handleShippingChange(index, e)}
                >
                  <MenuItem value="Predeterminada">Predeterminada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        ))}
        <Button onClick={addShippingAddress} variant="contained" startIcon={<AddIcon />}>
          Agregar Dirección
        </Button>
  
        {/* Cosas Internas */}
        <Typography variant="h6" sx={{ mt: 3 }}>Cosas Internas</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Tags"
              name="tags"
              fullWidth
              variant="outlined"
              value={formData.tags}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Referencia Interna"
              name="referenciaInterna"
              fullWidth
              variant="outlined"
              value={formData.referenciaInterna}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Comercial Asignado</InputLabel>
              <Select
                name="comercialAsignado"
                value={formData.comercialAsignado}
                onChange={handleChange}
              >
                {/* Aquí podrías incluir los valores de comerciales */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Contacto</InputLabel>
              <Select
                name="tipoContacto"
                value={formData.tipoContacto}
                onChange={handleChange}
              >
                <MenuItem value="Cliente">Cliente</MenuItem>
                <MenuItem value="Proveedor">Proveedor</MenuItem>
                <MenuItem value="Lead">Lead</MenuItem>
                <MenuItem value="Deudor">Deudor</MenuItem>
                <MenuItem value="Acreedor">Acreedor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
  
        {/* Preferencias */}
        <Typography variant="h6" sx={{ mt: 3 }}>Preferencias</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Idioma</InputLabel>
              <Select
                name="idioma"
                value={formData.idioma}
                onChange={handleChange}
              >
                <MenuItem value="Predeterminada">Predeterminada</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Moneda</InputLabel>
              <Select
                name="moneda"
                value={formData.moneda}
                onChange={handleChange}
              >
                <MenuItem value="Predeterminada">Predeterminada</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Días de Vencimiento"
              name="diasVencimiento"
              fullWidth
              variant="outlined"
              value={formData.diasVencimiento}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Día de Vencimiento"
              name="diaVencimiento"
              fullWidth
              variant="outlined"
              value={formData.diaVencimiento}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Forma de Pago</InputLabel>
              <Select
                name="formaPago"
                value={formData.formaPago}
                onChange={handleChange}
              >
                <MenuItem value="Predeterminada">Predeterminada</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Tarifa"
              name="tarifa"
              fullWidth
              variant="outlined"
              value={formData.tarifa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Descuento"
              name="descuento"
              fullWidth
              variant="outlined"
              value={formData.descuento}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Cuenta Compras"
              name="cuentaCompras"
              fullWidth
              variant="outlined"
              value={formData.cuentaCompras}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Cuenta Pagos"
              name="cuentaPagos"
              fullWidth
              variant="outlined"
              value={formData.cuentaPagos}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Swift"
              name="swift"
              fullWidth
              variant="outlined"
              value={formData.swift}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="IBAN"
              name="iban"
              fullWidth
              variant="outlined"
              value={formData.iban}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Ref. Mandato (SEPA)"
              name="refMandato"
              fullWidth
              variant="outlined"
              value={formData.refMandato}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
  
        {/* Información Adicional */}
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
        <Button
          onClick={handleClose}
          sx={{
            color: '#2666CF',
            fontWeight: '500',
            textTransform: 'none',
            bgcolor: '#ffffff',
            border: '1px solid #2666CF',
            borderRadius: 2,
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
            borderRadius: 2,
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}  

const allPeople = [
  { id: 1, name: 'Juan Pérez' },
  { id: 2, name: 'María González' },
  { id: 3, name: 'Carlos López' },
  { id: 4, name: 'Ana Fernández' },
  { id: 5, name: 'Luis Gómez' },
  { id: 6, name: 'Carmen Sánchez' }
];
const Contacts = () => {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState(contactsData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState(''); 
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPeople, setFilteredPeople] = useState(allPeople);

  // Función para filtrar las personas al buscar
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setFilteredPeople(allPeople.filter(person => person.name.toLowerCase().includes(searchTerm)));
  };

  // Función para abrir el diálogo
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Función para cerrar el diálogo
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };


  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem('visibleColumns')) || allColumns.map((col) => col.id);
    setVisibleColumns(savedColumns);
  }, []);

  useEffect(() => {
    localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const handleOpen = (contact = null) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
  };
  const handleOpenDrawer = (contact) => {
    setSelectedContact(contact);
    setIsDrawerOpen(true);
  };
  

  const handleSave = (contact) => {
    if (selectedContact) {
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
    } else {
      contact.id = contacts.length + 1;
      setContacts([...contacts, contact]);
    }
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

  const getClients = () => contacts.filter((contact) => contact.tipoContacto === 'Cliente');
  const getProviders = () => contacts.filter((contact) => contact.tipoContacto === 'Proveedor');

  const router = useRouter();

  const handlePortalClick = () => {
    if (isPasswordEnabled) {
      // Si la contraseña está activada, redirigir al inicio de sesión
      window.open('/portal-login'); // Redirige a una página de inicio de sesión
    } else {
      // Si la contraseña no está activada, redirigir directamente al portal del cliente
      window.open('/portal-clientes', '_blank');
    }
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
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            transition: 'margin-left 0.3s ease',
            marginLeft: isMenuOpen ? '240px' : '70px',
            maxWidth: 'calc(100% - 240px)',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Container maxWidth="xl">
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
                sx={{
                  bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                  color: '#ffffff',
                  fontWeight: '500',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                  minWidth: '120px',
                }}
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
                onClick={handlePortalClick}
              >
                Portal
              </Button>
  
              <IconButton
                sx={{
                  bgcolor: '#FFA500',
                  color: '#ffffff',
                  borderRadius: 2,
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    bgcolor: '#FF8C00',
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
  
            {/* Tabla de Clientes */}
            <Typography variant="h4" sx={{ mb: 3, color: '#2666CF', fontWeight: '600' }}>Clientes</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table sx={{ minWidth: '100%' }}>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    {allColumns.map((column) =>
                      visibleColumns.includes(column.id) ? <TableCell key={column.id}>{column.label}</TableCell> : null
                    )}
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getClients().map((contact) => (
                    <TableRow
                      key={contact.id}
                      sx={{ '&:hover': { bgcolor: '#F1F1F1', cursor: 'pointer' } }}
                      onClick={() => handleOpenDrawer(contact)}
                    >
                      {visibleColumns.map((column) => (
                        <TableCell key={column}>{contact[column]}</TableCell>
                      ))}
                      <TableCell>
                        <IconButton onClick={(e) => { e.stopPropagation(); handleOpen(contact); }} sx={{ color: '#1A1A40' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={(e) => { e.stopPropagation(); setContacts(contacts.filter((c) => c.id !== contact.id)); }} sx={{ color: '#B00020' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
  
            {/* Tabla de Proveedores */}
            <Typography variant="h4" sx={{ mt: 5, mb: 3, color: '#2666CF', fontWeight: '600' }}>Proveedores</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table sx={{ minWidth: '100%' }}>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    {allColumns.map((column) =>
                      visibleColumns.includes(column.id) ? <TableCell key={column.id}>{column.label}</TableCell> : null
                    )}
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getProviders().map((contact) => (
                    <TableRow
                      key={contact.id}
                      sx={{ '&:hover': { bgcolor: '#F1F1F1', cursor: 'pointer' } }}
                      onClick={() => handleOpenDrawer(contact)}
                    >
                      {visibleColumns.map((column) => (
                        <TableCell key={column}>{contact[column]}</TableCell>
                      ))}
                      <TableCell>
                        <IconButton onClick={(e) => { e.stopPropagation(); handleOpen(contact); }} sx={{ color: '#1A1A40' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={(e) => { e.stopPropagation(); setContacts(contacts.filter((c) => c.id !== contact.id)); }} sx={{ color: '#B00020' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
  
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              sx={{ zIndex: 1300 }}
            >
              <Box sx={{ width: 500, p: 2 }}>
                {/* Nombre y tipo de contacto */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: '#F44336',
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      mr: 2,
                    }}
                  >
                    {selectedContact?.nombre?.[0]}
                    {selectedContact?.nombre?.split(' ')[1]?.[0]} {/* Iniciales del contacto */}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ margin: 0, fontWeight: 'bold' }}>
                      {selectedContact?.nombre}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                      {selectedContact?.tipoContacto}
                    </Typography>
                  </Box>
                </Box>

                {/* Opciones de contacto */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                  <IconButton>
                    <PhoneIcon />
                  </IconButton>
                  <IconButton>
                    <LanguageIcon />
                  </IconButton>
                  <IconButton>
                    <MapIcon />
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                {/* Sección para crear nuevos elementos */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Button variant="outlined" sx={{ textTransform: 'none' }}>
                    Nota
                  </Button>
                  <Button variant="outlined" sx={{ textTransform: 'none' }}>
                    Presupuesto
                  </Button>
                  <Button variant="outlined" sx={{ textTransform: 'none' }}>
                    Factura
                  </Button>
                  <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={handlePortalClick}>
                    Portal Cliente
                  </Button>
                </Box>

                {/* Botón Añadir contraseña */}
                <Button variant="outlined" sx={{ textTransform: 'none', mb: 3 }} onClick={() => setIsPasswordDialogOpen(true)}>
                  Añadir Contraseña
                </Button>

                {/* Sección de relaciones */}
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Relaciones
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    width: '100%',
                    mb: 3,
                  }}
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog} // Abrir el diálogo al hacer clic
                >
                  Relacionar persona
                </Button>

                {/* Ventas */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Ventas
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                        0 Facturas
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                        0.00€
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                        0 días
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                        Pend. cobro: 0.00€
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Compras */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Compras
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                        0 Facturas
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                        0.00€
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                        0 días
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                        Pend. pago: 0.00€
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Dialogo para Añadir Contraseña */}
              <Dialog open={isPasswordDialogOpen} onClose={() => setIsPasswordDialogOpen(false)}>
                <DialogTitle>Añadir Contraseña</DialogTitle>
                <DialogContent>
                  <FormControlLabel
                    control={<Checkbox checked={isPasswordEnabled} onChange={(e) => setIsPasswordEnabled(e.target.checked)} />}
                    label="Activar contraseña para este cliente"
                  />
                  {isPasswordEnabled && (
                    <TextField
                      label="Contraseña"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setIsPasswordDialogOpen(false)} color="primary">
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      // Aquí puedes manejar la lógica de guardar la contraseña
                      setIsPasswordDialogOpen(false);
                    }}
                    color="primary"
                  >
                    Guardar
                  </Button>
                </DialogActions>
              </Dialog>
            </Drawer>




            {/* Dialogo de Relacionar Persona */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              <DialogTitle>Relacionar persona</DialogTitle>
              <DialogContent>
                <TextField
                  label="Buscar persona"
                  fullWidth
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
                  sx={{ mb: 2 }}
                />
                <List>
                  {filteredPeople.map(person => (
                    <ListItem key={person.id}>
                      <ListItemText primary={person.name} />
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
            </Dialog>

            {/* Agrega el ContactForm aquí */}
            <ContactForm open={open} handleClose={handleClose} contact={selectedContact} handleSave={handleSave} />

  
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Contacts;