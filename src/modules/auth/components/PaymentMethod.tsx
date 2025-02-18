// src/modules/auth/components/PaymentMethod.tsx
import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Definición de la interfaz para un método de pago
interface PaymentMethod {
  id: number;
  internalName: string;
  displayText: string;
  bank?: string;
  includeIBAN: boolean;
  dueDays: number;
}

// Definición de la interfaz para los datos del formulario
interface FormData {
  internalName: string;
  displayText: string;
  bank: string;
  includeIBAN: boolean;
  dueDays: number;
}

// Esquema de validación utilizando Yup
const schema = yup.object().shape({
  internalName: yup.string().required('El nombre interno es obligatorio'),
  displayText: yup.string().required('El texto a mostrar es obligatorio'),
  bank: yup.string().notRequired(),
  includeIBAN: yup.boolean(),
  dueDays: yup
    .number()
    .typeError('Los días de vencimiento deben ser un número')
    .integer('Los días de vencimiento deben ser un número entero')
    .positive('Los días de vencimiento deben ser un número positivo')
    .required('Los días de vencimiento son obligatorios'),
});

// Opciones de bancos predefinidos
const banks = [
  { value: 'Banco1', label: 'Banco 1' },
  { value: 'Banco2', label: 'Banco 2' },
  { value: 'Banco3', label: 'Banco 3' },
];

const PaymentMethodComponent: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [open, setOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      internalName: '',
      displayText: '',
      bank: '',
      includeIBAN: false,
      dueDays: 30,
    },
  });

  // Función para abrir el diálogo de añadir/editar método de pago
  const handleOpen = (method?: PaymentMethod) => {
    if (method) {
      setEditingMethod(method);
      reset({
        internalName: method.internalName,
        displayText: method.displayText,
        bank: method.bank || '',
        includeIBAN: method.includeIBAN,
        dueDays: method.dueDays,
      });
    } else {
      setEditingMethod(null);
      reset({
        internalName: '',
        displayText: '',
        bank: '',
        includeIBAN: false,
        dueDays: 30,
      });
    }
    setOpen(true);
  };

  // Función para cerrar el diálogo
  const handleClose = () => {
    setOpen(false);
    setEditingMethod(null);
    reset({
      internalName: '',
      displayText: '',
      bank: '',
      includeIBAN: false,
      dueDays: 30,
    });
  };

  // Función para eliminar un método de pago
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este método de pago?')) {
      setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
      setSnackbar({
        open: true,
        message: 'Método de pago eliminado exitosamente',
        severity: 'success',
      });
    }
  };

  // Función para manejar el envío del formulario
  const onSubmit = (data: FormData) => {
    if (editingMethod) {
      // Actualizar método de pago existente
      setPaymentMethods(
        paymentMethods.map((method) =>
          method.id === editingMethod.id ? { ...method, ...data } : method
        )
      );
      setSnackbar({
        open: true,
        message: 'Método de pago actualizado exitosamente',
        severity: 'success',
      });
    } else {
      // Añadir nuevo método de pago
      const newMethod: PaymentMethod = {
        id: Date.now(),
        ...data,
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      setSnackbar({
        open: true,
        message: 'Método de pago añadido exitosamente',
        severity: 'success',
      });
    }
    handleClose();
  };

  // Función para manejar la carga del logo (opcional)
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const logoURL = URL.createObjectURL(file);
      setValue('bank', logoURL, { shouldValidate: true });
    }
  };

  // Función para cerrar el snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ mt: 4, px: { xs: 2, sm: 4, md: 6 }, mb: 4 }}>
      {/* Card principal para unificar estilo */}
      <Card
        sx={{
          bgcolor: '#FFFFFF',
          p: 4,
          borderRadius: 3,
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#1A1A40', fontWeight: 600, mb: 3 }}>
          Métodos de Pago
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Botón para añadir nuevo método de pago */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
            sx={{
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
            }}
          >
            Añadir Método de Pago
          </Button>
        </Box>

        {/* Lista de métodos de pago */}
        <Grid container spacing={4}>
          {paymentMethods.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: '#555' }}>
                No hay métodos de pago configurados. Haz clic en "Añadir Método de Pago" para comenzar.
              </Typography>
            </Grid>
          ) : (
            paymentMethods.map((method) => (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <Card
                  sx={{
                    p: 3,
                    bgcolor: '#FFFFFF',
                    borderRadius: 3,
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                      {method.internalName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                      {method.displayText}
                    </Typography>
                    {method.bank && (
                      <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                        Banco: {method.bank}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                      Vencimiento: {method.dueDays} días
                    </Typography>
                    {method.includeIBAN && (
                      <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                        Incluir IBAN del cliente
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <IconButton
                      onClick={() => handleOpen(method)}
                      aria-label="editar método de pago"
                      sx={{
                        bgcolor: '#e3f2fd',
                        '&:hover': {
                          bgcolor: '#bbdefb',
                        },
                        mr: 1,
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(method.id)}
                      aria-label="eliminar método de pago"
                      sx={{
                        bgcolor: '#ffebee',
                        '&:hover': {
                          bgcolor: '#ffcdd2',
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Card>

      {/* Diálogo para añadir/editar método de pago */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#1A1A40', color: '#FFFFFF' }}>
          {editingMethod ? 'Editar Método de Pago' : 'Añadir Método de Pago'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {/* Nombre interno */}
              <Grid item xs={12}>
                <Controller
                  name="internalName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nombre Interno"
                      variant="outlined"
                      error={!!errors.internalName}
                      helperText={errors.internalName?.message}
                      required
                      sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
                    />
                  )}
                />
              </Grid>

              {/* Texto que se muestra en el documento */}
              <Grid item xs={12}>
                <Controller
                  name="displayText"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Texto que se muestra en el documento"
                      variant="outlined"
                      error={!!errors.displayText}
                      helperText={errors.displayText?.message}
                      required
                      multiline
                      rows={3}
                      sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
                    />
                  )}
                />
              </Grid>

              {/* Banco */}
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}>
                  <InputLabel>Banco</InputLabel>
                  <Controller
                    name="bank"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Banco">
                        <MenuItem value="">
                          <em>Ninguno</em>
                        </MenuItem>
                        {banks.map((bank) => (
                          <MenuItem key={bank.value} value={bank.value}>
                            {bank.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Incluir el IBAN */}
              <Grid item xs={12}>
                <Controller
                  name="includeIBAN"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Incluir el IBAN del cliente"
                    />
                  )}
                />
              </Grid>

              {/* Vencimiento */}
              <Grid item xs={12}>
                <Controller
                  name="dueDays"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Vencimiento (días)"
                      variant="outlined"
                      type="number"
                      error={!!errors.dueDays}
                      helperText={errors.dueDays?.message}
                      required
                      inputProps={{ min: 1 }}
                      sx={{ bgcolor: '#F3F4F6', borderRadius: 1 }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} sx={{ color: '#555', textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              bgcolor: '#1A1A40',
              color: '#FFFFFF',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#333366' },
              textTransform: 'none',
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentMethodComponent;
