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
        tension: 0.4, // Agrega suavidad a las líneas
        fill: false, // Evita que el área debajo de la línea esté rellena
      },
      {
        label: 'Compras',
        data: [300, 200, 400, 500, 600, 700, 800],
        borderColor: '#1A1A40',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tension: 0.4, // Agrega suavidad a las líneas
        fill: false, // Evita que el área debajo de la línea esté rellena
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
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Cantidad',
        },
      },
    },
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
              Dashboard
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Button variant="contained" sx={{ bgcolor: '#ffffff', color: '#000000' }}>
                Nuevas solicitudes de contactos
              </Button>
              <Button variant="outlined" sx={{ ml: 2, borderColor: '#1A1A40', color: '#1A1A40' }}>
                Nuevos documentos recibidos
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
                    Ventas totales
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#000000' }}>$1,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
                    Compras totales
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#000000' }}>$2,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
                    Beneficio este mes
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#000000' }}>$1,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
                    Balance
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#000000' }}>$10,000</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
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
        <DialogTitle>Completa tu información</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, completa la siguiente información para continuar.
          </DialogContentText>
          <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Tipo de Usuario</FormLabel>
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
              <Button onClick={handleClose} sx={{ color: '#1A1A40' }}>
                Rellenar más tarde
              </Button>
              <Button type="submit" sx={{ color: '#1A1A40' }}>
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
