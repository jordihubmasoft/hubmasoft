import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tab,
  Tabs,
  Paper,
  Grid,
  Avatar,
  Tooltip,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Modal
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Today from '@mui/icons-material/Today';
import ViewWeek from '@mui/icons-material/ViewWeek';
import CalendarToday from '@mui/icons-material/CalendarToday';

const EventModal = ({ open, onClose, selectedDate, handleAddEvent }) => {
  const [eventDetails, setEventDetails] = useState('');

  const handleSave = () => {
    if (eventDetails) {
      handleAddEvent(selectedDate, eventDetails);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Event on {selectedDate?.toLocaleDateString()}
        </Typography>
        <input
          type="text"
          value={eventDetails}
          onChange={(e) => setEventDetails(e.target.value)}
          placeholder="Event details"
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px' }}
        />
        <Button variant="contained" onClick={handleSave} fullWidth>
          Save Event
        </Button>
      </Box>
    </Modal>
  );
};

// Función para generar el calendario interactivo
const Calendar = ({ selectedDates, handleDaySelect, handleAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false); // Control del modal
  const [selectedDate, setSelectedDate] = useState(null); // Día seleccionado

  const getDaysInMonth = (date) => {
    const days = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Días vacíos antes del comienzo del mes
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
    setCurrentDate(newDate);
  };

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDate(day);
      setOpenModal(true); // Abrir modal al seleccionar día
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Cabecera del calendario */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button onClick={() => changeMonth(-1)}>
          <ArrowBackIos />
        </Button>
        <Typography variant="h5">{`${monthName} ${year}`}</Typography>
        <Button onClick={() => changeMonth(1)}>
          <ArrowForwardIos />
        </Button>
      </Box>

      {/* Selector de vistas */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <IconButton>
          <Today />
        </IconButton>
        <IconButton>
          <ViewWeek />
        </IconButton>
        <IconButton>
          <CalendarToday />
        </IconButton>
      </Box>

      {/* Cabecera del calendario */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', mb: 2 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Typography key={index} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </Typography>
        ))}
      </Box>

      {/* Días del calendario */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
        {days.map((day, index) => (
          <Tooltip key={index} title={day && selectedDates[day]?.event ? selectedDates[day].event : 'No events'} arrow>
            <Button
              onClick={() => handleDayClick(day)}
              sx={{
                padding: '10px',
                borderRadius: '10px',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                backgroundColor: day && day.toDateString() === new Date().toDateString() ? '#1E90FF' : '#FFF',
                color: day ? '#000' : '#CCC',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  transform: 'scale(1.05)'
                },
                boxShadow: day ? '0px 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {day ? day.getDate() : ''}
            </Button>
          </Tooltip>
        ))}
      </Box>

      <EventModal open={openModal} onClose={() => setOpenModal(false)} selectedDate={selectedDate} handleAddEvent={handleAddEvent} />
    </Box>
  );
};

const EmployeeDetail = ({ employee, handleBack }) => {
  const [selectedTab, setSelectedTab] = useState(0); // Pestaña seleccionada
  const [selectedDates, setSelectedDates] = useState([]); // Días seleccionados en el calendario
  const [dayType, setDayType] = useState(''); // Tipo de día seleccionado (personal, festivo, vacaciones)

  // Función para manejar la adición de eventos
  const handleAddEvent = (date, details) => {
    const dateString = date.toDateString();
    setSelectedDates({
      ...selectedDates,
      [dateString]: { date, event: details }
    });
  };
  const handleDaySelect = (date) => {
    const dateString = date.toDateString();
    if (selectedDates.some((d) => d.date.toDateString() === dateString)) {
      setSelectedDates(selectedDates.filter((d) => d.date.toDateString() !== dateString));
    } else {
      setSelectedDates([...selectedDates, { date, type: dayType }]);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleChangePassword = () => {
    alert('Funcionalidad para cambiar la contraseña.');
  };

  const handleEmailClick = () => {
    alert('Funcionalidad para enviar un email.');
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#F3F4F6', p: 3, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Contenedor del botón de retroceso y el nombre del empleado */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={handleBack} sx={{ color: '#1A1A40', mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
            {employee?.name || 'Empleado Desconocido'}
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          aria-label="employee tabs"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '.MuiTab-root': {
              fontWeight: '600',
              transition: 'color 0.3s ease',
              '&:hover': { color: '#1E90FF' }
            }
          }}
        >
          <Tab label="Información de contacto" />
          <Tab label="Entradas y salidas" />
          <Tab label="Calendario" />
          <Tab label="Nóminas" />
        </Tabs>

        {/* Contenido de las pestañas */}
        {selectedTab === 0 && (
          <Box mt={4}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
                    Datos fiscales:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Tooltip title="Nombre completo del empleado" arrow>
                        <Typography variant="body1">
                          <strong>Nombre:</strong> {employee?.name || 'N/A'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Número de identificación del empleado" arrow>
                        <Typography variant="body1">
                          <strong>DNI:</strong> {employee?.dni || 'Dni no encontrado'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Tooltip title="Dirección de residencia del empleado" arrow>
                        <Typography variant="body1">
                          <LocationOnIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />
                          <strong>Dirección:</strong> {employee?.address || 'Dirección no encontrada'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Código postal de la dirección" arrow>
                        <Typography variant="body1">
                          <strong>Código postal:</strong> {employee?.postalCode || 'Código postal no encontrado'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Ciudad de residencia del empleado" arrow>
                        <Typography variant="body1">
                          <strong>Población:</strong> {employee?.city || 'Ciudad no encontrada'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Provincia de residencia del empleado" arrow>
                        <Typography variant="body1">
                          <strong>Provincia:</strong> {employee?.province || 'Provincia no encontrada'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="País de residencia del empleado" arrow>
                        <Typography variant="body1">
                          <strong>País:</strong> {employee?.country || 'País no encontrado'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>

                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', mt: 4 }}>
                    Datos de contacto:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Tooltip title="Número de teléfono del empleado" arrow>
                        <Typography variant="body1">
                          <PhoneIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />
                          <strong>Teléfono:</strong> {employee?.phone || 'Número no encontrado'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Teléfono móvil del empleado" arrow>
                        <Typography variant="body1">
                          <PhoneIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />
                          <strong>Móvil:</strong> {employee?.mobile || 'Móvil no encontrado'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Tooltip title="Correo electrónico del empleado" arrow>
                        <Typography variant="body1">
                          <EmailIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />
                          <strong>Correo electrónico:</strong> {employee?.email || 'Correo no encontrado'}
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>

                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', mt: 4 }}>
                    Inicio de sesión:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>DNI:</strong> {employee?.dni || 'Dni no encontrado'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Contraseña:</strong> ********
                        <IconButton size="small" onClick={handleChangePassword} sx={{ ml: 1 }}>
                          <LockIcon />
                        </IconButton>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="outlined" onClick={handleEmailClick} sx={{ mt: 2 }}>
                        Enviar credenciales por correo
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Imagen del empleado */}
                <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Avatar
                    alt={employee?.name || 'Empleado'}
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      width: 200,
                      height: 200,
                      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                      transition: '0.3s',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}

        {selectedTab === 1 && (
          <Box mt={4}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3, backgroundColor: '#FFF' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1A1A40' }}>
                    <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Horario habitual
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1">
                    <strong>Horario de entrada:</strong> 09:00
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Horario de salida:</strong> 17:00
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1A1A40' }}>
                    <CalendarMonthIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Festivos y vacaciones
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1">
                    <strong>Festivos:</strong> 11 Día de Cataluña
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Vacaciones:</strong> No hay vacaciones este mes
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3, backgroundColor: '#FFF' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1A1A40' }}>
                    <CalendarMonthIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Calendario de entradas y salidas
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {/* Calendario personalizado */}
                  <Calendar selectedDates={selectedDates} handleDaySelect={handleDaySelect} handleAddEvent={handleAddEvent} />

                  <Typography variant="body2" sx={{ color: '#B0B0B0', mt: 2 }}>
                    * Los días marcados en azul son las entradas seleccionadas.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {selectedTab === 2 && (
          <Box mt={3}>
            <Typography variant="h6">Calendario:</Typography>
            {/* Botones para seleccionar el tipo de día */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mb: 3 }}>
              <Button variant="contained" onClick={() => setDayType('personal')} sx={{ bgcolor: '#FFBF00' }}>
                Día Personal
              </Button>
              <Button variant="contained" onClick={() => setDayType('festivo')} sx={{ bgcolor: '#FFD700' }}>
                Festivo
              </Button>
              <Button variant="contained" onClick={() => setDayType('vacaciones')} sx={{ bgcolor: '#1E90FF' }}>
                Vacaciones
              </Button>
            </Box>

            {/* Calendario */}
            <Calendar selectedDates={selectedDates} handleDaySelect={handleDaySelect} handleAddEvent={handleAddEvent} />

            {/* Leyenda */}
            <Typography variant="body2" sx={{ color: '#B0B0B0', mt: 2 }}>
              * Selecciona un día en el calendario para marcarlo según el tipo seleccionado.
            </Typography>
          </Box>
        )}

        {selectedTab === 3 && (
          <Box mt={3}>
            <Typography variant="h6">Nóminas:</Typography>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 2,
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                mt: 2
              }}
            >
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>Mes</TableCell>
                    <TableCell>Fecha de pago</TableCell>
                    <TableCell>Salario neto</TableCell>
                    <TableCell>Coste empresa</TableCell>
                    <TableCell>Archivo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Enero</TableCell>
                    <TableCell>25/01/2024</TableCell>
                    <TableCell>1,790.64€</TableCell>
                    <TableCell>2,468.98€</TableCell>
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell>Febrero</TableCell>
                    <TableCell>25/02/2024</TableCell>
                    <TableCell>1,790.64€</TableCell>
                    <TableCell>2,468.98€</TableCell>
                    <TableCell>
                      {/* Export real PDF */}
                      <Button
                        href="/static/pdfs/nominafelix224.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textTransform: 'none', color: '#2666CF', fontWeight: '500' }}
                      >
                        Descargar PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EmployeeDetail;
