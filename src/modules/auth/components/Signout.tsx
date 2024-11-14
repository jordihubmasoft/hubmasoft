// src/modules/auth/components/Signout.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Definición de la interfaz para una cuenta
interface Account {
  id: number;
  email: string;
  phone: string;
}

// Definición de la interfaz para los datos del formulario de nueva cuenta
interface NewAccountFormData {
  email: string;
  phone: string;
}

// Esquema de validación utilizando Yup
const schema = yup.object().shape({
  email: yup.string().email('Debe ser un correo electrónico válido').required('El correo es obligatorio'),
  phone: yup
    .string()
    .matches(/^\d+$/, 'El teléfono solo debe contener números')
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .required('El teléfono es obligatorio'),
});

const Signout: React.FC = () => {
  // Estado para controlar el menú desplegable
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Estado para controlar el diálogo de añadir cuenta
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // Estado para manejar las notificaciones (Snackbar)
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Lista de cuentas sincronizadas (datos mock)
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 1,
      email: 'usuario1@ejemplo.com',
      phone: '1234567890',
    },
    {
      id: 2,
      email: 'usuario2@ejemplo.com',
      phone: '0987654321',
    },
  ]);

  // Cuenta actual (para prellenar el formulario)
  const currentAccount: Account = accounts[0];

  // Configuración de react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewAccountFormData>({
    
    defaultValues: {
      email: currentAccount.email,
      phone: currentAccount.phone,
    },
  });

  // Función para abrir el menú
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Función para abrir el diálogo de añadir cuenta
  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleClose();
  };

  // Función para cerrar el diálogo de añadir cuenta
  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  // Función para manejar el envío del formulario de nueva cuenta
  const onSubmit = (data: NewAccountFormData) => {
    const newAccount: Account = {
      id: accounts.length + 1,
      email: data.email,
      phone: data.phone,
    };
    setAccounts([...accounts, newAccount]);
    setSnackbar({
      open: true,
      message: 'Cuenta añadida exitosamente',
      severity: 'success',
    });
    handleCloseDialog();
  };

  // Función para manejar el cambio de cuenta
  const handleChangeAccount = (account: Account) => {
    // Aquí deberías implementar la lógica para cambiar la cuenta actual
    // Por ejemplo, actualizar el contexto de autenticación
    setSnackbar({
      open: true,
      message: `Cuenta cambiada a ${account.email}`,
      severity: 'success',
    });
    handleClose();
  };

  // Función para cerrar el Snackbar
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      {/* Botón para añadir/cambiar cuenta */}
      <Button
        variant="outlined"
        startIcon={<AccountCircleIcon />}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        sx={{
          borderColor: '#1A1A40',
          color: '#1A1A40',
          textTransform: 'none',
          '&:hover': {
            borderColor: '#333366',
            backgroundColor: '#e3f2fd',
          },
        }}
      >
        Añadir Cuenta / Cambiar Cuenta
      </Button>

      {/* Menú desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* Listado de cuentas sincronizadas */}
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            onClick={() => handleChangeAccount(account)}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {account.email}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Teléfono: {account.phone}
            </Typography>
          </MenuItem>
        ))}

        <Divider />

        {/* Opción para añadir una nueva cuenta */}
        <MenuItem onClick={handleOpenDialog} sx={{ display: 'flex', alignItems: 'center' }}>
          <AddIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Añadir Cuenta" />
        </MenuItem>
      </Menu>

      {/* Diálogo para añadir una nueva cuenta */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#1A1A40', color: '#FFFFFF' }}>Añadir Nueva Cuenta</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            {/* Campo de correo electrónico */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                />
              )}
            />

            {/* Campo de teléfono */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Número de Teléfono"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  required
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#555', textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              bgcolor: '#1A1A40',
              color: '#FFFFFF',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#333366',
              },
              textTransform: 'none',
            }}
          >
            Añadir Cuenta
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

export default Signout;
