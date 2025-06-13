import React from 'react';
import { AppBar, Toolbar, Box, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography, Collapse, Popover } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import PercentIcon from '@mui/icons-material/Percent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';  // Importa el hook useRouter
import { LanguageContext } from '../context/LanguageContext';
import logo from '../../public/img/Logo.svg'; // Asegúrate de que esta ruta sea correcta
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import ProfileCard from '../modules/auth/components/ProfileCard';
import EditProfileForm from '../modules/auth/components/EditProfileForm';
import IconButton from '@mui/material/IconButton';
import useProfileData from '../modules/auth/hooks/useProfileData';
import { Grid, TextField, Button } from '@mui/material';
import useAccountData from '../modules/auth/hooks/useAccountData';

const Header = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [submenuAnchor, setSubmenuAnchor] = useState<null | HTMLElement>(null);
  const [submenu2Anchor, setSubmenu2Anchor] = useState<null | HTMLElement>(null);
  const [openConfig, setOpenConfig] = useState(false);
  const [openFact, setOpenFact] = useState(false);
  const { language, changeLanguage } = useContext(LanguageContext)!;
  const router = useRouter(); // Usa el hook useRouter para manejar la navegación

  // Añade nuevos estados para submenús anidados
  const [submenuConfigAnchor, setSubmenuConfigAnchor] = useState<null | HTMLElement>(null);
  const [submenuCuentaAnchor, setSubmenuCuentaAnchor] = useState<null | HTMLElement>(null);
  const [submenuFactAnchor, setSubmenuFactAnchor] = useState<null | HTMLElement>(null);
  const [openCuenta, setOpenCuenta] = useState(false);

  // Añade refs para timeouts de cierre de submenús
  const closeConfigTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const closeCuentaTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const closeFactTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // Estado para el modal de editar perfil
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  // Usa el hook real de perfil
  const {
    formData,
    setFormData,
    loading,
    hasContact,
    handleChangeProfileForm,
    handleSubmitProfile,
  } = useProfileData();

  // Estado para el modal de configuración cuenta
  const [configCuentaOpen, setConfigCuentaOpen] = useState(false);
  const {
    accountData,
    setAccountData,
    loading: loadingCuenta,
    handleChangeAccount,
    handleSaveAccount,
  } = useAccountData();

  // Estado para el modal de configuración email
  const [configEmailOpen, setConfigEmailOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    sistema: 'holded',
    nombre: '',
    responderA: '',
    enviarDesde: '',
    cc: '',
    bcc: '',
  });
  const [plantillas, setPlantillas] = useState([
    { id: 1, nombre: 'FACTURAS FERMAPLASTIC', tipo: 'Factura', miniatura: '/img/plantilla1.png' },
    { id: 2, nombre: 'Albarán FERMAPLASTIC', tipo: 'Albarán', miniatura: '/img/plantilla2.png' },
  ]);

  // Estado para el modal de preferencias de facturación
  const [factPrefOpen, setFactPrefOpen] = useState(false);
  const [factPrefData, setFactPrefData] = useState({
    vencimiento: '',
    impuestoVenta: 'IVA 21%',
    impuestoCompra: 'IVA 21%',
    cuentaVentas: '70000000 Ventas de mercaderías',
    cuentaGastos: '60000000 Compras de mercaderías',
  });

  // Estado para el modal de plantillas de documentos
  const [plantillasOpen, setPlantillasOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<'list'|'edit'|'format'>('list');
  const [selectedPlantilla, setSelectedPlantilla] = useState<any>(null);
  const [editData, setEditData] = useState({
    nombre: '',
    base: 'base1',
    logo: '',
    logoSize: 80,
    logoPosition: 'left',
    tipografia: 'Roboto',
    color: '#222',
    orientacion: 'vertical',
    marcaAgua: false,
    textoCabecera: '',
    textoPie: '',
    campos: { descuento: true, producto: true },
    totales: { mostrar: true },
    empresa: { mostrar: true },
    html: '',
    _section: 'Plantilla',
  });
  const [formatData, setFormatData] = useState({
    tipo: 'Factura',
    plantilla: 'FACTURAS FERMAPLASTIC',
    plantillaEmail: 'Por defecto',
    modo: 'Por defecto',
    mostrarDescuento: true,
    descuentoPorProducto: false,
    numeracion: [{ linea: 'F', formato: '[Y][S][#]', inicio: 179 }],
  });

  // 1. Estado para el modal de formas de pago
  const [pagosOpen, setPagosOpen] = useState(false);
  const [metodosPago, setMetodosPago] = useState([
    { id: 1, nombre: 'Pago al contado', texto: 'Pago al contado', banco: '', vencimiento: '', predeterminado: true },
    { id: 2, nombre: 'covall', texto: 'Recibo domiciliado a 60 días, días 10 y 25ES24 2', banco: '6464', vencimiento: '60', predeterminado: false },
    { id: 3, nombre: 'Transferencia o bizum', texto: 'Transferencia a ES62 2100', banco: '9468', vencimiento: '7', predeterminado: false },
    { id: 4, nombre: 'COMSAT', texto: 'Transferencia a 60 días, día de pago 25. Nº cuenta ES47', banco: '5881', vencimiento: '60', predeterminado: false },
    { id: 5, nombre: 'Transferencia 60 días', texto: 'Transferencia a 60 díasCuenta: ES47', banco: '5881', vencimiento: '60', predeterminado: false },
  ]);
  const [editPagoOpen, setEditPagoOpen] = useState(false);
  const [editPagoData, setEditPagoData] = useState({ id: null, nombre: '', texto: '', banco: '', iban: false, vencimiento: '' });
  const [isEdit, setIsEdit] = useState(false);
  const bancos = [ '', '6464', '9468', '5881' ];
  const vencimientos = [ '', '7', '10', '20', '30', '60' ];

  const handleAddPago = () => {
    setEditPagoData({ id: null, nombre: '', texto: '', banco: '', iban: false, vencimiento: '' });
    setIsEdit(false);
    setEditPagoOpen(true);
  };
  const handleEditPago = (p) => {
    setEditPagoData({ ...p });
    setIsEdit(true);
    setEditPagoOpen(true);
  };
  const handleGuardarPago = () => {
    if (isEdit) {
      setMetodosPago(prev => prev.map(p => p.id === editPagoData.id ? { ...editPagoData, predeterminado: p.predeterminado } : p));
    } else {
      setMetodosPago(prev => [...prev, { ...editPagoData, id: Date.now(), predeterminado: false }]);
    }
    setEditPagoOpen(false);
    alert('Guardado (simulado)');
  };
  const handlePredeterminado = (id) => {
    setMetodosPago(prev => prev.map(p => ({ ...p, predeterminado: p.id === id })));
  };

  // 2. Plantillas de email separadas
  const [plantillasEmail, setPlantillasEmail] = useState([
    { nombre: 'Plantilla 1', asunto: '[decytpe] [docnum] de [accountname] para [contactname]', idioma: 'Español' },
    { nombre: 'Plantilla comunicacion 347', asunto: 'Comunicación de operaciones a terceros', idioma: 'Español' },
  ]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (lang: string) => {
    changeLanguage(lang);
    setAnchorEl(null);
  };

  // Menú de perfil
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
    setSubmenuAnchor(null);
    setSubmenu2Anchor(null);
    setOpenConfig(false);
    setOpenFact(false);
  };

  // Handlers para submenús anidados con timeout
  const handleConfigEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (closeConfigTimeout.current) clearTimeout(closeConfigTimeout.current);
    setSubmenuConfigAnchor(event.currentTarget);
    setOpenConfig(true);
  };
  const handleConfigLeave = () => {
    closeConfigTimeout.current = setTimeout(() => {
      setOpenConfig(false);
      setSubmenuConfigAnchor(null);
      setOpenCuenta(false);
      setOpenFact(false);
      setSubmenuCuentaAnchor(null);
      setSubmenuFactAnchor(null);
    }, 180);
  };
  const handleConfigPopoverEnter = () => {
    if (closeConfigTimeout.current) clearTimeout(closeConfigTimeout.current);
  };
  const handleConfigPopoverLeave = () => {
    closeConfigTimeout.current = setTimeout(() => {
      setOpenConfig(false);
      setSubmenuConfigAnchor(null);
      setOpenCuenta(false);
      setOpenFact(false);
      setSubmenuCuentaAnchor(null);
      setSubmenuFactAnchor(null);
    }, 180);
  };
  const handleCuentaEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (closeCuentaTimeout.current) clearTimeout(closeCuentaTimeout.current);
    setSubmenuCuentaAnchor(event.currentTarget);
    setOpenCuenta(true);
  };
  const handleCuentaLeave = () => {
    closeCuentaTimeout.current = setTimeout(() => {
      setOpenCuenta(false);
      setSubmenuCuentaAnchor(null);
    }, 180);
  };
  const handleCuentaPopoverEnter = () => {
    if (closeCuentaTimeout.current) clearTimeout(closeCuentaTimeout.current);
  };
  const handleCuentaPopoverLeave = () => {
    closeCuentaTimeout.current = setTimeout(() => {
      setOpenCuenta(false);
      setSubmenuCuentaAnchor(null);
    }, 180);
  };
  const handleFactEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (closeFactTimeout.current) clearTimeout(closeFactTimeout.current);
    setSubmenuFactAnchor(event.currentTarget);
    setOpenFact(true);
  };
  const handleFactLeave = () => {
    closeFactTimeout.current = setTimeout(() => {
      setOpenFact(false);
      setSubmenuFactAnchor(null);
    }, 180);
  };
  const handleFactPopoverEnter = () => {
    if (closeFactTimeout.current) clearTimeout(closeFactTimeout.current);
  };
  const handleFactPopoverLeave = () => {
    closeFactTimeout.current = setTimeout(() => {
      setOpenFact(false);
      setSubmenuFactAnchor(null);
    }, 180);
  };

  // Opciones del menú
  const handleMenuOption = (route: string) => {
    handleProfileMenuClose();
    if (route) router.push(route);
  };

  const handleEmailChange = (field, value) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };
  const handleGuardarEmail = () => {
    alert('Guardado (simulado)');
    setConfigEmailOpen(false);
  };
  const handleNuevaPlantilla = () => {
    setEditData({
      nombre: '', base: 'base1', logo: '', logoSize: 80, logoPosition: 'left', tipografia: 'Roboto', color: '#222', orientacion: 'vertical', marcaAgua: false, textoCabecera: '', textoPie: '', campos: { descuento: true, producto: true }, totales: { mostrar: true }, empresa: { mostrar: true }, html: '', _section: 'Plantilla'
    });
    setWizardStep('edit');
    setSelectedPlantilla(null);
  };
  const handleHistorial = () => {
    alert('Funcionalidad de historial (simulada)');
  };

  const handleFactPrefChange = (field, value) => {
    setFactPrefData(prev => ({ ...prev, [field]: value }));
  };
  const handleGuardarFactPref = () => {
    alert('Guardado (simulado)');
    setFactPrefOpen(false);
  };

  const handleGuardarPlantilla = () => {
    alert('Guardado (simulado)');
    setPlantillasOpen(false);
    setWizardStep('list');
  };

  const handleEditarPlantilla = (plantilla: any) => {
    setEditData({ ...editData, nombre: plantilla.nombre, _section: editData._section || 'Plantilla' });
    setWizardStep('edit');
    setSelectedPlantilla(plantilla);
  };

  const handleChangeEdit = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleChangeEditCampos = (field: string, value: boolean) => {
    setEditData(prev => ({ ...prev, campos: { ...prev.campos, [field]: value } }));
  };

  const handleChangeFormat = (field: string, value: any) => {
    setFormatData(prev => ({ ...prev, [field]: value }));
  };

  // Estado para el modal de impuestos
  const [impuestosOpen, setImpuestosOpen] = useState(false);
  const [impuestos, setImpuestos] = useState([
    { id: 1, nombre: 'IVA 21%', key: 'IVA_21', valor: 21, ambito: 'Ventas', tipo: 'IVA', cuenta: '47700001', cuentaRect: '47700002', grupo: 'Ninguno', activo: true },
    { id: 2, nombre: 'IVA 10%', key: 'IVA_10', valor: 10, ambito: 'Ventas', tipo: 'IVA', cuenta: '47700001', cuentaRect: '47700002', grupo: 'Ninguno', activo: true },
  ]);
  const [editImpuestoOpen, setEditImpuestoOpen] = useState(false);
  const [editImpuestoData, setEditImpuestoData] = useState({ id: null, nombre: '', key: '', valor: '', ambito: 'Ventas', tipo: 'IVA', cuenta: '', cuentaRect: '', grupo: 'Ninguno', activo: true });
  const [isEditImpuesto, setIsEditImpuesto] = useState(false);
  const cuentas = [ '', '47700001', '47700002', '70000000', '60000000' ];
  const grupos = [ 'Ninguno', 'Grupo 1', 'Grupo 2' ];

  const handleAddImpuesto = () => {
    setEditImpuestoData({ id: null, nombre: '', key: '', valor: '', ambito: 'Ventas', tipo: 'IVA', cuenta: '', cuentaRect: '', grupo: 'Ninguno', activo: true });
    setIsEditImpuesto(false);
    setEditImpuestoOpen(true);
  };
  const handleEditImpuesto = (imp) => {
    setEditImpuestoData({ ...imp });
    setIsEditImpuesto(true);
    setEditImpuestoOpen(true);
  };
  const handleGuardarImpuesto = () => {
    const data = { ...editImpuestoData, valor: Number(editImpuestoData.valor) };
    if (isEditImpuesto) {
      setImpuestos(prev => prev.map(i => i.id === data.id ? { ...data } : i));
    } else {
      setImpuestos(prev => [...prev, { ...data, id: Date.now() }]);
    }
    setEditImpuestoOpen(false);
    alert('Guardado (simulado)');
  };
  const handleActivoImpuesto = () => {
    setEditImpuestoData(prev => ({ ...prev, activo: !prev.activo }));
  };
  const handleChangeImpuestoField = (field, value) => {
    setEditImpuestoData(prev => {
      if (field === 'nombre') {
        // Autogenera key
        const key = value.replace(/[^a-zA-Z0-9]+/g, '_').toUpperCase();
        return { ...prev, nombre: value, key };
      }
      return { ...prev, [field]: value };
    });
  };

  // Estado para el modal de certificado electrónico
  const [certificadoOpen, setCertificadoOpen] = useState(false);
  const [certificadoFile, setCertificadoFile] = useState<File | null>(null);
  const handleCertificadoDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCertificadoFile(e.dataTransfer.files[0]);
    }
  };
  const handleCertificadoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCertificadoFile(e.target.files[0]);
    }
  };
  const handleCertificadoRemove = () => setCertificadoFile(null);
  const handleCertificadoClick = () => {
    document.getElementById('certificado-input')?.click();
  };

  // Estado para el modal de subscripción
  const [subsOpen, setSubsOpen] = useState(false);
  const [editDirOpen, setEditDirOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    nombre: 'Félix Martínez Fernández',
    nif: '48040510L',
    direccion: 'Avda. Illdefons Cerdà, 2',
    cp: '08840',
    ciudad: 'Cornellà',
    provincia: 'Barcelona',
    pais: 'España',
  });
  const [card, setCard] = useState({
    tipo: 'VISA',
    last4: '1454',
    exp: '6/2030',
    predeterminado: true,
  });
  const [plan, setPlan] = useState({
    nombre: 'Autónomos Plus',
    precio: '15,00€/mes',
    extras: ['Envío de cartas'],
  });
  const [nextInvoice, setNextInvoice] = useState({
    importe: '48,40€',
    fecha: '07/09/2024',
  });

  // Estado para el modal de calendario
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<'month'|'week'|'day'>('month');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarFilters, setCalendarFilters] = useState({ facturas: true, compras: true, pedidos: true });
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, type: 'factura', title: 'Vencimiento Factura #123', date: '2024-08-05', color: '#e53935', details: 'Factura de cliente por 480€' },
    { id: 2, type: 'compra', title: 'Vencimiento Compra #456', date: '2024-08-07', color: '#3949ab', details: 'Compra proveedor 320€' },
    { id: 3, type: 'pedido', title: 'Pedido #789', date: '2024-08-10', color: '#43a047', details: 'Pedido de cliente' },
    { id: 4, type: 'factura', title: 'Vencimiento Factura #124', date: '2024-08-17', color: '#e53935', details: 'Factura de cliente por 120€' },
    { id: 5, type: 'compra', title: 'Vencimiento Compra #457', date: '2024-08-17', color: '#3949ab', details: 'Compra proveedor 210€' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const handlePrev = () => {
    const d = new Date(calendarDate);
    if (calendarView === 'month') d.setMonth(d.getMonth() - 1);
    else if (calendarView === 'week') d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCalendarDate(d);
  };
  const handleNext = () => {
    const d = new Date(calendarDate);
    if (calendarView === 'month') d.setMonth(d.getMonth() + 1);
    else if (calendarView === 'week') d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCalendarDate(d);
  };
  const handleToday = () => setCalendarDate(new Date());
  const handleFilterChange = (type) => setCalendarFilters(f => ({ ...f, [type]: !f[type] }));
  const handleEventClick = (event) => { setSelectedEvent(event); setEventDetailsOpen(true); };
  const handleNewEvent = () => { setNewEventOpen(true); };

  // Estado para el modal de contactos recomendados
  const [recomOpen, setRecomOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteLink] = useState('https://app.enlazapro.com/invite?ref=abc123');
  const [recomData] = useState({ saldo: 0, pendientes: 0, creadas: 0 });

  // Estado para el modal de importar
  const [importOpen, setImportOpen] = useState(false);
  const [importSearch, setImportSearch] = useState('');
  const [importCategoryOpen, setImportCategoryOpen] = useState({
    contactos: false, ventas: false, compras: false, inventario: false, empleados: false, proyectos: false, otros: false
  });
  const [importTypeOpen, setImportTypeOpen] = useState<string|null>(null);
  const [importFile, setImportFile] = useState<File|null>(null);
  const [importProjectOpen, setImportProjectOpen] = useState(false);
  const importCategories = [
    {
      key: 'contactos',
      label: 'Contactos',
      items: [
        { key: 'empresas', label: 'Empresas' },
        { key: 'freelance', label: 'Freelance' },
        { key: 'personas', label: 'Personas de contacto' },
        { key: 'actualizar', label: 'Actualizar contactos' },
        { key: 'direcciones', label: 'Actualizar direcciones de envío' },
      ]
    },
    {
      key: 'ventas',
      label: 'Ventas',
      items: [
        { key: 'presupuestos', label: 'Presupuestos' },
        { key: 'pedidos', label: 'Pedidos' },
        { key: 'albaranes', label: 'Albaranes' },
        { key: 'proforma', label: 'Facturas proforma' },
        { key: 'tickets', label: 'Tickets de venta' },
        { key: 'facturas', label: 'Facturas' },
        { key: 'recurrentes', label: 'Facturas recurrentes' },
      ]
    },
    {
      key: 'compras',
      label: 'Compras',
      items: [
        { key: 'presupuestos', label: 'Presupuestos' },
        { key: 'pedidos', label: 'Pedidos' },
        { key: 'albaranes', label: 'Albaranes' },
        { key: 'proforma', label: 'Facturas proforma' },
        { key: 'tickets', label: 'Tickets de venta' },
        { key: 'facturas', label: 'Facturas' },
        { key: 'recurrentes', label: 'Facturas recurrentes' },
      ]
    },
    {
      key: 'inventario',
      label: 'Inventario',
      items: [
        { key: 'productos', label: 'Productos' },
        { key: 'lotes', label: 'Lotes de producto' },
        { key: 'actualizar', label: 'Actualizar productos' },
        { key: 'ajuste', label: 'Ajuste de stock por referencia' },
        { key: 'familias', label: 'Familias' },
        { key: 'categorias', label: 'Categorías' },
        { key: 'tarifas', label: 'Actualizar tarifas' },
        { key: 'almacenes', label: 'Almacenes' },
      ]
    },
    {
      key: 'empleados',
      label: 'Empleados',
      items: []
    },
    {
      key: 'proyectos',
      label: 'Proyectos',
      items: []
    },
    {
      key: 'otros',
      label: 'Otros',
      items: []
    },
  ];
  const importFeatured = [
    { key: 'facturas_venta', label: 'Facturas de venta' },
    { key: 'facturas_compra', label: 'Facturas de compra' },
    { key: 'empresas', label: 'Empresas' },
    { key: 'personas', label: 'Personas de contacto' },
  ];
  const handleImportCategoryToggle = (key) => setImportCategoryOpen(prev => ({ ...prev, [key]: !prev[key] }));
  const handleImportType = (type) => {
    if (type === 'proyectos') setImportProjectOpen(true);
    else setImportTypeOpen(type);
  };
  const handleImportFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setImportFile(e.dataTransfer.files[0]);
  };
  const handleImportFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setImportFile(e.target.files[0]);
  };
  const handleImportFileRemove = () => setImportFile(null);

  // Estado para el modal de votar mejoras
  const [mejorasOpen, setMejorasOpen] = useState(false);
  const [mejoras, setMejoras] = useState([
    { id: 1, titulo: 'Nuevo estado para los documentos: Parcialmente Pagado', descripcion: 'Crear un nuevo estado para los documentos con el fin de distinguir aquellas facturas o tickets que están parcialmente pagados, de los que están totalmente pendientes.', votos: 231, favoritos: 1400, comentarios: [ { autor: 'Ana', texto: '¡Muy útil!' } ] },
    { id: 2, titulo: 'Nuevo estado para los documentos: Parcialmente Pagado', descripcion: 'Crear un nuevo estado para los documentos con el fin de distinguir aquellas facturas o tickets que están parcialmente pagados, de los que están totalmente pendientes.', votos: 45, favoritos: 453, comentarios: [] },
  ]);
  const [detalleMejora, setDetalleMejora] = useState<any|null>(null);
  const [agregarMejoraOpen, setAgregarMejoraOpen] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoDesc, setNuevoDesc] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const handleVotar = (id) => setMejoras(prev => prev.map(m => m.id === id ? { ...m, votos: m.votos + 1 } : m));
  const handleFavorito = (id) => setMejoras(prev => prev.map(m => m.id === id ? { ...m, favoritos: m.favoritos + 1 } : m));
  const handleAgregarMejora = () => {
    setMejoras(prev => [
      { id: Date.now(), titulo: nuevoTitulo, descripcion: nuevoDesc, votos: 0, favoritos: 0, comentarios: [] },
      ...prev
    ]);
    setAgregarMejoraOpen(false);
    setNuevoTitulo('');
    setNuevoDesc('');
  };
  const handleAgregarComentario = () => {
    if (!detalleMejora) return;
    setMejoras(prev => prev.map(m => m.id === detalleMejora.id ? { ...m, comentarios: [...m.comentarios, { autor: 'Tú', texto: nuevoComentario }] } : m));
    setDetalleMejora(m => m ? { ...m, comentarios: [...m.comentarios, { autor: 'Tú', texto: nuevoComentario }] } : m);
    setNuevoComentario('');
  };

  // Estado para el modal de añadir/cambiar cuenta
  const [cuentasOpen, setCuentasOpen] = useState(false);
  const [cuentasUsuario, setCuentasUsuario] = useState([
    { id: 1, email: 'usuario1@email.com', telefono: '+34 600 123 456' },
    { id: 2, email: 'usuario2@email.com', telefono: '+34 600 654 321' },
  ]);
  const [nuevaCuenta, setNuevaCuenta] = useState('');
  const [añadirModo, setAñadirModo] = useState(false);
  const handleAñadirCuenta = () => {
    if (nuevaCuenta) {
      setCuentasUsuario(prev => [...prev, { id: Date.now(), email: nuevaCuenta, telefono: 'Sin teléfono' }]);
      setNuevaCuenta('');
      setAñadirModo(false);
    }
  };
  const handleCambiarCuenta = (cuenta) => {
    alert(`Sesión iniciada con ${cuenta.email} (simulado)`);
    setCuentasOpen(false);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: '#FFFFFF', 
        boxShadow: 'none', 
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1 // Asegura que el header esté sobre el sidebar
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo.src} alt="Logo" height={40} style={{ marginRight: 16 }} />
        </Box>
        <Box>
          <IconButton size="large" aria-label="show new notifications" color="inherit">
            <NotificationsIcon sx={{ color: '#000000' }} />
          </IconButton>
          <IconButton size="large" aria-label="change language" color="inherit" onClick={handleMenuClick}>
            <LanguageIcon sx={{ color: '#000000' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose(language)}
          >
            <MenuItem onClick={() => handleMenuClose('Castellano')}>Castellano</MenuItem>
            <MenuItem onClick={() => handleMenuClose('English')}>English</MenuItem>
          </Menu>
          <IconButton 
            size="large" 
            edge="end" 
            aria-label="account of current user" 
            aria-haspopup="true" 
            color="inherit" 
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1, border: '1.5px solid #E3EAF2', borderRadius: 2.5, background: '#fff', transition: '0.2s', '&:hover': { background: '#F4F6FA', boxShadow: '0 2px 8px rgba(38,102,207,0.07)' } }}
          >
            <AccountCircle sx={{ color: '#2666CF', fontSize: 32 }} />
          </IconButton>
          {/* Menú principal de perfil */}
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                minWidth: 260,
                borderRadius: 2.5,
                boxShadow: '0 4px 24px rgba(38,102,207,0.07)',
                p: 0.5,
                bgcolor: '#fff',
                mt: 1,
              }
            }}
            MenuListProps={{
              onMouseLeave: handleProfileMenuClose,
              sx: { p: 0 }
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionProps={{ timeout: 180 }}
          >
            <MenuItem onClick={() => { setEditProfileOpen(true); handleProfileMenuClose(); }}
              sx={{ py: 1.2, px: 2, fontWeight: 600, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' } }}>
              <ListItemIcon sx={{ minWidth: 32 }}><EditIcon sx={{ color: '#A3B1C6', fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Editar perfil" />
            </MenuItem>
            <Divider sx={{ my: 0.5, borderColor: '#F0F1F3' }} />
            {/* Configuración con submenú */}
            <MenuItem
              onMouseEnter={handleConfigEnter}
              onMouseLeave={handleConfigLeave}
              sx={{ py: 1.2, px: 2, fontWeight: 600, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' }, display: 'flex', justifyContent: 'space-between' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{ minWidth: 32 }}><SettingsIcon sx={{ color: '#A3B1C6', fontSize: 20 }} /></ListItemIcon>
                <ListItemText primary="Configuración" />
              </Box>
            </MenuItem>
            {/* Submenú Configuración */}
            <Popover
              open={openConfig}
              anchorEl={submenuConfigAnchor}
              onClose={handleConfigLeave}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{ sx: { minWidth: 260, borderRadius: 2.5, boxShadow: '0 4px 24px rgba(38,102,207,0.07)', p: 0.5, bgcolor: '#fff', mr: 2, zIndex: 1502 } }}
              TransitionProps={{ timeout: 180 }}
              disableRestoreFocus
              onMouseEnter={handleConfigPopoverEnter}
              onMouseLeave={handleConfigPopoverLeave}
            >
              {/* Cuenta con submenú */}
              <MenuItem
                ref={el => { if (el && openCuenta) setSubmenuCuentaAnchor(el); }}
                onMouseEnter={handleCuentaEnter}
                onMouseLeave={handleCuentaLeave}
                sx={{ py: 1.1, px: 2, fontWeight: 500, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' }, display: 'flex', justifyContent: 'space-between' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 32 }}><BusinessIcon sx={{ color: '#A3B1C6', fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary="Cuenta" />
                </Box>
              </MenuItem>
              <Popover
                open={openCuenta}
                anchorEl={submenuCuentaAnchor}
                onClose={handleCuentaLeave}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { minWidth: 260, borderRadius: 2.5, boxShadow: '0 4px 24px rgba(38,102,207,0.07)', p: 0.5, bgcolor: '#fff', mr: 2, zIndex: 1503 } }}
                TransitionProps={{ timeout: 150 }}
                disableRestoreFocus
                onMouseEnter={handleCuentaPopoverEnter}
                onMouseLeave={handleCuentaPopoverLeave}
              >
                <MenuItem sx={{ py: 1, px: 2, fontWeight: 500, color: '#444', borderRadius: 1.5, '&:hover': { bgcolor: '#F4F6FA', color: '#2666CF' } }} onClick={() => { setConfigCuentaOpen(true); handleCuentaLeave(); handleConfigLeave(); }}>
                  <ListItemIcon sx={{ minWidth: 28 }}><SettingsIcon sx={{ color: '#B7C2D0', fontSize: 16 }} /></ListItemIcon>
                  <ListItemText primary="Configuración cuenta" />
                </MenuItem>
                <MenuItem sx={{ py: 1, px: 2, fontWeight: 500, color: '#444', borderRadius: 1.5, '&:hover': { bgcolor: '#F4F6FA', color: '#2666CF' } }} onClick={() => { setConfigEmailOpen(true); handleCuentaLeave(); handleConfigLeave(); }}>
                  <ListItemIcon sx={{ minWidth: 28 }}><EmailIcon sx={{ color: '#B7C2D0', fontSize: 16 }} /></ListItemIcon>
                  <ListItemText primary="Configuración de email" />
                </MenuItem>
              </Popover>
              <Divider sx={{ my: 0.5, borderColor: '#F0F1F3' }} />
              {/* Facturación con submenú */}
              <MenuItem
                ref={el => { if (el && openFact) setSubmenuFactAnchor(el); }}
                onMouseEnter={handleFactEnter}
                onMouseLeave={handleFactLeave}
                sx={{ py: 1.1, px: 2, fontWeight: 500, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' }, display: 'flex', justifyContent: 'space-between' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 32 }}><DescriptionIcon sx={{ color: '#A3B1C6', fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary="Facturación" />
                </Box>
              </MenuItem>
              <Popover
                open={openFact}
                anchorEl={submenuFactAnchor}
                onClose={handleFactLeave}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { minWidth: 260, borderRadius: 2.5, boxShadow: '0 4px 24px rgba(38,102,207,0.07)', p: 0.5, bgcolor: '#fff', mr: 2, zIndex: 1504 } }}
                TransitionProps={{ timeout: 150 }}
                disableRestoreFocus
                onMouseEnter={handleFactPopoverEnter}
                onMouseLeave={handleFactPopoverLeave}
              >
                <MenuItem sx={{ py: 1, px: 2, fontWeight: 500, color: '#444', borderRadius: 1.5, '&:hover': { bgcolor: '#F4F6FA', color: '#2666CF' } }} onClick={() => { setFactPrefOpen(true); handleFactLeave(); handleConfigLeave(); }}>
                  <ListItemIcon sx={{ minWidth: 28 }}><SettingsIcon sx={{ color: '#B7C2D0', fontSize: 15 }} /></ListItemIcon>
                  <ListItemText primary="Preferencias" />
                </MenuItem>
                <MenuItem sx={{ py: 1, px: 2, fontWeight: 500, color: '#444', borderRadius: 1.5, '&:hover': { bgcolor: '#F4F6FA', color: '#2666CF' } }} onClick={() => { setPlantillasOpen(true); handleConfigLeave(); }}>
                  <ListItemIcon sx={{ minWidth: 28 }}><DescriptionIcon sx={{ color: '#B7C2D0', fontSize: 15 }} /></ListItemIcon>
                  <ListItemText primary="Plantillas de documentos" />
                </MenuItem>
                <MenuItem sx={{ py: 1, px: 2, fontWeight: 500, color: '#444', borderRadius: 1.5, '&:hover': { bgcolor: '#F4F6FA', color: '#2666CF' } }} onClick={() => { setImpuestosOpen(true); handleFactLeave(); handleConfigLeave(); }}>
                  <ListItemIcon sx={{ minWidth: 28 }}><PercentIcon sx={{ color: '#B7C2D0', fontSize: 15 }} /></ListItemIcon>
                  <ListItemText primary="Impuestos" />
                </MenuItem>
                <MenuItem sx={{ py: 1, px: 2, fontWeight: 500, color: '#444', borderRadius: 1.5, '&:hover': { bgcolor: '#F4F6FA', color: '#2666CF' } }} onClick={() => { setCertificadoOpen(true); handleFactLeave(); handleConfigLeave(); }}>
                  <ListItemIcon sx={{ minWidth: 28 }}><VerifiedUserIcon sx={{ color: '#B7C2D0', fontSize: 15 }} /></ListItemIcon>
                  <ListItemText primary="Certificado electrónico" />
                </MenuItem>
              </Popover>
            </Popover>
            <Divider sx={{ my: 0.5, borderColor: '#F0F1F3' }} />
            <MenuItem sx={{ py: 1.2, px: 2, fontWeight: 500, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' } }} onClick={() => { setSubsOpen(true); handleProfileMenuClose(); }}>
              <ListItemIcon sx={{ minWidth: 32 }}><SubscriptionsIcon sx={{ color: '#A3B1C6', fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Subscripción" />
            </MenuItem>
            <MenuItem sx={{ py: 1.2, px: 2, fontWeight: 500, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' } }} onClick={() => { setCalendarOpen(true); handleProfileMenuClose(); }}>
              <ListItemIcon sx={{ minWidth: 32 }}><CalendarMonthIcon sx={{ color: '#A3B1C6', fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Calendario" />
            </MenuItem>
            <MenuItem sx={{ py: 1.2, px: 2, fontWeight: 500, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' } }} onClick={() => { setRecomOpen(true); handleProfileMenuClose(); }}>
              <ListItemIcon sx={{ minWidth: 32 }}><GroupAddIcon sx={{ color: '#A3B1C6', fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Contactos recomendados 50€" />
            </MenuItem>
            <MenuItem sx={{ py: 1.2, px: 2, fontWeight: 500, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' } }} onClick={() => { setImportOpen(true); handleProfileMenuClose(); }}>
              <ListItemIcon sx={{ minWidth: 32 }}><ImportExportIcon sx={{ color: '#A3B1C6', fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Importar" />
            </MenuItem>
            <MenuItem sx={{ py: 1.2, px: 2, fontWeight: 500, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' } }} onClick={() => { setMejorasOpen(true); handleProfileMenuClose(); }}>
              <ListItemIcon sx={{ minWidth: 32 }}><ThumbUpIcon sx={{ color: '#A3B1C6', fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Votar mejoras" />
            </MenuItem>
            <MenuItem sx={{ py: 1.2, px: 2, fontWeight: 500, color: '#222', borderRadius: 1.5, '&:hover': { bgcolor: '#EAF1FB', color: '#2666CF' } }} onClick={() => { setCuentasOpen(true); handleProfileMenuClose(); }}>
              <ListItemIcon sx={{ minWidth: 32 }}><PersonAddIcon sx={{ color: '#A3B1C6', fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Añadir cuenta" />
            </MenuItem>
            <Divider sx={{ my: 0.5, borderColor: '#F0F1F3' }} />
            <MenuItem onClick={() => handleMenuOption('/auth/logout')}
              sx={{ py: 1.2, px: 2, fontWeight: 600, color: '#E53935', borderRadius: 1.5, '&:hover': { bgcolor: '#FDEAEA', color: '#B71C1C' } }}>
              <ListItemIcon sx={{ minWidth: 32 }}><LogoutIcon sx={{ color: '#E53935', fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      {/* Modal de editar perfil */}
      <Dialog
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 1000,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          {/* Botón cerrar discreto */}
          <IconButton onClick={() => setEditProfileOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 700, maxWidth: 950, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>
                Perfil de usuario
              </Typography>
              <Box sx={{ display: 'flex', gap: 5, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 5 } }}>
                {/* Columna izquierda: foto y botones */}
                <Box sx={{ minWidth: 260, maxWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: '0 0 260px' }}>
                  <ProfileCard
                    name={formData?.name || ''}
                    email={formData?.email || ''}
                    onChangePhoto={() => alert('Cambiar foto')}
                    onDeleteAccount={() => alert('Eliminar cuenta')}
                  />
                </Box>
                {/* Columna derecha: formulario y bloques */}
                <Box sx={{ flex: 1, minWidth: 340 }}>
                  {/* Campos principales */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Nombre</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={e => handleChangeProfileForm('name', e.target.value)}
                        size="small"
                        sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Apellidos</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="surname"
                        value={formData.surname || ''}
                        onChange={e => handleChangeProfileForm('surname', e.target.value)}
                        size="small"
                        sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Teléfono</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={e => handleChangeProfileForm('phone', e.target.value)}
                        size="small"
                        sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Idioma</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="language"
                        value={formData.language || ''}
                        onChange={e => handleChangeProfileForm('language', e.target.value)}
                        select
                        size="small"
                        SelectProps={{ native: true }}
                        sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}
                      >
                        <option value="">Selecciona</option>
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Correo Electrónico</Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={e => handleChangeProfileForm('email', e.target.value)}
                        size="small"
                        sx={{ mt: 0.5, bgcolor: '#F3F4F6', borderRadius: 1 }}
                      />
                    </Grid>
                  </Grid>
                  {/* Bloque contraseña */}
                  <Box sx={{ bgcolor: '#F8F9FB', borderRadius: 2, p: 2, mb: 3, border: '1px solid #E0E2E7' }}>
                    <Typography variant="subtitle2" sx={{ color: '#888', fontWeight: 700, mb: 0.5, fontSize: 13 }}>
                      CONTRASEÑA
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888', mb: 1, fontSize: 13 }}>
                      Modifica la contraseña con la que accedes actualmente a tu cuenta en Holded.
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 600, borderRadius: 2, color: '#2666CF', borderColor: '#2666CF', textTransform: 'none', px: 2, py: 0.5, '&:hover': { background: '#EAF1FB', borderColor: '#6A82FB' } }}
                      onClick={() => alert('Cambiar Contraseña')}
                    >
                      Cambiar contraseña
                    </Button>
                  </Box>
                  {/* Bloque 2FA */}
                  <Box sx={{ bgcolor: '#F8F9FB', borderRadius: 2, p: 2, mb: 3, border: '1px solid #E0E2E7' }}>
                    <Typography variant="subtitle2" sx={{ color: '#888', fontWeight: 700, mb: 0.5, fontSize: 13 }}>
                      VERIFICACIÓN EN DOS PASOS (2FA)
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888', mb: 1, fontSize: 13 }}>
                      Aumenta la seguridad de tu cuenta con la verificación en dos pasos. Además de tu contraseña, necesitarás un código secreto enviado a tu móvil o email para acceder.
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Button variant="outlined" fullWidth disabled sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, color: '#888', borderColor: '#E0E2E7', bgcolor: '#F3F4F6' }}>
                          Verificación por email
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button variant="outlined" fullWidth disabled sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, color: '#888', borderColor: '#E0E2E7', bgcolor: '#F3F4F6' }}>
                          Verificación por SMS
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* Botón guardar cambios */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 2, fontWeight: 700, borderRadius: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', textTransform: 'none', fontSize: 17, boxShadow: '0 2px 8px rgba(38,102,207,0.10)', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }}
                    onClick={handleSubmitProfile}
                    disabled={loading}
                  >
                    Guardar cambios
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Modal de configuración cuenta */}
      <Dialog
        open={configCuentaOpen}
        onClose={() => setConfigCuentaOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 900,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setConfigCuentaOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 700, maxWidth: 850, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>
                Datos de la cuenta
              </Typography>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 5 }, mb: 4 }}>
                {/* Bloque datos empresa */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Nombre de la empresa</Typography>
                    <TextField fullWidth variant="outlined" name="empresa" value={accountData.empresa} onChange={e => handleChangeAccount('empresa', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Núm. identificación fiscal</Typography>
                    <TextField fullWidth variant="outlined" name="nif" value={accountData.nif} onChange={e => handleChangeAccount('nif', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Nombre comercial (opcional)</Typography>
                    <TextField fullWidth variant="outlined" name="comercial" value={accountData.comercial} onChange={e => handleChangeAccount('comercial', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>VAT</Typography>
                    <TextField fullWidth variant="outlined" name="vat" value={accountData.vat} onChange={e => handleChangeAccount('vat', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Email</Typography>
                    <TextField fullWidth variant="outlined" name="email" value={accountData.email} onChange={e => handleChangeAccount('email', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Teléfono</Typography>
                    <TextField fullWidth variant="outlined" name="telefono" value={accountData.telefono} onChange={e => handleChangeAccount('telefono', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Foto de la empresa</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <Box sx={{ width: 56, height: 56, bgcolor: '#E0E2E7', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Aquí iría el logo si lo tienes */}
                        <span role="img" aria-label="logo">🏢</span>
                      </Box>
                      <Button variant="contained" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={() => alert('Reemplazar foto')}>Reemplazar foto</Button>
                    </Box>
                  </Grid>
                </Grid>
                {/* Bloque dirección facturación */}
                <Typography variant="subtitle2" sx={{ color: '#888', fontWeight: 700, mb: 1, fontSize: 15, mt: 2 }}>
                  Dirección de facturación
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Dirección</Typography>
                    <TextField fullWidth variant="outlined" name="direccion" value={accountData.direccion} onChange={e => handleChangeAccount('direccion', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Población</Typography>
                    <TextField fullWidth variant="outlined" name="poblacion" value={accountData.poblacion} onChange={e => handleChangeAccount('poblacion', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Código postal</Typography>
                    <TextField fullWidth variant="outlined" name="postal" value={accountData.postal} onChange={e => handleChangeAccount('postal', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Provincia</Typography>
                    <TextField fullWidth variant="outlined" name="provincia" value={accountData.provincia} onChange={e => handleChangeAccount('provincia', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>País</Typography>
                    <TextField fullWidth variant="outlined" name="pais" value={accountData.pais} onChange={e => handleChangeAccount('pais', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 3, fontWeight: 700, borderRadius: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', textTransform: 'none', fontSize: 17, boxShadow: '0 2px 8px rgba(38,102,207,0.10)', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }}
                  onClick={handleSaveAccount}
                >
                  Guardar cambios
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Modal de configuración email */}
      <Dialog
        open={configEmailOpen}
        onClose={() => setConfigEmailOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 900,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setConfigEmailOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 700, maxWidth: 850, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40' }}>
                  Envío de emails
                </Typography>
                <Button variant="outlined" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5 }} onClick={handleHistorial}>Historial</Button>
              </Box>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 5 }, mb: 4 }}>
                {/* Bloque configuración de envío */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Sistema de envío</Typography>
                    <TextField fullWidth select variant="outlined" name="sistema" value={emailData.sistema} onChange={e => handleEmailChange('sistema', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="holded">Enviar desde Holded</option>
                      <option value="smtp">SMTP propio</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6} />
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Nombre</Typography>
                    <TextField fullWidth variant="outlined" name="nombre" value={emailData.nombre} onChange={e => handleEmailChange('nombre', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Responder a</Typography>
                    <TextField fullWidth variant="outlined" name="responderA" value={emailData.responderA} onChange={e => handleEmailChange('responderA', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Enviar desde</Typography>
                    <TextField fullWidth variant="outlined" name="enviarDesde" value={emailData.enviarDesde} onChange={e => handleEmailChange('enviarDesde', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6} />
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>CC - Correos en copia visibles</Typography>
                    <TextField fullWidth variant="outlined" name="cc" value={emailData.cc} onChange={e => handleEmailChange('cc', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>BCC - Correos en copia no visibles</Typography>
                    <TextField fullWidth variant="outlined" name="bcc" value={emailData.bcc} onChange={e => handleEmailChange('bcc', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }} />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 2, fontWeight: 700, borderRadius: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', textTransform: 'none', fontSize: 17, boxShadow: '0 2px 8px rgba(38,102,207,0.10)', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }}
                  onClick={handleGuardarEmail}
                >
                  Guardar cambios
                </Button>
              </Box>
              {/* Bloque plantillas */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A40' }}>
                    Plantillas de emails
                  </Typography>
                  <Button variant="contained" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={handleNuevaPlantilla}>+ Nueva plantilla</Button>
                </Box>
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                    <thead>
                      <tr style={{ background: '#F3F4F6' }}>
                        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 600 }}>Nombre</th>
                        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 600 }}>Asunto</th>
                        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 600 }}>Idioma</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plantillasEmail.map((p, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #E0E2E7' }}>
                          <td style={{ padding: '8px 12px' }}>{p.nombre}</td>
                          <td style={{ padding: '8px 12px' }}>{p.asunto}</td>
                          <td style={{ padding: '8px 12px' }}>{p.idioma}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Modal de preferencias de facturación */}
      <Dialog
        open={factPrefOpen}
        onClose={() => setFactPrefOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 600,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setFactPrefOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 350, maxWidth: 550, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>
                Ventas y Gastos
              </Typography>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 4 }, mb: 4 }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Vencimiento</Typography>
                    <TextField fullWidth select variant="outlined" name="vencimiento" value={factPrefData.vencimiento} onChange={e => handleFactPrefChange('vencimiento', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="">Sin vencimiento</option>
                      <option value="10">Vencimiento 10 días</option>
                      <option value="20">Vencimiento 20 días</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Impuesto de venta</Typography>
                    <TextField fullWidth select variant="outlined" name="impuestoVenta" value={factPrefData.impuestoVenta} onChange={e => handleFactPrefChange('impuestoVenta', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="IVA 21%">IVA 21%</option>
                      <option value="IVA 10%">IVA 10%</option>
                      <option value="IVA 4%">IVA 4%</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Impuesto de compra</Typography>
                    <TextField fullWidth select variant="outlined" name="impuestoCompra" value={factPrefData.impuestoCompra} onChange={e => handleFactPrefChange('impuestoCompra', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="IVA 21%">IVA 21%</option>
                      <option value="IVA 10%">IVA 10%</option>
                      <option value="IVA 4%">IVA 4%</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Cuenta de ventas</Typography>
                    <TextField fullWidth select variant="outlined" name="cuentaVentas" value={factPrefData.cuentaVentas} onChange={e => handleFactPrefChange('cuentaVentas', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="70000000 Ventas de mercaderías">70000000 Ventas de mercaderías</option>
                      <option value="70000001 Ventas de servicios">70000001 Ventas de servicios</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Cuenta de gastos</Typography>
                    <TextField fullWidth select variant="outlined" name="cuentaGastos" value={factPrefData.cuentaGastos} onChange={e => handleFactPrefChange('cuentaGastos', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="60000000 Compras de mercaderías">60000000 Compras de mercaderías</option>
                      <option value="60000001 Compras de servicios">60000001 Compras de servicios</option>
                    </TextField>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 2, fontWeight: 700, borderRadius: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', textTransform: 'none', fontSize: 17, boxShadow: '0 2px 8px rgba(38,102,207,0.10)', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }}
                  onClick={handleGuardarFactPref}
                >
                  Guardar cambios
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#222', mb: 1 }}>
                  Aquí puedes establecer en normas generales los plazos de <b>vencimiento</b>: sin vencimiento o seleccionar días más comunes
                </Typography>
                <Typography variant="body2" sx={{ color: '#222', mb: 1 }}>
                  <b>Impuesto de venta</b> e <b>impuesto de compra</b> general de tus documentos: este es el impuesto que se pondrá de forma automática al crear un documento nuevo o un producto
                </Typography>
                
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Modal de plantillas de documentos */}
      <Dialog
        open={plantillasOpen}
        onClose={() => { setPlantillasOpen(false); setWizardStep('list'); }}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 1400,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto', minHeight: 600 }}>
          <IconButton onClick={() => { setPlantillasOpen(false); setWizardStep('list'); }} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          {/* Paso 1: Listado de plantillas */}
          {wizardStep === 'list' && (
            <Box sx={{ px: { xs: 2, md: 6 }, pt: 4, pb: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40' }}>
                  Plantillas de documentos
                </Typography>
                <Button variant="contained" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={handleNuevaPlantilla}>Nueva plantilla</Button>
              </Box>
              <Typography variant="body2" sx={{ color: '#222', mb: 2 }}>
                Aquí puedes visualizar las plantillas de los documentos, editar los que ya has creado, o crear una nueva plantilla.
              </Typography>
              <Grid container spacing={3}>
                {plantillas.map((p) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
                    <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 2, cursor: 'pointer', transition: '0.2s', '&:hover': { boxShadow: '0 4px 24px rgba(38,102,207,0.12)', borderColor: '#2666CF' } }} onClick={() => handleEditarPlantilla(p)}>
                      <img src={p.miniatura} alt={p.nombre} style={{ width: '100%', borderRadius: 8, marginBottom: 12, background: '#F3F4F6' }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A40' }}>{p.nombre}</Typography>
                      <Typography variant="body2" sx={{ color: '#888' }}>{p.tipo}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {/* Paso 2: Editor de plantilla (wizard) */}
          {wizardStep === 'edit' && (
            <Box sx={{ display: 'flex', minHeight: 600 }}>
              {/* Sidebar secciones */}
              <Box sx={{ width: 260, bgcolor: '#F4F6FA', borderRight: '1px solid #E0E2E7', p: 0, display: 'flex', flexDirection: 'column' }}>
                {['Plantilla','Logotipo','Personalizar','Textos','Campos','Totales','Empresa','HTML'].map((sec, idx) => (
                  <Button key={sec} onClick={() => setEditData(prev => ({ ...prev, _section: sec }))} sx={{ justifyContent: 'flex-start', borderRadius: 0, px: 3, py: 2, color: editData._section === sec ? '#2666CF' : '#222', fontWeight: editData._section === sec ? 700 : 500, background: editData._section === sec ? '#EAF1FB' : 'none', borderBottom: '1px solid #E0E2E7', textTransform: 'none', fontSize: 16 }}>{sec}</Button>
                ))}
              </Box>
              {/* Contenido sección */}
              <Box sx={{ flex: 1, p: 4, overflowY: 'auto' }}>
                {/* Sección Plantilla */}
                {(!editData._section || editData._section === 'Plantilla') && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Selecciona una base de plantilla</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <Box sx={{ border: editData.base === 'base1' ? '2px solid #2666CF' : '2px solid #E0E2E7', borderRadius: 2, p: 1, cursor: 'pointer', bgcolor: '#fff' }} onClick={() => handleChangeEdit('base', 'base1')}>
                          <img src="/img/plantilla1.png" alt="Base 1" style={{ width: '100%', borderRadius: 6 }} />
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Box sx={{ border: editData.base === 'base2' ? '2px solid #2666CF' : '2px solid #E0E2E7', borderRadius: 2, p: 1, cursor: 'pointer', bgcolor: '#fff' }} onClick={() => handleChangeEdit('base', 'base2')}>
                          <img src="/img/plantilla2.png" alt="Base 2" style={{ width: '100%', borderRadius: 6 }} />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )}
                {/* Sección Logotipo */}
                {editData._section === 'Logotipo' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Logotipo de la empresa</Typography>
                    <Button variant="outlined" sx={{ mb: 2 }}>Subir logotipo</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography>Tamaño:</Typography>
                      <TextField type="number" size="small" value={editData.logoSize} onChange={e => handleChangeEdit('logoSize', Number(e.target.value))} sx={{ width: 80 }} />
                      <Typography>px</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography>Posición:</Typography>
                      <Button variant={editData.logoPosition === 'left' ? 'contained' : 'outlined'} onClick={() => handleChangeEdit('logoPosition', 'left')}>Izquierda</Button>
                      <Button variant={editData.logoPosition === 'center' ? 'contained' : 'outlined'} onClick={() => handleChangeEdit('logoPosition', 'center')}>Centro</Button>
                      <Button variant={editData.logoPosition === 'right' ? 'contained' : 'outlined'} onClick={() => handleChangeEdit('logoPosition', 'right')}>Derecha</Button>
                    </Box>
                  </Box>
                )}
                {/* Sección Personalizar */}
                {editData._section === 'Personalizar' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Personaliza la plantilla</Typography>
                    <TextField label="Tipografía" select size="small" value={editData.tipografia} onChange={e => handleChangeEdit('tipografia', e.target.value)} sx={{ mb: 2, width: 200 }}>
                      <option value="Roboto">Roboto</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Arial">Arial</option>
                    </TextField>
                    <TextField label="Color" type="color" size="small" value={editData.color} onChange={e => handleChangeEdit('color', e.target.value)} sx={{ mb: 2, ml: 2, width: 60, verticalAlign: 'middle' }} />
                    <TextField label="Orientación" select size="small" value={editData.orientacion} onChange={e => handleChangeEdit('orientacion', e.target.value)} sx={{ mb: 2, ml: 2, width: 150 }}>
                      <option value="vertical">Vertical</option>
                      <option value="horizontal">Horizontal</option>
                    </TextField>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>Marca de agua</Typography>
                      <Button variant={editData.marcaAgua ? 'contained' : 'outlined'} onClick={() => handleChangeEdit('marcaAgua', !editData.marcaAgua)}>{editData.marcaAgua ? 'Sí' : 'No'}</Button>
                    </Box>
                  </Box>
                )}
                {/* Sección Textos */}
                {editData._section === 'Textos' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Textos de la plantilla</Typography>
                    <TextField label="Cabecera" fullWidth size="small" value={editData.textoCabecera} onChange={e => handleChangeEdit('textoCabecera', e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Pie" fullWidth size="small" value={editData.textoPie} onChange={e => handleChangeEdit('textoPie', e.target.value)} sx={{ mb: 2 }} />
                  </Box>
                )}
                {/* Sección Campos */}
                {editData._section === 'Campos' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Campos a mostrar</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box><input type="checkbox" checked={editData.campos.descuento} onChange={e => handleChangeEditCampos('descuento', e.target.checked)} /> Descuento</Box>
                      <Box><input type="checkbox" checked={editData.campos.producto} onChange={e => handleChangeEditCampos('producto', e.target.checked)} /> Producto</Box>
                    </Box>
                  </Box>
                )}
                {/* Sección Totales */}
                {editData._section === 'Totales' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Totales</Typography>
                    <Box><input type="checkbox" checked={editData.totales.mostrar} onChange={e => setEditData(prev => ({ ...prev, totales: { ...prev.totales, mostrar: !prev.totales.mostrar } }))} /> Mostrar totales</Box>
                  </Box>
                )}
                {/* Sección Empresa */}
                {editData._section === 'Empresa' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Datos de la empresa</Typography>
                    <Box><input type="checkbox" checked={editData.empresa.mostrar} onChange={e => setEditData(prev => ({ ...prev, empresa: { ...prev.empresa, mostrar: !prev.empresa.mostrar } }))} /> Mostrar datos de empresa</Box>
                  </Box>
                )}
                {/* Sección HTML */}
                {editData._section === 'HTML' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Editor avanzado (HTML)</Typography>
                    <TextField label="Código HTML" fullWidth multiline minRows={8} value={editData.html} onChange={e => handleChangeEdit('html', e.target.value)} sx={{ mb: 2 }} />
                    <Button variant="outlined" size="small">Vista previa HTML</Button>
                  </Box>
                )}
                <Button variant="contained" sx={{ mt: 4, fontWeight: 700, borderRadius: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', textTransform: 'none', fontSize: 17, boxShadow: '0 2px 8px rgba(38,102,207,0.10)', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={handleGuardarPlantilla}>Guardar plantilla</Button>
              </Box>
              {/* Vista previa */}
              <Box sx={{ width: 420, bgcolor: '#F3F4F6', borderLeft: '1px solid #E0E2E7', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: '#888', mb: 1 }}>Vista previa</Typography>
                <Box sx={{ width: 360, height: 500, bgcolor: '#fff', borderRadius: 2, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 2, overflow: 'auto' }}>
                  {/* Simulación de preview */}
                  <Typography variant="h6" sx={{ color: editData.color, fontFamily: editData.tipografia, mb: 1 }}>{editData.nombre || 'Nombre de la plantilla'}</Typography>
                  <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>{editData.base === 'base1' ? 'Base 1' : 'Base 2'}</Typography>
                  <Box sx={{ height: 320, bgcolor: '#F8F9FB', borderRadius: 1, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
                    (Aquí iría la preview de la factura)
                  </Box>
                  <Typography variant="caption" sx={{ color: '#888' }}>* La vista previa se actualiza en tiempo real</Typography>
                </Box>
              </Box>
            </Box>
          )}
          {/* Paso 3: Formato de los documentos */}
          {wizardStep === 'format' && (
            <Box sx={{ px: { xs: 2, md: 6 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>
                Formato de los documentos
              </Typography>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 5 }, mb: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Tipo de documento</Typography>
                    <TextField fullWidth select variant="outlined" name="tipo" value={formatData.tipo} onChange={e => handleChangeFormat('tipo', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="Factura">Factura</option>
                      <option value="Presupuesto">Presupuesto</option>
                      <option value="Albarán">Albarán</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Plantilla de diseño</Typography>
                    <TextField fullWidth select variant="outlined" name="plantilla" value={formatData.plantilla} onChange={e => handleChangeFormat('plantilla', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      {plantillas.map(p => <option key={p.id} value={p.nombre}>{p.nombre}</option>)}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Plantilla de email</Typography>
                    <TextField fullWidth select variant="outlined" name="plantillaEmail" value={formatData.plantillaEmail} onChange={e => handleChangeFormat('plantillaEmail', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="Por defecto">Por defecto</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Modo documento</Typography>
                    <TextField fullWidth select variant="outlined" name="modo" value={formatData.modo} onChange={e => handleChangeFormat('modo', e.target.value)} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mt: 0.5 }}>
                      <option value="Por defecto">Por defecto</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Información mostrada</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Box><input type="checkbox" checked={formatData.mostrarDescuento} onChange={e => handleChangeFormat('mostrarDescuento', e.target.checked)} /> Mostrar descuento</Box>
                      <Box><input type="checkbox" checked={formatData.descuentoPorProducto} onChange={e => handleChangeFormat('descuentoPorProducto', e.target.checked)} /> Descuento por producto</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Numeración de documentos</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <TextField size="small" value={formatData.numeracion[0].linea} onChange={e => setFormatData(prev => ({ ...prev, numeracion: [{ ...prev.numeracion[0], linea: e.target.value }] }))} sx={{ width: 60 }} />
                      <TextField size="small" value={formatData.numeracion[0].formato} onChange={e => setFormatData(prev => ({ ...prev, numeracion: [{ ...prev.numeracion[0], formato: e.target.value }] }))} sx={{ width: 120 }} />
                      <TextField size="small" value={formatData.numeracion[0].inicio} onChange={e => setFormatData(prev => ({ ...prev, numeracion: [{ ...prev.numeracion[0], inicio: Number(e.target.value) }] }))} sx={{ width: 60 }} />
                      <Button variant="outlined" size="small" sx={{ ml: 1 }}>Añadir línea</Button>
                    </Box>
                  </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 4, fontWeight: 700, borderRadius: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', textTransform: 'none', fontSize: 17, boxShadow: '0 2px 8px rgba(38,102,207,0.10)', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={handleGuardarPlantilla}>Guardar formato</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Dialog>
      {/* Modal de formas de pago */}
      <Dialog
        open={pagosOpen}
        onClose={() => setPagosOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 800,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto', minHeight: 400 }}>
          <IconButton onClick={() => setPagosOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40' }}>
                Formas de pago
              </Typography>
              <Button variant="contained" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={handleAddPago}>Añadir método de pago</Button>
            </Box>
            <Typography variant="body2" sx={{ color: '#222', mb: 2 }}>
              Añade cuentas de banco o efectivo, o bien conecta tu proveedor online para gestionar los pagos de tus facturas en Holded.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {metodosPago && metodosPago.map((p) => (
                <Box key={p.id} sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: p.predeterminado ? '2px solid #2666CF' : '1px solid #E0E2E7' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A40' }}>{p.nombre}</Typography>
                    <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>{p.texto}</Typography>
                    {p.banco && <Typography variant="body2" sx={{ color: '#888', fontSize: 14 }}>Banco: {p.banco}</Typography>}
                    {p.vencimiento && <Box sx={{ display: 'inline-block', bgcolor: '#EAF1FB', color: '#2666CF', borderRadius: 1, px: 1.5, py: 0.5, fontSize: 13, fontWeight: 600, mt: 1 }}>{p.vencimiento} Días de vencimiento</Box>}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }} onClick={() => handleEditPago(p)}>Editar</Button>
                    <Button variant={p.predeterminado ? 'contained' : 'outlined'} size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: p.predeterminado ? 'linear-gradient(90deg, #2666CF, #6A82FB)' : undefined, color: p.predeterminado ? '#fff' : undefined }} onClick={() => handlePredeterminado(p.id)}>{p.predeterminado ? 'Predeterminado' : 'Establecer como predeterminado'}</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Popup añadir/editar método de pago */}
      <Dialog
        open={editPagoOpen}
        onClose={() => setEditPagoOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 500,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setEditPagoOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 350, maxWidth: 450, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>
                {isEdit ? 'Editar método de pago' : 'Añadir método de pago manual'}
              </Typography>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 4 }, mb: 4 }}>
                <TextField label="Nombre interno" fullWidth size="small" value={editPagoData.nombre} onChange={e => setEditPagoData(prev => ({ ...prev, nombre: e.target.value }))} sx={{ mb: 2 }} />
                <TextField label="Texto que se muestra en el documento" fullWidth size="small" multiline minRows={3} value={editPagoData.texto} onChange={e => setEditPagoData(prev => ({ ...prev, texto: e.target.value }))} sx={{ mb: 2 }} />
                {/* Toolbar básica (simulada) */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button size="small" variant="outlined" sx={{ minWidth: 32, px: 1, fontWeight: 700 }}>B</Button>
                  <Button size="small" variant="outlined" sx={{ minWidth: 32, px: 1, fontStyle: 'italic', fontWeight: 700 }}>I</Button>
                  <Button size="small" variant="outlined" sx={{ minWidth: 32, px: 1 }}>14</Button>
                  <Button size="small" variant="outlined" sx={{ minWidth: 32, px: 1 }}>≡</Button>
                </Box>
                <TextField label="Banco" select fullWidth size="small" value={editPagoData.banco} onChange={e => setEditPagoData(prev => ({ ...prev, banco: e.target.value }))} sx={{ mb: 2 }}>
                  {bancos.map(b => <option key={b} value={b}>{b ? b : 'Sin seleccionar'}</option>)}
                </TextField>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <input type="checkbox" checked={editPagoData.iban} onChange={e => setEditPagoData(prev => ({ ...prev, iban: e.target.checked }))} style={{ marginRight: 8 }} />
                  <Typography variant="body2">Incluir el IBAN del cliente debajo del texto. Ej: Domiciliaciones.</Typography>
                </Box>
                <TextField label="Vencimiento" select fullWidth size="small" value={editPagoData.vencimiento} onChange={e => setEditPagoData(prev => ({ ...prev, vencimiento: e.target.value }))} sx={{ mb: 2 }}>
                  {vencimientos.map(v => <option key={v} value={v}>{v ? v + ' días' : 'Sin seleccionar'}</option>)}
                </TextField>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button variant="outlined" onClick={() => setEditPagoOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cancelar</Button>
                  <Button variant="contained" onClick={handleGuardarPago} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }}>Guardar</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Modal de impuestos */}
      <Dialog
        open={impuestosOpen}
        onClose={() => setImpuestosOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 900,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto', minHeight: 400 }}>
          <IconButton onClick={() => setImpuestosOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40' }}>
                Impuestos
              </Typography>
              <Button variant="contained" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={handleAddImpuesto}>Nuevo impuesto</Button>
            </Box>
            <Typography variant="body2" sx={{ color: '#222', mb: 2 }}>
              Gestiona cada uno de los impuestos con los que trabajas en la plataforma, ya sea en relación con ventas, compras o empleados.
              <br />
              
            </Typography>
            <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 3, mb: 4, overflowX: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Gestionar grupos</Button>
              </Box>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                <thead>
                  <tr style={{ background: '#F3F4F6' }}>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}></th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Nombre</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Key</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Valor</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Ámbito</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Tipo</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Cuenta</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Cuenta rect.</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Grupo</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}>Activo</th>
                    <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {impuestos.map((imp) => (
                    <tr key={imp.id} style={{ borderBottom: '1px solid #E0E2E7' }}>
                      <td><input type="checkbox" /></td>
                      <td>{imp.nombre}</td>
                      <td>{imp.key}</td>
                      <td>{imp.valor}</td>
                      <td>{imp.ambito}</td>
                      <td>{imp.tipo}</td>
                      <td>{imp.cuenta}</td>
                      <td>{imp.cuentaRect}</td>
                      <td>{imp.grupo}</td>
                      <td>{imp.activo ? 'Sí' : 'No'}</td>
                      <td><Button size="small" variant="outlined" onClick={() => handleEditImpuesto(imp)}>Editar</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Popup añadir/editar impuesto */}
      <Dialog
        open={editImpuestoOpen}
        onClose={() => setEditImpuestoOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 500,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setEditImpuestoOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 350, maxWidth: 450, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>
                {isEditImpuesto ? 'Editar impuesto' : 'Añadir impuesto'}
              </Typography>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 4 }, mb: 4 }}>
                <TextField label="Nombre" fullWidth size="small" value={editImpuestoData.nombre} onChange={e => handleChangeImpuestoField('nombre', e.target.value)} sx={{ mb: 2 }} />
                <TextField label="Key" fullWidth size="small" value={editImpuestoData.key} onChange={e => handleChangeImpuestoField('key', e.target.value)} sx={{ mb: 2 }} />
                <TextField label="Ámbito" select fullWidth size="small" value={editImpuestoData.ambito} onChange={e => handleChangeImpuestoField('ambito', e.target.value)} sx={{ mb: 2 }}>
                  <option value="Ventas">Ventas</option>
                  <option value="Compras">Compras</option>
                </TextField>
                <TextField label="Tipo" select fullWidth size="small" value={editImpuestoData.tipo} onChange={e => handleChangeImpuestoField('tipo', e.target.value)} sx={{ mb: 2 }}>
                  <option value="IVA">IVA</option>
                  <option value="IRPF">IRPF</option>
                  <option value="IGIC">IGIC</option>
                  <option value="Otro">Otro</option>
                </TextField>
                <TextField label="Valor (%)" fullWidth size="small" value={editImpuestoData.valor} onChange={e => handleChangeImpuestoField('valor', e.target.value)} sx={{ mb: 2 }} />
                <TextField label="Cuenta de impuestos" select fullWidth size="small" value={editImpuestoData.cuenta} onChange={e => handleChangeImpuestoField('cuenta', e.target.value)} sx={{ mb: 2 }}>
                  {cuentas.map(c => <option key={c} value={c}>{c ? c : 'Seleccionar cuenta'}</option>)}
                </TextField>
                <TextField label="Cuenta de impuestos (rectificativas)" select fullWidth size="small" value={editImpuestoData.cuentaRect} onChange={e => handleChangeImpuestoField('cuentaRect', e.target.value)} sx={{ mb: 2 }}>
                  {cuentas.map(c => <option key={c} value={c}>{c ? c : 'Seleccionar cuenta'}</option>)}
                </TextField>
                <TextField label="Grupo de impuestos" select fullWidth size="small" value={editImpuestoData.grupo} onChange={e => handleChangeImpuestoField('grupo', e.target.value)} sx={{ mb: 2 }}>
                  {grupos.map(g => <option key={g} value={g}>{g}</option>)}
                </TextField>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="body2">Impuesto activo</Typography>
                  <Button variant={editImpuestoData.activo ? 'contained' : 'outlined'} onClick={handleActivoImpuesto}>{editImpuestoData.activo ? 'Sí' : 'No'}</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button variant="outlined" onClick={() => setEditImpuestoOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cancelar</Button>
                  <Button variant="contained" onClick={handleGuardarImpuesto} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }}>{isEditImpuesto ? 'Guardar' : 'Crear'}</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Modal de certificado electrónico */}
      <Dialog
        open={certificadoOpen}
        onClose={() => setCertificadoOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 500,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setCertificadoOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 350, maxWidth: 450, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>
                Certificado electrónico
              </Typography>
              <Typography variant="body2" sx={{ color: '#222', mb: 2 }}>
                Sube tu certificado para firmar tus documentos y presentar tus modelos.
              </Typography>
              <Box
                sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 4, mb: 4, border: '1.5px dashed #B7C2D0', textAlign: 'center', cursor: 'pointer', minHeight: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onDrop={handleCertificadoDrop}
                onDragOver={e => e.preventDefault()}
                onClick={handleCertificadoClick}
              >
                <input id="certificado-input" type="file" accept=".pfx,.p12" style={{ display: 'none' }} onChange={handleCertificadoChange} />
                {!certificadoFile ? (
                  <>
                    <Box sx={{ fontSize: 38, color: '#B7C2D0', mb: 1 }}>
                      <span role="img" aria-label="upload">⬆️</span>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                      Arrastra tu certificado o haz click aquí para subirlo desde tu ordenador.<br />
                      <b>Certificado electrónico</b>
                    </Typography>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#2666CF', fontWeight: 600 }}>{certificadoFile.name}</Typography>
                    <Button size="small" variant="outlined" color="error" sx={{ mt: 1 }} onClick={handleCertificadoRemove}>Eliminar</Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {/* Modal de subscripción */}
      <Dialog
        open={subsOpen}
        onClose={() => setSubsOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 900,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setSubsOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 700, maxWidth: 850, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Typography variant="overline" sx={{ color: '#2666CF', fontWeight: 700, letterSpacing: 1, fontSize: 14 }}>Configuración &gt; Subscripción</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3, mt: 1 }}>
                Subscripción
              </Typography>
              {/* Plan actual */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 5 }, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A40' }}>Tu plan</Typography>
                  <Button variant="outlined" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5 }}>Comparar planes</Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <input type="radio" checked readOnly style={{ accentColor: '#2666CF', marginRight: 8 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{plan.nombre}</Typography>
                  <Typography variant="body2" sx={{ color: '#888', ml: 2 }}>{plan.precio}</Typography>
                </Box>
                {plan.extras && plan.extras.length > 0 && (
                  <Box sx={{ ml: 4, mt: 1 }}>
                    {plan.extras.map((extra, i) => (
                      <Typography key={i} variant="body2" sx={{ color: '#2666CF', fontWeight: 500, mb: 0.5 }}>• {extra}</Typography>
                    ))}
                  </Box>
                )}
              </Box>
              {/* Información de pago */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 5 }, mb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A40', mb: 2 }}>Información de pago</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>PRÓXIMA FACTURA</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{nextInvoice.importe} - {nextInvoice.fecha}</Typography>
                      <Button variant="text" size="small" sx={{ fontWeight: 600, textTransform: 'none', color: '#2666CF' }}>Ver facturas</Button>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>FORMA DE PAGO</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, mt: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ bgcolor: '#EAF1FB', color: '#2666CF', px: 1.5, py: 0.5, borderRadius: 1, fontWeight: 700, fontSize: 15 }}>VISA</Box>
                        <Typography variant="body2" sx={{ color: '#222', fontWeight: 600 }}>VISA acabada en {card.last4} - Expira {card.exp}</Typography>
                        {card.predeterminado && <Box sx={{ ml: 1, bgcolor: '#2666CF', color: '#fff', borderRadius: 1, px: 1.5, py: 0.5, fontSize: 13, fontWeight: 600 }}>Predeterminada</Box>}
                      </Box>
                      <Button variant="text" size="small" sx={{ fontWeight: 600, textTransform: 'none', color: '#2666CF' }} onClick={() => setAddCardOpen(true)}>Añadir tarjeta</Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>DIRECCIÓN DE FACTURACIÓN</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, mt: 0.5 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#222', fontWeight: 600 }}>{billingAddress.nombre}</Typography>
                        <Typography variant="body2" sx={{ color: '#888' }}>{billingAddress.nif}</Typography>
                        <Typography variant="body2" sx={{ color: '#888' }}>{billingAddress.direccion}, {billingAddress.cp}, {billingAddress.ciudad}, {billingAddress.provincia}</Typography>
                        <Typography variant="body2" sx={{ color: '#888' }}>{billingAddress.pais}</Typography>
                      </Box>
                      <Button variant="text" size="small" sx={{ fontWeight: 600, textTransform: 'none', color: '#2666CF' }} onClick={() => setEditDirOpen(true)}>Editar dirección</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Modal editar dirección */}
        <Dialog open={editDirOpen} onClose={() => setEditDirOpen(false)} maxWidth="xs" fullWidth>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Editar dirección de facturación</Typography>
            <TextField label="Nombre" fullWidth size="small" sx={{ mb: 2 }} value={billingAddress.nombre} onChange={e => setBillingAddress(prev => ({ ...prev, nombre: e.target.value }))} />
            <TextField label="NIF" fullWidth size="small" sx={{ mb: 2 }} value={billingAddress.nif} onChange={e => setBillingAddress(prev => ({ ...prev, nif: e.target.value }))} />
            <TextField label="Dirección" fullWidth size="small" sx={{ mb: 2 }} value={billingAddress.direccion} onChange={e => setBillingAddress(prev => ({ ...prev, direccion: e.target.value }))} />
            <TextField label="CP" fullWidth size="small" sx={{ mb: 2 }} value={billingAddress.cp} onChange={e => setBillingAddress(prev => ({ ...prev, cp: e.target.value }))} />
            <TextField label="Ciudad" fullWidth size="small" sx={{ mb: 2 }} value={billingAddress.ciudad} onChange={e => setBillingAddress(prev => ({ ...prev, ciudad: e.target.value }))} />
            <TextField label="Provincia" fullWidth size="small" sx={{ mb: 2 }} value={billingAddress.provincia} onChange={e => setBillingAddress(prev => ({ ...prev, provincia: e.target.value }))} />
            <TextField label="País" fullWidth size="small" sx={{ mb: 2 }} value={billingAddress.pais} onChange={e => setBillingAddress(prev => ({ ...prev, pais: e.target.value }))} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button variant="outlined" onClick={() => setEditDirOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cancelar</Button>
              <Button variant="contained" onClick={() => setEditDirOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }}>Guardar</Button>
            </Box>
          </Box>
        </Dialog>
        {/* Modal añadir tarjeta */}
        <Dialog open={addCardOpen} onClose={() => setAddCardOpen(false)} maxWidth="xs" fullWidth>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Añadir tarjeta de pago</Typography>
            <TextField label="Tipo" fullWidth size="small" sx={{ mb: 2 }} value={card.tipo} onChange={e => setCard(prev => ({ ...prev, tipo: e.target.value }))} />
            <TextField label="Últimos 4 dígitos" fullWidth size="small" sx={{ mb: 2 }} value={card.last4} onChange={e => setCard(prev => ({ ...prev, last4: e.target.value }))} />
            <TextField label="Expiración" fullWidth size="small" sx={{ mb: 2 }} value={card.exp} onChange={e => setCard(prev => ({ ...prev, exp: e.target.value }))} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <input type="checkbox" checked={card.predeterminado} onChange={e => setCard(prev => ({ ...prev, predeterminado: e.target.checked }))} />
              <Typography variant="body2">Predeterminada</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button variant="outlined" onClick={() => setAddCardOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cancelar</Button>
              <Button variant="contained" onClick={() => setAddCardOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }}>Guardar</Button>
            </Box>
          </Box>
        </Dialog>
      </Dialog>
      {/* Modal de calendario */}
      <Dialog
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 1400,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto', minHeight: 600 }}>
          <IconButton onClick={() => setCalendarOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: 'flex', minHeight: 600 }}>
            {/* Sidebar filtros */}
            <Box sx={{ width: 240, bgcolor: '#F4F6FA', borderRight: '1px solid #E0E2E7', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#888', fontWeight: 700, mb: 2 }}>FILTROS</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <input type="checkbox" checked={calendarFilters.facturas} onChange={() => handleFilterChange('facturas')} />
                <Typography variant="body2">Vencimientos de facturas</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <input type="checkbox" checked={calendarFilters.compras} onChange={() => handleFilterChange('compras')} />
                <Typography variant="body2">Vencimientos de compras</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <input type="checkbox" checked={calendarFilters.pedidos} onChange={() => handleFilterChange('pedidos')} />
                <Typography variant="body2">Pedidos</Typography>
              </Box>
            </Box>
            {/* Contenido principal calendario */}
            <Box sx={{ flex: 1, p: 4, overflowX: 'auto' }}>
              {/* Cabecera calendario */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40' }}>Calendario</Typography>
                  <Button variant={calendarView === 'day' ? 'contained' : 'outlined'} size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }} onClick={() => setCalendarView('day')}>Día</Button>
                  <Button variant={calendarView === 'week' ? 'contained' : 'outlined'} size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }} onClick={() => setCalendarView('week')}>Semana</Button>
                  <Button variant={calendarView === 'month' ? 'contained' : 'outlined'} size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }} onClick={() => setCalendarView('month')}>Mes</Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 2, minWidth: 36 }} onClick={handlePrev}>{'<'}</Button>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mx: 2 }}>{calendarDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</Typography>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 2, minWidth: 36 }} onClick={handleNext}>{'>'}</Button>
                  <Button variant="text" size="small" sx={{ fontWeight: 600, textTransform: 'none', color: '#2666CF', ml: 2 }} onClick={handleToday}>Hoy</Button>
                  <Button variant="contained" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', ml: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }} onClick={handleNewEvent}>Nueva actividad</Button>
                </Box>
              </Box>
              {/* Calendario grid */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 2, minHeight: 480, overflowX: 'auto' }}>
                {/* Render calendario según vista */}
                {/* Solo implemento vista mes para dummy, puedes expandir luego */}
                {calendarView === 'month' && (() => {
                  const year = calendarDate.getFullYear();
                  const month = calendarDate.getMonth();
                  const firstDay = new Date(year, month, 1);
                  const lastDay = new Date(year, month + 1, 0);
                  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
                  const daysInMonth = lastDay.getDate();
                  const weeks = [];
                  let day = 1 - startDay;
                  for (let w = 0; w < 6; w++) {
                    const week = [];
                    for (let d = 0; d < 7; d++, day++) {
                      if (day < 1 || day > daysInMonth) {
                        week.push(null);
                      } else {
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const events = calendarEvents.filter(ev => ev.date === dateStr && calendarFilters[ev.type + (ev.type.endsWith('a') ? 's' : '')]);
                        week.push({ day, dateStr, events });
                      }
                    }
                    weeks.push(week);
                  }
                  return (
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr>
                          {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d => <th key={d} style={{ padding: 6, color: '#888', fontWeight: 600, fontSize: 15 }}>{d}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {weeks.map((week, wi) => (
                          <tr key={wi}>
                            {week.map((cell, di) => (
                              <td key={di} style={{ verticalAlign: 'top', border: '1px solid #F0F1F3', height: 70, padding: 4, background: cell && cell.events.length ? '#F8F9FB' : '#fff' }}>
                                {cell && (
                                  <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>{cell.day}</Typography>
                                    {cell.events.map(ev => (
                                      <Box key={ev.id} sx={{ bgcolor: ev.color, color: '#fff', borderRadius: 1, px: 1, py: 0.5, fontSize: 13, fontWeight: 600, mb: 0.5, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} onClick={() => handleEventClick(ev)}>
                                        {ev.title}
                                      </Box>
                                    ))}
                                  </Box>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}
                {/* Puedes implementar week/day view similar si lo necesitas */}
              </Box>
            </Box>
          </Box>
          {/* Modal detalles de evento */}
          <Dialog open={eventDetailsOpen} onClose={() => setEventDetailsOpen(false)} maxWidth="xs" fullWidth>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Detalle de evento</Typography>
              {selectedEvent && (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{selectedEvent.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>{selectedEvent.date}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>{selectedEvent.details}</Typography>
                </>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" onClick={() => setEventDetailsOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cerrar</Button>
              </Box>
            </Box>
          </Dialog>
          {/* Modal nueva actividad */}
          <Dialog open={newEventOpen} onClose={() => setNewEventOpen(false)} maxWidth="xs" fullWidth>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Nueva actividad</Typography>
              <TextField label="Título" fullWidth size="small" sx={{ mb: 2 }} />
              <TextField label="Tipo" select fullWidth size="small" sx={{ mb: 2 }} defaultValue="factura">
                <option value="factura">Vencimiento de factura</option>
                <option value="compra">Vencimiento de compra</option>
                <option value="pedido">Pedido</option>
              </TextField>
              <TextField label="Fecha" type="date" fullWidth size="small" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
              <TextField label="Detalles" fullWidth size="small" sx={{ mb: 2 }} multiline minRows={2} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" onClick={() => setNewEventOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cancelar</Button>
                <Button variant="contained" onClick={() => setNewEventOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }}>Crear</Button>
              </Box>
            </Box>
          </Dialog>
        </Box>
      </Dialog>
      {/* Modal de contactos recomendados */}
      <Dialog
        open={recomOpen}
        onClose={() => setRecomOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 700,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setRecomOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 400, maxWidth: 600, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>
                Afiliados
              </Typography>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: { xs: 2, md: 5 }, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A40' }}>Envia tu primera invitación</Typography>
                  <Button variant="contained" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={() => setInviteOpen(true)}>Enviar</Button>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Saldo acumulado</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#2666CF' }}>{recomData.saldo.toFixed(2)}€</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Invitaciones pendientes</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1A1A40' }}>{recomData.pendientes}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>Cuentas creadas</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1A1A40' }}>{recomData.creadas}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Popup de invitación */}
        <Dialog open={inviteOpen} onClose={() => setInviteOpen(false)} maxWidth="xs" fullWidth>
          <Box sx={{ p: 0, bgcolor: '#F8F9FB', borderRadius: 3 }}>
            <Box sx={{ p: 0, minWidth: 350, maxWidth: 400, mx: 'auto' }}>
              <Box sx={{ px: { xs: 2, md: 4 }, pt: 4, pb: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ fontSize: 48, mb: 1 }}>
                    <span role="img" aria-label="gift">🎁</span>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', textAlign: 'center', mb: 1 }}>
                    Gana 50€ cada vez que invites a alguien a unirse a enlazapro
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mb: 2 }}>
                    Cada vez que invitas a otra persona a unirse a enlazapro, ambos recibiréis un crédito de 50€ cada uno.
                  </Typography>
                </Box>
                <TextField label="Emails separados por coma" fullWidth size="small" sx={{ mb: 2 }} value={inviteEmails} onChange={e => setInviteEmails(e.target.value)} />
                <Button variant="contained" fullWidth sx={{ fontWeight: 700, borderRadius: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', textTransform: 'none', fontSize: 17, boxShadow: '0 2px 8px rgba(38,102,207,0.10)', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={() => alert('Invitación enviada (simulado)')}>Enviar</Button>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>O comparte tu enlace de invitación</Typography>
                  <TextField value={inviteLink} fullWidth size="small" InputProps={{ readOnly: true }} sx={{ mb: 1 }} />
                  <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }} onClick={() => { navigator.clipboard.writeText(inviteLink); alert('Enlace copiado'); }}>Copiar enlace</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Dialog>
      {/* Modal de importar */}
      <Dialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 900,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setImportOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 700, maxWidth: 850, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40' }}>Importar</Typography>
                <Button variant="outlined" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5 }}><span role="img" aria-label="info">📖</span> Aprende a importar datos</Button>
              </Box>
              <TextField placeholder="Buscar..." size="small" fullWidth sx={{ mb: 3, maxWidth: 320 }} value={importSearch} onChange={e => setImportSearch(e.target.value)} />
              {/* Destacado */}
              <Box sx={{ bgcolor: '#222A3A', borderRadius: 3, p: 3, mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {importFeatured.map(f => (
                  <Button key={f.key} variant="contained" sx={{ background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', fontWeight: 700, borderRadius: 2, px: 3, py: 1.5, boxShadow: '0 2px 8px rgba(38,102,207,0.10)', textTransform: 'none', fontSize: 16, mb: 1 }} onClick={() => handleImportType(f.key)}>{f.label}</Button>
                ))}
              </Box>
              {/* Categorías */}
              <Typography variant="subtitle2" sx={{ color: '#888', fontWeight: 700, mb: 2 }}>Categorías</Typography>
              <Box>
                {importCategories.map(cat => (
                  <Box key={cat.key} sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: '0 1px 4px rgba(38,102,207,0.04)', p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => handleImportCategoryToggle(cat.key)}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A40' }}>{cat.label}</Typography>
                      <Button size="small" variant="text" sx={{ minWidth: 32 }}>{importCategoryOpen[cat.key] ? '▲' : '▼'}</Button>
                    </Box>
                    {importCategoryOpen[cat.key] && (
                      <Box sx={{ mt: 2, pl: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {cat.items.length === 0 && <Typography variant="body2" sx={{ color: '#888' }}>Próximamente...</Typography>}
                        {cat.items.map(item => (
                          <Button key={item.key} variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 2, py: 0.5, mb: 1 }} onClick={() => handleImportType(item.key)}>{item.label}</Button>
                        ))}
                        {cat.key === 'proyectos' && <Button variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 2, py: 0.5, mb: 1 }} onClick={() => handleImportType('proyectos')}>Importar proyectos</Button>}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Modal de importación por tipo */}
        <Dialog open={!!importTypeOpen} onClose={() => { setImportTypeOpen(null); setImportFile(null); }} maxWidth="xs" fullWidth>
          <Box sx={{ p: 0, bgcolor: '#F8F9FB', borderRadius: 3 }}>
            <Box sx={{ p: 0, minWidth: 350, maxWidth: 400, mx: 'auto' }}>
              <Box sx={{ px: { xs: 2, md: 4 }, pt: 4, pb: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 2 }}>{importTypeOpen ? `Importar ${importTypeOpen.charAt(0).toUpperCase() + importTypeOpen.slice(1)}` : ''}</Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
                  Descarga una muestra del archivo XLSX para ver el formato de importación
                </Typography>
                <Button variant="text" size="small" sx={{ color: '#2666CF', mb: 2, textTransform: 'none' }}>Descarga una muestra del archivo XLSX</Button>
                <Box
                  sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 4, mb: 4, border: '1.5px dashed #B7C2D0', textAlign: 'center', cursor: 'pointer', minHeight: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  onDrop={handleImportFileDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => document.getElementById('import-file-input')?.click()}
                >
                  <input id="import-file-input" type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={handleImportFileChange} />
                  {!importFile ? (
                    <>
                      <Box sx={{ fontSize: 38, color: '#B7C2D0', mb: 1 }}>
                        <span role="img" aria-label="upload">⬆️</span>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        Selecciona o arrastra el archivo de importación aquí<br />
                        <b>Archivo Excel</b>
                      </Typography>
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: '#2666CF', fontWeight: 600 }}>{importFile.name}</Typography>
                      <Button size="small" variant="outlined" color="error" sx={{ mt: 1 }} onClick={handleImportFileRemove}>Eliminar</Button>
                    </Box>
                  )}
                </Box>
                <Button variant="text" size="small" sx={{ color: '#2666CF', mt: 1, textTransform: 'none' }}>Aprende a importar datos</Button>
              </Box>
            </Box>
          </Box>
        </Dialog>
        {/* Modal de importar proyectos */}
        <Dialog open={importProjectOpen} onClose={() => setImportProjectOpen(false)} maxWidth="xs" fullWidth>
          <Box sx={{ p: 0, bgcolor: '#F8F9FB', borderRadius: 3 }}>
            <Box sx={{ p: 0, minWidth: 350, maxWidth: 400, mx: 'auto' }}>
              <Box sx={{ px: { xs: 2, md: 4 }, pt: 4, pb: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 2 }}>Importar proyectos</Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>Importar a partir de:</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 2, py: 2, minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}><span role="img" aria-label="excel" style={{ fontSize: 32 }}>📊</span> Excel</Button>
                  <Button variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 2, py: 2, minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}><span role="img" aria-label="trello" style={{ fontSize: 32 }}>📋</span> Trello</Button>
                  <Button variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 2, py: 2, minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, opacity: 0.5 }} disabled><span role="img" aria-label="jira" style={{ fontSize: 32 }}>🗂️</span> Jira <Typography variant="caption" sx={{ color: '#888' }}>Muy pronto</Typography></Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Dialog>
      {/* Modal de votar mejoras */}
      <Dialog
        open={mejorasOpen}
        onClose={() => setMejorasOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 800,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setMejorasOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 600, maxWidth: 700, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 5 }, pt: 4, pb: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40' }}>Mejoras creadas por otros usuarios:</Typography>
                <Button variant="contained" size="small" sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 2, py: 0.5, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' } }} onClick={() => setAgregarMejoraOpen(true)}>+ Agregar mejora</Button>
              </Box>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 3, mb: 4 }}>
                {[...mejoras].sort((a, b) => b.votos - a.votos).map(m => (
                  <Box key={m.id} sx={{ border: '1.5px solid #E0E2E7', borderRadius: 2, p: 2, mb: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, cursor: 'pointer', '&:hover': { boxShadow: '0 2px 8px rgba(38,102,207,0.10)' } }} onClick={() => setDetalleMejora(m)}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A40', mb: 0.5 }}>{m.titulo}</Typography>
                      <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>{m.descripcion}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 90 }} onClick={e => e.stopPropagation()}>
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2, minWidth: 36, px: 1, fontWeight: 700 }} onClick={() => handleVotar(m.id)}>❤️ {m.votos}</Button>
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2, minWidth: 36, px: 1, fontWeight: 700 }} onClick={() => handleFavorito(m.id)}>🤍 {m.favoritos >= 1000 ? (m.favoritos/1000).toFixed(1)+'k' : m.favoritos}</Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Modal detalle mejora */}
        <Dialog open={!!detalleMejora} onClose={() => setDetalleMejora(null)} maxWidth="sm" fullWidth>
          <Box sx={{ p: 0, bgcolor: '#F8F9FB', borderRadius: 3 }}>
            <Box sx={{ p: 0, minWidth: 400, maxWidth: 500, mx: 'auto' }}>
              <Box sx={{ px: { xs: 2, md: 4 }, pt: 4, pb: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 2 }}>{detalleMejora?.titulo}</Typography>
                <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>{detalleMejora?.descripcion}</Typography>
                <Typography variant="subtitle2" sx={{ color: '#2666CF', fontWeight: 700, mb: 1 }}>Comentarios</Typography>
                <Box sx={{ maxHeight: 180, overflowY: 'auto', mb: 2 }}>
                  {detalleMejora?.comentarios?.length === 0 && <Typography variant="body2" sx={{ color: '#888' }}>Sin comentarios aún.</Typography>}
                  {detalleMejora?.comentarios?.map((c, i) => (
                    <Box key={i} sx={{ bgcolor: '#fff', borderRadius: 2, p: 1.5, mb: 1, border: '1px solid #E0E2E7' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{c.autor}</Typography>
                      <Typography variant="body2" sx={{ color: '#888' }}>{c.texto}</Typography>
                    </Box>
                  ))}
                </Box>
                <TextField label="Agregar comentario" fullWidth size="small" sx={{ mb: 2 }} value={nuevoComentario} onChange={e => setNuevoComentario(e.target.value)} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button variant="outlined" onClick={() => setDetalleMejora(null)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cerrar</Button>
                  <Button variant="contained" onClick={handleAgregarComentario} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }}>Comentar</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Dialog>
        {/* Modal agregar mejora */}
        <Dialog open={agregarMejoraOpen} onClose={() => setAgregarMejoraOpen(false)} maxWidth="xs" fullWidth>
          <Box sx={{ p: 0, bgcolor: '#F8F9FB', borderRadius: 3 }}>
            <Box sx={{ p: 0, minWidth: 350, maxWidth: 400, mx: 'auto' }}>
              <Box sx={{ px: { xs: 2, md: 4 }, pt: 4, pb: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 2 }}>Agregar mejora</Typography>
                <TextField label="Título" fullWidth size="small" sx={{ mb: 2 }} value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} />
                <TextField label="Descripción" fullWidth size="small" sx={{ mb: 2 }} value={nuevoDesc} onChange={e => setNuevoDesc(e.target.value)} multiline minRows={3} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button variant="outlined" onClick={() => setAgregarMejoraOpen(false)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cancelar</Button>
                  <Button variant="contained" onClick={handleAgregarMejora} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }}>Guardar</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Dialog>
      {/* Modal de añadir/cambiar cuenta */}
      <Dialog
        open={cuentasOpen}
        onClose={() => setCuentasOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            overflow: 'visible',
            boxShadow: '0 8px 40px rgba(38,102,207,0.18)',
            background: '#F8F9FB',
            maxWidth: 400,
          }
        }}
        BackdropProps={{ sx: { backgroundColor: 'rgba(30, 32, 48, 0.55)' } }}
      >
        <Box sx={{ position: 'relative', p: 0, bgcolor: '#F8F9FB', borderRadius: 3, maxHeight: '90vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setCuentasOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#888' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ p: 0, minWidth: 320, maxWidth: 350, mx: 'auto' }}>
            <Box sx={{ px: { xs: 2, md: 4 }, pt: 4, pb: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A40', mb: 3 }}>Cuentas en este dispositivo</Typography>
              <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(38,102,207,0.07)', p: 3, mb: 3 }}>
                {cuentasUsuario.map(c => (
                  <Box key={c.id} sx={{ border: '1.5px solid #E0E2E7', borderRadius: 2, p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{c.email}</Typography>
                      <Typography variant="body2" sx={{ color: '#888' }}>{c.telefono}</Typography>
                    </Box>
                    <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }} onClick={() => handleCambiarCuenta(c)}>Cambiar</Button>
                  </Box>
                ))}
                {!añadirModo ? (
                  <Button variant="contained" fullWidth sx={{ fontWeight: 700, borderRadius: 2, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff', textTransform: 'none', fontSize: 16, mt: 1 }} onClick={() => setAñadirModo(true)}>Añadir cuenta</Button>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <TextField label="Correo electrónico" fullWidth size="small" sx={{ mb: 2 }} value={nuevaCuenta} onChange={e => setNuevaCuenta(e.target.value)} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button variant="outlined" onClick={() => { setAñadirModo(false); setNuevaCuenta(''); }} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Cancelar</Button>
                      <Button variant="contained" onClick={handleAñadirCuenta} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#fff' }}>Añadir</Button>
                    </Box>
                  </Box>
                )}
              </Box>
              <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
                Si quieres cambiar más adelante el teléfono o el correo lo puedes hacer desde el perfil de esa cuenta.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </AppBar>
  );
};

export default Header;
