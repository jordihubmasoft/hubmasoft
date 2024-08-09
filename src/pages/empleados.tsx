import { useState } from 'react';
import { Box, Container, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from '../hooks/useTranslations';

const employeesData = [
  // Example data for employees
  {
    id: 1,
    name: 'Employee A',
    position: 'Logistics Operator',
    salary: 30000,
    tax: 15,
    socialSecurity: 6,
    email: 'employeeA@company.com',
    phone: '123456789',
    access: ['inventory'],
  },
  // ... more example data
];

const EmployeeForm = ({ open, handleClose, employee, handleSave }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(employee || {
    name: '',
    position: '',
    salary: '',
    tax: '',
    socialSecurity: '',
    email: '',
    phone: '',
    access: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  const accessOptions = [
    { name: 'inventory', label: t('employees.inventory') },
    { name: 'sales', label: t('employees.sales') },
    { name: 'purchases', label: t('employees.purchases') },
    { name: 'clients', label: t('employees.clients') },
    // Add more access options as needed
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>
        {employee ? t('employees.editEmployee') : t('employees.addEmployee')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
          {employee ? t('employees.editEmployee') : t('employees.addEmployee')}
        </DialogContentText>
        <TextField margin="dense" label={t('employees.name')} name="name" fullWidth variant="outlined" value={formData.name} onChange={handleChange} />
        <TextField margin="dense" label={t('employees.position')} name="position" fullWidth variant="outlined" value={formData.position} onChange={handleChange} />
        <TextField margin="dense" label={t('employees.salary')} name="salary" fullWidth variant="outlined" value={formData.salary} onChange={handleChange} />
        <TextField margin="dense" label={t('employees.tax')} name="tax" fullWidth variant="outlined" value={formData.tax} onChange={handleChange} />
        <TextField margin="dense" label={t('employees.socialSecurity')} name="socialSecurity" fullWidth variant="outlined" value={formData.socialSecurity} onChange={handleChange} />
        <TextField margin="dense" label={t('employees.email')} name="email" fullWidth variant="outlined" value={formData.email} onChange={handleChange} />
        <TextField margin="dense" label={t('employees.phone')} name="phone" fullWidth variant="outlined" value={formData.phone} onChange={handleChange} />
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
          {t('employees.access')}:
        </Typography>
        {accessOptions.map((access) => (
          <FormControlLabel
            key={access.name}
            control={<Checkbox checked={formData.access.includes(access.name)} onChange={handleCheckboxChange} name={access.name} />}
            label={access.label}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          {t('employees.cancel')}
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          {t('employees.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Employees = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState(employeesData);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleOpen = (employee = null) => {
    setSelectedEmployee(employee);
    setOpen(true);
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
              {t('employees.title')}
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField 
                variant="outlined" 
                placeholder={t('employees.searchPlaceholder')} 
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
                sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', ml: 2 }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                {t('employees.addEmployee')}
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
                  <TableRow>
                    <TableCell>{t('employees.name')}</TableCell>
                    <TableCell>{t('employees.position')}</TableCell>
                    <TableCell>{t('employees.salary')}</TableCell>
                    <TableCell>{t('employees.email')}</TableCell>
                    <TableCell>{t('employees.phone')}</TableCell>
                    <TableCell>{t('employees.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.salary}</TableCell>
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
