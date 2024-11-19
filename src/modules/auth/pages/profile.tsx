// src/pages/auth/profile.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  Button,
  Card,
  MenuItem,
  TextField,
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

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabChange = (index: number) => {
    if (index === tabs.length - 1) { // Último tab es Cerrar Sesión
      logout();
      return;
    }
    setSelectedTab(index);
  };

  const tabs = [
    'Perfil',
    'Preferencias',
    'Plantillas de Documentos',
    'Formas de Pago',
    'Impuestos',
    'Suscripción',
    'Importar',
    'Votar Mejoras',
    'Añadir Cuenta',
    'Cerrar Sesión',
  ];

  React.useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6">Redirigiendo al login...</Typography>
      </Box>
    );
  }

  // Funciones para manejar formularios
  const handleSaveProfile = (data: any) => {
    // Implementa la lógica para guardar el perfil
    console.log('Guardar Perfil:', data);
  };

  const handleChangePassword = () => {
    // Implementa la lógica para cambiar la contraseña
    alert('Funcionalidad para cambiar contraseña');
  };

  const handleSaveFiscalData = (data: any) => {
    // Implementa la lógica para guardar los datos fiscales
    console.log('Guardar Datos Fiscales:', data);
  };

  const handleSaveContactData = (data: any) => {
    // Implementa la lógica para guardar los datos de contacto
    console.log('Guardar Datos de Contacto:', data);
  };

  const handleAddShippingAddress = (data: any) => {
    // Implementa la lógica para añadir una dirección de envío
    console.log('Añadir Dirección de Envío:', data);
  };
  const handlePreferences = (data: any) => {
    // Implementa la lógica para añadir preferencias
    console.log('Añadir Preferencias', data);
  };
  const handleDocumentTemplates = (data: any) => {
    // Implementa la lógica para añadir plantillas
    console.log('Añadir Plantilla', data);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        {/* Sidebar principal */}
        <Box
          component="nav"
          sx={{
            width: isMenuOpen ? '240px' : '70px',
            flexShrink: 0,
            bgcolor: '#d4d4d9',
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

        {/* Mini Sidebar */}
        <Box
          component="nav"
          sx={{
            width: isMenuOpen ? '240px' : '80px',
            background: 'linear-gradient(180deg, #f9f9fc, #e0e3ea)',
            borderRight: '1px solid rgba(0, 0, 0, 0.15)',
            position: 'fixed',
            left: isMenuOpen ? '260px' : '90px',
            top: '50%',
            transform: 'translateY(-50%)',
            pt: 2,
            pb: 2,
            px: 1.5,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            maxHeight: '80vh',
            transition: 'width 0.3s ease, left 0.3s ease',
            '&:hover': {
              overflowY: 'auto',
            },
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.3)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#B0B3BC',
              borderRadius: 6,
              '&:hover': {
                background: '#9094A1',
              },
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#1A1A40',
              px: 2,
              py: 1,
              mb: 1.5,
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              fontSize: '1.1rem',
              textAlign: isMenuOpen ? 'left' : 'center',
            }}
          >
            {isMenuOpen ? 'Configuración' : '⚙️'}
          </Typography>

          {tabs.map((label, index) => (
            <Button
              key={label}
              onClick={() => handleTabChange(index)}
              sx={{
                justifyContent: isMenuOpen ? 'flex-start' : 'center',
                width: '100%',
                py: 1.5,
                px: isMenuOpen ? 2.5 : 1,
                color: selectedTab === index ? '#FFFFFF' : '#1A1A40',
                bgcolor: selectedTab === index ? '#3A3A8A' : 'transparent',
                textAlign: 'left',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: selectedTab === index ? 'bold' : 'medium',
                transition: 'background-color 0.2s ease, color 0.2s ease',
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  bgcolor: selectedTab === index ? '#3A3A8A' : 'rgba(58, 58, 138, 0.15)',
                  color: selectedTab === index ? '#FFFFFF' : '#1A1A40',
                },
                boxShadow: selectedTab === index ? '0px 4px 6px rgba(58, 58, 138, 0.2)' : 'none',
              }}
            >
              {isMenuOpen && label}
            </Button>
          ))}
        </Box>

        {/* Área de contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            marginLeft: isMenuOpen ? '500px' : '160px',
            transition: 'margin-left 0.3s ease',
            bgcolor: 'transparent',
            borderRadius: 3,
            overflow: 'auto',
            height: 'calc(100vh - 64px)', // Ajusta según la altura del Header
          }}
        >
          <Container maxWidth="lg">
            {selectedTab === 0 && (
              <Box>
                <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: 'bold' }}>
                  Configuración de Perfil
                </Typography>

                <Grid container spacing={3}>
                  {/* Sección Perfil */}
                  <Grid item xs={12} md={4}>
                    <ProfileCard
                      onChangePhoto={() => alert('Cambiar foto')}
                      onDeleteAccount={() => logout()}
                    />
                  </Grid>

                  {/* Sección Editar Perfil */}
                  <Grid item xs={12} md={8}>
                    <EditProfileForm
                      onSave={handleSaveProfile}
                      onChangePassword={handleChangePassword}
                    />
                  </Grid>
                </Grid>

                {/* Sección Datos Fiscales */}
                <FiscalDataForm onSave={handleSaveFiscalData} />

                {/* Sección Datos de Contacto */}
                <ContactDataForm onSave={handleSaveContactData} />

                {/* Sección Dirección de Envío */}
                <ShippingAddressForm onAddAddress={handleAddShippingAddress} />

                {/* Sección Datos de Pago y Suscripción */}
                <Divider sx={{ my: 4 }} />
                <Box sx={{ mt: 5 }}>
                  {/* Implementa otras secciones según sea necesario */}
                  {/* Por ejemplo, Suscripción, Impuestos, etc. */}
                </Box>
              </Box>
            )}

            {/* Implementa las otras pestañas según sea necesario */}
            {selectedTab === 1 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Contenido de Preferencias */}
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Preferencias
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <PreferencesForm onSave={handlePreferences}></PreferencesForm>
                {/* Añade el formulario de preferencias aquí */}
                {/* ... */}
              </Box>
            )}
            {selectedTab === 2 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <DocumentTemplates/>
                {/* Añade el formulario de preferencias aquí */}
                {/* ... */}
              </Box>
            )}

            {selectedTab === 3 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Contenido de Formas de Pago */}
                
                
                <PaymentMethodComponent/>
                {/* Implementa el contenido de Formas de Pago */}
                {/* ... */}
              </Box>
            )}

            {selectedTab === 4 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '900px',
                  margin: '0 auto',
                }}
              >
                {/* Contenido de Impuestos */}
                <Taxes/>
                {/* Implementa el contenido de Impuestos */}
                {/* ... */}
              </Box>
            )}

            {selectedTab === 5 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '800px',
                  margin: '0 auto',
                }}
              >
                {/* Contenido de Suscripción */}
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Suscripción
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {/* Plan Actual */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                    Plan actual:
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#333366' }}>
                    Autónomo básico
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#555',
                      display: 'flex',
                      alignItems: 'center',
                      mt: 1,
                    }}
                  >
                    <span>4,99€</span>
                    <span style={{ marginLeft: '5px', color: '#1A1A40' }}>/mes</span>
                    <Button
                      onClick={() => alert("Redirigiendo a comparar planes...")}
                      sx={{
                        ml: 'auto',
                        color: '#0066cc',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                      }}
                    >
                      Comparar planes
                    </Button>
                  </Typography>
                </Box>

                {/* Extras del Plan */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                    Extras del plan:
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Typography>Plan trabajador 5</Typography>
                      <Typography variant="body2" sx={{ color: '#333366' }}>
                        4,99€/mes
                      </Typography>
                    </Card>
                    <Card
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Typography>Inventario</Typography>
                      <Typography variant="body2" sx={{ color: '#333366' }}>
                        25,00€/mes
                      </Typography>
                    </Card>
                  </Box>
                </Box>

                {/* Información de Pago */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                    Información de pago:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#0066cc',
                      mb: 1,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                    onClick={() => alert("Redirigiendo a ver facturas...")}
                  >
                    Ver facturas
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Próxima factura: 34,98€ - 15/11/2024
                  </Typography>

                  {/* Forma de Pago */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#e0e3ea',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        gap: 2,
                        minWidth: '280px',
                      }}
                    >
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>VISA</Typography>
                        <Typography sx={{ fontSize: '0.9rem' }}>
                          Acabada en 8727 - Expira 08/2029
                        </Typography>
                      </Box>
                      <Button
                        onClick={() => alert("Establecer como predeterminado")}
                        sx={{ color: '#0066cc', fontSize: '0.75rem', ml: 'auto' }}
                      >
                        Predeterminada
                      </Button>
                    </Box>
                    <Button
                      variant="outlined"
                      onClick={() => alert("Añadir nuevo método de pago")}
                      sx={{ color: '#0066cc', borderColor: '#0066cc' }}
                    >
                      Añadir
                    </Button>
                  </Box>
                </Box>

                {/* Dirección de Facturación */}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                    Dirección de facturación:
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {user.name} <br />
                    {user.email} <br />
                    48095109T <br />
                    Avda. Juan Carlos, 103, Vic, 08500, Barcelona <br />
                    España, ES
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => alert("Editar dirección de facturación")}
                    sx={{ color: '#0066cc', borderColor: '#0066cc', mt: 1 }}
                  >
                    Editar
                  </Button>
                </Box>
              </Box>
            )}

            {selectedTab === 6 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '900px',
                  margin: '0 auto',
                }}
              >
                {/* Contenido de Impuestos */}
                <Imports/>
                {/* Implementa el contenido de Impuestos */}
                {/* ... */}
              </Box>
            )}

            {selectedTab === 7 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '900px',
                  margin: '0 auto',
                }}
              >
                {/* Contenido de Impuestos */}
                <Polls/>
                {/* Implementa el contenido de Impuestos */}
                {/* ... */}
              </Box>
            )}
            {selectedTab === 8 && (
              <Box
                sx={{
                  bgcolor: '#F7F9FC',
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '900px',
                  margin: '0 auto',
                }}
              >

                {/* Contenido de Suscripción */}
                <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Agregar / Cambiar Cuenta
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {/* Contenido de Impuestos */}
                <Signout/>
                {/* Implementa el contenido de Impuestos */}
                {/* ... */}
              </Box>
            )}

            {/* Otros tabs pueden ser implementados de manera similar */}

          </Container>

          {/* Modal para añadir método de pago */}
          {openModal && (
            <Box
              onClick={() => setOpenModal(false)}
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1300,
              }}
            >
              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  width: '90%',
                  maxWidth: 600,
                  bgcolor: '#FFFFFF',
                  borderRadius: 3,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  Añadir método de pago manual
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Nombre interno"
                  placeholder="Nombre del método de pago"
                  variant="outlined"
                  sx={{
                    bgcolor: '#F3F4F6',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3d3d3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1A1A40',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1A1A40',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Texto que se muestra en el documento"
                  placeholder="Ejemplo: Pagar por transferencia a..."
                  multiline
                  minRows={3}
                  variant="outlined"
                  sx={{
                    bgcolor: '#F3F4F6',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3d3d3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1A1A40',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1A1A40',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Banco"
                  select
                  placeholder="Seleccionar banco"
                  sx={{
                    bgcolor: '#F3F4F6',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3d3d3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1A1A40',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1A1A40',
                      },
                    },
                  }}
                >
                  <MenuItem value="Banco1">Banco 1</MenuItem>
                  <MenuItem value="Banco2">Banco 2</MenuItem>
                </TextField>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    label="Vencimiento"
                    select
                    fullWidth
                    placeholder="Días de vencimiento"
                    sx={{
                      bgcolor: '#F3F4F6',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1A1A40',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1A1A40',
                        },
                      },
                    }}
                  >
                    <MenuItem value={15}>15 días</MenuItem>
                    <MenuItem value={30}>30 días</MenuItem>
                    <MenuItem value={60}>60 días</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Incluir el IBAN del cliente debajo del texto:
                  </Typography>
                  <TextField
                    type="checkbox"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#d3d3d3',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1A1A40',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1A1A40',
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={() => setOpenModal(false)} sx={{ color: '#555' }}>
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#1A1A40',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      '&:hover': { bgcolor: '#333366' },
                    }}
                    onClick={() => setOpenModal(false)}
                  >
                    Guardar
                  </Button>
                </Box>
              </Box>
          </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
