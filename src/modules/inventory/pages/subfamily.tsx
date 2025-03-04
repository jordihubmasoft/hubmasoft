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
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useRouter } from 'next/router';
import useAuthStore from '../../../store/useAuthStore';

import FamilyService from '../services/familyService';
import SubFamilyService from '../services/subFamilyService';
import { Family } from '../types/family';
import { SubFamily } from '../types/subFamily';

// Tipo de producto (ajusta según tu modelo real)
interface Product {
  id: string;
  name: string;
  // otros campos...
}

const SubFamilyPage: React.FC = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const contactId = useAuthStore((state) => state.contactId);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  // --------------------------------------------
  // Estados para almacenar las familias y subfamilias
  // --------------------------------------------
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------
  // Estado para búsqueda
  // --------------------------------------------
  const [searchTerm, setSearchTerm] = useState('');

  // --------------------------------------------
  // Obtener las familias con sus sub-familias
  // --------------------------------------------
  const fetchFamilies = async () => {
    if (!token || !contactId) return;
    setLoading(true);
    setError(null);
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
      const response = await fetch(`${BASE_URL}/Family/contact/${contactId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching families: ${response.statusText}`);
      }
      const json = await response.json();
      setFamilies(json.data); // Asumimos que json.data contiene el array de familias
    } catch (err) {
      console.error('Error al cargar las familias', err);
      setError('Error al cargar las familias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hydrated && token && contactId) {
      fetchFamilies();
    }
  }, [hydrated, token, contactId]);

  // Aplanamos todas las sub-familias agregando el nombre e id de la familia
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

  // --------------------------------------------
  // Estado y funciones para crear nueva sub-familia
  // --------------------------------------------
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // En lugar de tener un estado para "name" y otro para "familyId", 
  // creamos un objeto que contenga todos los campos necesarios.
  const [newSubFamilyData, setNewSubFamilyData] = useState<{
    name: string;
    familyId: string;
    showInOrders: boolean;
    showInCatalog: boolean;
    order: number;
    productIds: string[];
    imageFile: File | null;
  }>({
    name: '',
    familyId: '',
    showInOrders: false,
    showInCatalog: false,
    order: 0,
    productIds: [],
    imageFile: null,
  });

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    // Reseteamos el formulario
    setNewSubFamilyData({
      name: '',
      familyId: '',
      showInOrders: false,
      showInCatalog: false,
      order: 0,
      productIds: [],
      imageFile: null,
    });
  };

  // --------------------------------------------
  // Estados y lógica para obtener y filtrar productos
  // --------------------------------------------
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState('');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        if (!token) return;
        const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');
        const resp = await fetch(`${BASE_URL}/Product`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!resp.ok) throw new Error('Error al obtener productos');
        const json = await resp.json();
        // Ajusta según tu API (json.data o similar)
        setAllProducts(json.data ?? json);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchAllProducts();
  }, [token]);

  const filteredProducts = allProducts.filter((p) =>
    p.name?.toLowerCase().includes(productSearch.toLowerCase())
  );

  // --------------------------------------------
  // Crear sub-familia (con campos extra)
  // --------------------------------------------
  const handleAddSubFamily = async () => {
    if (!token || !contactId) return;
    if (newSubFamilyData.name.trim() === '' || newSubFamilyData.familyId.trim() === '') {
      alert('Debe ingresar un nombre y seleccionar una familia.');
      return;
    }
    try {
      // Construimos el payload con los campos nuevos.
      // Ajusta la lógica si tu backend requiere FormData para la imagen.
      const payload = {
        contactId,
        familyId: newSubFamilyData.familyId,
        name: newSubFamilyData.name,
        showInOrders: newSubFamilyData.showInOrders,
        showInCatalog: newSubFamilyData.showInCatalog,
        order: newSubFamilyData.order,
        productIds: newSubFamilyData.productIds,
        // imageFile: newSubFamilyData.imageFile, // Manejo según tu API
      };

      const newSub: SubFamily = await SubFamilyService.createSubFamily(payload, token);

      if (!newSub.id) {
        newSub.id = `${Date.now()}`;
      }
      // Se agrega la nueva sub-familia a la familia correspondiente
      setFamilies((prevFamilies) =>
        prevFamilies.map((family) =>
          family.id === newSubFamilyData.familyId
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

  // --------------------------------------------
  // Editar sub-familia
  // --------------------------------------------
  const [editingSubFamily, setEditingSubFamily] = useState<{
    familyId: string;
    subFamily: SubFamily;
  } | null>(null);
  const [editingSubFamilyName, setEditingSubFamilyName] = useState('');

  const handleOpenEditDialog = (familyId: string, subFamily: SubFamily) => {
    setEditingSubFamily({ familyId, subFamily });
    setEditingSubFamilyName(subFamily.name);
  };

  const handleCloseEditDialog = () => {
    setEditingSubFamily(null);
    setEditingSubFamilyName('');
  };

  const handleEditSubFamily = async () => {
    if (!editingSubFamily || editingSubFamilyName.trim() === '' || !token || !contactId) return;
    try {
      const updatedSub: SubFamily = await SubFamilyService.updateSubFamily(
        editingSubFamily.subFamily.id,
        { subfamilyId: editingSubFamily.subFamily.id, name: editingSubFamilyName },
        token
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

  // --------------------------------------------
  // Eliminar sub-familia
  // --------------------------------------------
  const [deleteSubFamily, setDeleteSubFamily] = useState<{
    familyId: string;
    subFamily: SubFamily;
  } | null>(null);

  const handleOpenDeleteDialog = (familyId: string, subFamily: SubFamily) => {
    setDeleteSubFamily({ familyId, subFamily });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteSubFamily(null);
  };

  const handleDeleteSubFamily = async () => {
    if (!deleteSubFamily || !token || !contactId) return;
    try {
      await SubFamilyService.deleteSubFamily(deleteSubFamily.subFamily.id, contactId, token);
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

  // --------------------------------------------
  // Estado para el Sidebar
  // --------------------------------------------
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <DialogTitle sx={{ fontWeight: 600 }}>Nueva Sub-Familia</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Sección Información Básica */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Información Básica
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre de la sub-familia"
                    value={newSubFamilyData.name}
                    onChange={(e) =>
                      setNewSubFamilyData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-family-label">Familia</InputLabel>
                    <Select
                      labelId="select-family-label"
                      value={newSubFamilyData.familyId}
                      label="Familia"
                      onChange={(e) =>
                        setNewSubFamilyData((prev) => ({
                          ...prev,
                          familyId: e.target.value as string,
                        }))
                      }
                    >
                      {families.map((family) => (
                        <MenuItem key={family.id} value={family.id}>
                          {family.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Sección Opciones de Visualización */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Opciones de Visualización
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newSubFamilyData.showInOrders}
                        onChange={(e) =>
                          setNewSubFamilyData((prev) => ({
                            ...prev,
                            showInOrders: e.target.checked,
                          }))
                        }
                      />
                    }
                    label="Mostrar grupo en pedidos (Vista inventario)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newSubFamilyData.showInCatalog}
                        onChange={(e) =>
                          setNewSubFamilyData((prev) => ({
                            ...prev,
                            showInCatalog: e.target.checked,
                          }))
                        }
                      />
                    }
                    label="Mostrar grupo en catálogo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Orden"
                    fullWidth
                    value={newSubFamilyData.order}
                    onChange={(e) =>
                      setNewSubFamilyData((prev) => ({
                        ...prev,
                        order: Number(e.target.value),
                      }))
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Sección Imagen */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Imagen
              </Typography>
              <TextField
                type="file"
                fullWidth
                inputProps={{ accept: 'image/*' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setNewSubFamilyData((prev) => ({
                      ...prev,
                      imageFile: e.target.files![0],
                    }));
                  }
                }}
              />
            </Box>

            <Divider />

            {/* Sección Selección de Productos */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Agregar Productos
              </Typography>
              <TextField
                label="Buscar producto..."
                fullWidth
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box
                sx={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  p: 1,
                }}
              >
                {filteredProducts.length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    No se encontraron productos
                  </Typography>
                ) : (
                  filteredProducts.map((product) => (
                    <FormControlLabel
                      key={product.id}
                      control={
                        <Checkbox
                          checked={newSubFamilyData.productIds.includes(product.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewSubFamilyData((prev) => ({
                                ...prev,
                                productIds: [...prev.productIds, product.id],
                              }));
                            } else {
                              setNewSubFamilyData((prev) => ({
                                ...prev,
                                productIds: prev.productIds.filter((id) => id !== product.id),
                              }));
                            }
                          }}
                        />
                      }
                      label={product.name}
                    />
                  ))
                )}
              </Box>
            </Box>
          </Box>
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
