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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
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
  // Obtenemos el token desde el store (similar a la página de Contacts)
  const token = useAuthStore((state) => state.token);

  // Estado para verificar la hidratación (igual que en Contacts)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Redirigir a login si no hay token (una vez hidratado)
  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  const [familias, setFamilias] = useState<Family[]>([]);
  const [familiaExpandida, setFamiliaExpandida] = useState<string | null>(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [dialogoAgregarFamiliaAbierto, setDialogoAgregarFamiliaAbierto] = useState(false);
  const [nuevaFamiliaData, setNuevaFamiliaData] = useState({
    name: '',
    showInCatalog: false,
    showInOrders: false,
  });
  const [dialogoAgregarSubFamiliaAbierto, setDialogoAgregarSubFamiliaAbierto] = useState(false);
  const [familiaSeleccionadaId, setFamiliaSeleccionadaId] = useState<string | null>(null);
  const [nuevoNombreSubFamilia, setNuevoNombreSubFamilia] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar las familias usando el token obtenido del store
  const fetchFamilias = async (authToken: string) => {
    setCargando(true);
    setError(null);
    try {
      const familiasObtenidas: Family[] = await FamilyService.getAllFamilies(authToken);
      // Para cada familia, obtener sus sub-familias
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

  // Cargar familias cuando haya token y se haya hidratado la app
  useEffect(() => {
    if (hydrated && token) {
      fetchFamilias(token);
    }
  }, [hydrated, token]);

  const handleExpandClick = (familyId: string) => {
    setFamiliaExpandida(familiaExpandida === familyId ? null : familyId);
  };

  const handleAgregarFamiliaDialogOpen = () => {
    setDialogoAgregarFamiliaAbierto(true);
  };

  const handleAgregarFamiliaDialogClose = () => {
    setDialogoAgregarFamiliaAbierto(false);
    setNuevaFamiliaData({
      name: '',
      showInCatalog: false,
      showInOrders: false,
    });
  };

  const handleAgregarFamilia = async () => {
    if (nuevaFamiliaData.name.trim() === '') {
      alert("El nombre de la familia no puede estar vacío.");
      return;
    }
    if (!token) return;

    try {
      const nuevaFamilia: Family = await FamilyService.createFamily(
        { name: nuevaFamiliaData.name },
        token
      );
      
      // Si el backend no asigna un id, asignamos uno temporal
      if (!nuevaFamilia.id) {
        nuevaFamilia.id = `${Date.now()}`;
      }
      
      nuevaFamilia.showInCatalog = nuevaFamiliaData.showInCatalog;
      nuevaFamilia.showInOrders = nuevaFamiliaData.showInOrders;
      nuevaFamilia.subFamilies = [];
      setFamilias([...familias, nuevaFamilia]);
      handleAgregarFamiliaDialogClose();
    } catch (error: any) {
      console.error("Error al crear la familia:", error);
      alert("Ocurrió un error al crear la familia.");
    }
  };

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
        {
          familyId: familiaSeleccionadaId,
          name: nuevoNombreSubFamilia,
        },
        token
      );
      // Si el backend no asigna un id, asignamos uno temporal
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getChartData = () => {
    return familias.map((familia) => ({
      name: familia.name,
      value: (familia.subFamilies || []).length,
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      {/* Header y Sidebar */}
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

        {/* Contenido Principal */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            marginLeft: isMenuOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease',
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
              Familias de Inventario
            </Typography>

            {/* Barra de Búsqueda y Botón para Añadir Familia */}
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

            {/* Indicadores de Carga y Error */}
            {cargando ? (
              <Typography variant="h6" sx={{ color: '#1A1A40' }}>Cargando familias...</Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>
            ) : (
              <>
                {/* Tarjetas de Familias */}
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
                              <IconButton onClick={() => handleExpandClick(familia.id)} sx={{ color: '#ffffff' }}>
                                <ExpandMoreIcon />
                              </IconButton>
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
                                    <ListItem key={subFamilia.id}>
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

                {/* Gráfico de Pastel */}
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

            {/* Diálogo para Añadir Familia */}
            <Dialog open={dialogoAgregarFamiliaAbierto} onClose={handleAgregarFamiliaDialogClose} maxWidth="sm" fullWidth>
              <DialogTitle>Añadir Nueva Familia</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Nombre de la familia"
                  value={nuevaFamiliaData.name}
                  onChange={(e) => setNuevaFamiliaData({ ...nuevaFamiliaData, name: e.target.value })}
                  sx={{ mb: 2 }}
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
                  label="Mostrar en Catálogo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={nuevaFamiliaData.showInOrders}
                      onChange={(e) =>
                        setNuevaFamiliaData({ ...nuevaFamiliaData, showInOrders: e.target.checked })
                      }
                    />
                  }
                  label="Mostrar en Pedidos"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAgregarFamiliaDialogClose}>Cancelar</Button>
                <Button
                  onClick={handleAgregarFamilia}
                  variant="contained"
                  sx={{ bgcolor: '#2666CF', color: '#ffffff', '&:hover': { bgcolor: '#1A4C97' } }}
                >
                  Crear Familia
                </Button>
              </DialogActions>
            </Dialog>

            {/* Diálogo para Añadir Sub-Familia */}
            <Dialog open={dialogoAgregarSubFamiliaAbierto} onClose={handleAgregarSubFamiliaDialogClose} maxWidth="sm" fullWidth>
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
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default FamiliasInventario;
