// components/ContactForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { SelectChangeEvent } from '@mui/material/Select';
import { Contact, ShippingAddress, ExtraInformation } from '../../../types/Contact';
import ContactService from '../../../services/ContactService';
import useAuthStore from '../../../store/useAuthStore';

// Objeto inicial usando los nombres en español
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
}

const ContactForm: React.FC<ContactFormProps> = ({ open, handleClose, contact, handleSave }) => {
  const token = useAuthStore((state) => state.token);
  const [formData, setFormData] = useState<Contact>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof Contact | keyof ExtraInformation, string>>>({});
  
  // Estado para controlar si el formulario fue autorrellenado
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  // Estados para el Autocomplete en el campo "Nombre"
  const [suggestions, setSuggestions] = useState<Contact[]>([]);
  const [nombreInput, setNombreInput] = useState<string>(formData.nombre);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (contact) {
      setFormData(contact);
      setNombreInput(contact.nombre);
    } else {
      setFormData(initialFormData);
      setNombreInput('');
    }
    // Si se abre el formulario de nuevo, se resetea el estado de autorrelleno
    setIsAutoFilled(false);
  }, [contact, open]);

  // Efecto para buscar sugerencias cuando se escribe en "Nombre" (debounce de 300ms)
  useEffect(() => {
    if (nombreInput) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        if (token) {
          // Se asume que el endpoint espera { searchTerm: string }
          ContactService.getContactsWithFiltersV2({ text: nombreInput }, token)
            .then((response) => {
              if (response && response.data) {
                console.log('Sugerencias recibidas:', response.data);
                setSuggestions(response.data);
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

  // Actualiza el formulario al escribir (incluyendo el campo "nombre")
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (!name) return;
    // Si se trata del campo "nombre" y el usuario intenta editar manualmente,
    // se deshabilita el modo autorrellenado para permitir la edición
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

  const handleMultipleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;
    if (!name) return;
    if (name.startsWith('extraInformation.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        extraInformation: {
          ...prev.extraInformation!,
          [field]: value as string[],
        },
      }));
      setErrors((prev) => ({ ...prev, [field]: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value as string[] }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

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

  // Al seleccionar una sugerencia, se completan otros campos del formulario
  // y se bloquea la edición
  const handleSuggestionSelect = (event: any, value: Contact | null) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        ...value,
      }));
      setNombreInput(value.nombre);
      setIsAutoFilled(true);
    }
  };

  // Validación adaptada a las claves en español
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Contact | keyof ExtraInformation, string>> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'Este campo es obligatorio';
    if (!formData.nif.trim()) newErrors.nif = 'Este campo es obligatorio';
    if (!formData.direccion.trim()) newErrors.direccion = 'Este campo es obligatorio';
    if (!formData.codigoPostal.trim()) newErrors.codigoPostal = 'Este campo es obligatorio';
    if (!formData.provincia.trim()) newErrors.provincia = 'Este campo es obligatorio';
    if (!formData.pais.trim()) newErrors.pais = 'Este campo es obligatorio';
    const extra = formData.extraInformation!;
    if (!extra.vatType.trim()) newErrors.vatType = 'Este campo es obligatorio';
    if (!extra.language.trim()) newErrors.language = 'Este campo es obligatorio';
    if (!extra.currency.trim()) newErrors.currency = 'Este campo es obligatorio';
    if (!extra.paymentMethod.trim()) newErrors.paymentMethod = 'Este campo es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await handleSave(formData);
        handleClose();
        setFormData(initialFormData);
        setErrors({});
      } catch (error) {
        console.error('Error al guardar el contacto:', error);
      }
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

        {/* Información Principal */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Información Principal
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* Campo "Nombre" con Autocomplete */}
            <Autocomplete
              freeSolo
              disabled={isAutoFilled} // Se deshabilita si se autorrellena
              options={suggestions}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.nombre
              }
              onChange={handleSuggestionSelect}
              inputValue={nombreInput}
              onInputChange={(event, newInputValue) => {
                setNombreInput(newInputValue);
                // Se actualiza el campo "nombre" en el formulario
                handleInputChange({
                  target: { name: 'nombre', value: newInputValue },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nombre"
                  margin="dense"
                  fullWidth
                  disabled={isAutoFilled}
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre}
                />
              )}
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
              onChange={handleInputChange}
              disabled={isAutoFilled}
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
              onChange={handleInputChange}
              error={Boolean(errors.nif)}
              helperText={errors.nif}
              disabled={isAutoFilled}
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
              onChange={handleInputChange}
              error={Boolean(errors.direccion)}
              helperText={errors.direccion}
              disabled={isAutoFilled}
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
              onChange={handleInputChange}
              error={Boolean(errors.codigoPostal)}
              helperText={errors.codigoPostal}
              disabled={isAutoFilled}
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
              onChange={handleInputChange}
              disabled={isAutoFilled}
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
              >
                <MenuItem value="España">España</MenuItem>
                <MenuItem value="Portugal">Portugal</MenuItem>
              </Select>
              {errors.pais && <FormHelperText>{errors.pais}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>

        {/* Información de Contacto */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Información de Contacto
        </Typography>
        <Grid container spacing={2}>
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
              onChange={handleInputChange}
              type="tel"
              disabled={isAutoFilled}
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
              onChange={handleInputChange}
              type="tel"
              disabled={isAutoFilled}
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
              onChange={handleInputChange}
              type="url"
              disabled={isAutoFilled}
            />
          </Grid>
        </Grid>

        {/* Información Adicional */}
        <Typography variant="h6" sx={{ mt: 3 }}>
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
            />
          </Grid>
        </Grid>

        {/* Información Extra */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Información Extra
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.vatType)} margin="dense">
              <InputLabel>Tipo de IVA</InputLabel>
              <Select
                name="extraInformation.vatType"
                value={formData.extraInformation?.vatType || ''}
                onChange={handleSelectChange}
                label="Tipo de IVA"
                disabled={isAutoFilled}
              >
                <MenuItem value="IVA 1">IVA 1</MenuItem>
                <MenuItem value="IVA 2">IVA 2</MenuItem>
              </Select>
              {errors.vatType && <FormHelperText>{errors.vatType}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.language)} margin="dense">
              <InputLabel>Idioma</InputLabel>
              <Select
                name="extraInformation.language"
                value={formData.extraInformation?.language || ''}
                onChange={handleSelectChange}
                label="Idioma"
                disabled={isAutoFilled}
              >
                <MenuItem value="Español">Español</MenuItem>
                <MenuItem value="Inglés">Inglés</MenuItem>
              </Select>
              {errors.language && <FormHelperText>{errors.language}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.currency)} margin="dense">
              <InputLabel>Moneda</InputLabel>
              <Select
                name="extraInformation.currency"
                value={formData.extraInformation?.currency || ''}
                onChange={handleSelectChange}
                label="Moneda"
                disabled={isAutoFilled}
              >
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
              {errors.currency && <FormHelperText>{errors.currency}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.paymentMethod)} margin="dense">
              <InputLabel>Método de Pago</InputLabel>
              <Select
                name="extraInformation.paymentMethod"
                value={formData.extraInformation?.paymentMethod || ''}
                onChange={handleSelectChange}
                label="Método de Pago"
                disabled={isAutoFilled}
              >
                <MenuItem value="Transferencia">Transferencia</MenuItem>
                <MenuItem value="Domiciliación Bancaria">Domiciliación Bancaria</MenuItem>
              </Select>
              {errors.paymentMethod && <FormHelperText>{errors.paymentMethod}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Tasa"
              name="extraInformation.rate"
              fullWidth
              variant="outlined"
              value={formData.extraInformation?.rate || ''}
              onChange={handleInputChange}
              disabled={isAutoFilled}
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
            />
          </Grid>
        </Grid>

        {/* Dirección de Envío */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Dirección de Envío
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código Postal"
                name="codigoPostal"
                value={address.codigoPostal}
                onChange={(e) => handleShippingChange(index, e)}
                fullWidth
                disabled={isAutoFilled}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Provincia</InputLabel>
                <Select
                  name="provincia"
                  value={address.provincia}
                  onChange={(e) => handleShippingChange(index, e)}
                  label="Provincia"
                  disabled={isAutoFilled}
                >
                  <MenuItem value="Madrid">Madrid</MenuItem>
                  <MenuItem value="Barcelona">Barcelona</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>País</InputLabel>
                <Select
                  name="pais"
                  value={address.pais}
                  onChange={(e) => handleShippingChange(index, e)}
                  label="País"
                  disabled={isAutoFilled}
                >
                  <MenuItem value="España">España</MenuItem>
                  <MenuItem value="Portugal">Portugal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="secondary"
                onClick={() => removeShippingAddress(index)}
                disabled={formData.extraInformation?.shippingAddress.length === 1 || isAutoFilled}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton color="primary" onClick={addShippingAddress} disabled={isAutoFilled}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
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
};

export default ContactForm;
