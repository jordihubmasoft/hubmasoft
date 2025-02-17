// src/pages/Profile.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProfileCard from '../components/ProfileCard';
import EditProfileForm from '../components/EditProfileForm';
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
import useAuthStore from '../../../store/useAuthStore';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  // Espera a que se hidrate el token
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // Estado para la sección activa
  const [activeSection, setActiveSection] = useState<string>('profile');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Funciones simuladas para manejo de formularios
  const handleSaveProfile = (data: any) => {
    console.log('Guardar Perfil:', data);
  };
  const handleChangePassword = () => {
    alert('Funcionalidad para cambiar contraseña');
  };
  const handleSaveFiscalData = (data: any) => {
    console.log('Guardar Datos Fiscales:', data);
  };
  const handleSaveContactData = (data: any) => {
    console.log('Guardar Datos de Contacto:', data);
  };
  const handleAddShippingAddress = (data: any) => {
    console.log('Añadir Dirección de Envío:', data);
  };
  const handlePreferences = (data: any) => {
    console.log('Preferencias guardadas:', data);
  };

  // Definición de las secciones de la página (en orden de aparición)
  const sections = [
    { id: 'profile', label: 'Perfil' },
    { id: 'preferences', label: 'Preferencias' },
    { id: 'documentTemplates', label: 'Plantillas de Documentos' },
    { id: 'paymentMethods', label: 'Formas de Pago' },
    { id: 'taxes', label: 'Impuestos' },
    { id: 'subscription', label: 'Suscripción' },
    { id: 'imports', label: 'Importar' },
    { id: 'polls', label: 'Votar Mejoras' },
    { id: 'account', label: 'Añadir Cuenta' },
  ];

  // Usamos IntersectionObserver para actualizar la sección activa
  useEffect(() => {
    const observerOptions = { threshold: 0.6 };
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
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

  // Desplazamiento suave a una sección
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: '#F3F4F6',
        }}
      >
        <Typography variant="h6" sx={{ color: '#1A1A40' }}>
          Redirigiendo al login...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px' }}>
        {/* Sidebar principal */}
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

        {/* Área de contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            ml: isMenuOpen ? '240px' : '70px',
            mr: { xs: 0, md: '250px' }, // Deja espacio para la nav flotante en pantallas grandes
            transition: 'margin-left 0.3s ease, margin-right 0.3s ease',
            bgcolor: '#F3F4F6',
          }}
        >
          {/* Container que ocupa el ancho completo respetando márgenes */}
          <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
            {/* Navegación vertical flotante (solo en md en adelante) */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'fixed',
                top: '50%',
                right: 24,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.9)',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                p: 2,
                zIndex: 1300,
                backdropFilter: 'blur(8px)',
              }}
            >
              {sections.map((section) => (
                <Box
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  sx={{
                    cursor: 'pointer',
                    my: 0.5,
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    transition: 'background-color 0.3s, transform 0.3s',
                    bgcolor: activeSection === section.id ? 'primary.main' : 'transparent',
                    color: activeSection === section.id ? '#fff' : '#333',
                    '&:hover': {
                      bgcolor: activeSection === section.id ? 'primary.dark' : 'rgba(0,0,0,0.1)',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {section.label}
                </Box>
              ))}
              <Box sx={{ mt: 2 }}>
                <Button
                  onClick={logout}
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' },
                  }}
                >
                  Cerrar Sesión
                </Button>
              </Box>
            </Box>

            {/* Sección Perfil */}
            <Box id="profile" sx={{ mb: 8 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: 'bold' }}>
                Configuración de Perfil
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <ProfileCard
                    onChangePhoto={() => alert('Cambiar foto')}
                    onDeleteAccount={() => logout()}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <EditProfileForm onSave={handleSaveProfile} onChangePassword={handleChangePassword} />
                </Grid>
              </Grid>
              <FiscalDataForm onSave={handleSaveFiscalData} />
              <ContactDataForm onSave={handleSaveContactData} />
              <ShippingAddressForm onAddAddress={handleAddShippingAddress} />
              <Divider sx={{ my: 4 }} />
            </Box>

            {/* Sección Preferencias */}
            <Box id="preferences" sx={{ mb: 8 }}>
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Preferencias
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <PreferencesForm onSave={handlePreferences} />
              </Box>
            </Box>

            {/* Sección Plantillas de Documentos */}
            <Box id="documentTemplates" sx={{ mb: 8 }}>
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <DocumentTemplates />
              </Box>
            </Box>

            {/* Sección Formas de Pago */}
            <Box id="paymentMethods" sx={{ mb: 8 }}>
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <PaymentMethodComponent />
              </Box>
            </Box>

            {/* Sección Impuestos */}
            <Box id="taxes" sx={{ mb: 8, maxWidth: '900px', mx: 'auto' }}>
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <Taxes />
              </Box>
            </Box>

            {/* Sección Suscripción */}
            <Box id="subscription" sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}>
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Suscripción
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Signout />
              </Box>
            </Box>

            {/* Sección Importar */}
            <Box id="imports" sx={{ mb: 8, maxWidth: '900px', mx: 'auto' }}>
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <Imports />
              </Box>
            </Box>

            {/* Sección Votar Mejoras */}
            <Box id="polls" sx={{ mb: 8, maxWidth: '900px', mx: 'auto' }}>
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <Polls />
              </Box>
            </Box>

            {/* Sección Agregar / Cambiar Cuenta */}
            <Box id="account" sx={{ mb: 8, maxWidth: '900px', mx: 'auto' }}>
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Agregar / Cambiar Cuenta
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Signout />
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
