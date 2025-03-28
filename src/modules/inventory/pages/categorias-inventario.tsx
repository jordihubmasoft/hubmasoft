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
  Chip,
  Autocomplete,
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

// ---------- Ejemplo de interfaz Contact ----------
interface Contact {
  id: string;
  nombre: string;
  nif?: string;
  // otros campos que manejes...
}
// -------------------------------------------------------

const COLORS = ['#2666CF', '#4CAF50', '#FFA500', '#FF5722', '#8E24AA'];

const FamiliasInventario: React.FC = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const contactId = useAuthStore((state) => state.contactId);

  // Estado para la hidratación
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
  const [tempSubFamily, setTempSubFamily] = useState('');
  const [subFamilies, setSubFamilies] = useState<string[]>([]);

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

  // --------------------------------------------------------------------
  // NUEVO: Manejo de Autocomplete de contactos (simulado)
  // --------------------------------------------------------------------
  const [contactOptions, setContactOptions] = useState<Contact[]>([]); // Lista de contactos sugeridos
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  // Estado para almacenar la selección de contactos por familia (solo para la UI)
  const [selectedContacts, setSelectedContacts] = useState<Record<string, Contact[]>>({});

  // Función para "buscar" contactos (simulada)
  const searchContacts = async (text: string) => {
    if (!token) return;
    try {
      // Aquí deberías hacer la llamada real al servicio.
      // Por ejemplo:
      // const response = await ContactService.getContactsWithFiltersV2({ text }, token);
      // setContactOptions(response.data.map(mapBackendContactToLocal));
      // Para este ejemplo, simulamos una respuesta:
      const simulatedResponse = {
        data: [
          { id: '1', nombre: 'Juan Pérez', nif: '12345678A' },
          { id: '2', nombre: 'María García', nif: '87654321B' },
        ],
      };
      setContactOptions(simulatedResponse.data);
    } catch (err) {
      console.error('Error buscando contactos:', err);
    }
  };
  // --------------------------------------------------------------------

  useEffect(() => {
    if (token && contactId) {
      fetchFamilias();
    }
  }, [token, contactId]);

  const fetchFamilias = async () => {
    if (!token || !contactId) return;
    setCargando(true);
    setError(null);
    try {
      const familiasObtenidas = await FamilyService.getAllFamilies(contactId, token);
      setFamilias(familiasObtenidas);
    } catch (error) {
      console.error('Error al obtener las familias:', error);
      setError('Ocurrió un problema al cargar las familias.');
    } finally {
      setCargando(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleExpandClick = (familyId: string) => {
    setFamiliaExpandida(familiaExpandida === familyId ? null : familyId);
  };

  /* Manejo de subfamilias en el formulario de nueva familia (TextField con Enter) */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tempSubFamily.trim() !== '') {
      e.preventDefault();
      setSubFamilies([...subFamilies, tempSubFamily.trim()]);
      setTempSubFamily('');
    }
  };

  const handleDeleteChip = (index: number) => {
    setSubFamilies(subFamilies.filter((_, i) => i !== index));
  };

  /* Agregar Familia */
  const handleAgregarFamiliaDialogOpen = () => {
    setDialogoAgregarFamiliaAbierto(true);
  };

  const handleAgregarFamiliaDialogClose = () => {
    setDialogoAgregarFamiliaAbierto(false);
    setNuevaFamiliaData({ name: '', showInCatalog: false, showInOrders: false });
    setTempSubFamily('');
    setSubFamilies([]);
  };

  const handleAgregarFamilia = async () => {
    if (!token || !contactId) return;
    if (nuevaFamiliaData.name.trim() === '') {
      alert('El nombre de la familia no puede estar vacío.');
      return;
    }
    try {
      await FamilyService.createFamily(
        { contactId, name: nuevaFamiliaData.name },
        token
      );
      // Recargamos la lista de familias
      const familiasActualizadas = await FamilyService.getAllFamilies(contactId, token);
      // Buscamos la familia recién creada
      const familiaNueva = familiasActualizadas.find(
        (f) => f.name === nuevaFamiliaData.name
      );
      if (!familiaNueva) {
        throw new Error('No se pudo encontrar la familia recién creada.');
      }
      // Creamos subfamilias
      if (subFamilies.length > 0) {
        for (const nombreSubFamilia of subFamilies) {
          await SubFamilyService.createSubFamily(
            {
              contactId,
              familyId: familiaNueva.id,
              name: nombreSubFamilia,
            },
            token
          );
        }
      }
      handleAgregarFamiliaDialogClose();
      fetchFamilias();
    } catch (error: any) {
      console.error('Error al crear la familia o las subfamilias:', error);
      alert('Ocurrió un error al crear la familia o las subfamilias.');
    }
  };

  /* Agregar Sub-Familia */
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
    if (!familiaSeleccionadaId || !token || !contactId) return;
    if (nuevoNombreSubFamilia.trim() === '') {
      alert('El nombre de la sub-familia no puede estar vacío.');
      return;
    }
    try {
      const nuevaSubFamilia: SubFamily = await SubFamilyService.createSubFamily(
        { contactId, familyId: familiaSeleccionadaId, name: nuevoNombreSubFamilia },
        token
      );
      setFamilias(
        familias.map((familia) =>
          familia.id === familiaSeleccionadaId
            ? {
                ...familia,
                subFamilies: [
                  ...(Array.isArray(familia.subFamilies) ? familia.subFamilies : []),
                  nuevaSubFamilia,
                ],
              }
            : familia
        )
      );
      handleAgregarSubFamiliaDialogClose();
    } catch (error: any) {
      console.error('Error al crear la sub-familia:', error);
      alert('Ocurrió un error al crear la sub-familia.');
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
      await FamilyService.updateFamily(
        { familyId: editingFamily.id, name: editingFamilyData.name },
        token
      );
      await fetchFamilias();
      handleEditarFamilyDialogClose();
    } catch (error: any) {
      console.error('Error al actualizar la familia:', error);
      alert('Ocurrió un error al actualizar la familia.');
    }
  };

  /* Eliminar Familia */
  const handleDeleteFamily = (familia: Family) => {
    setDeleteFamily(familia);
  };

  const handleConfirmDeleteFamily = async () => {
    if (!deleteFamily || !token || !contactId) return;
    try {
      await FamilyService.deleteFamily(deleteFamily.id, contactId, token);
      setFamilias(familias.filter((familia) => familia.id !== deleteFamily.id));
      setDeleteFamily(null);
    } catch (error: any) {
      console.error('Error al eliminar la familia:', error);
      alert('Ocurrió un error al eliminar la familia.');
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
      await SubFamilyService.updateSubFamily(
        editingSubFamily.subFamily.id,
        {
          subfamilyId: editingSubFamily.subFamily.id,
          name: editingSubFamilyName,
        },
        token
      );
      await fetchFamilias();
      handleEditarSubFamilyDialogClose();
    } catch (error: any) {
      console.error('Error al actualizar la sub-familia:', error);
      alert('Ocurrió un error al actualizar la sub-familia.');
    }
  };

  /* Eliminar Sub-Familia */
  const handleDeleteSubFamily = (familyId: string, subFamily: SubFamily) => {
    setDeleteSubFamily({ familyId, subFamily });
  };

  const handleConfirmDeleteSubFamily = async () => {
    if (!deleteSubFamily || !token || !contactId) return;
    try {
      await SubFamilyService.deleteSubFamily(deleteSubFamily.subFamily.id, contactId, token);
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
      console.error('Error al eliminar la sub-familia:', error);
      alert('Ocurrió un error al eliminar la sub-familia.');
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

  if (!hydrated) return null;

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
                      (familia.name || '').toLowerCase().includes(terminoBusqueda.toLowerCase())
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
                                <IconButton onClick={() => handleExpandClick(familia.id)} sx={{ color: '#ffffff' }}>
                                  <ExpandMoreIcon />
                                </IconButton>
                              </Box>
                            }
                          />
                          <Collapse in={familiaExpandida === familia.id} timeout="auto" unmountOnExit>
                            <CardContent>
                              {/* Sub-Familias */}
                              <Typography variant="body1" sx={{ fontWeight: '500', mb: 1 }}>
                                Sub-Familias:
                              </Typography>
                              <List dense>
                                {familia.subFamilies && familia.subFamilies.length > 0 ? (
                                  familia.subFamilies.map((subFamilia) => (
                                    <ListItem
                                      key={`${familia.id}-${subFamilia.id}`}
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
                                              onClick={() => handleDeleteSubFamily(familia.id, subFamilia)}
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
                              <Button
                                variant="text"
                                startIcon={<AddIcon />}
                                onClick={() => handleAgregarSubFamiliaDialogOpen(familia.id)}
                                sx={{ mt: 2, textTransform: 'none', color: '#2666CF' }}
                              >
                                Añadir Sub-Familia
                              </Button>

                              <Divider sx={{ my: 2 }} />

                              {/* Checkboxes de familia */}
                              <FormControlLabel
                                control={<Checkbox checked={familia.showInCatalog || false} disabled />}
                                label="Mostrar en Catálogo"
                              />
                              <FormControlLabel
                                control={<Checkbox checked={familia.showInOrders || false} disabled />}
                                label="Mostrar en Pedidos"
                              />

                              <Divider sx={{ my: 2 }} />

                              {/* Autocomplete simulado: Contactos que pueden visualizar la familia */}
                              <Typography variant="body1" sx={{ fontWeight: '500', mb: 1 }}>
                                Contactos que pueden visualizar la familia:
                              </Typography>
                              <Autocomplete
                                multiple
                                options={contactOptions}
                                getOptionLabel={(option: Contact) => option.nombre}
                                // Se usa el estado local para almacenar la selección sin modificar la familia
                                value={selectedContacts[familia.id] || []}
                                onChange={(event, newValue) => {
                                  setSelectedContacts((prev) => ({
                                    ...prev,
                                    [familia.id]: newValue,
                                  }));
                                }}
                                onInputChange={(event, newInputValue) => {
                                  if (searchTimeout) clearTimeout(searchTimeout);
                                  const timeout = setTimeout(() => {
                                    if (newInputValue.trim().length > 0) {
                                      searchContacts(newInputValue.trim());
                                    } else {
                                      setContactOptions([]);
                                    }
                                  }, 300);
                                  setSearchTimeout(timeout);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    placeholder="Buscar contactos..."
                                  />
                                )}
                                renderOption={(props, option) => (
                                  <li {...props} key={option.id}>
                                    {option.nombre} {option.nif ? `(${option.nif})` : ''}
                                  </li>
                                )}
                                sx={{ mt: 1 }}
                              />
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
                      <Pie data={getChartData()} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value" label>
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
              <DialogTitle>Nueva categoría</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Nombre de la familia"
                  value={nuevaFamiliaData.name}
                  onChange={(e) => setNuevaFamiliaData({ ...nuevaFamiliaData, name: e.target.value })}
                  sx={{ mb: 2 }}
                />

                {/* Campo para capturar subfamilias */}
                <TextField
                  fullWidth
                  label="Agregar subfamilias dentro de la familia"
                  placeholder="Cafés, Refrescos, Aguas"
                  value={tempSubFamily}
                  onChange={(e) => setTempSubFamily(e.target.value)}
                  onKeyDown={handleKeyDown}
                  helperText="Presiona Enter para guardar las opciones"
                  sx={{ mb: 2 }}
                />
                {/* Chips con subfamilias agregadas */}
                {subFamilies.length > 0 && (
                  <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {subFamilies.map((sub, index) => (
                      <Chip
                        key={`${sub}-${index}`}
                        label={sub}
                        onDelete={() => handleDeleteChip(index)}
                      />
                    ))}
                  </Box>
                )}

                {/* Checkboxes */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={nuevaFamiliaData.showInOrders}
                      onChange={(e) =>
                        setNuevaFamiliaData({ ...nuevaFamiliaData, showInOrders: e.target.checked })
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
                        setNuevaFamiliaData({ ...nuevaFamiliaData, showInCatalog: e.target.checked })
                      }
                    />
                  }
                  label="Mostrar grupo en catálogo"
                />

                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  Ejemplos: "bebidas, ropa, menaje".
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
            <Dialog open={!!editingFamily} onClose={handleEditarFamilyDialogClose} maxWidth="sm" fullWidth>
              <DialogTitle>Editar Familia</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Nombre de la familia"
                  value={editingFamilyData.name}
                  onChange={(e) => setEditingFamilyData({ ...editingFamilyData, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={editingFamilyData.showInCatalog}
                      onChange={(e) =>
                        setEditingFamilyData({ ...editingFamilyData, showInCatalog: e.target.checked })
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
                        setEditingFamilyData({ ...editingFamilyData, showInOrders: e.target.checked })
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
            <Dialog open={!!deleteFamily} onClose={handleCancelDeleteFamily} maxWidth="xs" fullWidth>
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
            <Dialog open={!!editingSubFamily} onClose={handleEditarSubFamilyDialogClose} maxWidth="sm" fullWidth>
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
            <Dialog open={!!deleteSubFamily} onClose={handleCancelDeleteSubFamily} maxWidth="xs" fullWidth>
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
