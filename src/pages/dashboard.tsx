import { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';
import { useTranslation } from '../hooks/useTranslations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [userType, setUserType] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: logic to save additional user information
    setOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [500, 400, 600, 700, 800, 900, 1000],
        borderColor: '#2666CF',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Purchases',
        data: [300, 200, 400, 500, 600, 700, 800],
        borderColor: '#1A1A40',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months',
          color: '#666666',
          font: {
            size: 14,
          }
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amount',
          color: '#666666',
          font: {
            size: 14,
          }
        },
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header isMenuOpen={isMenuOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
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
            maxWidth: 'calc(100% - 240px)', // Ajuste para que se vea todo
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
              {t('dashboard.title')}
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Button variant="contained" sx={{ bgcolor: '#2666CF', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', padding: '10px 20px' }}>
                {t('dashboard.newContactRequests')}
              </Button>
              <Button variant="outlined" sx={{ ml: 2, borderColor: '#2666CF', color: '#2666CF', fontWeight: '500', textTransform: 'none', borderRadius: 2, padding: '10px 20px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
                {t('dashboard.newDocumentsReceived')}
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    {t('dashboard.totalSales')}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1A1A40', fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>$1,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    {t('dashboard.totalPurchases')}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1A1A40', fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>$2,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    {t('dashboard.profitThisMonth')}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1A1A40', fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>$1,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    {t('dashboard.balance')}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1A1A40', fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>$10,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    {t('dashboard.salesAndPurchases')}
                  </Typography>
                  <Box sx={{ height: 400 }}>
                    <Line data={data} options={options} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            {/* Botón para agregar widgets - Se movió hacia la parte superior derecha */}
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button variant="contained" sx={{ bgcolor: '#2666CF', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
                {t('dashboard.addWidget') || 'Agregar Widget'}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Dialog to complete user information */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>{t('dashboard.completeYourInfo')}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
            {t('dashboard.completeInfoDescription')}
          </DialogContentText>
          <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend" sx={{ fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>{t('dashboard.userType')}</FormLabel>
              <RadioGroup row value={userType} onChange={handleUserTypeChange}>
                <FormControlLabel value="freelancer" control={<Radio />} label={t('dashboard.freelancer')} />
                <FormControlLabel value="company" control={<Radio />} label={t('dashboard.company')} />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label={t('dashboard.fiscalName')} name="fiscalName" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label={t('dashboard.nif')} name="nif" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label={t('dashboard.commercialName')} name="commercialName" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label={t('dashboard.fiscalAddress')} name="fiscalAddress" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label={t('dashboard.city')} name="city" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label={t('dashboard.province')} name="province" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label={t('dashboard.postalCode')} name="postalCode" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label={t('dashboard.country')} name="country" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label={t('dashboard.phone')} name="phone" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label={t('dashboard.mobile')} name="mobile" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label={t('dashboard.email')} name="email" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label={t('dashboard.website')} name="website" fullWidth variant="outlined" />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: '#2666CF', fontWeight: '500', textTransform: 'none', bgcolor: '#ffffff', border: '1px solid #2666CF', borderRadius: 2 }}>
                {t('dashboard.fillOutLater')}
              </Button>
              <Button type="submit" sx={{ color: '#ffffff', fontWeight: '500', textTransform: 'none', bgcolor: '#2666CF', borderRadius: 2 }}>
                {t('dashboard.save')}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
