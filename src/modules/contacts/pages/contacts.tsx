import { useState, useEffect } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";

// Componentes ya existentes
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import ContactTable from "../components/contactTable";
import ContactForm from "../components/contactForm";

// Nuevos componentes divididos
import ContactsSearchFilters from "../components/contactsSearchFilters";
import ContactDetailsDrawer from "../components/ContactDetailsDrawer";
import PasswordDialog from "../components/PasswordDialog";
import LinkPersonDialog from "../components/LinkPersonDialog";

// Servicios y tipos
import ContactService from "../../../services/ContactService";
import LinkedContactsService from "../../../services/LinkedContactsService";
import { Contact } from "../../../types/Contact";
import { LinkedContact } from "../../../types/LinkedContact";
import { CommonResponse } from "../../../types/CommonResponse";
import useAuthStore from "../../../store/useAuthStore";

// Función para transformar el contacto local (con campos en español)
// al objeto que el API espera (con claves en inglés)
function transformLocalToBackendPayload(contact: Omit<Contact, "id" | "userId">): any {
  return {
    name: contact.nombre,
    nie: contact.nif,
    address: contact.direccion,
    province: contact.provincia,
    country: contact.pais,
    city: contact.poblacion,
    postalCode: contact.codigoPostal,
    email: contact.email,
    phone: contact.telefono,
    phone1: contact.movil, // Enviar el móvil como segundo teléfono
    website: contact.sitioWeb,
    vatIdentification: contact.identificacionVAT,
    commercialName: contact.nombreComercial,
    tags: contact.tags,
    contactType:
      contact.tipoContacto === "Cliente"
        ? 1
        : contact.tipoContacto === "Proveedor"
        ? 2
        : 0,
    extraInformation: contact.extraInformation,
    forceCreate: true,
  };
}

// Datos para los gráficos (sin cambios)
const salesData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  datasets: [
    {
      label: "Ventas (€)",
      data: [2500, 1200, 1500, 2000, 3000, 2500, 2800, 3200, 1900, 2100, 2700, 2900],
      backgroundColor: "#2666CF",
    },
  ],
};

const purchasesData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  datasets: [
    {
      label: "Compras (€)",
      data: [800, 600, 750, 900, 1000, 850, 950, 1100, 700, 650, 900, 1000],
      backgroundColor: "#F44336",
    },
  ],
};

// Lista de todas las columnas disponibles en la tabla
const allColumns = [
  { id: "nombre", label: "Nombre" },
  { id: "nombreComercial", label: "Nombre Comercial" },
  { id: "nif", label: "NIF" },
  { id: "direccion", label: "Dirección" },
  { id: "poblacion", label: "Población" },
  { id: "codigoPostal", label: "Código Postal" },
  { id: "provincia", label: "Provincia" },
  { id: "pais", label: "País" },
  { id: "email", label: "Email" },
  { id: "telefono", label: "Teléfono" },
  { id: "movil", label: "Móvil" },
  { id: "sitioWeb", label: "Sitio Web" },
  { id: "identificacionVAT", label: "Identificación VAT" },
  { id: "tags", label: "Tags" },
  { id: "tipoContacto", label: "Tipo de Contacto" },
  { id: "idioma", label: "Idioma" },
  { id: "moneda", label: "Moneda" },
  { id: "formaPago", label: "Forma de Pago" },
  { id: "diasVencimiento", label: "Días de Vencimiento" },
  { id: "diaVencimiento", label: "Día de Vencimiento" },
  { id: "tarifa", label: "Tarifa" },
  { id: "descuento", label: "Descuento" },
  { id: "cuentaCompras", label: "Cuenta Compras" },
  { id: "cuentaPagos", label: "Cuenta Pagos" },
  { id: "swift", label: "Swift" },
  { id: "iban", label: "IBAN" },
  { id: "refMandato", label: "Ref. Mandato" },
  { id: "referenciaInterna", label: "Referencia Interna" },
  { id: "comercialAsignado", label: "Comercial Asignado" },
  { id: "tipoIVA", label: "Tipo de IVA" },
];

// Datos iniciales para el formulario de contacto
const initialFormData: Contact = {
  id: "",
  userId: "",
  nombre: "",
  email: "",
  pais: "",
  poblacion: "",
  tipoContacto: "",
  telefono: "",
  movil: "",
  sitioWeb: "",
  direccion: "",
  codigoPostal: "",
  nif: "",
  nombreComercial: "",
  provincia: "",
  identificacionVAT: "",
  tags: "",
  idioma: "",
  moneda: "",
  formaPago: "",
  diasVencimiento: "",
  diaVencimiento: "",
  tarifa: "",
  descuento: "",
  cuentaCompras: "",
  cuentaPagos: "",
  swift: "",
  iban: "",
  refMandato: "",
  referenciaInterna: "",
  comercialAsignado: "",
  tipoIVA: [],
  informacionAdicional: "",
};

