import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  IconButton,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { SelectChangeEvent } from '@mui/material/Select';

// ▼ Iconos añadidos para las pestañas
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Contact, ShippingAddress, ExtraInformation } from '../../../types/Contact';
import ContactService from '../../../services/ContactService';
import useAuthStore from '../../../store/useAuthStore';

// Función para mapear un contacto del backend al formato local
const mapBackendContactToLocal = (backendContact: any): Contact => {
  return {
    id: backendContact.id ? backendContact.id.toString() : "",
    userId: "",
    nombre: backendContact.name || "",
    email: backendContact.email || "",
    pais: backendContact.country || "",
    poblacion: backendContact.city || "",
    tipoContacto:
      backendContact.contactType === 1
        ? "Cliente"
        : backendContact.contactType === 2
        ? "Proveedor"
        : "",
    telefono: backendContact.phone || "",
    movil: backendContact.phone1 || "",
    sitioWeb: backendContact.website || "",
    direccion: backendContact.address || "",
    codigoPostal: backendContact.postalCode || "",
    nif: backendContact.nie || "",
    nombreComercial: backendContact.commercialName || "",
    provincia: backendContact.province || "",
    identificacionVAT: backendContact.vatIdentification || "",
    tags: backendContact.tags || "",
    idioma: backendContact.extraInformation?.language || "",
    moneda: backendContact.extraInformation?.currency || "",
    formaPago: backendContact.extraInformation?.paymentMethod || "",
    diasVencimiento: backendContact.extraInformation?.paymentExpirationDays || "",
    diaVencimiento: backendContact.extraInformation?.paymentExpirationDay || "",
    tarifa: backendContact.extraInformation?.rate || "",
    descuento: backendContact.extraInformation?.discount || "",
    cuentaCompras: "",
    cuentaPagos: "",
    swift: backendContact.extraInformation?.swift || "",
    iban: backendContact.extraInformation?.iban || "",
    refMandato: "",
    referenciaInterna: backendContact.extraInformation?.internalReference || "",
    comercialAsignado: "",
    tipoIVA: backendContact.extraInformation?.vatType ? [backendContact.extraInformation.vatType] : [],
    informacionAdicional: "",
    skills: backendContact.skills || "",
    experience: backendContact.experience || "",
    companyName: backendContact.companyName || "",
    companySize: backendContact.companySize || "",
    extraInformation: backendContact.extraInformation || {
      contact: '',
      salesTax: 0,
      equivalenceSurcharge: 0,
      shoppingTax: 0,
      paymentDay: 0,
      vatType: '',
      internalReference: '',
      language: '',
      currency: '',
      paymentMethod: '',
      paymentExpirationDays: '',
      paymentExpirationDay: '',
      rate: '',
      discount: '',
      swift: '',
      iban: '',
      shippingAddress: [
        { direccion: '', poblacion: '', codigoPostal: '', provincia: '', pais: '' },
      ],
      id: 0,
      creationDate: '',
      active: true,
      updatingDate: '',
    },
  };
};

const initialFormData: Contact = {
  id: '',
  userId: '',
  nombre: '',
  email: '',
  pais: '',
  poblacion: '',
  tipoContacto: '',
  telefono: '',
  movil: '',
  sitioWeb: '',
  direccion: '',
  codigoPostal: '',
  nif: '',
  nombreComercial: '',
  provincia: '',
  identificacionVAT: '',
  tags: '',
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
  skills: '',
  experience: '',
  companyName: '',
  companySize: '',
  extraInformation: {
    contact: '',
    salesTax: 0,
    equivalenceSurcharge: 0,
    shoppingTax: 0,
    paymentDay: 0,
    vatType: '',
    internalReference: '',
    language: '',
    currency: '',
    paymentMethod: '',
    paymentExpirationDays: '',
    paymentExpirationDay: '',
    rate: '',
    discount: '',
    swift: '',
    iban: '',
    shippingAddress: [
      { direccion: '', poblacion: '', codigoPostal: '', provincia: '', pais: '' },
    ],
    id: 0,
    creationDate: '',
    active: true,
    updatingDate: '',
  },
};

