import { useState } from 'react'
import { Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, FormControlLabel } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

const proyectosData = [
  // Datos de ejemplo para proyectos
  {
    id: 1,
    nombre: 'Proyecto A',
    columnas: [
      {
        nombre: 'To Do',
        tareas: [
          { nombre: 'Tarea 1', asignado: 'Empleado A', completado: false },
          { nombre: 'Tarea 2', asignado: 'Empleado B', completado: false },
        ],
      },
      {
        nombre: 'In Progress',
        tareas: [
          { nombre: 'Tarea 3', asignado: 'Empleado C', completado: false },
        ],
      },
    ],
    notas: 'Notas del proyecto A',
  },
  // ... más datos de ejemplo
]

const ProyectoForm = ({ open, handleClose, proyecto, handleSave }) => {
  const [formData, setFormData] = useState(proyecto || { nombre: '', columnas: [], notas: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    handleSave(formData)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{proyecto ? 'Editar Proyecto' : 'Agregar Proyecto'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {proyecto ? 'Edita la información del proyecto' : 'Introduce la información del nuevo proyecto'}
        </DialogContentText>
        <TextField margin="dense" label="Nombre" name="nombre" fullWidth variant="outlined" value={formData.nombre} onChange={handleChange} />
        <TextField margin="dense" label="Notas" name="notas" fullWidth variant="outlined" value={formData.notas} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Proyectos = () => {
  const [open, setOpen] = useState(false)
  const [selectedProyecto, setSelectedProyecto] = useState(null)
  const [proyectos, setProyectos] = useState(proyectosData)

  const handleOpen = (proyecto = null) => {
    setSelectedProyecto(proyecto)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProyecto(null)
  }

  const handleSave = (proyecto) => {
    if (selectedProyecto) {
      setProyectos(proyectos.map((p) => (p.id === proyecto.id ? proyecto : p)))
    } else {
      proyecto.id = proyectos.length + 1
      setProyectos([...proyectos, proyecto])
    }
  }

  const handleAddColumn = (proyecto) => {
    const nombreColumna = prompt('Nombre de la columna:')
    if (nombreColumna) {
      const newProyecto = {
        ...proyecto,
        columnas: [...proyecto.columnas, { nombre: nombreColumna, tareas: [] }],
      }
      handleSave(newProyecto)
    }
  }

  const handleAddTask = (columna) => {
    const nombreTarea = prompt('Nombre de la tarea:')
    const asignado = prompt('Asignar a:')
    if (nombreTarea && asignado) {
      const newColumna = {
        ...columna,
        tareas: [...columna.tareas, { nombre: nombreTarea, asignado, completado: false }],
      }
      const newProyecto = {
        ...selectedProyecto,
        columnas: selectedProyecto.columnas.map((col) => (col.nombre === columna.nombre ? newColumna : col)),
      }
      handleSave(newProyecto)
    }
  }

  const handleToggleTask = (columna, tarea) => {
    const newTarea = { ...tarea, completado: !tarea.completado }
    const newColumna = {
      ...columna,
      tareas: columna.tareas.map((t) => (t.nombre === tarea.nombre ? newTarea : t)),
    }
    const newProyecto = {
      ...selectedProyecto,
      columnas: selectedProyecto.columnas.map((col) => (col.nombre === columna.nombre ? newColumna : col)),
    }
    handleSave(newProyecto)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#EFFFFD' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          component="nav"
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: '#1A1A40',
            borderRight: 1,
            borderColor: 'divider'
          }}
        >
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#EFFFFD',
            p: 3,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
              Proyectos
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Button 
                variant="contained" 
                sx={{ bgcolor: '#ffffff', color: '#000000', ml: 2 }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                Nuevo Proyecto
              </Button>
            </Box>
            <Grid container spacing={3}>
              {proyectos.map((proyecto) => (
                <Grid item xs={12} key={proyecto.id}>
                  <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      {proyecto.nombre}
                      <IconButton onClick={() => handleOpen(proyecto)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => setProyectos(proyectos.filter((p) => p.id !== proyecto.id))}>
                        <DeleteIcon />
                      </IconButton>
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ color: '#000000', borderColor: '#000000' }}
                      onClick={() => handleAddColumn(proyecto)}
                    >
                      Añadir Columna
                    </Button>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      {proyecto.columnas.map((columna, colIndex) => (
                        <Grid item xs={12} md={4} key={colIndex}>
                          <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              {columna.nombre}
                            </Typography>
                            <Button 
                              variant="outlined" 
                              sx={{ color: '#000000', borderColor: '#000000', mb: 2 }}
                              onClick={() => handleAddTask(columna)}
                            >
                              Añadir Tarea
                            </Button>
                            <List>
                              {columna.tareas.map((tarea, taskIndex) => (
                                <ListItem key={taskIndex} dense button>
                                  <ListItemText primary={tarea.nombre} secondary={tarea.asignado} />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => handleToggleTask(columna, tarea)}>
                                      <Checkbox checked={tarea.completado} />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleAddTask(columna)}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => {
                                      const newColumna = {
                                        ...columna,
                                        tareas: columna.tareas.filter((t) => t.nombre !== tarea.nombre),
                                      }
                                      const newProyecto = {
                                        ...selectedProyecto,
                                        columnas: selectedProyecto.columnas.map((col) => (col.nombre === columna.nombre ? newColumna : col)),
                                      }
                                      handleSave(newProyecto)
                                    }}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              ))}
                            </List>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                    <Typography variant="h6" gutterBottom>
                      Notas
                    </Typography>
                    <Paper sx={{ p: 2, mb: 2 }}>
                      <TextField
                        variant="outlined"
                        multiline
                        fullWidth
                        rows={4}
                        value={proyecto.notas}
                        onChange={(e) => {
                          const newProyecto = { ...proyecto, notas: e.target.value }
                          handleSave(newProyecto)
                        }}
                      />
                    </Paper>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      <ProyectoForm open={open} handleClose={handleClose} proyecto={selectedProyecto} handleSave={handleSave} />
    </Box>
  )
}

export default Proyectos