const Contacts = () => {
  const router = useRouter();
  // Obtenemos token y ownerContactId del store
  const token = useAuthStore((state) => state.token);
  const ownerContactId = useAuthStore((state) => state.contactId);

  // Estado para hidratación y redirección
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated && !token) {
      router.push("/auth/login");
    }
  }, [hydrated, token, router]);

  // Declaración de hooks
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(allColumns.map((col) => col.id));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("todos");
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Contact | null>(null);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [editClientData, setEditClientData] = useState({
    nombre: "",
    nif: "",
    telefono: "",
    email: "",
    direccion: "",
    codigoPostal: "",
    poblacion: "",
    provincia: "",
    pais: "",
  });
  const [linkedContacts, setLinkedContacts] = useState<LinkedContact[]>([]);
  const [loadingLinkedContacts, setLoadingLinkedContacts] = useState<boolean>(false);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(false);
  // Estado para controlar el polling de actualización
  const [isPolling, setIsPolling] = useState(false);

  // Función para refrescar la lista de contactos desde el API
  const fetchContacts = async () => {
    if (token) {
      setLoadingContacts(true);
      try {
        const response = await ContactService.getAllContacts(token);
        const fetchedContacts: Contact[] = response.data.map((serviceContact: any) =>
          transformServiceContactToLocal(serviceContact)
        );
        setContacts(fetchedContacts);
        setFilteredPeople(fetchedContacts);
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      } finally {
        setLoadingContacts(false);
      }
    }
  };

  // Función para refrescar los contactos vinculados
  const fetchLinkedContacts = async () => {
    if (ownerContactId && token) {
      setLoadingLinkedContacts(true);
      try {
        const response = await LinkedContactsService.getByContactId(ownerContactId, token);
        const allLinkedContacts = response.data || [];
        setLinkedContacts(allLinkedContacts);
      } catch (error) {
        console.error("Error al obtener contactos vinculados:", error);
      } finally {
        setLoadingLinkedContacts(false);
      }
    }
  };

  // Función de polling que refresca los datos cada 2 segundos hasta un máximo de intentos
  const startPollingUpdates = () => {
    setIsPolling(true);
    let attempts = 0;
    const maxAttempts = 5;
    const intervalId = setInterval(async () => {
      attempts++;
      await fetchContacts();
      await fetchLinkedContacts();
      // Aquí podrías agregar lógica para detener el polling si se detecta la actualización esperada
      if (attempts >= maxAttempts) {
        clearInterval(intervalId);
        setIsPolling(false);
      }
    }, 2000);
  };

  // Cargar contactos al iniciar
  useEffect(() => {
    fetchContacts();
  }, [token]);

  // Actualizar columnas visibles desde localStorage
  useEffect(() => {
    const savedColumns =
      JSON.parse(localStorage.getItem("visibleColumns") || "[]") ||
      allColumns.map((col) => col.id);
    setVisibleColumns(savedColumns);
  }, []);

  useEffect(() => {
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  // Actualizar datos de edición cuando cambia el contacto seleccionado
  useEffect(() => {
    setEditData(selectedContact);
  }, [selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      setEditClientData({
        nombre: selectedContact.nombre || "",
        nif: selectedContact.nif || "",
        telefono: selectedContact.telefono || "",
        email: selectedContact.email || "",
        direccion: selectedContact.direccion || "",
        codigoPostal: selectedContact.codigoPostal || "",
        poblacion: selectedContact.poblacion || "",
        provincia: selectedContact.provincia || "",
        pais: selectedContact.pais || "",
      });
      setIsEditingClient(false);
    }
  }, [selectedContact]);

  // Cargar contactos vinculados al cambiar ownerContactId/token
  useEffect(() => {
    fetchLinkedContacts();
  }, [ownerContactId, token]);

  // Manejo de la búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPeople(
      contacts.filter(
        (contact) =>
          (contact.nombre || "").toLowerCase().includes(term) ||
          (contact.tipoContacto || "").toLowerCase().includes(term)
      )
    );
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpen = (contact: Contact | null = null) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
  };

  // Función para vincular un contacto
  const handleLinkContact = async (personId: string) => {
    if (!ownerContactId || !token) return;
    try {
      const response = await LinkedContactsService.addLinkedContact(
        ownerContactId,
        personId,
        token
      );
      if (response.data) {
        await fetchLinkedContacts();
        await fetchContacts();
        startPollingUpdates();
      }
    } catch (error) {
      console.error("Error al vincular contacto:", error);
    }
  };

  // Función para desvincular un contacto (solo elimina el vínculo)
  const handleUnlinkContact = async (linkedContactId: string) => {
    if (!ownerContactId || !token) return;
    try {
      await LinkedContactsService.deleteLinkedContact(ownerContactId, linkedContactId, token);
      await fetchLinkedContacts();
      startPollingUpdates();
    } catch (error) {
      console.error("Error al eliminar contacto vinculado:", error);
    }
  };

  // Abrir el drawer para ver detalles del contacto
  const handleOpenDrawer = (contact: Contact) => {
    setSelectedContact(contact);
    setEditData(contact);
    setIsDrawerOpen(true);
  };

  // Función para guardar (crear/actualizar) un contacto y refrescar la tabla
  const handleSave = async (contact: Contact) => {
    if (!token || !ownerContactId) {
      console.error("No hay token o ownerContactId disponible");
      return;
    }
    setLoadingContacts(true);
    try {
      if (contact.id) {
        const updateResponse = await ContactService.updateContact(
          { ...contact, contactId: contact.id },
          token
        );
        if (!updateResponse || !updateResponse.data) {
          console.error("Error al actualizar el contacto");
          return;
        }
      } else {
        const { id, userId, ...contactToCreate } = contact;
        const backendPayload = transformLocalToBackendPayload(contactToCreate);
        const createResponse = await ContactService.createContact(backendPayload, token);
        if (createResponse && createResponse.data) {
          const newContact = transformServiceContactToLocal(createResponse.data);
          if (newContact.id) {
            const linkResponse = await LinkedContactsService.addLinkedContact(
              ownerContactId,
              newContact.id,
              token
            );
            if (!linkResponse || !linkResponse.data) {
              console.error("Error al vincular el contacto");
              return;
            }
            setContacts((prevContacts) => [...prevContacts, newContact]);
            setLinkedContacts((prevLinked) => [
              ...prevLinked,
              { ownerContactId: ownerContactId, linkedContactId: newContact.id },
            ]);
          } else {
            console.error("No se puede vincular el contacto debido a un ID inválido.");
            return;
          }
        } else {
          console.error("Error al crear el contacto");
          return;
        }
      }
      await fetchContacts();
      await fetchLinkedContacts();
      startPollingUpdates();
      setOpen(false);
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    } finally {
      setLoadingContacts(false);
    }
  };

  // Función para transformar el objeto del servicio al formato interno
  function transformServiceContactToLocal(serviceContact: any): Contact {
    return {
      id: serviceContact.id ? serviceContact.id.toString() : "",
      userId: serviceContact.userId ? serviceContact.userId.toString() : "",
      nombre: serviceContact.name || "",
      email: serviceContact.email || "",
      pais: serviceContact.country || "",
      poblacion: serviceContact.city || "",
      tipoContacto: serviceContact.userType || "",
      telefono: serviceContact.phone || "",
      movil: serviceContact.phone1 || "",
      sitioWeb: serviceContact.website || "",
      direccion: serviceContact.address || "",
      codigoPostal: serviceContact.postalCode || "",
      nif: serviceContact.nie || "",
      nombreComercial: serviceContact.commercialName || "",
      provincia: serviceContact.province || "",
      identificacionVAT: serviceContact.extraInformation?.vatType || "",
      tags: serviceContact.tags || "",
      idioma: serviceContact.extraInformation?.language || "",
      moneda: serviceContact.extraInformation?.currency || "",
      formaPago: serviceContact.extraInformation?.paymentMethod || "",
      diasVencimiento: serviceContact.extraInformation?.paymentExpirationDays || "",
      diaVencimiento: serviceContact.extraInformation?.paymentExpirationDay || "",
      tarifa: serviceContact.extraInformation?.rate || "",
      descuento: serviceContact.extraInformation?.discount || "",
      cuentaCompras: "",
      cuentaPagos: "",
      swift: serviceContact.extraInformation?.swift || "",
      iban: serviceContact.extraInformation?.iban || "",
      refMandato: "",
      referenciaInterna: serviceContact.extraInformation?.internalReference || "",
      comercialAsignado: "",
      tipoIVA: serviceContact.extraInformation?.vatType ? [serviceContact.extraInformation.vatType] : [],
      informacionAdicional: "",
      extraInformation: serviceContact.extraInformation,
    };
  }

  // Función para gestionar el menú de columnas
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

  // Función para obtener los contactos vinculados
  const getLinkedContacts = (): Contact[] => {
    return contacts.filter((contact) =>
      linkedContacts.some(
        (lc) => lc.linkedContactId.toLowerCase() === contact.id.toLowerCase()
      )
    );
  };

  // Se aplica la búsqueda y/o el filtro adicional
  const getFilteredContacts = () => {
    const linkedContactsList = getLinkedContacts();
    return linkedContactsList.filter((contact) => {
      const nombre = (contact.nombre || "").toLowerCase();
      const tipo = (contact.tipoContacto || "").toLowerCase();
      const matchesSearchTerm = nombre.includes(searchTerm) || tipo.includes(searchTerm);
      if (filter === "todos") return matchesSearchTerm;
      if (filter === "clientes") return matchesSearchTerm && contact.tipoContacto === "Cliente";
      if (filter === "proveedores") return matchesSearchTerm && contact.tipoContacto === "Proveedor";
      return false;
    });
  };

  const handlePortalClick = () => {
    if (isPasswordEnabled) {
      window.open("/contacts/portal-login");
    } else {
      window.open("/contacts/portal-clientes", "_blank");
    }
  };

  const handleEdit = (contact: Contact) => {
    handleOpen(contact);
  };

  return (
    <>
      {/* Overlay de polling */}
      {isPolling && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {/* Condicionalmente mostramos un Loading si no se ha hidratado */}
      {!hydrated ? (
        <div></div>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", bgcolor: "#F3F4F6" }}>
          <Header isMenuOpen={isMenuOpen} />
          <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}>
            <Box
              component="nav"
              sx={{
                width: isMenuOpen ? "240px" : "70px",
                flexShrink: 0,
                bgcolor: "#1A1A40",
                borderRight: "none",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                zIndex: 1201,
                position: "fixed",
                height: "100%",
                transition: "width 0.3s ease",
              }}
            >
              <Sidebar isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "#F3F4F6",
                p: 3,
                transition: "margin-left 0.3s ease",
                marginLeft: isMenuOpen ? "240px" : "70px",
                maxWidth: "calc(100% - 240px)",
                minHeight: "calc(100vh - 64px)",
              }}
            >
              <Container maxWidth="xl">
                <Typography variant="h3" gutterBottom sx={{ color: "#1A1A40", fontWeight: "600" }}>
                  Contactos
                </Typography>
  
                <ContactsSearchFilters
                  searchTerm={searchTerm}
                  onSearchChange={handleSearch}
                  filter={filter}
                  setFilter={setFilter}
                  onAdd={() => handleOpen()}
                  onImportExport={() => {}}
                  onPortal={handlePortalClick}
                  anchorEl={anchorEl}
                  onColumnsMenuOpen={handleMenuOpen}
                  onColumnsMenuClose={handleMenuClose}
                  visibleColumns={visibleColumns}
                  onColumnToggle={handleColumnToggle}
                  allColumns={allColumns}
                />
  
                <Typography variant="h4" sx={{ mb: 3, color: "#2666CF", fontWeight: "600" }}>
                  Contactos Vinculados
                </Typography>
  
                {(loadingContacts || loadingLinkedContacts) ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <CircularProgress size={60} />
                  </Box>
                ) : (
                  <ContactTable
                    contacts={getFilteredContacts()}
                    visibleColumns={visibleColumns}
                    allColumns={allColumns}
                    onEdit={handleOpen}
                    onDelete={handleUnlinkContact}
                    onRowClick={handleOpenDrawer}
                  />
                )}
  
                <ContactDetailsDrawer
                  selectedContact={selectedContact}
                  isDrawerOpen={isDrawerOpen}
                  isDrawerExpanded={isDrawerExpanded}
                  setIsDrawerExpanded={setIsDrawerExpanded}
                  onCloseDrawer={() => setIsDrawerOpen(false)}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  editData={editData}
                  setEditData={setEditData}
                  isEditingClient={isEditingClient}
                  setIsEditingClient={setIsEditingClient}
                  editClientData={editClientData}
                  setEditClientData={setEditClientData}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  linkedContacts={linkedContacts}
                  onLinkContact={handleLinkContact}
                  onUnlinkContact={handleUnlinkContact}
                  onPortalClick={handlePortalClick}
                  handleSaveContact={handleSave}
                  handleOpenDialog={handleOpenDialog}
                />
  
                <PasswordDialog
                  open={isPasswordDialogOpen}
                  onClose={() => setIsPasswordDialogOpen(false)}
                  isPasswordEnabled={isPasswordEnabled}
                  setIsPasswordEnabled={setIsPasswordEnabled}
                  password={password}
                  setPassword={setPassword}
                />
  
                <LinkPersonDialog
                  open={isDialogOpen}
                  onClose={handleCloseDialog}
                  searchTerm={searchTerm}
                  onSearchChange={handleSearch}
                  filteredPeople={filteredPeople}
                  onLinkContact={handleLinkContact}
                />
  
                <ContactForm
                  open={open}
                  handleClose={handleClose}
                  contact={selectedContact}
                  handleSave={handleSave}
                  onLinkContact={handleLinkContact}
                />
  
              </Container>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Contacts;
