import { useState } from 'react'
import { Box, Container, Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [open, setOpen] = useState(true)
  const [userType, setUserType] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: lógica para guardar la información adicional del usuario
    setOpen(false)
  }

  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Ventas',
        data: [500, 400, 600, 700, 800, 900, 1000],
        borderColor: '#2666CF',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Compras',
        data: [300, 200, 400, 500, 600, 700, 800],
        borderColor: '#1A1A40',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tension: 0.4,
        fill: false,
      },
    ],
  }

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
          text: 'Meses',
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
          text: 'Cantidad',
          color: '#666666',
          font: {
            size: 14,
          }
        },
      },
    },
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          component="nav"
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: '#1A1A40',
            borderRight: 1,
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1201,
            position: 'fixed',
            height: '100%',
          }}
        >
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            marginLeft: '240px', 
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
              Dashboard
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Button variant="contained" sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', padding: '10px 20px' }}>
                Nuevas solicitudes de contactos
              </Button>
              <Button variant="outlined" sx={{ ml: 2, borderColor: '#2666CF', color: '#2666CF', fontWeight: '500', textTransform: 'none', borderRadius: 2, padding: '10px 20px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
                Nuevos documentos recibidos
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    Ventas totales
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1A1A40', fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>$1,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    Compras totales
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1A1A40', fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>$2,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    Beneficio este mes
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1A1A40', fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>$1,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)' } }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    Balance
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1A1A40', fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>$10,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1A1A40', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                    Ventas y compras
                  </Typography>
                  <Box sx={{ height: 400 }}>
                    <Line data={data} options={options} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Dialog para completar información del usuario */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: '700', fontFamily: 'Roboto, sans-serif' }}>Completa tu información</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: '400', fontFamily: 'Roboto, sans-serif' }}>
            Por favor, completa la siguiente información para continuar.
          </DialogContentText>
          <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend" sx={{ fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>Tipo de Usuario</FormLabel>
              <RadioGroup row value={userType} onChange={handleUserTypeChange}>
                <FormControlLabel value="autonomo" control={<Radio />} label="Autónomo" />
                <FormControlLabel value="empresa" control={<Radio />} label="Empresa" />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label="Nombre fiscal" name="nombreFiscal" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label="NIF o CIF" name="nif" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label="Nombre comercial" name="nombreComercial" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label="Dirección fiscal" name="direccionFiscal" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label="Población" name="poblacion" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label="Provincia" name="provincia" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label="Código postal" name="codigoPostal" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label="País" name="pais" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label="Teléfono" name="telefono" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField margin="dense" label="Móvil" name="movil" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label="Email" name="email" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="dense" label="Sitio web" name="sitioWeb" fullWidth variant="outlined" />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: '#1A1A40', fontWeight: '500' }}>
                Rellenar más tarde
              </Button>
              <Button type="submit" sx={{ color: '#1A1A40', fontWeight: '500' }}>
                Guardar
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Dashboard
