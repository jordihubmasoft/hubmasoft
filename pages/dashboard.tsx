import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'

const Dashboard = () => {
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
                  {/* Aquí puedes incluir el gráfico de ventas y compras */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
