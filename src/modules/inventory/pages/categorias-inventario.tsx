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
  CardContent,
  IconButton,
  Collapse,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { Family } from '../types/family';
import { SubFamily } from '../types/subFamily';
import FamilyService from '../services/familyService';
import SubFamilyService from '../services/subFamilyService';
import { useRouter } from 'next/router';
import useAuthStore from '../../../store/useAuthStore';

const COLORS = ['#2666CF', '#4CAF50', '#FFA500', '#FF5722', '#8E24AA'];

const FamiliasInventario: React.FC = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  // Estado de hidratación y autenticación
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  // Estados principales
  const [familias, setFamilias] = useState<Family[]>([]);
  const [familiaExpandida, setFamiliaExpandida] = useState<string | null>(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // Estados para agregar nuevas familias y sub-familias
  const [dialogoAgregarFamiliaAbierto, setDialogoAgregarFamiliaAbierto] = useState(false);
  const [nuevaFamiliaData, setNuevaFamiliaData] = useState({
    name: '',
    showInCatalog: false,
    showInOrders: false,
  });
  // Nuevo estado para capturar el texto de subfamilias en el formulario
  const [nuevaFamiliaSubfamilias, setNuevaFamiliaSubfamilias] = useState('');

  const [dialogoAgregarSubFamiliaAbierto, setDialogoAgregarSubFamiliaAbierto] = useState(false);
  const [familiaSeleccionadaId, setFamiliaSeleccionadaId] = useState<string | null>(null);
  const [nuevoNombreSubFamilia, setNuevoNombreSubFamilia] = useState('');

  // Estados para editar familias y sub-familias
  const [editingFamily, setEditingFamily] = useState<Family | null>(null);
  const [editingFamilyData, setEditingFamilyData] = useState({
    name: '',
    showInCatalog: false,
    showInOrders: false,
  });
  const [editingSubFamily, setEditingSubFamily] = useState<{ familyId: string; subFamily: SubFamily } | null>(null);
  const [editingSubFamilyName, setEditingSubFamilyName] = useState('');

  // Estados para confirmación de eliminación
  const [deleteFamily, setDeleteFamily] = useState<Family | null>(null);
  const [deleteSubFamily, setDeleteSubFamily] = useState<{ familyId: string; subFamily: SubFamily } | null>(null);

  // Cargar las familias y sus sub-familias
  const fetchFamilias = async (authToken: string) => {
    setCargando(true);
    setError(null);
    try {
      const familiasObtenidas: Family[] = await FamilyService.getAllFamilies(authToken);
      const familiasConSubFamilias: Family[] = await Promise.all(
        familiasObtenidas.map(async (familia) => {
          try {
            const subFamiliasObtenidas: SubFamily[] = await SubFamilyService.getSubFamiliesByFamilyId(
              familia.id,
              authToken
            );
            return { ...familia, subFamilies: subFamiliasObtenidas };
          } catch (error) {
            console.error(`Error al obtener sub-familias para la familia ${familia.id}:`, error);
            return { ...familia, subFamilies: [] };
          }
        })
      );
      setFamilias(familiasConSubFamilias);
    } catch (error) {
      console.error("Error al obtener las familias:", error);
      setError("Ocurrió un problema al cargar las familias.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (hydrated && token) {
      fetchFamilias(token);
    }
  }, [hydrated, token]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleExpandClick = (familyId: string) => {
    setFamiliaExpandida(familiaExpandida === familyId ? null : familyId);
  };

  /* Agregar Familia */
  const handleAgregarFamiliaDialogOpen = () => {
    setDialogoAgregarFamiliaAbierto(true);
  };

  const handleAgregarFamiliaDialogClose = () => {
    setDialogoAgregarFamiliaAbierto(false);
    setNuevaFamiliaData({ name: '', showInCatalog: false, showInOrders: false });
    setNuevaFamiliaSubfamilias('');
  };

  const handleAgregarFamilia = async () => {
    if (nuevaFamiliaData.name.trim() === '') {
      alert("El nombre de la familia no puede estar vacío.");
      return;
    }
    if (!token) return;

    try {
      // 1. Crear la familia principal
      const nuevaFamilia: Family = await FamilyService.createFamily(
        { name: nuevaFamiliaData.name },
        token
      );

      // Asegurarnos de que la familia tenga un ID
      if (!nuevaFamilia.id) {
        nuevaFamilia.id = `${Date.now()}`;
      }

      // Actualizar propiedades locales
      nuevaFamilia.showInCatalog = nuevaFamiliaData.showInCatalog;
      nuevaFamilia.showInOrders = nuevaFamiliaData.showInOrders;

      // 2. Si el usuario ingresó subfamilias, crearlas automáticamente
      const subfamilyNames = nuevaFamiliaSubfamilias
        .split(',')
        .map((sub) => sub.trim())
        .filter((sub) => sub.length > 0);

      let createdSubFamilies: SubFamily[] = [];
      if (subfamilyNames.length > 0) {
        // Creamos cada subfamilia en el backend
        createdSubFamilies = await Promise.all(
          subfamilyNames.map(async (subName) => {
            const nuevaSub = await SubFamilyService.createSubFamily(
              { familyId: nuevaFamilia.id!, name: subName },
              token
            );
            // Asignar un ID si el backend no lo envía
            if (!nuevaSub.id) {
              nuevaSub.id = `${Date.now()}`;
            }
            return nuevaSub;
          })
        );
      }

      // 3. Agregar las subfamilias creadas a la familia recién creada
      nuevaFamilia.subFamilies = createdSubFamilies;

      // 4. Actualizar estado local
      setFamilias([...familias, nuevaFamilia]);

      // Cerrar el diálogo y limpiar formularios
      handleAgregarFamiliaDialogClose();
    } catch (error: any) {
      console.error("Error al crear la familia:", error);
      alert("Ocurrió un error al crear la familia.");
    }
  };

  /* Agregar Sub-Familia (modal independiente) */
  const handleAgregarSubFamiliaDialogOpen = (familyId: string) => {
    setFamiliaSeleccionadaId(familyId);
    setDialogoAgregarSubFamiliaAbierto(true);
  };

  const handleAgregarSubFamiliaDialogClose = () => {
    setDialogoAgregarSubFamiliaAbierto(false);
    setFamiliaSeleccionadaId(null);
    setNuevoNombreSubFamilia('');
  };

  const handleAgregarSubFamilia = async () => {
    if (nuevoNombreSubFamilia.trim() === '') {
      alert("El nombre de la sub-familia no puede estar vacío.");
      return;
    }
    if (!familiaSeleccionadaId || !token) return;
    try {
      const nuevaSubFamilia: SubFamily = await SubFamilyService.createSubFamily(
        { familyId: familiaSeleccionadaId, name: nuevoNombreSubFamilia },
        token
      );
      if (!nuevaSubFamilia.id) {
        nuevaSubFamilia.id = `${Date.now()}`;
      }
      setFamilias(
        familias.map((familia) =>
          familia.id === familiaSeleccionadaId
            ? { ...familia, subFamilies: [...(familia.subFamilies || []), nuevaSubFamilia] }
            : familia
        )
      );
      handleAgregarSubFamiliaDialogClose();
    } catch (error: any) {
      console.error("Error al crear la sub-familia:", error);
      alert("Ocurrió un error al crear la sub-familia.");
    }
  };

  /* Editar Familia */
  const handleEditarFamilyDialogOpen = (familia: Family) => {
    setEditingFamily(familia);
    setEditingFamilyData({
      name: familia.name,
      showInCatalog: familia.showInCatalog || false,
      showInOrders: familia.showInOrders || false,
    });
  };

  const handleEditarFamilyDialogClose = () => {
    setEditingFamily(null);
  };

  const handleEditarFamilySubmit = async () => {
    if (!editingFamily || editingFamilyData.name.trim() === '' || !token) return;
    try {
      const updatedFamily: Family = await FamilyService.updateFamily(
        { ...editingFamily, ...editingFamilyData },
        token
      );
      setFamilias(
        familias.map((familia) =>
          familia.id === updatedFamily.id ? { ...familia, ...updatedFamily } : familia
        )
      );
      handleEditarFamilyDialogClose();
    } catch (error: any) {
      console.error("Error al actualizar la familia:", error);
      alert("Ocurrió un error al actualizar la familia.");
    }
  };

  /* Eliminar Familia */
  const handleDeleteFamily = (familia: Family) => {
    setDeleteFamily(familia);
  };

  const handleConfirmDeleteFamily = async () => {
    if (!deleteFamily || !token) return;
    try {
      await FamilyService.deleteFamily(deleteFamily.id, token);
      setFamilias(familias.filter((familia) => familia.id !== deleteFamily.id));
      setDeleteFamily(null);
    } catch (error: any) {
      console.error("Error al eliminar la familia:", error);
      alert("Ocurrió un error al eliminar la familia.");
    }
  };

  const handleCancelDeleteFamily = () => {
    setDeleteFamily(null);
  };

  /* Editar Sub-Familia */
  const handleEditarSubFamilyDialogOpen = (familyId: string, subFamily: SubFamily) => {
    setEditingSubFamily({ familyId, subFamily });
    setEditingSubFamilyName(subFamily.name);
  };

  const handleEditarSubFamilyDialogClose = () => {
    setEditingSubFamily(null);
    setEditingSubFamilyName('');
  };

  const handleEditarSubFamilySubmit = async () => {
    if (!editingSubFamily || editingSubFamilyName.trim() === '' || !token) return;
    try {
      const updatedSubFamily: SubFamily = await SubFamilyService.updateSubFamily(
        {
          subfamilyId: editingSubFamily.subFamily.id,
          name: editingSubFamilyName,
        },
        token
      );
      setFamilias(
        familias.map((familia) => {
          if (familia.id === editingSubFamily.familyId) {
            const updatedSubs = (familia.subFamilies || []).map((sub) =>
              sub.id === updatedSubFamily.id ? { ...sub, ...updatedSubFamily } : sub
            );
            return { ...familia, subFamilies: updatedSubs };
          }
          return familia;
        })
      );
      handleEditarSubFamilyDialogClose();
    } catch (error: any) {
      console.error("Error al actualizar la sub-familia:", error);
      alert("Ocurrió un error al actualizar la sub-familia.");
    }
  };

  /* Eliminar Sub-Familia */
  const handleDeleteSubFamily = (familyId: string, subFamily: SubFamily) => {
    setDeleteSubFamily({ familyId, subFamily });
  };

  const handleConfirmDeleteSubFamily = async () => {
    if (!deleteSubFamily || !token) return;
    try {
      await SubFamilyService.deleteSubFamily(deleteSubFamily.subFamily.id, token);
      setFamilias(
        familias.map((familia) => {
          if (familia.id === deleteSubFamily.familyId) {
            return {
              ...familia,
              subFamilies: familia.subFamilies?.filter(
                (sub) => sub.id !== deleteSubFamily.subFamily.id
              ),
            };
          }
          return familia;
        })
      );
      setDeleteSubFamily(null);
    } catch (error: any) {
      console.error("Error al eliminar la sub-familia:", error);
      alert("Ocurrió un error al eliminar la sub-familia.");
    }
  };

  const handleCancelDeleteSubFamily = () => {
    setDeleteSubFamily(null);
  };

  const getChartData = () => {
    return familias.map((familia) => ({
      name: familia.name,
      value: (familia.subFamilies || []).length,
    }));
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
              Familias de Inventario
            </Typography>

            {/* Barra de búsqueda y botón para añadir familia */}
            <Box sx={{ display: 'flex', mb: 4 }}>
              <TextField
                variant="outlined"
                placeholder="Buscar familia..."
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                fullWidth
                sx={{ mr: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAgregarFamiliaDialogOpen}
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
                Añadir Familia
              </Button>
            </Box>

            {cargando ? (
              <Typography variant="h6" sx={{ color: '#1A1A40' }}>
                Cargando familias...
              </Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ color: 'red' }}>
                {error}
              </Typography>
            ) : (
              <>
                <Grid container spacing={3}>
                  {familias
                    .filter((familia) =>
                      familia.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
                    )
                    .map((familia) => (
                      <Grid item xs={12} sm={6} md={4} key={familia.id}>
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
                            title={familia.name}
                            sx={{ backgroundColor: '#2666CF', color: '#ffffff' }}
                            action={
                              <Box>
                                <Tooltip title="Editar Familia">
                                  <IconButton onClick={() => handleEditarFamilyDialogOpen(familia)}>
                                    <EditIcon sx={{ color: '#ffffff' }} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar Familia">
                                  <IconButton onClick={() => handleDeleteFamily(familia)}>
                                    <DeleteIcon sx={{ color: '#ffffff' }} />
                                  </IconButton>
                                </Tooltip>
                                <IconButton
                                  onClick={() => handleExpandClick(familia.id)}
                                  sx={{ color: '#ffffff' }}
                                >
                                  <ExpandMoreIcon />
                                </IconButton>
                              </Box>
                            }
                          />
                          <Collapse in={familiaExpandida === familia.id} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography variant="body1" sx={{ fontWeight: '500', mb: 1 }}>
                                Sub-Familias:
                              </Typography>
                              <List dense>
                                {familia.subFamilies && familia.subFamilies.length > 0 ? (
                                  familia.subFamilies.map((subFamilia) => (
                                    <ListItem
                                      key={subFamilia.id}
                                      secondaryAction={
                                        <Box>
                                          <Tooltip title="Editar Sub-Familia">
                                            <IconButton
                                              edge="end"
                                              onClick={() =>
                                                handleEditarSubFamilyDialogOpen(familia.id, subFamilia)
                                              }
                                            >
                                              <EditIcon />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Eliminar Sub-Familia">
                                            <IconButton
                                              edge="end"
                                              onClick={() =>
                                                handleDeleteSubFamily(familia.id, subFamilia)
                                              }
                                            >
                                              <DeleteIcon />
                                            </IconButton>
                                          </Tooltip>
                                        </Box>
                                      }
                                    >
                                      <ListItemText primary={subFamilia.name} />
                                    </ListItem>
                                  ))
                                ) : (
                                  <Typography variant="body2" color="textSecondary">
                                    No hay sub-familias
                                  </Typography>
                                )}
                              </List>
                              <Divider sx={{ mt: 2, mb: 2 }} />
                              <FormControlLabel
                                control={<Checkbox checked={familia.showInCatalog || false} disabled />}
                                label="Mostrar en Catálogo"
                              />
                              <FormControlLabel
                                control={<Checkbox checked={familia.showInOrders || false} disabled />}
                                label="Mostrar en Pedidos"
                              />
                              <Button
                                variant="text"
                                startIcon={<AddIcon />}
                                onClick={() => handleAgregarSubFamiliaDialogOpen(familia.id)}
                                sx={{ mt: 2, textTransform: 'none', color: '#2666CF' }}
                              >
                                Añadir Sub-Familia
                              </Button>
                            </CardContent>
                          </Collapse>
                        </Card>
                      </Grid>
                    ))}
                </Grid>

                {/* Gráfico de pastel */}
                <Box sx={{ mt: 5 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                    Distribución de Sub-Familias por Familia
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getChartData()}
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {getChartData().map((entry, index) => (
                          <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </>
            )}

            {/* Diálogo Agregar Familia */}
            <Dialog
              open={dialogoAgregarFamiliaAbierto}
              onClose={handleAgregarFamiliaDialogClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Nueva familia</DialogTitle>
              <DialogContent>
                {/* Nombre de la familia */}
                <TextField
                  fullWidth
                  label="Nombre de la familia"
                  value={nuevaFamiliaData.name}
                  onChange={(e) =>
                    setNuevaFamiliaData({ ...nuevaFamiliaData, name: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />

                {/* Subfamilias (separadas por comas) */}
                <TextField
                  fullWidth
                  label="Agregar subfamilias dentro de la familia"
                  placeholder="Cafés, Refrescos, Aguas"
                  value={nuevaFamiliaSubfamilias}
                  onChange={(e) => setNuevaFamiliaSubfamilias(e.target.value)}
                  sx={{ mb: 2 }}
                />

                {/* Checkboxes */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={nuevaFamiliaData.showInOrders}
                      onChange={(e) =>
                        setNuevaFamiliaData({
                          ...nuevaFamiliaData,
                          showInOrders: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Mostrar grupo en pedidos (Vista inventario)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={nuevaFamiliaData.showInCatalog}
                      onChange={(e) =>
                        setNuevaFamiliaData({
                          ...nuevaFamiliaData,
                          showInCatalog: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Mostrar grupo en catálogo"
                />

                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  Ejemplos: "bebidas, ropa, menaje"
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAgregarFamiliaDialogClose}>Cancelar</Button>
                <Button
                  onClick={handleAgregarFamilia}
                  variant="contained"
                  sx={{ bgcolor: '#2666CF', color: '#ffffff', '&:hover': { bgcolor: '#1A4C97' } }}
                >
                  Crear
                </Button>
              </DialogActions>
            </Dialog>

            {/* Diálogo Agregar Sub-Familia */}
            <Dialog
              open={dialogoAgregarSubFamiliaAbierto}
              onClose={handleAgregarSubFamiliaDialogClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Añadir Nueva Sub-Familia</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Nombre de la sub-familia"
                  value={nuevoNombreSubFamilia}
                  onChange={(e) => setNuevoNombreSubFamilia(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  Ejemplos: Sin Azúcar, Azucarados, etc.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAgregarSubFamiliaDialogClose}>Cancelar</Button>
                <Button
                  onClick={handleAgregarSubFamilia}
                  variant="contained"
                  sx={{ bgcolor: '#2666CF', color: '#ffffff', '&:hover': { bgcolor: '#1A4C97' } }}
                >
                  Crear Sub-Familia
                </Button>
              </DialogActions>
            </Dialog>

            {/* Diálogo Editar Familia */}
            <Dialog
              open={!!editingFamily}
              onClose={handleEditarFamilyDialogClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Editar Familia</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Nombre de la familia"
                  value={editingFamilyData.name}
                  onChange={(e) =>
                    setEditingFamilyData({ ...editingFamilyData, name: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={editingFamilyData.showInCatalog}
                      onChange={(e) =>
                        setEditingFamilyData({
                          ...editingFamilyData,
                          showInCatalog: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Mostrar en Catálogo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={editingFamilyData.showInOrders}
                      onChange={(e) =>
                        setEditingFamilyData({
                          ...editingFamilyData,
                          showInOrders: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Mostrar en Pedidos"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditarFamilyDialogClose}>Cancelar</Button>
                <Button
                  onClick={handleEditarFamilySubmit}
                  variant="contained"
                  sx={{ bgcolor: '#2666CF', color: '#ffffff', '&:hover': { bgcolor: '#1A4C97' } }}
                >
                  Guardar Cambios
                </Button>
              </DialogActions>
            </Dialog>

            {/* Diálogo Confirmar Eliminación de Familia */}
            <Dialog
              open={!!deleteFamily}
              onClose={handleCancelDeleteFamily}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogContent>
                <Typography>¿Está seguro de eliminar la familia "{deleteFamily?.name}"?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDeleteFamily}>Cancelar</Button>
                <Button onClick={handleConfirmDeleteFamily} variant="contained" color="error">
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>

            {/* Diálogo Editar Sub-Familia */}
            <Dialog
              open={!!editingSubFamily}
              onClose={handleEditarSubFamilyDialogClose}
              maxWidth="sm"
              fullWidth
            >
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
                <Button onClick={handleEditarSubFamilyDialogClose}>Cancelar</Button>
                <Button
                  onClick={handleEditarSubFamilySubmit}
                  variant="contained"
                  sx={{ bgcolor: '#2666CF', color: '#ffffff', '&:hover': { bgcolor: '#1A4C97' } }}
                >
                  Guardar Cambios
                </Button>
              </DialogActions>
            </Dialog>

            {/* Diálogo Confirmar Eliminación de Sub-Familia */}
            <Dialog
              open={!!deleteSubFamily}
              onClose={handleCancelDeleteSubFamily}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogContent>
                <Typography>
                  ¿Está seguro de eliminar la sub-familia "{deleteSubFamily?.subFamily.name}"?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDeleteSubFamily}>Cancelar</Button>
                <Button onClick={handleConfirmDeleteSubFamily} variant="contained" color="error">
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default FamiliasInventario;
