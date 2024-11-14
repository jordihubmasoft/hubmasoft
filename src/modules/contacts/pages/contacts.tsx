import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar las escalas y componentes
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import {
  Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment,
  MenuItem, FormControl, Select, InputLabel, TableCell, TableRow, TableBody, Table, TableContainer, TableHead, Checkbox, FormControlLabel, Menu, MenuItem as DropdownMenuItem, Grid, FormHelperText,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs
} from '@mui/material';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Drawer } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import MapIcon from '@mui/icons-material/Map';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useRouter } from 'next/router';
import PortalIcon from '@mui/icons-material/Language';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Bar } from 'react-chartjs-2';
// Datos de ejemplo para los gráficos de ventas y compras
const salesData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Ventas (€)',
      data: [2500, 1200, 1500, 2000, 3000, 2500, 2800, 3200, 1900, 2100, 2700, 2900],
      backgroundColor: '#2666CF',
    },
  ],
};

const purchasesData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Compras (€)',
      data: [800, 600, 750, 900, 1000, 850, 950, 1100, 700, 650, 900, 1000],
      backgroundColor: '#F44336',
    },
  ],
};

const drawerStyles = {
  zIndex: 1300,
  width: 500,
  p: 2,
  maxHeight: '100%',
  overflowY: 'auto', // Hacer el Drawer scrolleable
};

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
  const [filter, setFilter] = useState('todos'); // Estado para manejar el filtro seleccionado
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false); // Nuevo estado para manejar la expansión del Drawer
  const [selectedTab, setSelectedTab] = useState(0);

