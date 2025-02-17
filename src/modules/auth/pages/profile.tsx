// src/modules/auth/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Divider, Grid } from '@mui/material';

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
import Signout from '../components/Signout';
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
            shippingAddress: contactData.extraInformation?.shippingAddress?.[0]?.direccion || "",
            shippingCity: contactData.extraInformation?.shippingAddress?.[0]?.poblacion || "",
            shippingProvince: contactData.extraInformation?.shippingAddress?.[0]?.provincia || "",
            shippingPostalCode: contactData.extraInformation?.shippingAddress?.[0]?.codigoPostal || "",
            shippingCountry: contactData.extraInformation?.shippingAddress?.[0]?.pais || "",
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

  // 3. Handler para guardar el formulario principal
  const handleSubmitProfile = async () => {
    if (!token || !agentId) {
      console.error('No hay token o agentId, no se puede guardar.');
      return;
    }
    try {
      setLoading(true);

      // Preparamos el payload
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
        {/* Sidebar */}
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

            <Grid container spacing={3}>
              {/* Card con la foto y otros datos */}
              <Grid item xs={12} md={4}>
                <ProfileCard
                  onChangePhoto={() => alert('Cambiar foto')}
                  onDeleteAccount={() => logout()}
                />
              </Grid>

              {/* Formulario para editar perfil */}
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

            {/* Otros formularios */}
            <FiscalDataForm /* ... */ onSave={() => {}}  />
            <ContactDataForm /* ... */ onSave={() => {}}  />
            <ShippingAddressForm /* ... */ onAddAddress={() => {}} />
            <Divider sx={{ my: 4 }} />

            <PreferencesForm /* ... */ onSave={() => {}} />
            <DocumentTemplates /* ... */ />
            <PaymentMethodComponent /* ... */ />
            <Imports /* ... */ />
            <Polls /* ... */ />
            <Signout /* ... */ />
            <Taxes /* ... */ />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
