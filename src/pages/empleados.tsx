import { useState } from 'react';
import {
  Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment,
  TableCell, TableRow, TableBody, Table, TableContainer, TableHead, Checkbox, FormControlLabel, Grid
} from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmployeeDetail from './employeeDetail';

const employeesData = [
  {
    id: 1,
    name: 'Juan Pérez',
    dni: '12345678X',
    socialSecurity: '123456789012',
    position: 'Logistics Operator',
    salaryAnnual: 30000,
    salaryMonthly: 2500,
    address: 'Calle Falsa 123',
    postalCode: '28001',
    city: 'Madrid',
    province: 'Madrid',
    country: 'España',
    email: 'juan.perez@example.com',
    phone: '912345678',
    mobile: '600123456',
    emergencyPhone: '600987654',
    access: ['inventory'],
  },
];

const initialFormData = {
  name: '',
  dni: '',
  socialSecurity: '',
  salaryAnnual: '',
  salaryMonthly: '',
  address: '',
  postalCode: '',
  city: '',
  province: '',
  country: '',
  email: '',
  phone: '',
  mobile: '',
  emergencyPhone: '',
  access: [],
};

const EmployeeForm = ({ open, handleClose, employee, handleSave }) => {
  const [formData, setFormData] = useState(employee || initialFormData);
  const [errors, setErrors] = useState({ name: false, dni: false, email: false, phone: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        access: [...formData.access, e.target.name],
      });
    } else {
      setFormData({
        ...formData,
        access: formData.access.filter((item) => item !== e.target.name),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name,
      dni: !formData.dni,
      email: !formData.email,
      phone: !formData.phone,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave(formData);
      handleClose();
    }
  };

  const accessOptions = [
    { name: 'inventory', label: 'Inventario' },
    { name: 'sales', label: 'Ventas' },
    { name: 'purchases', label: 'Compras' },
    { name: 'clients', label: 'Clientes' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>
        {employee ? 'Editar Empleado' : 'Añadir Empleado'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
          Introduzca la nueva información del empleado
        </DialogContentText>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Nombre y apellidos"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name}
              helperText={errors.name ? 'Este campo es obligatorio' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="DNI"
              name="dni"
              fullWidth
              variant="outlined"
              value={formData.dni}
              onChange={handleChange}
              required
              error={errors.dni}
              helperText={errors.dni ? 'Este campo es obligatorio' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Número Seguridad Social"
              name="socialSecurity"
              fullWidth
              variant="outlined"
              value={formData.socialSecurity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Salario bruto anual"
              name="salaryAnnual"
              fullWidth
              variant="outlined"
              value={formData.salaryAnnual}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Salario bruto mensual"
              name="salaryMonthly"
              fullWidth
              variant="outlined"
              value={formData.salaryMonthly}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Dirección"
              name="address"
              fullWidth
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Código postal"
              name="postalCode"
              fullWidth
              variant="outlined"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Población"
              name="city"
              fullWidth
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Provincia"
              name="province"
              fullWidth
              variant="outlined"
              value={formData.province}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="País"
              name="country"
              fullWidth
              variant="outlined"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Teléfono"
              name="phone"
              fullWidth
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
              required
              error={errors.phone}
              helperText={errors.phone ? 'Este campo es obligatorio' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Móvil"
              name="mobile"
              fullWidth
              variant="outlined"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Teléfono de emergencia"
              name="emergencyPhone"
              fullWidth
              variant="outlined"
              value={formData.emergencyPhone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Correo electrónico"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
              helperText={errors.email ? 'Este campo es obligatorio' : ''}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '500', mt: 3 }}>
          Acceso:
        </Typography>
        <Grid container spacing={2}>
          {accessOptions.map((access) => (
            <Grid item xs={6} sm={3} key={access.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.access.includes(access.name)}
                    onChange={handleCheckboxChange}
                    name={access.name}
                  />
                }
                label={access.label}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#2666CF', border: '1px solid #2666CF', borderRadius: 2 }}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} sx={{ bgcolor: '#2666CF', color: '#ffffff', borderRadius: 2 }}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Employees = () => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState(employeesData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showDetail, setShowDetail] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleOpen = (employee = null) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDetail(true); // Cambiar a la vista de detalles
  };

  const handleBack = () => {
    setShowDetail(false); // Para volver a la lista
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleSave = (employee) => {
    if (selectedEmployee) {
      setEmployees(employees.map((e) => (e.id === employee.id ? employee : e)));
    } else {
      employee.id = employees.length + 1;
      setEmployees([...employees, employee]);
    }
  };

  // Si se ha seleccionado un empleado para ver el detalle
  if (showDetail && selectedEmployee) {
    return <EmployeeDetail employee={selectedEmployee} handleBack={handleBack} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F3F4F6', p: 3 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600' }}>
              Empleados
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField
                variant="outlined"
                placeholder="Buscar..."
                fullWidth
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
                sx={{ ml: 2, bgcolor: '#2666CF', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2 }}
                startIcon={<AddIcon />}
                onClick={() => handleOpen()}
              >
                Agregar
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Posición</TableCell>
                    <TableCell>Salario</TableCell>
                    <TableCell>Correo Electrónico</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} onClick={() => handleRowClick(employee)} sx={{ cursor: 'pointer' }}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.salaryAnnual}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(employee)} sx={{ color: '#1A1A40' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setEmployees(employees.filter((e) => e.id !== employee.id))} sx={{ color: '#B00020' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Box>
      <EmployeeForm open={open} handleClose={handleClose} employee={selectedEmployee} handleSave={handleSave} />
    </Box>
  );
};

export default Employees;