interface ContactFormProps {
  open: boolean;
  handleClose: () => void;
  contact: Contact | null;
  handleSave: (contact: Contact) => Promise<void>;
  onLinkContact?: (contactId: string) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  open,
  handleClose,
  contact,
  handleSave,
  onLinkContact,
}) => {
  const token = useAuthStore((state) => state.token);
  const [formData, setFormData] = useState<Contact>(initialFormData);
  const [errors, setErrors] = useState<Partial<
    Record<keyof Contact | keyof ExtraInformation, string>
  >>({});

  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [suggestions, setSuggestions] = useState<Contact[]>([]);
  const [nombreInput, setNombreInput] = useState<string>(formData.nombre);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (contact) {
      setFormData(contact);
      setNombreInput(contact.nombre);
    } else {
      setFormData(initialFormData);
      setNombreInput('');
    }
    setIsAutoFilled(false);
    setActiveTab(0);
  }, [contact, open]);

  // Búsqueda con debounce en el campo "Nombre"
  useEffect(() => {
    if (nombreInput) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        if (token) {
          ContactService.getContactsWithFiltersV2({ text: nombreInput }, token)
            .then((response) => {
              if (response && response.data) {
                const mappedSuggestions = response.data.map((c: any) =>
                  mapBackendContactToLocal(c)
                );
                setSuggestions(mappedSuggestions);
              }
            })
            .catch((error) => {
              console.error('Error fetching suggestions:', error);
              setSuggestions([]);
            });
        }
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [nombreInput, token]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (!name) return;

    // Si se edita "nombre" a mano, se desactiva el autorrelleno
    if (name === 'nombre' && isAutoFilled) {
      setIsAutoFilled(false);
    }

    if (name.startsWith('extraInformation.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        extraInformation: {
          ...prev.extraInformation!,
          [field]: value,
        },
      }));
      setErrors((prev) => ({ ...prev, [field]: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (!name) return;

    if (name.startsWith('extraInformation.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        extraInformation: {
          ...prev.extraInformation!,
          [field]: value,
        },
      }));
      setErrors((prev) => ({ ...prev, [field]: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSuggestionSelect = (event: any, value: Contact | null) => {
    if (value) {
      setFormData(value);
      setNombreInput(value.nombre);
      setIsAutoFilled(true);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<
      Record<keyof Contact | keyof ExtraInformation, string>
    > = {};
    // Aquí podrías agregar tus validaciones
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        if (isAutoFilled && formData.id) {
          // Si viene de la selección de sugerencia
          if (onLinkContact) {
            await onLinkContact(formData.id);
          }
        } else {
          // Si se crea/actualiza manualmente
          await handleSave(formData);
        }
        handleClose();
        setFormData(initialFormData);
        setErrors({});
      } catch (error) {
        console.error('Error al guardar el contacto:', error);
      }
    }
  };

  // Manejo de direcciones de envío
  const addShippingAddress = () => {
    setFormData((prev) => ({
      ...prev,
      extraInformation: {
        ...prev.extraInformation!,
        shippingAddress: [
          ...prev.extraInformation!.shippingAddress,
          { direccion: '', poblacion: '', codigoPostal: '', provincia: '', pais: '' },
        ],
      },
    }));
  };

  const removeShippingAddress = (index: number) => {
    const updatedAddresses = [...formData.extraInformation!.shippingAddress];
    updatedAddresses.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      extraInformation: {
        ...prev.extraInformation!,
        shippingAddress: updatedAddresses,
      },
    }));
  };

  const handleShippingChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    if (!name) return;
    const updatedAddresses = [...formData.extraInformation!.shippingAddress];
    updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
    setFormData((prev) => ({
      ...prev,
      extraInformation: {
        ...prev.extraInformation!,
        shippingAddress: updatedAddresses,
      },
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      // ▼ Pequeño extra de estilo en el contenedor principal del Dialog
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 3,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.4rem',
          bgcolor: '#f5f7fa',
          color: '#1A1A40',
          borderBottom: '1px solid #ddd',
        }}
      >
        {contact ? 'Editar Contacto' : 'Nuevo contacto'}
      </DialogTitle>

      {/* Encabezado: Nombre, NIF y toggle de Empresa/Persona */}
      <Box sx={{ px: 3, mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              freeSolo
              disabled={isAutoFilled}
              options={suggestions}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.nombre
              }
              onChange={handleSuggestionSelect}
              inputValue={nombreInput}
              onInputChange={(event, newInputValue) => {
                setNombreInput(newInputValue);
                handleInputChange({
                  target: { name: 'nombre', value: newInputValue },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              // ▼ *** Aquí es donde mejoramos la interfaz de la lista ***
              ListboxProps={{
                sx: {
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  py: 1,
                  // Estilo para cada opción en la lista
                  '& .MuiAutocomplete-option': {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: '#f0f4ff',
                    },
                  },
                },
              }}
              // rendereamos cada opción con un layout más vistoso
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {option.nombre}
                  </Typography>
                  {/* Si quieres mostrar algo más, por ejemplo el email */}
                  {option.nif && (
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {option.nif}
                    </Typography>
                  )}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nombre"
                  margin="dense"
                  fullWidth
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre}
                  // ▼ Extras de estilo y placeholder
                  placeholder="Ej. Juan Pérez"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="NIF del contacto"
              name="nif"
              fullWidth
              variant="outlined"
              value={formData.nif}
              onChange={handleInputChange}
              error={Boolean(errors.nif)}
              helperText={errors.nif}
              disabled={isAutoFilled}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Toggle "Empresa" o "Persona" */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
            Este contacto es...
          </Typography>
          <RadioGroup
            row
            value={
              formData.tipoContacto === 'Proveedor' || formData.tipoContacto === 'Empresa'
                ? 'Empresa'
                : 'Persona'
            }
            onChange={(e) => {
              const val = e.target.value;
              setFormData((prev) => ({
                ...prev,
                tipoContacto: val === 'Empresa' ? 'Proveedor' : 'Cliente',
              }));
            }}
          >
            <FormControlLabel
              value="Empresa"
              control={<Radio color="primary" />}
              label="Empresa"
            />
            <FormControlLabel
              value="Persona"
              control={<Radio color="primary" />}
              label="Persona"
            />
          </RadioGroup>
        </Box>
      </Box>

      {/* ▼ Se agregan iconos a las Tab para hacerlo más visual */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: 'divider', mt: 2, px: 3 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab icon={<PersonIcon />} label="Básico" />
        <Tab icon={<LocalShippingIcon />} label="Dirección de Envío" />
        <Tab icon={<InfoIcon />} label="Información Extra" />
        <Tab icon={<AddCircleOutlineIcon />} label="Adicional" />
      </Tabs>

      <DialogContent dividers sx={{ minHeight: 400, p: 3, bgcolor: '#f8f9fb' }}>
        {/* Pestaña 0: Básico */}
        {activeTab === 0 && (
          // ▼ Envolvemos el contenido en Paper para darle una apariencia "tarjeta"
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Dirección"
                  name="direccion"
                  fullWidth
                  variant="outlined"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  error={Boolean(errors.direccion)}
                  helperText={errors.direccion}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  margin="dense"
                  label="Cód. Postal"
                  name="codigoPostal"
                  fullWidth
                  variant="outlined"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                  error={Boolean(errors.codigoPostal)}
                  helperText={errors.codigoPostal}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  margin="dense"
                  label="Población"
                  name="poblacion"
                  fullWidth
                  variant="outlined"
                  value={formData.poblacion}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(errors.provincia)} margin="dense">
                  <InputLabel>Provincia</InputLabel>
                  <Select
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleSelectChange}
                    label="Provincia"
                    disabled={isAutoFilled}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="Madrid">Madrid</MenuItem>
                    <MenuItem value="Barcelona">Barcelona</MenuItem>
                  </Select>
                  {errors.provincia && <FormHelperText>{errors.provincia}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(errors.pais)} margin="dense">
                  <InputLabel>País</InputLabel>
                  <Select
                    name="pais"
                    value={formData.pais}
                    onChange={handleSelectChange}
                    label="País"
                    disabled={isAutoFilled}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="España">España</MenuItem>
                    <MenuItem value="Portugal">Portugal</MenuItem>
                  </Select>
                  {errors.pais && <FormHelperText>{errors.pais}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Nombre Comercial"
                  name="nombreComercial"
                  fullWidth
                  variant="outlined"
                  value={formData.nombreComercial}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Identificación VAT"
                  name="identificacionVAT"
                  fullWidth
                  variant="outlined"
                  value={formData.identificacionVAT}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Email"
                  name="email"
                  fullWidth
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  label="Teléfono"
                  name="telefono"
                  fullWidth
                  variant="outlined"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  type="tel"
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  label="Móvil"
                  name="movil"
                  fullWidth
                  variant="outlined"
                  value={formData.movil}
                  onChange={handleInputChange}
                  type="tel"
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Website"
                  name="sitioWeb"
                  fullWidth
                  variant="outlined"
                  value={formData.sitioWeb}
                  onChange={handleInputChange}
                  type="url"
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  margin="dense"
                  label="Tags"
                  name="tags"
                  fullWidth
                  variant="outlined"
                  value={formData.tags}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Tipo de contacto</InputLabel>
                  <Select
                    name="tipoContacto"
                    value={formData.tipoContacto}
                    onChange={handleSelectChange}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="">Sin especificar</MenuItem>
                    <MenuItem value="Cliente">Cliente</MenuItem>
                    <MenuItem value="Proveedor">Proveedor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Pestaña 1: Dirección de Envío */}
        {activeTab === 1 && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
              Direcciones de Envío
            </Typography>
            {formData.extraInformation?.shippingAddress.map((address, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Dirección"
                    name="direccion"
                    value={address.direccion}
                    onChange={(e) => handleShippingChange(index, e)}
                    fullWidth
                    disabled={isAutoFilled}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Población"
                    name="poblacion"
                    value={address.poblacion}
                    onChange={(e) => handleShippingChange(index, e)}
                    fullWidth
                    disabled={isAutoFilled}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Código Postal"
                    name="codigoPostal"
                    value={address.codigoPostal}
                    onChange={(e) => handleShippingChange(index, e)}
                    fullWidth
                    disabled={isAutoFilled}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Provincia</InputLabel>
                    <Select
                      name="provincia"
                      value={address.provincia}
                      onChange={(e) => handleShippingChange(index, e)}
                      disabled={isAutoFilled}
                      label="Provincia"
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderRadius: 2,
                        },
                      }}
                    >
                      <MenuItem value="Madrid">Madrid</MenuItem>
                      <MenuItem value="Barcelona">Barcelona</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>País</InputLabel>
                    <Select
                      name="pais"
                      value={address.pais}
                      onChange={(e) => handleShippingChange(index, e)}
                      disabled={isAutoFilled}
                      label="País"
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderRadius: 2,
                        },
                      }}
                    >
                      <MenuItem value="España">España</MenuItem>
                      <MenuItem value="Portugal">Portugal</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    color="secondary"
                    onClick={() => removeShippingAddress(index)}
                    disabled={
                      formData.extraInformation?.shippingAddress.length === 1 ||
                      isAutoFilled
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={addShippingAddress}
                    disabled={isAutoFilled}
                    sx={{ ml: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Paper>
        )}

        {/* Pestaña 2: Información Extra */}
        {activeTab === 2 && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
              Datos Fiscales / Extra
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Tipo de IVA</InputLabel>
                  <Select
                    name="extraInformation.vatType"
                    value={formData.extraInformation?.vatType || ''}
                    onChange={handleSelectChange}
                    disabled={isAutoFilled}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="IVA 1">IVA 1</MenuItem>
                    <MenuItem value="IVA 2">IVA 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Idioma</InputLabel>
                  <Select
                    name="extraInformation.language"
                    value={formData.extraInformation?.language || ''}
                    onChange={handleSelectChange}
                    disabled={isAutoFilled}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="Español">Español</MenuItem>
                    <MenuItem value="Inglés">Inglés</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Moneda</InputLabel>
                  <Select
                    name="extraInformation.currency"
                    value={formData.extraInformation?.currency || ''}
                    onChange={handleSelectChange}
                    disabled={isAutoFilled}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Método de Pago</InputLabel>
                  <Select
                    name="extraInformation.paymentMethod"
                    value={formData.extraInformation?.paymentMethod || ''}
                    onChange={handleSelectChange}
                    disabled={isAutoFilled}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="Transferencia">Transferencia</MenuItem>
                    <MenuItem value="Domiciliación Bancaria">Domiciliación Bancaria</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  label="Día de Pago"
                  name="extraInformation.paymentDay"
                  fullWidth
                  variant="outlined"
                  value={formData.extraInformation?.paymentDay || ''}
                  onChange={handleInputChange}
                  type="number"
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  label="Días de Vencimiento"
                  name="extraInformation.paymentExpirationDays"
                  fullWidth
                  variant="outlined"
                  value={formData.extraInformation?.paymentExpirationDays || ''}
                  onChange={handleInputChange}
                  type="number"
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  label="Día de Vencimiento"
                  name="extraInformation.paymentExpirationDay"
                  fullWidth
                  variant="outlined"
                  value={formData.extraInformation?.paymentExpirationDay || ''}
                  onChange={handleInputChange}
                  type="number"
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  label="Tasa"
                  name="extraInformation.rate"
                  fullWidth
                  variant="outlined"
                  value={formData.extraInformation?.rate || ''}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Descuento"
                  name="extraInformation.discount"
                  fullWidth
                  variant="outlined"
                  value={formData.extraInformation?.discount || ''}
                  onChange={handleInputChange}
                  type="number"
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Referencia Interna"
                  name="extraInformation.internalReference"
                  fullWidth
                  variant="outlined"
                  value={formData.extraInformation?.internalReference || ''}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Swift"
                  name="extraInformation.swift"
                  fullWidth
                  variant="outlined"
                  value={formData.extraInformation?.swift || ''}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="IBAN"
                  name="extraInformation.iban"
                  fullWidth
                  variant="outlined"
                  value={formData.extraInformation?.iban || ''}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Pestaña 3: Información Adicional */}
        {activeTab === 3 && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
              Información Adicional
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Habilidades"
                  name="skills"
                  fullWidth
                  variant="outlined"
                  value={formData.skills || ''}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Experiencia"
                  name="experience"
                  fullWidth
                  variant="outlined"
                  value={formData.experience || ''}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Nombre de la Empresa"
                  name="companyName"
                  fullWidth
                  variant="outlined"
                  value={formData.companyName || ''}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Tamaño de la Empresa"
                  name="companySize"
                  fullWidth
                  variant="outlined"
                  value={formData.companySize || ''}
                  onChange={handleInputChange}
                  disabled={isAutoFilled}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: '#f5f7fa', borderTop: '1px solid #ddd' }}>
        <Button
          onClick={handleClose}
          sx={{
            color: '#2666CF',
            fontWeight: 600,
            textTransform: 'none',
            bgcolor: '#ffffff',
            border: '1px solid #2666CF',
            borderRadius: 2,
            boxShadow: 'none',
            mr: 1,
            '&:hover': {
              bgcolor: '#f0f4ff',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            color: '#ffffff',
            fontWeight: 600,
            textTransform: 'none',
            bgcolor: '#2666CF',
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#1a4a9f',
            },
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactForm;
