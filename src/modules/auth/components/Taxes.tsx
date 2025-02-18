// src/modules/auth/components/Taxes.tsx
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Interfaz para un impuesto
interface Tax {
  id: number;
  name: string;
  key: string;
  scope: string;
  type: 'percentage' | 'fixed';
  amount: number;
  account: string;
  group: string;
  isActive: boolean;
  showInDocuments: boolean;
}

// Interfaz para los datos del formulario
interface FormData {
  name: string;
  key: string;
  scope: string;
  type: 'percentage' | 'fixed';
  amount: number;
  account: string;
  group: string;
  isActive: boolean;
  showInDocuments: boolean;
}

// Esquema de validación utilizando Yup
const schema = yup.object().shape({
  name: yup.string().required('El nombre del impuesto es obligatorio'),
  key: yup.string().required('La clave del impuesto es obligatoria'),
  scope: yup.string().required('El ámbito es obligatorio'),
  type: yup.string().oneOf(['percentage', 'fixed']).required('El tipo es obligatorio'),
  amount: yup
    .number()
    .typeError('El importe debe ser un número')
    .positive('El importe debe ser positivo')
    .required('El importe es obligatorio'),
  account: yup.string().required('La cuenta es obligatoria'),
  group: yup.string().required('El grupo es obligatorio'),
  isActive: yup.boolean(),
  showInDocuments: yup.boolean(),
});

// Opciones de ámbitos predefinidos
const scopes = [
  { value: 'Ventas', label: 'Ventas' },
  { value: 'Compras', label: 'Compras' },
  { value: 'Servicios', label: 'Servicios' },
];

// Opciones de grupos de impuestos predefinidos
const taxGroups = [
  { value: 'IVA', label: 'IVA' },
  { value: 'Retención', label: 'Retención' },
  { value: 'Otros', label: 'Otros' },
];

// Opciones de cuentas contables predefinidas
const accounts = [
  { value: 'Cuenta1', label: 'Cuenta 1' },
  { value: 'Cuenta2', label: 'Cuenta 2' },
  { value: 'Cuenta3', label: 'Cuenta 3' },
];

