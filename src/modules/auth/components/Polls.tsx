// src/modules/auth/components/Polls.tsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ThumbUp as ThumbUpIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Definición de la interfaz para una propuesta de mejora
interface ImprovementProposal {
  id: number;
  description: string;
  votes: number;
  isFavorite: boolean;
}

// Definición de la interfaz para los datos del formulario de nueva propuesta
interface NewProposalFormData {
  description: string;
}

// Esquema de validación utilizando Yup
const schema = yup.object().shape({
  description: yup
    .string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
});

const Polls: React.FC = () => {
  // Estado para almacenar las propuestas de mejora
  const [proposals, setProposals] = useState<ImprovementProposal[]>([
    {
      id: 1,
      description: 'Agregar una función de exportación de datos en formato CSV.',
      votes: 12,
      isFavorite: false,
    },
    {
      id: 2,
      description: 'Implementar notificaciones en tiempo real para actualizaciones.',
      votes: 8,
      isFavorite: true,
    },
    {
      id: 3,
      description: 'Mejorar la interfaz de usuario para una mejor experiencia.',
      votes: 15,
      isFavorite: false,
    },
  ]);

  // Estado para controlar la apertura del diálogo
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

  // Configuración de react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProposalFormData>({
    
    defaultValues: {
      description: '',
    },
  });

  // Función para manejar el envío del formulario de nueva propuesta
  const onSubmit = (data: NewProposalFormData) => {
    const newProposal: ImprovementProposal = {
      id: proposals.length + 1,
      description: data.description,
      votes: 0,
      isFavorite: false,
    };
    setProposals([newProposal, ...proposals]);
    setSnackbar({
      open: true,
      message: 'Propuesta añadida exitosamente',
      severity: 'success',
    });
    reset();
    setOpenDialog(false);
  };

  // Función para manejar la votación de una propuesta
  const handleVote = (id: number) => {
    setProposals((prevProposals) =>
      prevProposals
        .map((proposal) =>
          proposal.id === id ? { ...proposal, votes: proposal.votes + 1 } : proposal
        )
        .sort((a, b) => b.votes - a.votes) // Reordenar después de votar
    );
    setSnackbar({
      open: true,
      message: 'Has votado por esta mejora',
      severity: 'success',
    });
  };

  // Función para manejar el marcado como favorito
  const handleFavorite = (id: number) => {
    setProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.id === id ? { ...proposal, isFavorite: !proposal.isFavorite } : proposal
      )
    );
    setSnackbar({
      open: true,
      message: 'Has actualizado el estado de favorito',
      severity: 'success',
    });
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
    <Box sx={{ bgcolor: '#F5F5F5', minHeight: '100vh', padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: '700' }}>
        Votar Mejoras
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Botón para agregar nueva propuesta */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            bgcolor: '#1A1A40',
            color: '#FFFFFF',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#333366',
            },
            borderRadius: 2,
            paddingX: 3,
            paddingY: 1.5,
            textTransform: 'none',
          }}
        >
          Agregar Mejora
        </Button>
      </Box>

      {/* Listado de propuestas */}
      <Grid container spacing={3}>
        {proposals.map((proposal) => (
          <Grid item xs={12} md={6} key={proposal.id}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1A1A40', fontWeight: '600' }}>
                  {proposal.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingX: 2,
                  paddingBottom: 2,
                }}
              >
                {/* Contador de votos y botón de votar */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    aria-label="votar"
                    onClick={() => handleVote(proposal.id)}
                    color="primary"
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="body2">{proposal.votes}</Typography>
                </Box>

                {/* Ícono de favorito */}
                <IconButton
                  aria-label="favorito"
                  onClick={() => handleFavorite(proposal.id)}
                  color={proposal.isFavorite ? 'error' : 'default'}
                >
                  {proposal.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo para agregar nueva propuesta */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#1A1A40', color: '#FFFFFF' }}>Agregar Nueva Mejora</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción de la Mejora"
                  placeholder="Describe tu sugerencia..."
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  required
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#555', textTransform: 'none' }}>
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
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

export default Polls;
