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

// Interfaz para una propuesta de mejora
interface ImprovementProposal {
  id: number;
  description: string;
  votes: number;
  isFavorite: boolean;
}

// Interfaz para los datos del formulario de nueva propuesta
interface NewProposalFormData {
  description: string;
}

// Esquema de validación con Yup
const schema = yup.object().shape({
  description: yup
    .string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
});

const Polls: React.FC = () => {
  // Estado de propuestas de mejora
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

  // Estado para controlar el diálogo y notificaciones
  const [openDialog, setOpenDialog] = useState<boolean>(false);
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

  // Función para agregar nueva propuesta
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

  // Función para votar
  const handleVote = (id: number) => {
    setProposals((prevProposals) =>
      prevProposals
        .map((proposal) =>
          proposal.id === id ? { ...proposal, votes: proposal.votes + 1 } : proposal
        )
        .sort((a, b) => b.votes - a.votes)
    );
    setSnackbar({
      open: true,
      message: 'Has votado por esta mejora',
      severity: 'success',
    });
  };

  // Función para marcar/desmarcar favorito
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
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ bgcolor: '#F3F4F6', minHeight: '100vh', p: 4 }}>
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
          Agregar Mejora
        </Button>
      </Box>

      {/* Listado de propuestas */}
      <Grid container spacing={3}>
        {proposals.map((proposal) => (
          <Grid item xs={12} md={6} key={proposal.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1A1A40', fontWeight: 600 }}>
                  {proposal.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 2,
                  pb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    aria-label="votar"
                    onClick={() => handleVote(proposal.id)}
                    color="primary"
                    sx={{
                      bgcolor: 'rgba(38, 102, 207, 0.1)',
                      '&:hover': { bgcolor: 'rgba(38, 102, 207, 0.2)' },
                    }}
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ color: '#1A1A40' }}>
                    {proposal.votes}
                  </Typography>
                </Box>
                <IconButton
                  aria-label="favorito"
                  onClick={() => handleFavorite(proposal.id)}
                  sx={{
                    color: proposal.isFavorite ? '#E53935' : '#555',
                  }}
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
        <DialogTitle sx={{ bgcolor: '#1A1A40', color: '#FFFFFF' }}>
          Agregar Nueva Mejora
        </DialogTitle>
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
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#555', textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
              color: '#FFFFFF',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(90deg, #6A82FB, #2666CF)',
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
