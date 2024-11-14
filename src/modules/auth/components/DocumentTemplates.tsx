// src/modules/auth/components/DocumentTemplates.tsx
import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete, ExpandMore } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Definición de la interfaz para una plantilla
interface Template {
  id: number;
  name: string;
  preview: string; // URL de la miniatura
}

// Definición de la interfaz para los datos del formulario
interface FormData {
  name: string;
  preview: string;
  documentFormat: string;
  logoSize: string;
  font: string;
  textColor: string;
  orientation: string;
  watermark: string;
  footerInfo: string;
  columnSettings: string;
  tableConfig: string;
  legalFields: string;
  companyInfo: string;
  productInfo: string;
  documentName: string;
  customHTML: string;
}

// Esquema de validación utilizando Yup
const schema = yup.object().shape({
  name: yup.string().required('El nombre de la plantilla es obligatorio'),
  documentFormat: yup.string().required('El formato de documento es obligatorio'),
  logoSize: yup.string().required('El tamaño del logo es obligatorio'),
  font: yup.string().required('La tipografía es obligatoria'),
  textColor: yup.string().required('El color de texto es obligatorio'),
  orientation: yup.string().required('La orientación es obligatoria'),
  // Otros campos pueden tener validaciones opcionales o requeridas según sea necesario
});

const predefinedTemplates: Template[] = [
  { id: 1, name: 'Factura Básica', preview: '/templates/factura_basica.png' },
  { id: 2, name: 'Presupuesto', preview: '/templates/presupuesto.png' },
  // Añade más plantillas predefinidas según sea necesario
];

const DocumentTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(predefinedTemplates);
  const [open, setOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    
    defaultValues: {
      name: '',
      preview: '',
      documentFormat: '',
      logoSize: '',
      font: '',
      textColor: '#000000',
      orientation: '',
      watermark: '',
      footerInfo: '',
      columnSettings: '',
      tableConfig: '',
      legalFields: '',
      companyInfo: '',
      productInfo: '',
      documentName: '',
      customHTML: '',
    },
  });

  const handleOpen = (template?: Template) => {
    if (template) {
      setEditingTemplate(template);
      reset({
        name: template.name,
        preview: template.preview,
        documentFormat: '',
        logoSize: '',
        font: '',
        textColor: '#000000',
        orientation: '',
        watermark: '',
        footerInfo: '',
        columnSettings: '',
        tableConfig: '',
        legalFields: '',
        companyInfo: '',
        productInfo: '',
        documentName: '',
        customHTML: '',
      });
    } else {
      setEditingTemplate(null);
      reset();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTemplate(null);
    reset();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta plantilla?')) {
      setTemplates(templates.filter((template) => template.id !== id));
      setSnackbar({ open: true, message: 'Plantilla eliminada exitosamente', severity: 'success' });
    }
  };

  const onSubmit = (data: FormData) => {
    if (editingTemplate) {
      // Actualizar plantilla existente
      setTemplates(
        templates.map((template) =>
          template.id === editingTemplate.id
            ? { ...template, name: data.name, preview: data.preview }
            : template
        )
      );
      setSnackbar({ open: true, message: 'Plantilla actualizada exitosamente', severity: 'success' });
    } else {
      // Añadir nueva plantilla
      const newTemplate: Template = {
        id: Date.now(),
        name: data.name,
        preview: data.preview || '/templates/default.png', // Ruta por defecto
      };
      setTemplates([...templates, newTemplate]);
      setSnackbar({ open: true, message: 'Plantilla añadida exitosamente', severity: 'success' });
    }
    handleClose();
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setValue('preview', ev.target.result as string, { shouldValidate: true });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ mt: 4, px: { xs: 2, sm: 4, md: 6 }, bgcolor: '#f9f9fc', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: '700' }}>
        Plantillas de Documento
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Botón para añadir nueva plantilla */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
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
          Añadir Nueva Plantilla
        </Button>
      </Box>

      {/* Lista de plantillas */}
      <Grid container spacing={4}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card
              sx={{
                padding: 2,
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Box
                component="img"
                src={template.preview}
                alt={template.name}
                sx={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h6" sx={{ mb: 1.5, textAlign: 'center', color: '#1A1A40', fontWeight: '600' }}>
                {template.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  color="primary"
                  onClick={() => handleOpen(template)}
                  aria-label="editar plantilla"
                  sx={{
                    bgcolor: '#e3f2fd',
                    '&:hover': {
                      bgcolor: '#bbdefb',
                    },
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(template.id)}
                  aria-label="eliminar plantilla"
                  sx={{
                    bgcolor: '#ffebee',
                    '&:hover': {
                      bgcolor: '#ffcdd2',
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para añadir/editar plantilla */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: '#1A1A40', color: '#FFFFFF' }}>
          {editingTemplate ? 'Editar Plantilla' : 'Añadir Nueva Plantilla'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stepper activeStep={-1} alternativeLabel>
              <Step>
                <StepLabel>Información Básica</StepLabel>
              </Step>
              <Step>
                <StepLabel>Diseño y Formato</StepLabel>
              </Step>
              <Step>
                <StepLabel>Personalización</StepLabel>
              </Step>
              <Step>
                <StepLabel>Campos</StepLabel>
              </Step>
              <Step>
                <StepLabel>Opciones Avanzadas</StepLabel>
              </Step>
            </Stepper>
          </Box>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            {/* Información Básica */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: '600' }}>Información Básica</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* Nombre de plantilla */}
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Nombre de plantilla"
                          variant="outlined"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* Plantillas predefinidas */}
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Seleccionar plantilla predefinida</InputLabel>
                      <Controller
                        name="preview"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            label="Seleccionar plantilla predefinida"
                          >
                            <MenuItem value="">
                              <em>Ninguna</em>
                            </MenuItem>
                            {predefinedTemplates.map((template) => (
                              <MenuItem key={template.id} value={template.preview}>
                                {template.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Diseño y Formato */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: '600' }}>Diseño y Formato</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* Formato de documento */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="documentFormat"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Formato de documento"
                          variant="outlined"
                          error={!!errors.documentFormat}
                          helperText={errors.documentFormat?.message}
                        >
                          <MenuItem value="PDF">PDF</MenuItem>
                          <MenuItem value="Print">Imprimir</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Logo */}
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{
                        height: '56px',
                        textTransform: 'none',
                        bgcolor: '#f5f5f5',
                        color: '#1A1A40',
                        '&:hover': {
                          bgcolor: '#e0e0e0',
                        },
                      }}
                    >
                      Cargar Logo
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleLogoUpload}
                      />
                    </Button>
                  </Grid>

                  {/* Tamaño del logo */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="logoSize"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Tamaño del logo"
                          variant="outlined"
                          error={!!errors.logoSize}
                          helperText={errors.logoSize?.message}
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Personalización */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: '600' }}>Personalización</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* Tipografía */}
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="font"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Tipografía"
                          variant="outlined"
                          error={!!errors.font}
                          helperText={errors.font?.message}
                        >
                          <MenuItem value="Arial">Arial</MenuItem>
                          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                          <MenuItem value="Calibri">Calibri</MenuItem>
                          <MenuItem value="Verdana">Verdana</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Color de texto */}
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="textColor"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Color de texto"
                          type="color"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={!!errors.textColor}
                          helperText={errors.textColor?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* Orientación */}
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="orientation"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Orientación"
                          variant="outlined"
                          error={!!errors.orientation}
                          helperText={errors.orientation?.message}
                        >
                          <MenuItem value="vertical">Vertical</MenuItem>
                          <MenuItem value="horizontal">Horizontal</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Marcas de agua */}
                  <Grid item xs={12}>
                    <Controller
                      name="watermark"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Marca de agua"
                          variant="outlined"
                          placeholder='Ejemplo: "Factura", "Presupuesto", etc.'
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Campos */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: '600' }}>Campos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* Información en el pie de página */}
                  <Grid item xs={12}>
                    <Controller
                      name="footerInfo"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Información en el pie de página"
                          variant="outlined"
                          multiline
                          rows={3}
                          placeholder="Añade información personalizada para el pie de página."
                        />
                      )}
                    />
                  </Grid>

                  {/* Orden y visibilidad de columnas */}
                  <Grid item xs={12}>
                    <Controller
                      name="columnSettings"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Orden y visibilidad de columnas"
                          variant="outlined"
                          multiline
                          rows={3}
                          placeholder="Configura el orden y la visibilidad de las columnas en la tabla."
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Opciones avanzadas */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: '600' }}>Opciones Avanzadas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* Configuración de la tabla */}
                  <Grid item xs={12}>
                    <Controller
                      name="tableConfig"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Configuración de la tabla"
                          variant="outlined"
                          multiline
                          rows={3}
                          placeholder="Configura los elementos visibles en la tabla del documento (nombre, descripción, precio, unidades, etc.)."
                        />
                      )}
                    />
                  </Grid>

                  {/* Campos legales */}
                  <Grid item xs={12}>
                    <Controller
                      name="legalFields"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Campos legales"
                          variant="outlined"
                          multiline
                          rows={3}
                          placeholder="Añade texto legal o condiciones en los documentos."
                        />
                      )}
                    />
                  </Grid>

                  {/* Información de la empresa */}
                  <Grid item xs={12}>
                    <Controller
                      name="companyInfo"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Información de la empresa"
                          variant="outlined"
                          multiline
                          rows={3}
                          placeholder="Personaliza qué datos de la empresa aparecerán (nombre, dirección, teléfono, etc.)."
                        />
                      )}
                    />
                  </Grid>

                  {/* Información del producto */}
                  <Grid item xs={12}>
                    <Controller
                      name="productInfo"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Información del producto"
                          variant="outlined"
                          multiline
                          rows={3}
                          placeholder="Configura qué detalles de los productos se mostrarán (SKU, descripción, impuestos, etc.)."
                        />
                      )}
                    />
                  </Grid>

                  {/* Nombre del documento */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="documentName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Nombre del documento"
                          variant="outlined"
                          placeholder='Ejemplo: "Factura", "Presupuesto"'
                        />
                      )}
                    />
                  </Grid>

                  {/* HTML personalizado */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="customHTML"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="HTML personalizado"
                          variant="outlined"
                          multiline
                          rows={3}
                          placeholder="Personaliza la plantilla utilizando código HTML."
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#555', textTransform: 'none' }}>
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
            Guardar
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

export default DocumentTemplates;
