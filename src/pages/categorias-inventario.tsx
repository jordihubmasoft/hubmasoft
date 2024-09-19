import React, { useState } from 'react';
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
  Fade,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Header from 'componentes/Header'; // Assuming you have this component
import Sidebar from 'componentes/Sidebar'; // Assuming you have this component
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const sampleCategories = [
  {
    id: 1,
    name: 'Refrescos',
    products: ['Coca-Cola', 'Pepsi', 'Fanta'],
    showInCatalog: true,
    showInOrders: true,
  },
  {
    id: 2,
    name: 'Ropa',
    products: ['Camiseta', 'Chaqueta', 'Pantalones'],
    showInCatalog: true,
    showInOrders: false,
  },
];


const CategoriasInventario = () => {
  const [categories, setCategories] = useState(sampleCategories);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    showInCatalog: false,
    showInOrders: false,
    products: [],
  });
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleExpandClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleAddCategoryDialogOpen = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleAddCategoryDialogClose = () => {
    setOpenAddCategoryDialog(false);
    setNewCategoryData({
      name: '',
      showInCatalog: false,
      showInOrders: false,
      products: [],
    });
  };

  const handleAddCategory = () => {
    setCategories([...categories, { ...newCategoryData, id: categories.length + 1 }]);
    handleAddCategoryDialogClose();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Color scheme for pie chart
const COLORS = ['#2666CF', '#4CAF50', '#FFA500', '#FF5722', '#8E24AA'];

// Function to get data for the chart based on categories
const getCategoryDataForChart = () => {
  return categories.map((category) => ({
    name: category.name,
    value: category.products.length,
  }));
};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      {/* Header and Sidebar */}
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

        {/* Main Content */}
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
              Categorías de Inventario
            </Typography>

            {/* Search Bar and Add Category Button */}
            <Box sx={{ display: 'flex', mb: 4 }}>
              <TextField
                variant="outlined"
                placeholder="Buscar categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                onClick={handleAddCategoryDialogOpen}
                sx={{
                  bgcolor: '#2666CF',
                  color: '#ffffff',
                  fontWeight: '500',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    bgcolor: '#1A4C97',
                  },
                }}
              >
                Añadir Categoría
              </Button>
            </Box>

            {/* Category Cards */}
            <Grid container spacing={3}>
            {categories
                .filter((category) =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category.id}>
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
                        title={category.name}
                        sx={{ backgroundColor: '#2666CF', color: '#ffffff' }}
                        action={
                        <IconButton
                            onClick={() => handleExpandClick(category.id)}
                            sx={{ color: '#ffffff' }}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                        }
                    />
                    <Collapse in={expandedCategory === category.id} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography variant="body1" sx={{ fontWeight: '500', mb: 1 }}>
                            Productos:
                        </Typography>
                        <List dense>
                            {category.products.length > 0 ? (
                            category.products.map((product, index) => (
                                <ListItem key={index}>
                                <ListItemText primary={product} />
                                </ListItem>
                            ))
                            ) : (
                            <Typography variant="body2" color="textSecondary">
                                No hay productos
                            </Typography>
                            )}
                        </List>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <FormControlLabel
                            control={<Checkbox checked={category.showInCatalog} disabled />}
                            label="Mostrar en Catálogo"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={category.showInOrders} disabled />}
                            label="Mostrar en Pedidos"
                        />
                        </CardContent>
                    </Collapse>
                    </Card>
                </Grid>
                ))}
            </Grid>

            {/* Insert Pie Chart here */}
            <Box sx={{ mt: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                Distribución de Productos por Categoría
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                <Pie
                    data={getCategoryDataForChart()}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {getCategoryDataForChart().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip children={undefined} title={''} />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
            </Box>

          </Container>

          {/* Add Category Dialog */}
          <Dialog open={openAddCategoryDialog} onClose={handleAddCategoryDialogClose} maxWidth="md">
            <DialogTitle>Añadir Nueva Categoría</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Nombre de la categoría"
                value={newCategoryData.name}
                onChange={(e) => setNewCategoryData({ ...newCategoryData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newCategoryData.showInCatalog}
                    onChange={(e) =>
                      setNewCategoryData({
                        ...newCategoryData,
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
                    checked={newCategoryData.showInOrders}
                    onChange={(e) =>
                      setNewCategoryData({
                        ...newCategoryData,
                        showInOrders: e.target.checked,
                      })
                    }
                  />
                }
                label="Mostrar en Pedidos"
              />

              {/* Products field (TextField for now) */}
              <TextField
                fullWidth
                label="Agregar productos (separados por coma)"
                placeholder="Escribe los nombres de los productos"
                value={newCategoryData.products.join(', ')}
                onChange={(e) =>
                  setNewCategoryData({
                    ...newCategoryData,
                    products: e.target.value.split(',').map((p) => p.trim()),
                  })
                }
                sx={{ mt: 2 }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Ejemplos: Bebidas → Refrescos, Aguas, Cafés, Cervezas; Ropa → Chaquetas, Camisas
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddCategoryDialogClose}>Cancelar</Button>
              <Button
                onClick={handleAddCategory}
                variant="contained"
                sx={{ bgcolor: '#2666CF', color: '#ffffff', '&:hover': { bgcolor: '#1A4C97' } }}
              >
                Crear Categoría
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoriasInventario;