const Taxes: React.FC = () => {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTax, setEditingTax] = useState<Tax | null>(null);
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
      name: '',
      key: '',
      scope: '',
      type: 'percentage',
      amount: 0,
      account: '',
      group: '',
      isActive: true,
      showInDocuments: true,
    },
  });

  // Función para abrir el diálogo de añadir/editar impuesto
  const handleOpen = (tax?: Tax) => {
    if (tax) {
      setEditingTax(tax);
      reset({
        name: tax.name,
        key: tax.key,
        scope: tax.scope,
        type: tax.type,
        amount: tax.amount,
        account: tax.account,
        group: tax.group,
        isActive: tax.isActive,
        showInDocuments: tax.showInDocuments,
      });
    } else {
      setEditingTax(null);
      reset({
        name: '',
        key: '',
        scope: '',
        type: 'percentage',
        amount: 0,
        account: '',
        group: '',
        isActive: true,
        showInDocuments: true,
      });
    }
    setOpen(true);
  };

  // Función para cerrar el diálogo
  const handleClose = () => {
    setOpen(false);
    setEditingTax(null);
    reset({
      name: '',
      key: '',
      scope: '',
      type: 'percentage',
      amount: 0,
      account: '',
      group: '',
      isActive: true,
      showInDocuments: true,
    });
  };

  // Función para eliminar un impuesto
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este impuesto?')) {
      setTaxes(taxes.filter((tax) => tax.id !== id));
      setSnackbar({
        open: true,
        message: 'Impuesto eliminado exitosamente',
        severity: 'success',
      });
    }
  };

  // Función para manejar el envío del formulario
  const onSubmit = (data: FormData) => {
    if (editingTax) {
      // Actualizar impuesto existente
      setTaxes(
        taxes.map((tax) =>
          tax.id === editingTax.id ? { ...tax, ...data } : tax
        )
      );
      setSnackbar({
        open: true,
        message: 'Impuesto actualizado exitosamente',
        severity: 'success',
      });
    } else {
      // Añadir nuevo impuesto
      const newTax: Tax = {
        id: Date.now(),
        ...data,
      };
      setTaxes([...taxes, newTax]);
      setSnackbar({
        open: true,
        message: 'Impuesto añadido exitosamente',
        severity: 'success',
      });
    }
    handleClose();
  };

  // Función para cerrar el Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ mt: 4, px: { xs: 2, sm: 4, md: 6 }, mb: 4 }}>
      {/* Envolvemos el contenido en una Card para unificar estilos */}
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
        <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: 700 }}>
          Gestión de Impuestos
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Botón para añadir nuevo impuesto */}
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
            Añadir Impuesto
          </Button>
        </Box>

        {/* Tabla de impuestos existentes */}
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Valor</strong></TableCell>
                <TableCell><strong>Ámbito</strong></TableCell>
                <TableCell><strong>Grupo</strong></TableCell>
                <TableCell><strong>Cuenta</strong></TableCell>
                <TableCell align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No hay impuestos configurados. Haz clic en "Añadir Impuesto" para comenzar.
                  </TableCell>
                </TableRow>
              ) : (
                taxes.map((tax) => (
                  <TableRow key={tax.id}>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                        {tax.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        Clave: {tax.key}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {tax.type === 'percentage' ? `${tax.amount}%` : `$${tax.amount.toFixed(2)}`}
                    </TableCell>
                    <TableCell>{tax.scope}</TableCell>
                    <TableCell>{tax.group}</TableCell>
                    <TableCell>{tax.account}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpen(tax)}
                        aria-label="editar impuesto"
                        sx={{
                          bgcolor: '#e3f2fd',
                          '&:hover': { bgcolor: '#bbdefb' },
                          mr: 1,
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(tax.id)}
                        aria-label="eliminar impuesto"
                        sx={{
                          bgcolor: '#ffebee',
                          '&:hover': { bgcolor: '#ffcdd2' },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Diálogo para añadir/editar impuesto */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ bgcolor: '#1A1A40', color: '#FFFFFF' }}>
            {editingTax ? 'Editar Impuesto' : 'Añadir Impuesto'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {/* Nombre */}
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Nombre del Impuesto"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        required
                      />
                    )}
                  />
                </Grid>
                {/* Clave */}
                <Grid item xs={12}>
                  <Controller
                    name="key"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Clave del Impuesto"
                        variant="outlined"
                        error={!!errors.key}
                        helperText={errors.key?.message}
                        required
                      />
                    )}
                  />
                </Grid>
                {/* Ámbito */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel>Ámbito</InputLabel>
                    <Controller
                      name="scope"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Ámbito" error={!!errors.scope}>
                          {scopes.map((scope) => (
                            <MenuItem key={scope.value} value={scope.value}>
                              {scope.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.scope && (
                      <Typography variant="body2" color="error">
                        {errors.scope.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                {/* Tipo */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel>Tipo</InputLabel>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Tipo" error={!!errors.type}>
                          <MenuItem value="percentage">Porcentaje</MenuItem>
                          <MenuItem value="fixed">Valor Fijo</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.type && (
                      <Typography variant="body2" color="error">
                        {errors.type.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                {/* Importe */}
                <Grid item xs={12}>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={field.value > 0 ? 'Porcentaje (%)' : 'Valor Fijo ($)'}
                        variant="outlined"
                        type="number"
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        required
                        inputProps={{ min: 0, step: 0.01 }}
                      />
                    )}
                  />
                </Grid>
                {/* Cuenta de impuestos */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel>Cuenta de Impuestos</InputLabel>
                    <Controller
                      name="account"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Cuenta de Impuestos" error={!!errors.account}>
                          {accounts.map((account) => (
                            <MenuItem key={account.value} value={account.value}>
                              {account.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.account && (
                      <Typography variant="body2" color="error">
                        {errors.account.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                {/* Grupo de impuestos */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel>Grupo de Impuestos</InputLabel>
                    <Controller
                      name="group"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Grupo de Impuestos" error={!!errors.group}>
                          {taxGroups.map((group) => (
                            <MenuItem key={group.value} value={group.value}>
                              {group.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.group && (
                      <Typography variant="body2" color="error">
                        {errors.group.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                {/* Impuesto activo */}
                <Grid item xs={12}>
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Impuesto Activo"
                      />
                    )}
                  />
                </Grid>
                {/* Mostrar en documentos */}
                <Grid item xs={12}>
                  <Controller
                    name="showInDocuments"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Mostrar este impuesto al crear documentos"
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
                background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                color: '#FFFFFF',
                fontWeight: 'bold',
                '&:hover': { background: 'linear-gradient(90deg, #6A82FB, #2666CF)' },
                textTransform: 'none',
              }}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Card>

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

export default Taxes;
