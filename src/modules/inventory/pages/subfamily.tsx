import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardHeader,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import FamilyService from '../services/familyService';
import SubFamilyService from '../services/subFamilyService';
import { useRouter } from 'next/router';
import useAuthStore from '../../../store/useAuthStore';
import { Family } from '../types/family';
import { SubFamily } from '../types/subFamily';

const SubFamilyPage: React.FC = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  // Estados para almacenar las familias y sus sub-familias
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para el diálogo de creación de sub-familia
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newSubFamilyName, setNewSubFamilyName] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState('');

  // Estados para editar sub-familia
  const [editingSubFamily, setEditingSubFamily] = useState<{ familyId: string; subFamily: SubFamily } | null>(null);
  const [editingSubFamilyName, setEditingSubFamilyName] = useState('');

  // Estado para confirmar eliminación de sub-familia
  const [deleteSubFamily, setDeleteSubFamily] = useState<{ familyId: string; subFamily: SubFamily } | null>(null);

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar las familias y, de cada una, sus sub-familias
  const fetchFamilies = async () => {
    setLoading(true);
    setError(null);
    try {
      const familiesObtained: Family[] = await FamilyService.getAllFamilies(token!);
      const familiesWithSubs: Family[] = await Promise.all(
        familiesObtained.map(async (family) => {
          try {
            const subFamiliesObtained: SubFamily[] = await SubFamilyService.getSubFamiliesByFamilyId(family.id, token!);
            return { ...family, subFamilies: subFamiliesObtained };
          } catch (err) {
            console.error(`Error al obtener sub-familias de la familia ${family.id}`, err);
            return { ...family, subFamilies: [] };
          }
        })
      );
      setFamilies(familiesWithSubs);
    } catch (err) {
      console.error('Error al cargar las familias', err);
      setError('Error al cargar las familias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hydrated && token) {
      fetchFamilies();
    }
  }, [hydrated, token]);

  // Aplanamos todas las sub-familias agregando el nombre y el id de la familia
  const allSubFamilies = families.flatMap((family) =>
    (family.subFamilies || []).map((sub) => ({
      ...sub,
      familyName: family.name,
      familyId: family.id,
    }))
  );

  const filteredSubFamilies = allSubFamilies.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejo del diálogo para agregar sub-familia
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewSubFamilyName('');
    setSelectedFamilyId('');
  };

  const handleAddSubFamily = async () => {
    if (newSubFamilyName.trim() === '' || selectedFamilyId.trim() === '') {
      alert('Debe ingresar un nombre y seleccionar una familia.');
      return;
    }
    try {
      const newSub: SubFamily = await SubFamilyService.createSubFamily(
        { familyId: selectedFamilyId, name: newSubFamilyName },
        token!
      );
      if (!newSub.id) {
        newSub.id = `${Date.now()}`;
      }
      // Actualizamos el estado agregando la nueva sub-familia a la familia correspondiente
      setFamilies((prevFamilies) =>
        prevFamilies.map((family) =>
          family.id === selectedFamilyId
            ? { ...family, subFamilies: [...(family.subFamilies || []), newSub] }
            : family
        )
      );
      handleCloseAddDialog();
    } catch (err) {
      console.error('Error al crear la sub-familia', err);
      alert('Ocurrió un error al crear la sub-familia.');
    }
  };

  // Manejo del diálogo para editar sub-familia
  const handleOpenEditDialog = (familyId: string, subFamily: SubFamily) => {
    setEditingSubFamily({ familyId, subFamily });
    setEditingSubFamilyName(subFamily.name);
  };

  const handleCloseEditDialog = () => {
    setEditingSubFamily(null);
    setEditingSubFamilyName('');
  };

  const handleEditSubFamily = async () => {
    if (!editingSubFamily || editingSubFamilyName.trim() === '') return;
    try {
      const updatedSub: SubFamily = await SubFamilyService.updateSubFamily(
        { subfamilyId: editingSubFamily.subFamily.id, name: editingSubFamilyName },
        token!
      );
      setFamilies((prevFamilies) =>
        prevFamilies.map((family) => {
          if (family.id === editingSubFamily.familyId) {
            return {
              ...family,
              subFamilies: (family.subFamilies || []).map((sub) =>
                sub.id === updatedSub.id ? { ...sub, ...updatedSub } : sub
              ),
            };
          }
          return family;
        })
      );
      handleCloseEditDialog();
    } catch (err) {
      console.error('Error al actualizar la sub-familia', err);
      alert('Ocurrió un error al actualizar la sub-familia.');
    }
  };

  // Manejo para eliminar sub-familia
  const handleOpenDeleteDialog = (familyId: string, subFamily: SubFamily) => {
    setDeleteSubFamily({ familyId, subFamily });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteSubFamily(null);
  };

  const handleDeleteSubFamily = async () => {
    if (!deleteSubFamily) return;
    try {
      await SubFamilyService.deleteSubFamily(deleteSubFamily.subFamily.id, token!);
      setFamilies((prevFamilies) =>
        prevFamilies.map((family) => {
          if (family.id === deleteSubFamily.familyId) {
            return {
              ...family,
              subFamilies: (family.subFamilies || []).filter(
                (sub) => sub.id !== deleteSubFamily.subFamily.id
              ),
            };
          }
          return family;
        })
      );
      handleCloseDeleteDialog();
    } catch (err) {
      console.error('Error al eliminar la sub-familia', err);
      alert('Ocurrió un error al eliminar la sub-familia.');
    }
  };

  // Estado para el Sidebar
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        <Box
          sx={{
            width: isMenuOpen ? '240px' : '70px',
            flexShrink: 0,
            bgcolor: '#1A1A40',
            position: 'fixed',
            top: '64px',
            bottom: 0,
            zIndex: 1201,
            transition: 'width 0.3s ease',
          }}
        >
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            ml: isMenuOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease',
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
              Sub-Familias
            </Typography>

            {/* Barra de búsqueda y botón para añadir sub-familia */}
            <Box sx={{ display: 'flex', mb: 4 }}>
              <TextField
                variant="outlined"
                placeholder="Buscar sub-familia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{ mr: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{
                  bgcolor: '#2666CF',
                  color: '#ffffff',
                  fontWeight: '500',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': { bgcolor: '#1A4C97' },
                }}
              >
                Añadir Sub-Familia
              </Button>
            </Box>

            {loading ? (
              <Typography variant="h6" sx={{ color: '#1A1A40' }}>
                Cargando sub-familias...
              </Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ color: 'red' }}>
                {error}
              </Typography>
            ) : filteredSubFamilies.length === 0 ? (
              <Typography variant="body1">No se encontraron sub-familias.</Typography>
            ) : (
              <Grid container spacing={3}>
                {filteredSubFamilies.map((sub) => (
                  <Grid item xs={12} sm={6} md={4} key={sub.id}>
                    <Card
                      sx={{
                        boxShadow: 3,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      <CardHeader
                        title={sub.name}
                        subheader={`Familia: ${sub.familyName}`}
                        sx={{ backgroundColor: '#2666CF', color: '#ffffff' }}
                        action={
                          <Box>
                            <Tooltip title="Editar Sub-Familia">
                              <IconButton onClick={() => handleOpenEditDialog(sub.familyId, sub)}>
                                <EditIcon sx={{ color: '#ffffff' }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Sub-Familia">
                              <IconButton onClick={() => handleOpenDeleteDialog(sub.familyId, sub)}>
                                <DeleteIcon sx={{ color: '#ffffff' }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        }
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </Box>

      {/* Diálogo para agregar una nueva sub-familia */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Añadir Nueva Sub-Familia</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre de la sub-familia"
            value={newSubFamilyName}
            onChange={(e) => setNewSubFamilyName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel id="select-family-label">Familia</InputLabel>
            <Select
              labelId="select-family-label"
              value={selectedFamilyId}
              label="Familia"
              onChange={(e) => setSelectedFamilyId(e.target.value as string)}
            >
              {families.map((family) => (
                <MenuItem key={family.id} value={family.id}>
                  {family.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancelar</Button>
          <Button
            onClick={handleAddSubFamily}
            variant="contained"
            sx={{ bgcolor: '#2666CF', color: '#ffffff', '&:hover': { bgcolor: '#1A4C97' } }}
          >
            Crear Sub-Familia
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar sub-familia */}
      <Dialog open={!!editingSubFamily} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Sub-Familia</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre de la sub-familia"
            value={editingSubFamilyName}
            onChange={(e) => setEditingSubFamilyName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancelar</Button>
          <Button
            onClick={handleEditSubFamily}
            variant="contained"
            sx={{ bgcolor: '#2666CF', color: '#ffffff', '&:hover': { bgcolor: '#1A4C97' } }}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para confirmar eliminación de sub-familia */}
      <Dialog open={!!deleteSubFamily} onClose={handleCloseDeleteDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de eliminar la sub-familia "{deleteSubFamily?.subFamily.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDeleteSubFamily} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubFamilyPage;
