import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Divider,
} from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from '../hooks/useTranslations';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialProjectsData = [
  // Datos iniciales de proyectos
];

const ProjectForm = ({ open, handleClose, project, handleSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(project || { name: '', notes: '' });

  useEffect(() => {
    setFormData(project || { name: '', notes: '' });
  }, [project]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{project ? t('projects.editProject') : t('projects.addProject')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t('projects.name')}
          name="name"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label={t('projects.notes')}
          name="notes"
          fullWidth
          variant="outlined"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('projects.cancel')}</Button>
        <Button onClick={handleSubmit} variant="contained">
          {t('projects.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ColumnForm = ({ open, handleClose, handleSave }) => {
  const { t } = useTranslation();
  const [columnName, setColumnName] = useState('');

  const handleSubmit = () => {
    handleSave(columnName);
    setColumnName('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('projects.addColumn')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t('projects.columnName')}
          fullWidth
          variant="outlined"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('projects.cancel')}</Button>
        <Button onClick={handleSubmit} variant="contained">
          {t('projects.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TaskForm = ({ open, handleClose, handleSave, task }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(task || { name: '', assignedTo: '', completed: false });

  useEffect(() => {
    setFormData(task || { name: '', assignedTo: '', completed: false });
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{task ? t('projects.editTask') : t('projects.addTask')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t('projects.taskName')}
          name="name"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label={t('projects.assignedTo')}
          name="assignedTo"
          fullWidth
          variant="outlined"
          value={formData.assignedTo}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('projects.cancel')}</Button>
        <Button onClick={handleSubmit} variant="contained">
          {t('projects.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [openColumnForm, setOpenColumnForm] = useState(false);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [projects, setProjects] = useState(initialProjectsData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleOpenProjectForm = (project = null) => {
    setSelectedProject(project);
    setOpenProjectForm(true);
  };

  const handleCloseProjectForm = () => {
    setOpenProjectForm(false);
    setSelectedProject(null);
  };

  const handleSaveProject = (project) => {
    if (selectedProject) {
      setProjects(projects.map((p) => (p.id === selectedProject.id ? { ...selectedProject, ...project } : p)));
    } else {
      project.id = projects.length + 1;
      project.columns = [];
      setProjects([...projects, project]);
    }
  };

  const handleOpenColumnForm = (project) => {
    setSelectedProject(project);
    setOpenColumnForm(true);
  };

  const handleCloseColumnForm = () => {
    setOpenColumnForm(false);
    setSelectedProject(null);
  };

  const handleSaveColumn = (columnName) => {
    if (columnName) {
      const newColumn = { name: columnName, tasks: [] };
      const updatedProject = {
        ...selectedProject,
        columns: [...selectedProject.columns, newColumn],
      };
      handleSaveProject(updatedProject);
    }
  };

  const handleOpenTaskForm = (project, column, task = null) => {
    setSelectedProject(project);
    setSelectedColumn(column);
    setSelectedTask(task);
    setOpenTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setOpenTaskForm(false);
    setSelectedProject(null);
    setSelectedColumn(null);
    setSelectedTask(null);
  };

  const handleSaveTask = (taskData) => {
    const updatedTasks = selectedTask
      ? selectedColumn.tasks.map((t) => (t.name === selectedTask.name ? taskData : t))
      : [...selectedColumn.tasks, taskData];

    const updatedColumn = {
      ...selectedColumn,
      tasks: updatedTasks,
    };

    const updatedColumns = selectedProject.columns.map((col) =>
      col.name === selectedColumn.name ? updatedColumn : col
    );

    const updatedProject = {
      ...selectedProject,
      columns: updatedColumns,
    };

    handleSaveProject(updatedProject);
  };

  const handleDragEnd = (result, project) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColIndex = project.columns.findIndex((col) => col.name === source.droppableId);
    const destColIndex = project.columns.findIndex((col) => col.name === destination.droppableId);

    const sourceCol = project.columns[sourceColIndex];
    const destCol = project.columns[destColIndex];

    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    const [removedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, removedTask);
      const newColumn = {
        ...sourceCol,
        tasks: sourceTasks,
      };
      const newColumns = [...project.columns];
      newColumns[sourceColIndex] = newColumn;
      const updatedProject = {
        ...project,
        columns: newColumns,
      };
      handleSaveProject(updatedProject);
    } else {
      destTasks.splice(destination.index, 0, removedTask);
      const newSourceColumn = {
        ...sourceCol,
        tasks: sourceTasks,
      };
      const newDestColumn = {
        ...destCol,
        tasks: destTasks,
      };
      const newColumns = [...project.columns];
      newColumns[sourceColIndex] = newSourceColumn;
      newColumns[destColIndex] = newDestColumn;
      const updatedProject = {
        ...project,
        columns: newColumns,
      };
      handleSaveProject(updatedProject);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        <Box
          component="nav"
          sx={{
            width: isMenuOpen ? '240px' : '70px',
            flexShrink: 0,
            bgcolor: '#1A1A40',
            overflow: 'hidden',
            position: 'fixed',
            height: '100%',
            transition: 'width 0.3s ease',
          }}
        >
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            marginLeft: isMenuOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
              {t('projects.title')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)',
                  color: '#ffffff',
                  fontWeight: '500',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                }}
                startIcon={<AddIcon />}
                onClick={() => handleOpenProjectForm()}
              >
                {t('projects.newProject')}
              </Button>
            </Box>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} key={project.id}>
                  <Paper
                    sx={{
                      p: 3,
                      mb: 3,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      {project.name}
                      <Box>
                        <IconButton onClick={() => handleOpenProjectForm(project)} sx={{ color: '#1A1A40', ml: 1 }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => setProjects(projects.filter((p) => p.id !== project.id))}
                          sx={{ color: '#B00020' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Typography>
                    <Divider sx={{ mb: 1, mt: 2, borderColor: '#CCCCCC' }} />
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#1A1A40',
                        borderColor: '#1A1A40',
                        mb: 2,
                        textTransform: 'none',
                        borderRadius: 2,
                      }}
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenColumnForm(project)}
                    >
                      {t('projects.addColumn')}
                    </Button>
                    <DragDropContext onDragEnd={(result) => handleDragEnd(result, project)}>
                      <Grid container spacing={3}>
                        {project.columns.map((column) => (
                          <Grid item xs={12} sm={6} md={4} key={column.name}>
                            <Paper
                              sx={{
                                p: 2,
                                bgcolor: '#F9FAFB',
                                borderRadius: 2,
                                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Typography
                                variant="h6"
                                align="left"
                                sx={{
                                  fontWeight: '700',
                                  color: '#1A1A40',
                                  mb: 1,
                                  borderBottom: '2px solid #CCCCCC',
                                  pb: 1,
                                }}
                              >
                                {column.name}
                              </Typography>
                              <Button
                                variant="outlined"
                                sx={{
                                  color: '#1A1A40',
                                  borderColor: '#1A1A40',
                                  mb: 2,
                                  textTransform: 'none',
                                  borderRadius: 2,
                                }}
                                onClick={() => handleOpenTaskForm(project, column)}
                              >
                                {t('projects.addTask')}
                              </Button>
                              <Droppable droppableId={column.name}>
                                {(provided) => (
                                  <List ref={provided.innerRef} {...provided.droppableProps} sx={{ padding: 0 }}>
                                    {column.tasks.map((task, index) => (
                                      <Draggable key={task.name} draggableId={task.name} index={index}>
                                        {(provided) => (
                                          <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{
                                              mb: 1,
                                              bgcolor: '#ffffff',
                                              borderRadius: 2,
                                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                              '&:hover': { bgcolor: '#F1F1F1' },
                                            }}
                                          >
                                            <ListItemText primary={task.name} secondary={task.assignedTo} />
                                            <ListItemSecondaryAction>
                                              <IconButton
                                                edge="end"
                                                onClick={() =>
                                                  handleSaveTask({
                                                    ...task,
                                                    completed: !task.completed,
                                                  })
                                                }
                                                sx={{ color: '#1A1A40' }}
                                              >
                                                <Checkbox checked={task.completed} />
                                              </IconButton>
                                              <IconButton
                                                edge="end"
                                                onClick={() => handleOpenTaskForm(project, column, task)}
                                                sx={{ color: '#1A1A40' }}
                                              >
                                                <EditIcon />
                                              </IconButton>
                                              <IconButton
                                                edge="end"
                                                onClick={() => {
                                                  const updatedTasks = column.tasks.filter((t) => t.name !== task.name);
                                                  const updatedColumn = { ...column, tasks: updatedTasks };
                                                  const updatedColumns = project.columns.map((col) =>
                                                    col.name === column.name ? updatedColumn : col
                                                  );
                                                  const updatedProject = { ...project, columns: updatedColumns };
                                                  handleSaveProject(updatedProject);
                                                }}
                                                sx={{ color: '#B00020' }}
                                              >
                                                <DeleteIcon />
                                              </IconButton>
                                            </ListItemSecondaryAction>
                                          </ListItem>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </List>
                                )}
                              </Droppable>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </DragDropContext>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#1A1A40', fontWeight: '500' }}>
                      {t('projects.notes')}
                    </Typography>
                    <Paper
                      sx={{
                        p: 2,
                        mb: 2,
                        bgcolor: '#ffffff',
                        borderRadius: 2,
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <TextField
                        variant="outlined"
                        multiline
                        fullWidth
                        rows={4}
                        value={project.notes}
                        placeholder={t('projects.notesPlaceholder')}
                        onChange={(e) => {
                          const updatedProject = { ...project, notes: e.target.value };
                          handleSaveProject(updatedProject);
                        }}
                        sx={{ bgcolor: '#F7F9FC' }}
                      />
                    </Paper>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      {/* Diálogos */}
      <ProjectForm
        open={openProjectForm}
        handleClose={handleCloseProjectForm}
        project={selectedProject}
        handleSave={handleSaveProject}
      />
      <ColumnForm
        open={openColumnForm}
        handleClose={handleCloseColumnForm}
        handleSave={handleSaveColumn}
      />
      <TaskForm
        open={openTaskForm}
        handleClose={handleCloseTaskForm}
        handleSave={handleSaveTask}
        task={selectedTask}
      />
    </Box>
  );
};

export default Projects;