const handleTabChange = (event, newValue) => {
  setSelectedTab(newValue);
};




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

  const getFilteredContacts = () => {
    return contacts.filter((contact) => {
      const matchesSearchTerm = contact.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        contact.tipoContacto.toLowerCase().includes(searchTerm.toLowerCase());
  
      if (filter === 'todos') return matchesSearchTerm;
      if (filter === 'clientes') return matchesSearchTerm && contact.tipoContacto === 'Cliente';
      if (filter === 'proveedores') return matchesSearchTerm && contact.tipoContacto === 'Proveedor';
  
      return false;
    });
  };
  
  

  const router = useRouter();

  const handlePortalClick = () => {
    if (isPasswordEnabled) {
      // Si la contraseña está activada, redirigir al inicio de sesión
      window.open('/contacts/portal-login'); // Redirige a una página de inicio de sesión
    } else {
      // Si la contraseña no está activada, redirigir directamente al portal del cliente
      window.open('/contacts/portal-clientes', '_blank');
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
  
            {/* Campo de búsqueda */}
            <Box sx={{ mb: 3 }}>
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
            </Box>
  
            {/* Contenedor para filtros y botones de acción */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {/* Filtros alineados a la izquierda */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant={filter === 'todos' ? 'contained' : 'outlined'}
                  onClick={() => setFilter('todos')}
                  sx={{ mr: 1 }}
                >
                  TODOS
                </Button>
                <Button
                  variant={filter === 'clientes' ? 'contained' : 'outlined'}
                  onClick={() => setFilter('clientes')}
                  sx={{ mr: 1 }}
                >
                  CLIENTES
                </Button>
                <Button
                  variant={filter === 'proveedores' ? 'contained' : 'outlined'}
                  onClick={() => setFilter('proveedores')}
                >
                  PROVEEDORES
                </Button>
              </Box>
  
              {/* Botones de acción alineados a la derecha */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
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
                  sx={{
                    color: '#2666CF',
                    borderColor: '#2666CF',
                    fontWeight: '500',
                    minWidth: '150px',
                  }}
                  startIcon={<ImportExportIcon />}
                >
                  Importar/Exportar
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#2666CF',
                    borderColor: '#2666CF',
                    fontWeight: '500',
                    minWidth: '120px',
                  }}
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
                    minHeight: '48px',
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
                        control={
                          <Checkbox
                            checked={visibleColumns.includes(column.id)}
                            onChange={() => handleColumnToggle(column.id)}
                          />
                        }
                        label={column.label}
                      />
                    </DropdownMenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
  
            {/* Tabla combinada de Contactos */}
            <Typography variant="h4" sx={{ mb: 3, color: '#2666CF', fontWeight: '600' }}>Contactos</Typography>
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
                  {getFilteredContacts().map((contact) => (
                    <TableRow
                      key={contact.id}
                      sx={{ '&:hover': { bgcolor: '#F1F1F1', cursor: 'pointer' } }}
                      onClick={() => handleOpenDrawer(contact)}
                    >
                      {visibleColumns.map((column) => (
                      <TableCell
                        key={column}
                        sx={{
                          ...(column === 'tipoContacto' && {
                            bgcolor: contact[column] === 'Cliente' ? '#d4edda' : '#fff3cd', // Verde suave para Cliente, amarillo suave para Proveedor
                            color: contact[column] === 'Cliente' ? '#155724' : '#856404',  // Texto verde oscuro o marrón
                            fontWeight: 'bold',
                            borderRadius: '4px',  
                          }),
                        }}
                      >
                        {contact[column]}
                      </TableCell>
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
  sx={{
    zIndex: 1300,
    width: isDrawerExpanded ? '1300px' : '500px', // Ancho dinámico
    transition: 'width 0.3s ease',
    marginTop: '64px', // Evita superposición con el Header
    height: 'calc(100% - 64px)', // Ajusta la altura para no ocupar espacio del Header
  }}
  PaperProps={{
    style: {
      width: isDrawerExpanded ? '1300px' : '500px', // Control dinámico del tamaño
      transition: 'width 0.3s ease',
    },
  }}
>
{!isDrawerExpanded ? (
    // **Contenido No Expandido**
    <Box sx={{ p: 2, overflowY: 'auto', height: '100%' }}>
      {/* Nombre, tipo de contacto y botón "Más" */}
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
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ margin: 0, fontWeight: 'bold' }}>
            {selectedContact?.nombre}
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
            {selectedContact?.tipoContacto}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button
            startIcon={<ArrowForwardIcon />}
            onClick={() => setIsDrawerExpanded(true)} // Expande el Drawer
            sx={{
              textTransform: 'none',
              bgcolor: '#2666CF',
              color: '#fff',
              borderRadius: '50px',
              p: 1,
            }}
          >
            Más
          </Button>
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

      {/* Información de Contacto */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Información de Contacto
          </Typography>
          <Button
            variant="text"
            startIcon={<EditIcon />} // Función para editar la información
            sx={{ textTransform: 'none', color: '#2666CF' }}
          >
            Editar
          </Button>
        </Box>
        <Typography variant="body2">
          <strong>Nombre:</strong> {selectedContact?.nombre}
        </Typography>
        <Typography variant="body2">
          <strong>Nif:</strong> {selectedContact?.nif}
        </Typography>
        <Typography variant="body2">
          <strong>Dirección:</strong> {selectedContact?.direccion}
        </Typography>
        <Typography variant="body2">
          <strong>Teléfono:</strong> {selectedContact?.telefono}
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong> {selectedContact?.email}
        </Typography>
      </Box>

      {/* Botones de creación rápida */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button variant="outlined" sx={{ textTransform: 'none' }}>Nuevo Presupuesto</Button>
        <Button variant="outlined" sx={{ textTransform: 'none' }}>Nuevo Pedido</Button>
        <Button variant="outlined" sx={{ textTransform: 'none' }}>Nuevo Albarán</Button>
        <Button variant="outlined" sx={{ textTransform: 'none' }}>Nueva Factura</Button>
        <Button variant="outlined" sx={{ textTransform: 'none' }}>Añadir Nota</Button>
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

      {/* Gráfico de Ventas */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Ventas
        </Typography>
        {/* Nueva Sección de Información */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            p: 1,
            borderRadius: 1,
            boxShadow: 1,
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Dato Principal y Enlace */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%' }}>
            <Typography
              variant="body2"
              sx={{ color: '#4A4A4A', fontSize: '0.875rem' }}
            >
              Ventas
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', color: '#000000', fontSize: '1rem' }}
            >
              27.682,56 €
            </Typography>
            <Button
              variant="text"
              sx={{
                p: 0,
                mt: 0.5,
                textTransform: 'none',
                color: '#2666CF',
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.75rem',
              }}
              endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem' }} />}
              onClick={() => {
                // Función al hacer clic en "8 facturas"
              }}
            >
              8 facturas
            </Button>
          </Box>

          {/* Promedio por Venta */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%', textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{ color: '#B0B0B0', fontSize: '0.75rem' }}
            >
              Promedio/venta
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}
            >
              3.460,32 €
            </Typography>
          </Box>

          {/* Frecuencia Media y Pendiente de Cobro */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%', textAlign: 'right' }}>
            <Typography
              variant="body2"
              sx={{ color: '#B0B0B0', fontSize: '0.75rem' }}
            >
              Frec. media
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}
            >
              0 días
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: '#B0B0B0', fontSize: '0.75rem', mt: 1 }}
            >
              Pend. cobro
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}
            >
              2.514,87 €
            </Typography>
          </Box>
        </Box>

        <Bar
          data={salesData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </Box>

      {/* Gráfico de Compras */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Compras
        </Typography>
        {/* Nueva Sección de Información */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            p: 1,
            borderRadius: 1,
            boxShadow: 1,
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Dato Principal y Enlace */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%' }}>
            <Typography
              variant="body2"
              sx={{ color: '#4A4A4A', fontSize: '0.875rem' }}
            >
              Compras
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', color: '#000000', fontSize: '1rem' }}
            >
              15.234,89 €
            </Typography>
            <Button
              variant="text"
              sx={{
                p: 0,
                mt: 0.5,
                textTransform: 'none',
                color: '#2666CF',
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.75rem',
              }}
              endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem' }} />}
              onClick={() => {
                // Función al hacer clic en "5 pedidos"
              }}
            >
              5 pedidos
            </Button>
          </Box>

          {/* Promedio por Compra */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%', textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{ color: '#B0B0B0', fontSize: '0.75rem' }}
            >
              Promedio/compra
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}
            >
              3.046,78 €
            </Typography>
          </Box>

          {/* Frecuencia Media y Pendiente de Pago */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%', textAlign: 'right' }}>
            <Typography
              variant="body2"
              sx={{ color: '#B0B0B0', fontSize: '0.75rem' }}
            >
              Frec. media
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}
            >
              5 días
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: '#B0B0B0', fontSize: '0.75rem', mt: 1 }}
            >
              Pend. pago
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}
            >
              1.200,50 €
            </Typography>
          </Box>
        </Box>

        <Bar
          data={purchasesData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </Box>
    </Box>


  ) : (
    <Box sx={{ p: 3, overflowY: 'auto', height: '100%', bgcolor: '#F9F9F9' }}>
    {/* Cabecera */}
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 1, color: '#333' }}>
        {selectedContact?.nombre || 'Félix Martínez Giménez'}
      </Typography>
      <Button
        startIcon={<ArrowForwardIcon />}
        onClick={() => setIsDrawerExpanded(false)}
        sx={{
          textTransform: 'none',
          bgcolor: '#2666CF',
          color: '#fff',
          borderRadius: '50px',
          p: 1,
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        Menos
      </Button>
    </Box>
  
    {/* Pestañas de Navegación */}
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      sx={{
        mb: 3,
        '.MuiTabs-indicator': {
          bgcolor: '#2666CF',
        },
        '.MuiTab-root': {
          textTransform: 'none',
          fontWeight: 'bold',
          color: '#666',
          '&.Mui-selected': {
            color: '#2666CF',
          },
        },
      }}
    >
      <Tab label="Resumen" />
      <Tab label="Facturas" />
      <Tab label="Albaranes" />
      <Tab label="Pedidos" />
      <Tab label="Pagos" />
      <Tab label="Notas" />
    </Tabs>
  
    {/* Contenido del Resumen */}
{selectedTab === 0 && (
  <Grid container spacing={3}>
    {/* Información del Cliente */}
    <Grid item xs={12} md={3}>
  <Paper
    sx={{
      p: 2,
      borderRadius: 2,
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
      height: '100%',
    }}
  >
    {/* Encabezado con el botón "Editar" */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2666CF' }}>
        Información del Cliente
      </Typography>
      <Button variant="text" color="primary" >
        Editar
      </Button>
    </Box>

    <Typography variant="body2" sx={{ mb: 1 }}>
      <strong>Nombre:</strong> Félix Martínez Giménez
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      <strong>NIF:</strong> 12345678L
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      <strong>Teléfono:</strong>{' '}
      <a href="tel:648693534" style={{ color: '#2666CF' }}>
        648693534
      </a>
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      <strong>Email:</strong>{' '}
      <a href="mailto:info@hubmasoft.com" style={{ color: '#2666CF' }}>
        info@hubmasoft.com
      </a>
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      <strong>Dirección:</strong>
    </Typography>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField label="Dirección" fullWidth size="small" />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Código Postal" fullWidth size="small" />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Población" fullWidth size="small" />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Provincia" fullWidth size="small" />
      </Grid>
      <Grid item xs={6}>
        <TextField label="País" fullWidth size="small" />
      </Grid>
    </Grid>
  </Paper>
</Grid>


    <Grid item xs={12} md={6}>
  <Paper
    sx={{
      p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          height: '400px', // Establece una altura fija para el contenedor
          display: 'flex',
          flexDirection: 'column',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1F4B99' }}>
        Gráfico de Ventas
      </Typography>
      <TextField
        select
        size="small"
        defaultValue="2024"
        sx={{
          width: 100,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          },
        }}
      >
        <MenuItem value="2024">2024</MenuItem>
        <MenuItem value="2023">2023</MenuItem>
        <MenuItem value="2022">2022</MenuItem>
      </TextField>
    </Box>
    <Bar
      data={{
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
          {
            label: 'Cobradas',
            data: [2000, 4000, 10000, 5000, 7000, 6000, 8000],
            backgroundColor: '#003366',
            borderRadius: 5,
            borderWidth: 1,
          },
          {
            label: 'Pendientes',
            data: [1000, 2000, 3000, 2000, 3000, 2500, 3000],
            backgroundColor: '#2666CF',
            borderRadius: 5,
            borderWidth: 1,
          },
          {
            label: 'Vencidas',
            data: [500, 1000, 1500, 1000, 2000, 1500, 1000],
            backgroundColor: '#DC3545',
            borderRadius: 5,
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              color: '#333',
              font: {
                size: 13,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.raw} €`,
            },
            backgroundColor: '#1F4B99',
            titleColor: '#FFF',
            bodyColor: '#FFF',
            cornerRadius: 5,
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false, // No líneas en el área
              drawTicks: true,
              color: '#e0e0e0',
            },
            ticks: {
              color: '#555',
              font: {
                size: 12,
              },
            },
          },
          y: {
            grid: {
              color: '#e0e0e0',
            },
            ticks: {
              color: '#555',
              font: {
                size: 12,
              },
              callback: (value) => `${value} €`,
            },
          },
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            bottom: 10,
          },
        },
      }}
    />
  </Paper>
</Grid>



    {/* Resumen Financiero */}
    <Grid item xs={12} md={3}>
      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#2666CF' }}>
          Resumen Financiero
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Total por vencer:</strong>{' '}
          <span style={{ color: '#2666CF', fontWeight: 'bold' }}>1.345,98 €</span>
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, color: '#B00020', fontWeight: 'bold' }}>
          <strong>Total vencido por cobrar:</strong> 998,76 €
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Total cobrado:</strong> 24.986,34 €
        </Typography>
        <Typography variant="body2">
          <strong>Total vendido:</strong> 27.331,08 €
        </Typography>
      </Paper>
    </Grid>

    {/* Portal del Cliente */}
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#2666CF' }}>
          Portal Cliente
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderColor: '#2666CF',
              color: '#2666CF',
              fontWeight: 'bold',
            }}
          >
            Establecer contraseña del portal
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              bgcolor: '#2666CF',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            Ver portal del cliente
          </Button>
        </Box>
      </Paper>
    </Grid>

    {/* Notas */}
    <Grid item xs={12} md={6}>
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
          bgcolor: '#FFF8DC',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#856404' }}>
          Notas
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          21/09/2024: Entregar los pedidos antes de las 13h que cierran el muelle de carga.
        </Typography>
        <Button
          startIcon={<AddIcon />}
          sx={{
            mt: 1,
            textTransform: 'none',
            color: '#856404',
            fontWeight: 'bold',
          }}
        >
          + Añadir nota
        </Button>
      </Paper>
    </Grid>
  </Grid>
)}


  {/* **Contenido de Otras Pestañas** */}
  {selectedTab === 1 && (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#2666CF' }}>
          Facturas
        </Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: '#003366' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Número de Factura</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Cliente</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Total</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Aquí agregarías dinámicamente las filas de facturas */}
              <TableRow>
                <TableCell>FA-2023-001</TableCell>
                <TableCell>01/01/2023</TableCell>
                <TableCell>Cliente A</TableCell>
                <TableCell>1,200.00 €</TableCell>
                <TableCell sx={{ color: '#28A745', fontWeight: 'bold' }}>Pagada</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  </Grid>
)}
{selectedTab === 2 && (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#2666CF' }}>
          Albaranes
        </Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: '#003366' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Número de Albarán</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Cliente</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Aquí agregarías dinámicamente las filas de albaranes */}
              <TableRow>
                <TableCell>AL-2023-001</TableCell>
                <TableCell>02/01/2023</TableCell>
                <TableCell>Cliente B</TableCell>
                <TableCell sx={{ color: '#FFC107', fontWeight: 'bold' }}>Pendiente</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  </Grid>
)}
{selectedTab === 3 && (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#2666CF' }}>
          Pedidos
        </Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: '#003366' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Número de Pedido</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Cliente</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Total</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Aquí agregarías dinámicamente las filas de pedidos */}
              <TableRow>
                <TableCell>PE-2023-001</TableCell>
                <TableCell>03/01/2023</TableCell>
                <TableCell>Cliente C</TableCell>
                <TableCell>2,500.00 €</TableCell>
                <TableCell sx={{ color: '#DC3545', fontWeight: 'bold' }}>Cancelado</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  </Grid>
)}
{selectedTab === 4 && (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#2666CF' }}>
          Pagos
        </Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: '#003366' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha de Pago</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nombre Cliente</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Número de Factura</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Total Pagado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Aquí agregarías dinámicamente las filas de pagos */}
              <TableRow>
                <TableCell>04/01/2023</TableCell>
                <TableCell>Cliente D</TableCell>
                <TableCell>FA-2023-002</TableCell>
                <TableCell>1,800.00 €</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  </Grid>
)}
{selectedTab === 5 && (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          bgcolor: '#FFF8DC',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#856404' }}>
          Notas
        </Typography>
        <Grid container spacing={2}>
          {/* Ejemplo de notas en estilo posit */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2,
                bgcolor: '#FFF8DC',
                borderRadius: 2,
                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Nota Importante
              </Typography>
              <Typography variant="body2" sx={{ color: '#856404' }}>
                Revisar el envío del pedido antes del cierre.
              </Typography>
              <Button
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  textTransform: 'none',
                  color: '#856404',
                  fontWeight: 'bold',
                }}
              >
                Leer más
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>
)}


  {/* Diálogo para Añadir Contraseña */}
  <Dialog open={isPasswordDialogOpen} onClose={() => setIsPasswordDialogOpen(false)}>
    <DialogTitle>Añadir Contraseña</DialogTitle>
    <DialogContent>
      <FormControlLabel
        control={
          <Checkbox
            checked={isPasswordEnabled}
            onChange={(e) => setIsPasswordEnabled(e.target.checked)}
          />
        }
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
          // Lógica para guardar la contraseña
          setIsPasswordDialogOpen(false);
        }}
        color="primary"
      >
        Guardar
      </Button>
    </DialogActions>
  </Dialog>
</Box>
  )}
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