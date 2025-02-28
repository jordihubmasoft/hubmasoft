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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

// Services
import FamilyService from '../services/familyService';
import SubFamilyService from '../services/subFamilyService';
import ProductService from '../services/productService';

// Types
import { Family } from '../types/family';
import { SubFamily } from '../types/subFamily';
import { Product } from '../types/Product';

import { useRouter } from 'next/router';
import useAuthStore from '../../../store/useAuthStore';

const SubFamilyPage: React.FC = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const contactId = useAuthStore((state) => state.contactId);
  const [hydrated, setHydrated] = useState(false);

  // -------------------------------
  // Estados para familias / productos
  // -------------------------------
  const [families, setFamilies] = useState<Family[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------
  // Estados para búsqueda
  // -------------------------------
  const [searchTerm, setSearchTerm] = useState('');

  // -------------------------------
  // Estados para creación/edición de subfamilia
  // -------------------------------
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Campos del formulario "Nueva Subfamilia"
  const [newSubFamilyName, setNewSubFamilyName] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [showInCatalog, setShowInCatalog] = useState(false);
  const [showInOrders, setShowInOrders] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Edición
  const [editingSubFamily, setEditingSubFamily] =
    useState<{ familyId: string; subFamily: SubFamily } | null>(null);
  const [editingSubFamilyName, setEditingSubFamilyName] = useState('');
  const [editingShowInCatalog, setEditingShowInCatalog] = useState(false);
  const [editingShowInOrders, setEditingShowInOrders] = useState(false);
  const [editingSelectedProductIds, setEditingSelectedProductIds] = useState<string[]>([]);

  // -------------------------------
  // Estado para confirmar eliminación de sub-familia
  // -------------------------------
  const [deleteSubFamily, setDeleteSubFamily] = useState<{
    familyId: string;
    subFamily: SubFamily;
  } | null>(null);

  // -------------------------------
  // Manejo del Sidebar
  // -------------------------------
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // -------------------------------
  // Efectos iniciales
  // -------------------------------
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  useEffect(() => {
    if (hydrated && token && contactId) {
      fetchFamilies();
      fetchAllProducts();
    }
  }, [hydrated, token, contactId]);

  // -------------------------------
  // Fetch de familias (con subfamilias)
  // -------------------------------
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
      setFamilies(json.data); // data es el array de familias con subFamilies
    } catch (err) {
      console.error('Error al cargar las familias', err);
      setError('Error al cargar las familias.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Fetch de productos (para agregarlos a la subfamilia)
  // -------------------------------
  const fetchAllProducts = async () => {
    if (!token || !contactId) return;
    try {
      // Ajusta este método según tu API. Aquí usamos getByContactId de ejemplo.
      const { data } = await ProductService.getByContactId(contactId, token);
      // data debería ser un array de productos
      setAllProducts(data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  // -------------------------------
  // Aplanar subfamilias
  // -------------------------------
  const allSubFamilies = families.flatMap((family) =>
    (family.subFamilies || []).map((sub) => ({
      ...sub,
      familyName: family.name,
      familyId: family.id,
      // Opcionalmente, si tu backend ya guarda showInCatalog, showInOrders, etc.
      // showInCatalog: sub.showInCatalog,
      // showInOrders: sub.showInOrders
    }))
  );

  // -------------------------------
  // Filtro de subfamilias
  // -------------------------------
  const filteredSubFamilies = allSubFamilies.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // =========================================================
  //                 CREACIÓN DE SUBFAMILIA
  // =========================================================
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
    // Limpiar estados del formulario
    setNewSubFamilyName('');
    setSelectedFamilyId('');
    setShowInCatalog(false);
    setShowInOrders(false);
    setSelectedProductIds([]);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddSubFamily = async () => {
    if (!token || !contactId) return;
    if (!newSubFamilyName.trim() || !selectedFamilyId.trim()) {
      alert('Debe ingresar un nombre y seleccionar una familia.');
      return;
    }

    try {
      // 1) Creamos la subfamilia en el backend
      //    Suponiendo que tu backend soporta showInCatalog y showInOrders
      const newSub: SubFamily = await SubFamilyService.createSubFamily(
        {
          contactId,
          familyId: selectedFamilyId,
          name: newSubFamilyName,
          // showInCatalog,
          // showInOrders
        },
        token
      );

      // Aseguramos un ID
      if (!newSub.id) {
        newSub.id = `${Date.now()}`;
      }

      // 2) Actualizamos localmente la lista de familias => agregamos la subfamilia
      setFamilies((prevFamilies) =>
        prevFamilies.map((family) =>
          family.id === selectedFamilyId
            ? { ...family, subFamilies: [...(family.subFamilies || []), newSub] }
            : family
        )
      );

      // 3) Asignar los productos seleccionados a esta subfamilia (si aplica)
      if (selectedProductIds.length > 0) {
        for (const productId of selectedProductIds) {
          const productToUpdate = allProducts.find((p) => p.id === productId);
          if (productToUpdate) {
            // Aquí ajusta la lógica de update según tu API.
            // Suponiendo que el product tiene una prop subFamilyId.
            await ProductService.update(
              {
                ...productToUpdate,
                // subFamilyId: newSub.id,
              },
              token
            );
          }
        }
      }

      handleCloseAddDialog();
    } catch (err) {
      console.error('Error al crear la sub-familia', err);
      alert('Ocurrió un error al crear la sub-familia.');
    }
  };

  // =========================================================
  //                  EDICIÓN DE SUBFAMILIA
  // =========================================================
  const handleOpenEditDialog = (familyId: string, subFamily: SubFamily) => {
    setEditingSubFamily({ familyId, subFamily });
    setEditingSubFamilyName(subFamily.name);
    // Si el backend retorna showInCatalog / showInOrders, aquí podrías setearlos:
    // setEditingShowInCatalog(subFamily.showInCatalog || false);
    // setEditingShowInOrders(subFamily.showInOrders || false);

    // Opcionalmente, si guardas los productos en cada subfamilia,
    // setEditingSelectedProductIds([...los ids de productos que ya tenía asignados...])
    setEditingSelectedProductIds([]);
  };

  const handleCloseEditDialog = () => {
    setEditingSubFamily(null);
    setEditingSubFamilyName('');
    setEditingShowInCatalog(false);
    setEditingShowInOrders(false);
    setEditingSelectedProductIds([]);
  };

  const handleEditSubFamily = async () => {
    if (!editingSubFamily || !editingSubFamilyName.trim() || !token || !contactId) return;
    try {
      // Llamada a updateSubFamily.
      // Asumimos que subFamilyId y name son suficientes (ajusta según tu API).
      const updatedSub: SubFamily = await SubFamilyService.updateSubFamily(
        editingSubFamily.subFamily.id,
        {
          subfamilyId: editingSubFamily.subFamily.id,
          name: editingSubFamilyName,
          // showInCatalog: editingShowInCatalog,
          // showInOrders: editingShowInOrders,
        },
        token
      );

      // Actualizamos en el estado local
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

      // Si cambió la selección de productos, aquí deberíamos hacer las llamadas
      // a productService.update(...) para asignar o desasignar subFamilyId a cada producto.
      // Por simplicidad, este ejemplo solo asigna a los seleccionados:
      if (editingSelectedProductIds.length > 0) {
        for (const productId of editingSelectedProductIds) {
          const productToUpdate = allProducts.find((p) => p.id === productId);
          if (productToUpdate) {
            await ProductService.update(
              {
                ...productToUpdate,
                // subFamilyId: updatedSub.id,
              },
              token
            );
          }
        }
      }

      handleCloseEditDialog();
    } catch (err) {
      console.error('Error al actualizar la sub-familia', err);
      alert('Ocurrió un error al actualizar la sub-familia.');
    }
  };

  // =========================================================
  //                ELIMINACIÓN DE SUBFAMILIA
  // =========================================================
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

  // =========================================================
  //          Render principal de la página
  // =========================================================
  if (!hydrated) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        {/* SIDEBAR */}
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

        {/* CONTENIDO */}
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
                              <IconButton
                                onClick={() => handleOpenDeleteDialog(sub.familyId, sub)}
                              >
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

      {/* -------------------------------------
          DIALOGO: CREAR NUEVA SUB-FAMILIA
      ------------------------------------- */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Nueva Subfamilia</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre de la sub-familia"
            value={newSubFamilyName}
            onChange={(e) => setNewSubFamilyName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
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

          {/* Checkboxes */}
          <FormControlLabel
            control={
              <Checkbox
                checked={showInCatalog}
                onChange={(e) => setShowInCatalog(e.target.checked)}
              />
            }
            label="Mostrar grupo en catálogo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showInOrders}
                onChange={(e) => setShowInOrders(e.target.checked)}
              />
            }
            label="Mostrar grupo en pedidos (vista inventario)"
          />

          {/* Multi-select para agregar productos existentes */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-products-label">Agregar productos</InputLabel>
            <Select
              labelId="select-products-label"
              multiple
              value={selectedProductIds}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedProductIds(typeof value === 'string' ? value.split(',') : value);
              }}
              renderValue={(selected) => {
                // Muestra los nombres de los productos
                const names = allProducts
                  .map((p) => p.name || p.name); // Ajusta según tu campo
                return names.join(', ');
              }}
            >
              {allProducts.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name || product.name}
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
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------------------------
          DIALOGO: EDITAR SUB-FAMILIA
      ------------------------------------- */}
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

          {/* Checkboxes */}
          <FormControlLabel
            control={
              <Checkbox
                checked={editingShowInCatalog}
                onChange={(e) => setEditingShowInCatalog(e.target.checked)}
              />
            }
            label="Mostrar grupo en catálogo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editingShowInOrders}
                onChange={(e) => setEditingShowInOrders(e.target.checked)}
              />
            }
            label="Mostrar grupo en pedidos (vista inventario)"
          />

          {/* Multi-select para (re)asignar productos */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="edit-products-label">Productos en la sub-familia</InputLabel>
            <Select
              labelId="edit-products-label"
              multiple
              value={editingSelectedProductIds}
              onChange={(e) => {
                const value = e.target.value;
                setEditingSelectedProductIds(typeof value === 'string' ? value.split(',') : value);
              }}
              renderValue={(selected) => {
                const names = allProducts
                  .map((p) => p.name || p.name);
                return names.join(', ');
              }}
            >
              {allProducts.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name || product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

      {/* -------------------------------------
          DIALOGO: ELIMINAR SUB-FAMILIA
      ------------------------------------- */}
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
