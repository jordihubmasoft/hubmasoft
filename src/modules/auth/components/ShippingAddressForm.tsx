import React, { useState, useEffect } from 'react';
import { Card, Typography, Grid, TextField, MenuItem, Button, Box } from '@mui/material';
import useAuthStore from '../../../store/useAuthStore';
import ContactService from '../../../services/ContactService';
import { ShippingAddress } from '../../../types/Contact';

const provincias = [
  { value: 'provincia1', label: 'Provincia 1' },
  { value: 'provincia2', label: 'Provincia 2' },
  // Otras provincias…
];

const paises = [
  { value: 'es', label: 'España' },
  { value: 'fr', label: 'Francia' },
  // Otros países…
];

interface ShippingAddressFormProps {
  /**
   * Callback opcional para notificar al padre cuando se guarde la dirección.
   */
  onAddAddress?: (data: ShippingAddress) => void;
  /**
   * Datos iniciales (si ya se han cargado previamente) con la estructura de ShippingAddress.
   */
  initialData?: ShippingAddress;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onAddAddress, initialData }) => {
  const { token, contactId, agentId } = useAuthStore();

  const [formData, setFormData] = useState<ShippingAddress>({
    direccion: initialData?.direccion || '',
    poblacion: initialData?.poblacion || '',
    provincia: initialData?.provincia || '',
    codigoPostal: initialData?.codigoPostal || '',
    pais: initialData?.pais || '',
  });
  const [loading, setLoading] = useState(false);
  const [hasShippingAddress, setHasShippingAddress] = useState(false);

  // 1. GET: Al montar el componente se consulta el contacto para obtener la dirección de envío
  useEffect(() => {
    const fetchShippingAddress = async () => {
      if (!contactId || !token) return;
      setLoading(true);
      try {
        const response = await ContactService.getContactById(contactId, token);
        if (response?.data?.length > 0) {
          const contactData = response.data[0];
          const shipping = contactData.extraInformation?.shippingAddress?.[0];
          if (shipping) {
            setFormData({
              direccion: shipping.direccion || '',
              poblacion: shipping.poblacion || '',
              provincia: shipping.provincia || '',
              codigoPostal: shipping.codigoPostal || '',
              pais: shipping.pais || '',
            });
            setHasShippingAddress(true);
          }
        }
      } catch (error) {
        console.error("Error al obtener la dirección de envío:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingAddress();
  }, [contactId, token]);

  // 2. Actualizamos el estado si llegan nuevos datos desde las props
  useEffect(() => {
    setFormData({
      direccion: initialData?.direccion || '',
      poblacion: initialData?.poblacion || '',
      provincia: initialData?.provincia || '',
      codigoPostal: initialData?.codigoPostal || '',
      pais: initialData?.pais || '',
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 3. PUT/POST: Al enviar el formulario se arma el payload con la información dentro de extraInformation.shippingAddress
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !agentId) {
      console.error('No hay token o agentId, no se puede guardar.');
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        userId: agentId,
        contactId: contactId,
        extraInformation: {
          shippingAddress: [
            {
              direccion: formData.direccion,
              poblacion: formData.poblacion,
              provincia: formData.provincia,
              codigoPostal: formData.codigoPostal,
              pais: formData.pais,
            },
          ],
        },
      };

      let response;
      if (hasShippingAddress) {
        // Actualizamos la dirección existente (PUT)
        response = await ContactService.updateContact(payload, token);
        console.log('Dirección de envío actualizada:', response);
      } else {
        // Creamos la dirección de envío (POST) eliminando contactId del payload
        const { contactId, ...createPayload } = payload;
        response = await ContactService.createContact(createPayload, token);
        console.log('Dirección de envío creada:', response);
        setHasShippingAddress(true);
      }

      if (response?.data) {
        const updatedShipping = response.data.extraInformation?.shippingAddress?.[0];
        if (updatedShipping) {
          setFormData({
            direccion: updatedShipping.direccion || formData.direccion,
            poblacion: updatedShipping.poblacion || formData.poblacion,
            provincia: updatedShipping.provincia || formData.provincia,
            codigoPostal: updatedShipping.codigoPostal || formData.codigoPostal,
            pais: updatedShipping.pais || formData.pais,
          });
          if (onAddAddress) {
            onAddAddress(updatedShipping);
          }
        }
      }
    } catch (error) {
      console.error("Error al guardar la dirección de envío:", error);
      alert("Hubo un problema al guardar la dirección de envío.");
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = hasShippingAddress
    ? 'Añadir Dirección de Envío'
    : 'Añadir Dirección de Envío';

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
        bgcolor: '#FFFFFF',
        p: 3,
        mb: 4,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: 600, mb: 3 }}>
        Dirección de Envío
      </Typography>
      {loading && (
        <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
          Cargando...
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Población"
              variant="outlined"
              name="poblacion"
              value={formData.poblacion}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Provincia"
              variant="outlined"
              name="provincia"
              select
              value={formData.provincia}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            >
              <MenuItem value="">Seleccionar provincia</MenuItem>
              {provincias.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Código Postal"
              variant="outlined"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="País"
              variant="outlined"
              name="pais"
              select
              value={formData.pais}
              onChange={handleChange}
              required
              sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
            >
              <MenuItem value="">Seleccionar país</MenuItem>
              {paises.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            type="submit"
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderColor: '#2666CF',
              color: '#2666CF',
              '&:hover': {
                backgroundColor: 'rgba(38, 102, 207, 0.1)',
                borderColor: '#6A82FB',
              },
            }}
            disabled={loading}
          >
            {buttonLabel}
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default ShippingAddressForm;
