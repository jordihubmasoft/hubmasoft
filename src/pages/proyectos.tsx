import { useState } from 'react';
import { Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from '../hooks/useTranslations';

const projectsData = [
  // Example data for projects
  {
    id: 1,
    name: 'Project A',
    columns: [
      {
        name: 'To Do',
        tasks: [
          { name: 'Task 1', assignedTo: 'Employee A', completed: false },
          { name: 'Task 2', assignedTo: 'Employee B', completed: false },
        ],
      },
      {
        name: 'In Progress',
        tasks: [
          { name: 'Task 3', assignedTo: 'Employee C', completed: false },
        ],
      },
    ],
    notes: 'Notes for project A',
  },
  // ... more example data
];

const ProjectForm = ({ open, handleClose, project, handleSave }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(project || { name: '', columns: [], notes: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>
        {project ? t('projects.editProject') : t('projects.addProject')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
          {project ? t('projects.editProject') : t('projects.addProject')}
        </DialogContentText>
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          {t('projects.cancel')}
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          {t('projects.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(projectsData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleOpen = (project = null) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  const handleSave = (project) => {
    if (selectedProject) {
      setProjects(projects.map((p) => (p.id === project.id ? project : p)));
    } else {
      project.id = projects.length + 1;
      setProjects([...projects, project]);
    }
  };

  const handleAddColumn = (project) => {
    const columnName = prompt(t('projects.addColumn'));
    if (columnName) {
      const newProject = {
        ...project,
        columns: [...project.columns, { name: columnName, tasks: [] }],
      };
      handleSave(newProject);
    }
  };

  const handleAddTask = (column) => {
    const taskName = prompt(t('projects.addTask'));
    const assignedTo = prompt(t('projects.name'));
    if (taskName && assignedTo) {
      const newColumn = {
        ...column,
        tasks: [...column.tasks, { name: taskName, assignedTo, completed: false }],
      };
      const newProject = {
        ...selectedProject,
        columns: selectedProject.columns.map((col) => (col.name === column.name ? newColumn : col)),
      };
      handleSave(newProject);
    }
  };

  const handleToggleTask = (column, task) => {
    const newTask = { ...task, completed: !task.completed };
    const newColumn = {
      ...column,
      tasks: column.tasks.map((t) => (t.name === task.name ? newTask : t)),
    };
    const newProject = {
      ...selectedProject,
      columns: selectedProject.columns.map((col) => (col.name === column.name ? newColumn : col)),
    };
    handleSave(newProject);
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
            borderRight: 'none',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1201,
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
            transition: 'margin-left 0.3s ease',
            marginLeft: isMenuOpen ? '240px' : '70px',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
              {t('projects.title')}
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Button 
                variant="contained" 
                sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', ml: 2 }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                {t('projects.newProject')}
              </Button>
            </Box>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} key={project.id}>
                  <Paper sx={{ p: 2, mb: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                    <Typography variant="h5" gutterBottom>
                      {project.name}
                      <IconButton onClick={() => handleOpen(project)} sx={{ color: '#1A1A40', ml: 2 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => setProjects(projects.filter((p) => p.id !== project.id))} sx={{ color: '#B00020' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ color: '#1A1A40', borderColor: '#1A1A40' }}
                      onClick={() => handleAddColumn(project)}
                    >
                      {t('projects.addColumn')}
                    </Button>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      {project.columns.map((column, colIndex) => (
                        <Grid item xs={12} md={4} key={colIndex}>
                          <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              {column.name}
                            </Typography>
                            <Button 
                              variant="outlined" 
                              sx={{ color: '#1A1A40', borderColor: '#1A1A40', mb: 2 }}
                              onClick={() => handleAddTask(column)}
                            >
                              {t('projects.addTask')}
                            </Button>
                            <List>
                              {column.tasks.map((task, taskIndex) => (
                                <ListItem key={taskIndex} dense button sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                                  <ListItemText primary={task.name} secondary={task.assignedTo} />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => handleToggleTask(column, task)} sx={{ color: '#1A1A40' }}>
                                      <Checkbox checked={task.completed} />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleAddTask(column)} sx={{ color: '#1A1A40' }}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => {
                                      const newColumn = {
                                        ...column,
                                        tasks: column.tasks.filter((t) => t.name !== task.name),
                                      };
                                      const newProject = {
                                        ...selectedProject,
                                        columns: selectedProject.columns.map((col) => (col.name === column.name ? newColumn : col)),
                                      };
                                      handleSave(newProject);
                                    }} sx={{ color: '#B00020' }}>
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
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      {t('projects.notes')}
                    </Typography>
                    <Paper sx={{ p: 2, mb: 2 }}>
                      <TextField
                        variant="outlined"
                        multiline
                        fullWidth
                        rows={4}
                        value={project.notes}
                        placeholder={t('projects.notesPlaceholder')}
                        onChange={(e) => {
                          const newProject = { ...project, notes: e.target.value };
                          handleSave(newProject);
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
      <ProjectForm open={open} handleClose={handleClose} project={selectedProject} handleSave={handleSave} />
    </Box>
  );
};

export default Projects;
