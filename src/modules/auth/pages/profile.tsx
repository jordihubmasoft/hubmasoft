import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';
import Grow from '@mui/material/Grow';
import SaveIcon from '@mui/icons-material/Save';

import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';

// IMPORTANTE: Usa useAuthStore para sacar token, contactId, agentId
import useAuthStore from '../../../store/useAuthStore';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

// Traemos nuestros servicios
import ContactService from '../../../services/ContactService';

// Importamos el formulario que mostrará y editará los datos:
import EditProfileForm from '../components/EditProfileForm';

// (Resto de componentes que ya tenías)
import ProfileCard from '../components/ProfileCard';
import FiscalDataForm from '../components/FiscalDataForm';
import ContactDataForm from '../components/ContactDataForm';
import ShippingAddressForm from '../components/ShippingAddressForm';
import PreferencesForm from '../components/PreferencesForm';
import DocumentTemplates from '../components/DocumentTemplates';
import PaymentMethodComponent from '../components/PaymentMethod';
import Imports from '../components/Imports';
import Polls from '../components/Polls';
import Taxes from '../components/Taxes';

const Profile: React.FC = () => {
  const router = useRouter();
  // De tu store y contexto de auth
  const { token, contactId, agentId } = useAuthStore();
  const { user, logout } = useAuth();

  // Para controlar cuándo ya está todo “hidratado”
  const [hydrated, setHydrated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // Flag para saber si el contacto ya existe en BD
  const [hasContact, setHasContact] = useState(false);
  // Para indicar si estamos cargando datos del contacto o guardando cambios
  const [loading, setLoading] = useState(false);

  // Estado para controlar si hay cambios sin guardar
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // State con todos los campos de contacto que quieras mostrar/editar
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
    city: "",
    userType: "",
    phone: "",
    address: "",
    postalCode: "",
    nie: "",
    commercialName: "",
    province: "",
    mobile: "",
    website: "",
    contactId: "",
    shippingAddress: "",
    shippingCity: "",
    shippingProvince: "",
    shippingPostalCode: "",
    shippingCountry: "",
    userId: "",
    skills: "",
    experience: "",
    companyName: "",
    companySize: "",
    phone1: "",
    vatIdentification: "",
    salesTax: 0,
    equivalenceSurcharge: 0,
    shoppingTax: 0,
    paymentDay: 0,
    tags: "",
    vatType: "",
    internalReference: "",
    language: "",
    currency: "",
    paymentMethod: "",
    paymentExpirationDays: "",
    paymentExpirationDay: "",
    rate: "",
    discount: "",
    swift: "",
    iban: "",
    shippingAddresses: [
      {
        direction: "",
        city: "",
        postalCode: "",
        province: "",
        country: ""
      }
    ]
  });

  // Sidebar derecho: estado para la sección activa
  const [activeSection, setActiveSection] = useState("profile");

  // Definición de las secciones (fijamos sus ids y labels)
  const sections = useMemo(
    () => [
      { label: 'Perfil', id: 'profile' },
      { label: 'Datos Fiscales', id: 'fiscalData' },
      { label: 'Contacto', id: 'contactData' },
      { label: 'Dirección de Envío', id: 'shippingAddress' },
      { label: 'Preferencias', id: 'preferences' },
      { label: 'Documentos', id: 'documentTemplates' },
      { label: 'Método de Pago', id: 'paymentMethod' },
      { label: 'Imports', id: 'imports' },
      { label: 'Encuestas', id: 'polls' },
      { label: 'Impuestos', id: 'taxes' },
    ],
    []
  );

  // Intersection Observer para detectar la sección visible
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  // 1. useEffect para "hidratar" y hacer checks
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  // 2. useEffect para obtener datos del contacto
  useEffect(() => {
    const fetchContact = async () => {
      if (!contactId || !token) return;
  
      setLoading(true);
      try {
        const response = await ContactService.getContactById(contactId, token);
  
        if (response?.data?.length > 0) {
          const contactData = response.data[0] as any;
          setFormData((prev) => ({
            ...prev,
            name: contactData.name || "",
            surname: contactData.surname || "",
            email: contactData.email || "",
            country: contactData.country || "",
            city: contactData.city || "",
            userType: contactData.userType || "",
            phone: contactData.phone || "",
            address: contactData.address || "",
            postalCode: contactData.postalCode || "",
            nie: contactData.nie || "",
            commercialName: contactData.commercialName || "",
            province: contactData.province || "",
            mobile: contactData.mobile || "",
            website: contactData.website || "",
            contactId: contactData.id ? contactData.id.toString() : "",
            userId: agentId || "",
            skills: contactData.skills || "",
            experience: contactData.experience || "",
            companyName: contactData.companyName || "",
            companySize: contactData.companySize || "",
            // Mapeamos los datos de shippingAddress usando las claves de la API:
            shippingAddress: contactData.extraInformation?.shippingAddress?.[0]?.direction || "",
            shippingCity: contactData.extraInformation?.shippingAddress?.[0]?.city || "",
            shippingProvince: contactData.extraInformation?.shippingAddress?.[0]?.province || "",
            shippingPostalCode: contactData.extraInformation?.shippingAddress?.[0]?.postalCode || "",
            shippingCountry: contactData.extraInformation?.shippingAddress?.[0]?.country || "",
          }));
          setHasContact(true);
        } else {
          resetFormData();
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        resetFormData();
      } finally {
        setLoading(false);
      }
    };
  
    const resetFormData = () => {
      setFormData((prev) => ({
        ...prev,
        name: "",
        surname: "",
        email: "",
        country: "",
        city: "",
        userType: "",
        phone: "",
        address: "",
        postalCode: "",
        nie: "",
        commercialName: "",
        province: "",
        mobile: "",
        website: "",
        contactId: "",
        shippingAddress: "",
        shippingCity: "",
        shippingProvince: "",
        shippingPostalCode: "",
        shippingCountry: "",
        userId: agentId || "",
        skills: "",
        experience: "",
        companyName: "",
        companySize: "",
      }));
      setHasContact(false);
    };
  
    fetchContact();
  }, [contactId, token, agentId, refresh]);

  // 3. Handler para guardar el formulario principal (ahora integrado en el global)
  const handleSubmitProfile = async () => {
    if (!token || !agentId) {
      console.error('No hay token o agentId, no se puede guardar.');
      return;
    }
    try {
      setLoading(true);

      // Preparamos el payload (este método se usaba anteriormente por separado)
      const contactData: any = {
        userId: agentId,
        contactId: contactId,
        name: formData.name,
        nie: formData.nie,
        address: formData.address,
        province: formData.province,
        country: formData.country,
        city: formData.city,
        postalCode: formData.postalCode,
        email: formData.email,
        phone: formData.phone,
        phone1: formData.phone1 || "",
        website: formData.website,
        vatIdentification: formData.vatIdentification || "",
        salesTax: formData.salesTax || 0,
        equivalenceSurcharge: formData.equivalenceSurcharge || 0,
        shoppingTax: formData.shoppingTax || 0,
        paymentDay: formData.paymentDay || 0,
        tags: formData.tags || "",
        vatType: formData.vatType || "",
        internalReference: formData.internalReference || "",
        language: formData.language || "",
        currency: formData.currency || "",
        paymentMethod: formData.paymentMethod || "",
        paymentExpirationDays: formData.paymentExpirationDays || "",
        paymentExpirationDay: formData.paymentExpirationDay || "",
        rate: formData.rate || "",
        discount: formData.discount || "",
        swift: formData.swift || "",
        iban: formData.iban || "",
        shippingAddress: [
          {
            direction: formData.shippingAddress,
            city: formData.shippingCity,
            postalCode: formData.shippingPostalCode,
            province: formData.shippingProvince,
            country: formData.shippingCountry,
          },
        ],
      };

      let response;
      if (hasContact) {
        // Update
        response = await ContactService.updateContact(contactData, token);
        console.log('Contacto actualizado:', response);
      } else {
        // Create
        const { contactId, ...createPayload } = contactData;
        response = await ContactService.createContact(createPayload, token);
        console.log('Contacto creado:', response);
      }

      if (response?.data) {
        setHasContact(true);
        const updated = response.data;
        setFormData((prev) => ({
          ...prev,
          name: updated.name || prev.name,
          surname: updated.surname || prev.surname,
          email: updated.email || prev.email,
          // Actualiza otros campos según lo que devuelva el backend
        }));
      }
    } catch (error) {
      console.error('Error al crear/actualizar el contacto:', error);
      alert('Hubo un problema al guardar el contacto.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Handler para cambios en el formulario: se lo pasamos al formulario hijo
  const handleChangeProfileForm = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setUnsavedChanges(true);
  };

  // 5. Handler para guardar datos fiscales (ahora integrado en el global)
  const handleSaveFiscalData = async (fiscalData: any) => {
    try {
      // Preparamos el payload a partir de los datos fiscales
      const payload = {
        userId: agentId,
        contactId: contactId,
        companyName: fiscalData.companyName,
        nie: fiscalData.nif,
        commercialName: fiscalData.commercialName,
        vatIdentification: fiscalData.vatIdentifier,
        address: fiscalData.address,
        postalCode: fiscalData.postalCode,
        province: fiscalData.province,
        country: fiscalData.country,
      };

      // Llamamos al servicio para actualizar datos fiscales
      const response = await ContactService.updateContact(payload, token);
      if (response?.data) {
        console.log("Datos fiscales actualizados:", response.data);
        // Actualizamos el estado con la respuesta, si es necesario
        setFormData(prev => ({
          ...prev,
          companyName: response.data.companyName || prev.companyName,
          nie: response.data.nif || prev.nie,
          commercialName: response.data.nombreComercial || prev.commercialName,
          vatIdentification: response.data.identificacionVAT || prev.vatIdentification,
          address: response.data.direccion || prev.address,
          postalCode: response.data.codigoPostal || prev.postalCode,
          province: response.data.provincia || prev.province,
          country: response.data.pais || prev.country,
        }));
      }
    } catch (error) {
      console.error("Error al actualizar datos fiscales:", error);
      alert("Hubo un problema al guardar los datos fiscales.");
    }
  };

  // Nuevo handler global unificado para guardar todos los cambios de una sola petición
  const handleGlobalSave = async () => {
    if (!token || !agentId) {
      console.error('No hay token o agentId, no se puede guardar.');
      return;
    }
    try {
      setLoading(true);
      // Construimos un payload unificado que incluye tanto los datos del perfil como los fiscales
      const payload: any = {
        userId: agentId,
        contactId: contactId,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        nie: formData.nie,
        address: formData.address,
        province: formData.province,
        country: formData.country,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone,
        phone1: formData.phone1 || "",
        website: formData.website,
        vatIdentification: formData.vatIdentification || "",
        salesTax: formData.salesTax || 0,
        equivalenceSurcharge: formData.equivalenceSurcharge || 0,
        shoppingTax: formData.shoppingTax || 0,
        paymentDay: formData.paymentDay || 0,
        tags: formData.tags || "",
        vatType: formData.vatType || "",
        internalReference: formData.internalReference || "",
        language: formData.language || "",
        currency: formData.currency || "",
        paymentMethod: formData.paymentMethod || "",
        paymentExpirationDays: formData.paymentExpirationDays || "",
        paymentExpirationDay: formData.paymentExpirationDay || "",
        rate: formData.rate || "",
        discount: formData.discount || "",
        swift: formData.swift || "",
        iban: formData.iban || "",
        shippingAddress: [
          {
            direction: formData.shippingAddress,
            city: formData.shippingCity,
            postalCode: formData.shippingPostalCode,
            province: formData.shippingProvince,
            country: formData.shippingCountry,
          },
        ],
        // Datos fiscales
        companyName: formData.companyName,
        commercialName: formData.commercialName,
      };

      let response;
      if (hasContact) {
        // Actualización: se envía toda la info de una vez
        response = await ContactService.updateContact(payload, token);
        console.log('Contacto actualizado:', response);
      } else {
        // Creación: se elimina contactId del payload
        const { contactId, ...createPayload } = payload;
        response = await ContactService.createContact(createPayload, token);
        console.log('Contacto creado:', response);
      }

      if (response?.data) {
        setHasContact(true);
        setFormData((prev) => ({
          ...prev,
          ...response.data,
        }));
        setUnsavedChanges(false);
      }
    } catch (error) {
      console.error('Error guardando cambios globales:', error);
      alert('Hubo un problema al guardar los cambios.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Render condicional si no se ha hidratado
  if (!hydrated) {
    return (
      <Box>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  // Render condicional si no hay usuario
  if (!user) {
    return (
      <Box>
        <Typography>Redirigiendo al login...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />

      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px' }}>
        {/* Sidebar Izquierdo */}
        <Box
          component="nav"
          sx={{
            width: isMenuOpen ? '240px' : '70px',
            flexShrink: 0,
            bgcolor: '#1A1A40',
            borderRight: 'none',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            zIndex: 1201,
            position: 'fixed',
            height: '100%',
            transition: 'width 0.3s ease',
          }}
        >
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </Box>

        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            ml: isMenuOpen ? '240px' : '70px',
            mr: { xs: 0, md: '250px' },
            transition: 'margin-left 0.3s ease, margin-right 0.3s ease',
            bgcolor: '#F3F4F6',
          }}
        >
          <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: 'bold' }}>
              Configuración de Perfil
            </Typography>

            {/* Sección Perfil */}
            <Box id="profile">
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <ProfileCard
                    name={formData.name}
                    email={formData.email}
                    onChangePhoto={() => alert('Cambiar foto')}
                    onDeleteAccount={() => logout()}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <EditProfileForm
                    loading={loading}
                    hasContact={hasContact}
                    formData={formData}
                    onChange={handleChangeProfileForm}
                    onSubmit={handleSubmitProfile}
                    onChangePassword={() => alert('Cambiar Contraseña')}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Sección Datos Fiscales */}
            <Box id="fiscalData" sx={{ mt: 4 }}>
              <FiscalDataForm
                initialData={{
                  companyName: formData.companyName,
                  nif: formData.nie,
                  commercialName: formData.commercialName,
                  vatIdentifier: formData.vatIdentification,
                  address: formData.address,
                  postalCode: formData.postalCode,
                  province: formData.province,
                  country: formData.country,
                }}
                onSave={handleSaveFiscalData}
              />
            </Box>

            {/* Sección Contacto */}
            <Box id="contactData" sx={{ mt: 4 }}>
              <ContactDataForm onSave={() => {}} />
            </Box>

            {/* Sección Dirección de Envío */}
            <Box id="shippingAddress" sx={{ mt: 4 }}>
              <ShippingAddressForm
                initialData={{
                  direccion: formData.shippingAddress,
                  poblacion: formData.shippingCity,
                  provincia: formData.shippingProvince,
                  codigoPostal: formData.shippingPostalCode,
                  pais: formData.shippingCountry,
                }}
                onAddAddress={(updatedShipping) => {
                  setFormData((prev) => ({
                    ...prev,
                    shippingAddress: updatedShipping.direccion,
                    shippingCity: updatedShipping.poblacion,
                    shippingProvince: updatedShipping.provincia,
                    shippingPostalCode: updatedShipping.codigoPostal,
                    shippingCountry: updatedShipping.pais,
                  }));
                  setUnsavedChanges(true);
                }}
              />
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Sección Preferencias */}
            <Box id="preferences" sx={{ mt: 4 }}>
              <PreferencesForm onSave={() => {}} />
            </Box>

            {/* Sección Documentos */}
            <Box id="documentTemplates" sx={{ mt: 4 }}>
              <DocumentTemplates />
            </Box>

            {/* Sección Método de Pago */}
            <Box id="paymentMethod" sx={{ mt: 4 }}>
              <PaymentMethodComponent />
            </Box>

            {/* Sección Imports */}
            <Box id="imports" sx={{ mt: 4 }}>
              <Imports />
            </Box>

            {/* Sección Encuestas */}
            <Box id="polls" sx={{ mt: 4 }}>
              <Polls />
            </Box>

            {/* Sección Impuestos */}
            <Box id="taxes" sx={{ mt: 4 }}>
              <Taxes />
            </Box>
          </Container>

          {/* Sidebar Derecho Mejorado */}
          <Box
            sx={{
              position: 'fixed',
              top: '120px',
              right: '20px',
              width: '220px',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
              display: { xs: 'none', md: 'block' },
              zIndex: 1100,
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <List>
              {sections.map((section, index) => (
                <Grow
                  in={true}
                  style={{ transformOrigin: '0 0 0' }}
                  timeout={500 + index * 150}
                  key={section.id}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        document.getElementById(section.id)?.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                      selected={activeSection === section.id}
                      sx={{
                        transition: 'transform 0.3s, background-color 0.3s',
                        '&:hover': {
                          transform: 'scale(1.03)',
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        },
                        borderRadius: 1,
                        position: 'relative',
                        ...(activeSection === section.id && {
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: -8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 4,
                            height: '60%',
                            bgcolor: 'primary.main',
                            borderRadius: 2,
                          },
                        }),
                        '&.Mui-selected': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                        },
                      }}
                    >
                      <ListItemText primary={section.label} />
                    </ListItemButton>
                  </ListItem>
                </Grow>
              ))}
            </List>
          </Box>
        </Box>
      </Box>

      {/* Botón flotante para guardar cambios globales con estilo profesional */}
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={handleGlobalSave}
        disabled={!unsavedChanges || loading}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1500,
          background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
          color: '#FFFFFF',
          fontWeight: 'bold',
          '&:hover': {
            background: 'linear-gradient(90deg, #6A82FB, #2666CF)',
          },
          borderRadius: 2,
          px: 3,
          py: 1.5,
          textTransform: 'none',
          // Si está deshabilitado, se muestra con menor opacidad
          opacity: !unsavedChanges || loading ? 0.7 : 1,
        }}
      >
        Guardar Cambios
      </Button>
    </Box>
  );
};

export default Profile;
