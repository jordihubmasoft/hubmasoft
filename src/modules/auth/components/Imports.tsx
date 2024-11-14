// src/modules/auth/components/Imports.tsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  Divider,
  Paper,
} from '@mui/material';
import { ExpandMore, Download, Upload, Delete } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { saveAs } from 'file-saver';

// Definición de la interfaz para una subcategoría
interface Subcategory {
  name: string;
  description: string;
  hasUpdateOption: boolean;
  templateUrl: string;
  apiEndpoint: string;
}

// Definición de la interfaz para una categoría
interface Category {
  name: string;
  subcategories: Subcategory[];
}

// Definición de la interfaz para los datos del formulario
interface FormData {
  file: FileList;
  updateExisting: boolean;
}

// Esquema de validación utilizando Yup
const schema = yup.object().shape({
  file: yup
    .mixed()
    .required('El archivo es obligatorio')
    .test('fileType', 'Solo se permiten archivos Excel', (value) => {
      
      return false;
    }),
  updateExisting: yup.boolean(),
});

// Definición de categorías y subcategorías
const categories: Category[] = [
  {
    name: 'Contactos',
    subcategories: [
      {
        name: 'Empresas',
        description: 'Importa datos de empresas.',
        hasUpdateOption: false,
        templateUrl: '/templates/Contactos_Empresas.xlsx',
        apiEndpoint: '/api/imports/contactos/empresas',
      },
      {
        name: 'Autónomos',
        description: 'Importa datos de autónomos.',
        hasUpdateOption: false,
        templateUrl: '/templates/Contactos_Autonomos.xlsx',
        apiEndpoint: '/api/imports/contactos/autonomos',
      },
      {
        name: 'Personas de Contacto',
        description: 'Importa datos de personas de contacto.',
        hasUpdateOption: false,
        templateUrl: '/templates/Contactos_PersonasContacto.xlsx',
        apiEndpoint: '/api/imports/contactos/personas-contacto',
      },
      {
        name: 'Actualizar Contactos Existentes',
        description: 'Actualiza contactos existentes.',
        hasUpdateOption: true,
        templateUrl: '/templates/Contactos_Actualizar.xlsx',
        apiEndpoint: '/api/imports/contactos/actualizar',
      },
      {
        name: 'Actualizar Direcciones de Envío',
        description: 'Actualiza direcciones de envío.',
        hasUpdateOption: true,
        templateUrl: '/templates/Contactos_ActualizarDirecciones.xlsx',
        apiEndpoint: '/api/imports/contactos/actualizar-direcciones',
      },
    ],
  },
  {
    name: 'Ventas',
    subcategories: [
      {
        name: 'Presupuestos',
        description: 'Importa presupuestos de ventas.',
        hasUpdateOption: false,
        templateUrl: '/templates/Ventas_Presupuestos.xlsx',
        apiEndpoint: '/api/imports/ventas/presupuestos',
      },
      {
        name: 'Pedidos',
        description: 'Importa pedidos de ventas.',
        hasUpdateOption: false,
        templateUrl: '/templates/Ventas_Pedidos.xlsx',
        apiEndpoint: '/api/imports/ventas/pedidos',
      },
      {
        name: 'Albaranes',
        description: 'Importa albaranes de ventas.',
        hasUpdateOption: false,
        templateUrl: '/templates/Ventas_Albaranes.xlsx',
        apiEndpoint: '/api/imports/ventas/albaranes',
      },
      {
        name: 'Facturas Proforma',
        description: 'Importa facturas proforma de ventas.',
        hasUpdateOption: false,
        templateUrl: '/templates/Ventas_FacturasProforma.xlsx',
        apiEndpoint: '/api/imports/ventas/facturas-proforma',
      },
      {
        name: 'Tickets de Venta',
        description: 'Importa tickets de venta.',
        hasUpdateOption: false,
        templateUrl: '/templates/Ventas_TicketsVenta.xlsx',
        apiEndpoint: '/api/imports/ventas/tickets-venta',
      },
      {
        name: 'Facturas',
        description: 'Importa facturas de ventas.',
        hasUpdateOption: false,
        templateUrl: '/templates/Ventas_Facturas.xlsx',
        apiEndpoint: '/api/imports/ventas/facturas',
      },
      {
        name: 'Facturas Recurrentes',
        description: 'Importa facturas recurrentes de ventas.',
        hasUpdateOption: false,
        templateUrl: '/templates/Ventas_FacturasRecurrentes.xlsx',
        apiEndpoint: '/api/imports/ventas/facturas-recurrentes',
      },
    ],
  },
  {
    name: 'Compras',
    subcategories: [
      {
        name: 'Presupuestos',
        description: 'Importa presupuestos de compras.',
        hasUpdateOption: false,
        templateUrl: '/templates/Compras_Presupuestos.xlsx',
        apiEndpoint: '/api/imports/compras/presupuestos',
      },
      {
        name: 'Pedidos',
        description: 'Importa pedidos de compras.',
        hasUpdateOption: false,
        templateUrl: '/templates/Compras_Pedidos.xlsx',
        apiEndpoint: '/api/imports/compras/pedidos',
      },
      {
        name: 'Albaranes',
        description: 'Importa albaranes de compras.',
        hasUpdateOption: false,
        templateUrl: '/templates/Compras_Albaranes.xlsx',
        apiEndpoint: '/api/imports/compras/albaranes',
      },
      {
        name: 'Facturas Proforma',
        description: 'Importa facturas proforma de compras.',
        hasUpdateOption: false,
        templateUrl: '/templates/Compras_FacturasProforma.xlsx',
        apiEndpoint: '/api/imports/compras/facturas-proforma',
      },
      {
        name: 'Tickets de Venta',
        description: 'Importa tickets de venta de compras.',
        hasUpdateOption: false,
        templateUrl: '/templates/Compras_TicketsVenta.xlsx',
        apiEndpoint: '/api/imports/compras/tickets-venta',
      },
      {
        name: 'Facturas',
        description: 'Importa facturas de compras.',
        hasUpdateOption: false,
        templateUrl: '/templates/Compras_Facturas.xlsx',
        apiEndpoint: '/api/imports/compras/facturas',
      },
      {
        name: 'Facturas Recurrentes',
        description: 'Importa facturas recurrentes de compras.',
        hasUpdateOption: false,
        templateUrl: '/templates/Compras_FacturasRecurrentes.xlsx',
        apiEndpoint: '/api/imports/compras/facturas-recurrentes',
      },
    ],
  },
  {
    name: 'Inventario',
    subcategories: [
      {
        name: 'Productos',
        description: 'Importa productos al inventario.',
        hasUpdateOption: false,
        templateUrl: '/templates/Inventario_Productos.xlsx',
        apiEndpoint: '/api/imports/inventario/productos',
      },
      {
        name: 'Lotes de Producto',
        description: 'Importa lotes de productos.',
        hasUpdateOption: false,
        templateUrl: '/templates/Inventario_LotesProducto.xlsx',
        apiEndpoint: '/api/imports/inventario/lotes-producto',
      },
      {
        name: 'Actualizar Productos',
        description: 'Actualiza productos existentes.',
        hasUpdateOption: true,
        templateUrl: '/templates/Inventario_ActualizarProductos.xlsx',
        apiEndpoint: '/api/imports/inventario/actualizar-productos',
      },
      {
        name: 'Ajuste de Stock por Referencia',
        description: 'Ajusta el stock por referencia de productos.',
        hasUpdateOption: true,
        templateUrl: '/templates/Inventario_AjusteStock.xlsx',
        apiEndpoint: '/api/imports/inventario/ajuste-stock',
      },
      {
        name: 'Familias',
        description: 'Importa familias de productos.',
        hasUpdateOption: false,
        templateUrl: '/templates/Inventario_Familias.xlsx',
        apiEndpoint: '/api/imports/inventario/familias',
      },
      {
        name: 'Categorías',
        description: 'Importa categorías de productos.',
        hasUpdateOption: false,
        templateUrl: '/templates/Inventario_Categorias.xlsx',
        apiEndpoint: '/api/imports/inventario/categorias',
      },
      {
        name: 'Actualizar Tarifas',
        description: 'Actualiza tarifas de productos.',
        hasUpdateOption: true,
        templateUrl: '/templates/Inventario_ActualizarTarifas.xlsx',
        apiEndpoint: '/api/imports/inventario/actualizar-tarifas',
      },
      {
        name: 'Almacenes',
        description: 'Importa almacenes.',
        hasUpdateOption: false,
        templateUrl: '/templates/Inventario_Almacenes.xlsx',
        apiEndpoint: '/api/imports/inventario/almacenes',
      },
    ],
  },
  {
    name: 'Empleados',
    subcategories: [
      {
        name: 'Gestión de Datos de Empleados',
        description: 'Importa y gestiona datos de empleados.',
        hasUpdateOption: true,
        templateUrl: '/templates/Empleados_GestionDatos.xlsx',
        apiEndpoint: '/api/imports/empleados/gestion-datos',
      },
    ],
  },
  {
    name: 'Proyectos',
    subcategories: [
      {
        name: 'Importar Datos Relacionados con Proyectos',
        description: 'Importa datos relacionados con proyectos.',
        hasUpdateOption: false,
        templateUrl: '/templates/Proyectos_Datos.xlsx',
        apiEndpoint: '/api/imports/proyectos/datos',
      },
    ],
  },
];

