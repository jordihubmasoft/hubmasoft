// pages/contacts/index.tsx
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Menu,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItemButton,
} from '@mui/material';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PortalIcon from '@mui/icons-material/Language';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Drawer } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';
import ContactTable from '../components/contactTable';
import ContactForm from '../components/contactForm'; // Asegúrate de tener este componente

// Importar ContactService y tipos adicionales
import ContactService from '../../../services/ContactService';
import { Contact, ShippingAddress } from '../../../types/Contact';
import { LinkedContact } from '../../../types/LinkedContact';
import { CommonResponse } from '../../../types/CommonResponse';
import useAuthStore from '../../../store/useAuthStore';
// Añadir esta línea:
import LinkedContactsService from '../../../services/LinkedContactsService';

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
  informacionAdicional: '',
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
    informacionAdicional: 'Cliente con historial impecable.',
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
    informacionAdicional: 'Proveedor puntual y confiable.',
  },
];

const Contacts = () => {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [contacts, setContacts] = useState(contactsData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPeople, setFilteredPeople] = useState(contactsData);
  const [filter, setFilter] = useState('todos');
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(selectedContact);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [editClientData, setEditClientData] = useState({
    nombre: selectedContact?.nombre || '',
    nif: selectedContact?.nif || '',
    telefono: selectedContact?.telefono || '',
    email: selectedContact?.email || '',
    direccion: selectedContact?.direccion || '',
    codigoPostal: selectedContact?.codigoPostal || '',
    poblacion: selectedContact?.poblacion || '',
    provincia: selectedContact?.provincia || '',
    pais: selectedContact?.pais || '',
  });
  const [linkedContacts, setLinkedContacts] = useState<LinkedContact[]>([]); // <--- Añadido
  const token = useAuthStore((state) => state.token); 
  const ownerContactId = useAuthStore((state) => state.contactId);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPeople(
      contacts.filter(
        (contact) =>
          contact.nombre.toLowerCase().includes(term) ||
          contact.tipoContacto.toLowerCase().includes(term)
      )
    );
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  useEffect(() => {
    const fetchLinkedContacts = async () => {
      if (selectedContact?.id && token) {
        try {
          const response = await LinkedContactsService.getByContactId(selectedContact.id.toString(), token);
          setLinkedContacts(response.data || []);
        } catch (error) {
          console.error('Error al obtener contactos vinculados:', error);
        }
      }
    };

    fetchLinkedContacts();
  }, [selectedContact, token]); // <--- Añadido

  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem('visibleColumns') || '[]') || allColumns.map((col) => col.id);
    setVisibleColumns(savedColumns);
  }, []);

  useEffect(() => {
    localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  useEffect(() => {
    setEditData(selectedContact);
    setIsEditing(false);
  }, [selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      setEditClientData({
        nombre: selectedContact.nombre || '',
        nif: selectedContact.nif || '',
        telefono: selectedContact.telefono || '',
        email: selectedContact.email || '',
        direccion: selectedContact.direccion || '',
        codigoPostal: selectedContact.codigoPostal || '',
        poblacion: selectedContact.poblacion || '',
        provincia: selectedContact.provincia || '',
        pais: selectedContact.pais || '',
      });
      setIsEditingClient(false);
    }
  }, [selectedContact]);

  const handleOpen = (contact: any = null) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
  };

  const handleLinkContact = async (personId: number) => {
    if (!selectedContact?.id) return;
    try {
      const response = await LinkedContactsService.addLinkedContact(
        selectedContact.id.toString(),
        personId.toString(),
        token
      );
      if (response.data) {
        setLinkedContacts((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Error al vincular contacto:', error);
    }
  };
  
  const handleUnlinkContact = async (linkedContactId: string) => {
    if (!selectedContact?.id) return;
    try {
      await LinkedContactsService.deleteLinkedContact(selectedContact.id.toString(), linkedContactId, token);
      setLinkedContacts((prev) => prev.filter((lc) => lc.LinekdContactId !== linkedContactId));
    } catch (error) {
      console.error('Error al eliminar contacto vinculado:', error);
    }
  };

  const handleOpenDrawer = (contact: any) => {
    setSelectedContact(contact);
    setEditData(contact);
    setIsDrawerOpen(true);
  };

  const handleSave = async (contact: Contact) => {
    if (!token || !ownerContactId) {
      console.error('No hay token o ownerContactId disponible');
      return;
    }
  
    try {
      let response: CommonResponse<Contact>;
      if (contact.id) {
        response = await ContactService.updateContact({ ...contact, contactId: contact.id.toString() }, token);
        // Transformar y actualizar tu estado...
      } else {
        // **Aquí agregas el userId al contacto antes de crearlo**
        
  
        response = await ContactService.createContact(contact, token);
        // Luego transformas, actualizas tu estado y vinculas el contacto...
        const newContact = transformServiceContactToLocal(response.data);
        setContacts((prev) => [...prev, newContact]);
        setSelectedContact(newContact);
  
        await LinkedContactsService.addLinkedContact(ownerContactId, response.data.id.toString(), token);
      }
    } catch (error) {
      console.error('Error al guardar el contacto:', error);
    }
  };
  
  
  // Función para transformar de un Contact del servicio a tu formato interno
  function transformServiceContactToLocal(serviceContact: Contact) {
    return {
      id: Number(serviceContact.id),
      nombre: serviceContact.name,
      nombreComercial: serviceContact.commercialName,
      nif: serviceContact.nie,
      direccion: serviceContact.address,
      poblacion: serviceContact.city,
      codigoPostal: serviceContact.postalCode,
      provincia: serviceContact.province,
      pais: serviceContact.country,
      email: serviceContact.email,
      telefono: serviceContact.phone,
      movil: serviceContact.mobile,
      sitioWeb: serviceContact.website,
      identificacionVAT: serviceContact.extraInformation?.vatType || '',
      tags: '',
      tipoContacto: serviceContact.userType,
      idioma: serviceContact.extraInformation?.language || '',
      moneda: serviceContact.extraInformation?.currency || '',
      formaPago: serviceContact.extraInformation?.paymentMethod || '',
      diasVencimiento: serviceContact.extraInformation?.paymentExpirationDays || '',
      diaVencimiento: serviceContact.extraInformation?.paymentExpirationDay || '',
      tarifa: serviceContact.extraInformation?.rate || '',
      descuento: serviceContact.extraInformation?.discount || '',
      cuentaCompras: '',
      cuentaPagos: '',
      swift: serviceContact.extraInformation?.swift || '',
      iban: serviceContact.extraInformation?.iban || '',
      refMandato: '',
      referenciaInterna: serviceContact.extraInformation?.internalReference || '',
      comercialAsignado: '',
      tipoIVA: serviceContact.extraInformation?.vatType ? [serviceContact.extraInformation.vatType] : [],
      informacionAdicional: '',
    };
  }
  

  const handleColumnToggle = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getFilteredContacts = () => {
    return contacts.filter((contact) => {
      const matchesSearchTerm =
        contact.nombre.toLowerCase().includes(searchTerm) ||
        contact.tipoContacto.toLowerCase().includes(searchTerm);

      if (filter === 'todos') return matchesSearchTerm;
      if (filter === 'clientes') return matchesSearchTerm && contact.tipoContacto === 'Cliente';
      if (filter === 'proveedores') return matchesSearchTerm && contact.tipoContacto === 'Proveedor';

      return false;
    });
  };

  const router = useRouter();

  const handlePortalClick = () => {
    if (isPasswordEnabled) {
      window.open('/contacts/portal-login');
    } else {
      window.open('/contacts/portal-clientes', '_blank');
    }
  };

  const handleEdit = (contact: any) => {
    handleOpen(contact);
  };

  const handleDelete = (contactId: number) => {
    setContacts(contacts.filter((c) => c.id !== contactId));
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
                value={searchTerm}
                onChange={handleSearch}
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
                  sx={{
                    background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                    color: '#ffffff',
                    fontWeight: '500',
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    minWidth: '120px',
                  }}
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
                    <MenuItem key={column.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={visibleColumns.includes(column.id)}
                            onChange={() => handleColumnToggle(column.id)}
                          />
                        }
                        label={column.label}
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>

            {/* Tabla de Contactos */}
            <Typography variant="h4" sx={{ mb: 3, color: '#2666CF', fontWeight: '600' }}>
              Contactos
            </Typography>
            <ContactTable
              contacts={getFilteredContacts()}
              visibleColumns={visibleColumns}
              allColumns={allColumns}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRowClick={handleOpenDrawer}
            />

            {/* Drawer */}
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              sx={{
                zIndex: 1300,
                width: isDrawerExpanded ? '1300px' : '500px',
                transition: 'width 0.3s ease',
                marginTop: '64px',
                height: 'calc(100% - 64px)',
              }}
              PaperProps={{
                style: {
                  width: isDrawerExpanded ? '1300px' : '500px',
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
                      {selectedContact?.nombre?.split(' ')[1]?.[0]}
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
                        onClick={() => setIsDrawerExpanded(true)}
                        sx={{
                          background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                          color: '#ffffff',
                          fontWeight: '500',
                          textTransform: 'none',
                          borderRadius: 2,
                          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                          minWidth: '120px',
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
                      {isEditing ? (
                        <Box>
                          <Button
                            variant="text"
                            onClick={() => {
                              setSelectedContact(editData);
                              setIsEditing(false);
                            }}
                            sx={{ textTransform: 'none', color: '#2666CF', mr: 1 }}
                          >
                            Guardar
                          </Button>
                          <Button
                            variant="text"
                            onClick={() => {
                              setEditData(selectedContact);
                              setIsEditing(false);
                            }}
                            sx={{ textTransform: 'none', color: '#B00020' }}
                          >
                            Cancelar
                          </Button>
                        </Box>
                      ) : (
                        <Button
                          variant="text"
                          startIcon={<EditIcon />}
                          onClick={() => setIsEditing(true)}
                          sx={{ textTransform: 'none', color: '#2666CF' }}
                        >
                          Editar
                        </Button>
                      )}
                    </Box>
                    {isEditing ? (
                      <>
                        <TextField
                          label="Nombre"
                          value={editData.nombre}
                          onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          label="Nif"
                          value={editData.nif}
                          onChange={(e) => setEditData({ ...editData, nif: e.target.value })}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          label="Dirección"
                          value={editData.direccion}
                          onChange={(e) => setEditData({ ...editData, direccion: e.target.value })}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          label="Teléfono"
                          value={editData.telefono}
                          onChange={(e) => setEditData({ ...editData, telefono: e.target.value })}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          label="Email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                      </>
                    ) : (
                      <>
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
                          <strong>Teléfono:</strong>{' '}
                          <a href={`tel:${selectedContact?.telefono}`} style={{ color: '#2666CF' }}>
                            {selectedContact?.telefono}
                          </a>
                        </Typography>
                        <Typography variant="body2">
                          <strong>Email:</strong>{' '}
                          <a href={`mailto:${selectedContact?.email}`} style={{ color: '#2666CF' }}>
                            {selectedContact?.email}
                          </a>
                        </Typography>
                      </>
                    )}
                  </Box>

                  {/* Botones de creación rápida */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>
                      Nuevo Presupuesto
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>
                      Nuevo Pedido
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>
                      Nuevo Albarán
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>
                      Nueva Factura
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>
                      Añadir Nota
                    </Button>
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
                  <Button
                    variant="outlined"
                    sx={{ textTransform: 'none', mb: 3 }}
                    onClick={() => setIsPasswordDialogOpen(true)}
                  >
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
                    onClick={handleOpenDialog}
                  >
                    Relacionar persona
                  </Button>
                  <List>
                    {linkedContacts.map((lc) => (
                      <ListItem key={lc.LinekdContactId}>
                        <ListItemText primary={`Contacto ID: ${lc.LinekdContactId}`} />
                        <IconButton onClick={() => handleUnlinkContact(lc.LinekdContactId)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>

                  {/* Gráfico de Ventas */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Ventas
                    </Typography>
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
                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%' }}>
                        <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.875rem' }}>
                          Ventas
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000000', fontSize: '1rem' }}>
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
                          onClick={() => {}}
                        >
                          8 facturas
                        </Button>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%', textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.75rem' }}>
                          Promedio/venta
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}>
                          3.460,32 €
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%', textAlign: 'right' }}>
                        <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.75rem' }}>
                          Frec. media
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}>
                          0 días
                        </Typography>

                        <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.75rem', mt: 1 }}>
                          Pend. cobro
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}>
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
                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%' }}>
                        <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.875rem' }}>
                          Compras
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000000', fontSize: '1rem' }}>
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
                          onClick={() => {}}
                        >
                          5 pedidos
                        </Button>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%', textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.75rem' }}>
                          Promedio/compra
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}>
                          3.046,78 €
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 30%', textAlign: 'right' }}>
                        <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.75rem' }}>
                          Frec. media
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}>
                          5 días
                        </Typography>

                        <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.75rem', mt: 1 }}>
                          Pend. pago
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#000000', fontSize: '0.875rem' }}>
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
                // **Contenido Expandido**
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
                        background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                        color: '#ffffff',
                        fontWeight: '500',
                        textTransform: 'none',
                        borderRadius: 2,
                        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                        minWidth: '120px',
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

                  {/* Contenido de las pestañas */}
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
                            {isEditingClient ? (
                              <Box>
                                <Button
                                  variant="text"
                                  onClick={() => {
                                    handleSave({ ...selectedContact, ...editClientData });
                                    setIsEditingClient(false);
                                  }}
                                  sx={{ textTransform: 'none', color: '#2666CF', mr: 1 }}
                                >
                                  Guardar
                                </Button>
                                <Button
                                  variant="text"
                                  onClick={() => {
                                    setEditClientData({
                                      nombre: selectedContact.nombre || '',
                                      nif: selectedContact.nif || '',
                                      telefono: selectedContact.telefono || '',
                                      email: selectedContact.email || '',
                                      direccion: selectedContact.direccion || '',
                                      codigoPostal: selectedContact.codigoPostal || '',
                                      poblacion: selectedContact.poblacion || '',
                                      provincia: selectedContact.provincia || '',
                                      pais: selectedContact.pais || '',
                                    });
                                    setIsEditingClient(false);
                                  }}
                                  sx={{ textTransform: 'none', color: '#B00020' }}
                                >
                                  Cancelar
                                </Button>
                              </Box>
                            ) : (
                              <Button
                                variant="text"
                                startIcon={<EditIcon />}
                                onClick={() => setIsEditingClient(true)}
                                sx={{ textTransform: 'none', color: '#2666CF' }}
                              >
                                Editar
                              </Button>
                            )}
                          </Box>

                          {isEditingClient ? (
                            <>
                              {/* Campos Editables */}
                              <TextField
                                label="Nombre"
                                name="nombre"
                                value={editClientData.nombre}
                                onChange={(e) => setEditClientData({ ...editClientData, nombre: e.target.value })}
                                fullWidth
                                sx={{ mb: 1 }}
                              />

                              <TextField
                                label="NIF"
                                name="nif"
                                value={editClientData.nif}
                                onChange={(e) => setEditClientData({ ...editClientData, nif: e.target.value })}
                                fullWidth
                                sx={{ mb: 1 }}
                              />

                              <TextField
                                label="Teléfono"
                                name="telefono"
                                value={editClientData.telefono}
                                onChange={(e) => setEditClientData({ ...editClientData, telefono: e.target.value })}
                                fullWidth
                                sx={{ mb: 1 }}
                              />

                              <TextField
                                label="Email"
                                name="email"
                                value={editClientData.email}
                                onChange={(e) => setEditClientData({ ...editClientData, email: e.target.value })}
                                fullWidth
                                sx={{ mb: 1 }}
                              />

                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Dirección:</strong>
                              </Typography>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Dirección"
                                    name="direccion"
                                    value={editClientData.direccion}
                                    onChange={(e) => setEditClientData({ ...editClientData, direccion: e.target.value })}
                                    fullWidth
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    label="Código Postal"
                                    name="codigoPostal"
                                    value={editClientData.codigoPostal}
                                    onChange={(e) => setEditClientData({ ...editClientData, codigoPostal: e.target.value })}
                                    fullWidth
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    label="Población"
                                    name="poblacion"
                                    value={editClientData.poblacion}
                                    onChange={(e) => setEditClientData({ ...editClientData, poblacion: e.target.value })}
                                    fullWidth
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    label="Provincia"
                                    name="provincia"
                                    value={editClientData.provincia}
                                    onChange={(e) => setEditClientData({ ...editClientData, provincia: e.target.value })}
                                    fullWidth
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    label="País"
                                    name="pais"
                                    value={editClientData.pais}
                                    onChange={(e) => setEditClientData({ ...editClientData, pais: e.target.value })}
                                    fullWidth
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                </Grid>
                              </Grid>
                            </>
                          ) : (
                            <>
                              {/* Información Estática */}
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Nombre:</strong> {selectedContact?.nombre}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>NIF:</strong> {selectedContact?.nif}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Teléfono:</strong>{' '}
                                <a href={`tel:${selectedContact?.telefono}`} style={{ color: '#2666CF' }}>
                                  {selectedContact?.telefono}
                                </a>
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Email:</strong>{' '}
                                <a href={`mailto:${selectedContact?.email}`} style={{ color: '#2666CF' }}>
                                  {selectedContact?.email}
                                </a>
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Dirección:</strong>
                              </Typography>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <Typography variant="body2">{selectedContact?.direccion}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2">{selectedContact?.codigoPostal}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2">{selectedContact?.poblacion}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2">{selectedContact?.provincia}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2">{selectedContact?.pais}</Typography>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                            height: '400px',
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
                                    drawOnChartArea: false,
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
                                    callback: (value: number) => `${value} €`,
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
                                background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                                color: '#ffffff',
                                fontWeight: '500',
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                                minWidth: '120px',
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
                            {/* Ejemplo de notas */}
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
                </Box>
              )}
            </Drawer>

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

            {/* Diálogo de Relacionar Persona */}
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
                  {filteredPeople.map((person) => (
                    <ListItem key={person.id} disableGutters>
                      <ListItemButton onClick={() => handleLinkContact(person.id)}>
                        <ListItemText primary={person.nombre} secondary={person.tipoContacto} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
            </Dialog>

            {/* ContactForm */}
            <ContactForm open={open} handleClose={handleClose} contact={selectedContact} handleSave={handleSave} />
          </Container>
        </Box>
        
      </Box>
    </Box>
  );
};

export default Contacts;