const Imports: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    
    defaultValues: {
      file: undefined,
      updateExisting: false,
    },
  });

  // Función para abrir el diálogo de importación
  const handleOpenDialog = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setOpenDialog(true);
    reset({
      file: undefined,
      updateExisting: false,
    });
  };

  // Función para cerrar el diálogo de importación
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSubcategory(null);
    reset({
      file: undefined,
      updateExisting: false,
    });
  };

  // Función para manejar el envío del formulario de importación
  const onSubmit = async (data: FormData) => {
    if (!selectedSubcategory) return;

    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('updateExisting', data.updateExisting.toString());

    try {
      // Aquí debes reemplazar la URL por la de tu backend
      const response = await fetch(selectedSubcategory.apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Datos importados exitosamente',
          severity: 'success',
        });
        handleCloseDialog();
      } else {
        const errorData = await response.json();
        setSnackbar({
          open: true,
          message: `Error al importar datos: ${errorData.message || 'Ocurrió un error'}`,
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error al importar datos: ${(error as Error).message}`,
        severity: 'error',
      });
    }
  };

  // Función para manejar la descarga de la plantilla
  const handleDownloadTemplate = (url: string, name: string) => {
    saveAs(url, name);
  };

  // Función para cerrar el snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ mt: 4, px: { xs: 2, sm: 4, md: 6 }, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: '700' }}>
        Módulo de Importación de Datos
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {/* Panel de Categorías */}
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} key={category.name}>
            <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
              {category.name}
            </Typography>
            {category.subcategories.map((subcategory) => (
              <Accordion key={subcategory.name} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#555' }}>
                    {subcategory.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: '#777', mb: 2 }}>
                    {subcategory.description}
                  </Typography>
                  <Grid container spacing={2}>
                    {/* Descargar Plantilla */}
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        fullWidth
                        onClick={() => handleDownloadTemplate(subcategory.templateUrl, `${subcategory.name}.xlsx`)}
                        sx={{
                          textTransform: 'none',
                          borderColor: '#1A1A40',
                          color: '#1A1A40',
                          '&:hover': {
                            borderColor: '#333366',
                            backgroundColor: '#e3f2fd',
                          },
                        }}
                      >
                        Descargar Plantilla
                      </Button>
                    </Grid>

                    {/* Subir Archivo */}
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        startIcon={<Upload />}
                        fullWidth
                        onClick={() => handleOpenDialog(subcategory)}
                        sx={{
                          bgcolor: '#1A1A40',
                          color: '#FFFFFF',
                          textTransform: 'none',
                          '&:hover': {
                            bgcolor: '#333366',
                          },
                        }}
                      >
                        Subir Archivo
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de Importación */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#1A1A40', color: '#FFFFFF' }}>
          {selectedSubcategory ? `Importar ${selectedSubcategory.name}` : 'Importar Datos'}
        </DialogTitle>
        <DialogContent>
          {selectedSubcategory && (
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {/* Seleccionar Archivo */}
                <Grid item xs={12}>
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        startIcon={<Upload />}
                        sx={{
                          height: '56px',
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                        }}
                      >
                        Seleccionar Archivo
                        
                      </Button>
                    )}
                  />
                  {errors.file && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.file.message}
                    </Typography>
                  )}
                </Grid>

                {/* Checkbox para actualizar registros existentes */}
                {selectedSubcategory.hasUpdateOption && (
                  <Grid item xs={12}>
                    <Controller
                      name="updateExisting"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} />}
                          label="Actualizar registros existentes"
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
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
            Importar
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

export default Imports;
