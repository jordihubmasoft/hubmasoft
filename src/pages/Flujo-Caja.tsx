import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Zoom,
  Modal,
  Backdrop,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Divider,
  TextField,
} from '@mui/material';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../componentes/Header';
import CircleIcon from '@mui/icons-material/Circle';
import Sidebar from '../componentes/Sidebar';
import { green, red, yellow } from '@mui/material/colors';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTranslation } from '../hooks/useTranslations';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const chartData = [
  { name: 'Ene', cobradas: 2400, pendientes: 2400, vencidas: 200, balance: 300 },
  { name: 'Feb', cobradas: 1398, pendientes: 2210, vencidas: 300, balance: 400 },
  { name: 'Mar', cobradas: 9800, pendientes: 2290, vencidas: 1500, balance: 600 },
  { name: 'Abr', cobradas: 3908, pendientes: 2000, vencidas: 500, balance: 800 },
  { name: 'May', cobradas: 4800, pendientes: 2181, vencidas: 700, balance: 1200 },
  { name: 'Jun', cobradas: 3800, pendientes: 2500, vencidas: 1200, balance: 1400 },
  { name: 'Jul', cobradas: 4300, pendientes: 2100, vencidas: 800, balance: 1600 },
  { name: 'Ago', cobradas: 4000, pendientes: 2200, vencidas: 700, balance: 1700 },
  { name: 'Sep', cobradas: 4300, pendientes: 2100, vencidas: 600, balance: 1800 },
  { name: 'Oct', cobradas: 4800, pendientes: 2500, vencidas: 700, balance: 2000 },
  { name: 'Nov', cobradas: 5400, pendientes: 2800, vencidas: 1000, balance: 2500 },
  { name: 'Dic', cobradas: 6000, pendientes: 3000, vencidas: 1200, balance: 3000 },
];

const rows = [
  {
    month: 'Ene 2023', balanceInicial: '63,11', ventas: '291,96', extras: '93,74', servicios: '228,85', impuestos: '-', movimientoNeto: '63', balanceFinal: '63',
  },
  {
    month: 'Feb 2023', balanceInicial: '112,19', ventas: '283,52', extras: '93,74', servicios: '234,44', impuestos: '-', movimientoNeto: '49', balanceFinal: '112',
  },
  {
    month: 'Mar 2023', balanceInicial: '258,78', ventas: '341,47', extras: '37,24', servicios: '194,88', impuestos: '-', movimientoNeto: '147', balanceFinal: '259',
  },
  // Agrega las filas que necesites
];

const EstadoIcon = ({ estado }) => {
  let color;
  switch (estado) {
    case 'positivo':
      color = green[500];
      break;
    case 'negativo':
      color = red[500];
      break;
    case 'neutral':
      color = yellow[500];
      break;
    default:
      color = green[500];
  }
  return <CircleIcon style={{ color, fontSize: 12 }} />;
};

const FlujoCaja = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDocuments, setShowDocuments] = useState(false);

  // Manejar la apertura del modal
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  // Manejar el cierre del modal
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const documentos = [
    { id: '24.188', name: 'INGENIERIA Y TECNICA DEL SECADO SA', pagado: 291.4, total: 354.79, status: 'pendiente' },
    { id: '24.176', name: 'Francesc Busquets Viñallonga', pagado: 89.99, total: 89.99, status: 'pagado' },
    { id: '24.174', name: 'Juli Cardona Jorques', pagado: 219.91, total: 219.91, status: 'pagado' },
  ];

  const toggleDocuments = () => setShowDocuments(!showDocuments);

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
            marginLeft: isMenuOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease',
            maxWidth: 'calc(100% - 240px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Contenedor del gráfico y widgets */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  ml: 3,
                  color: '#1A1A40',
                  fontWeight: '600',
                  fontFamily: 'Roboto, sans-serif',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)' },
                }}
              >
                {t('Flujo de Caja')}
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  mt: 2,
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                  height: '500px',
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" stroke="#555" tick={{ fontSize: 14, fontWeight: '500' }} axisLine={{ stroke: '#555' }} tickLine={false} />
                    <YAxis stroke="#555" tick={{ fontSize: 14, fontWeight: '500' }} axisLine={{ stroke: '#555' }} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(200,200,200,0.1)' }}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        border: '1px solid #ddd',
                        padding: '10px',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                      }}
                      labelStyle={{ fontWeight: '700', color: '#555' }}
                      formatter={(value, name) => [`${value}€`, name]}
                      labelFormatter={(label) => `Mes: ${label}`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '16px', fontWeight: '600', color: '#555' }} />
                    <Bar dataKey="cobradas" fill="#5472d3" barSize={40} />
                    <Bar dataKey="pendientes" fill="#455a64" barSize={40} />
                    <Bar dataKey="vencidas" fill="#78909c" barSize={40} />
                    <Line type="monotone" dataKey="balance" stroke="#1A237E" strokeWidth={4} dot={{ stroke: '#1A237E', strokeWidth: 2, fill: 'white', r: 6 }} activeDot={{ r: 10, fill: '#1A237E', strokeWidth: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Widgets */}
            <Grid item xs={12} md={3}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Zoom in timeout={500}>
                    <Paper
                      sx={{
                        mt: 9,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#ffffff',
                        borderRadius: 2,
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                        height: '240px',
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#1A1A40', fontWeight: '600' }}>
                        Cobros Vencidos
                      </Typography>
                      <Typography variant="h4" sx={{ color: '#1A237E', fontWeight: '700', mt: 2 }}>
                        508,47€
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          mt: 3,
                          borderColor: '#1A237E',
                          color: '#1A237E',
                          '&:hover': { backgroundColor: 'rgba(26, 35, 126, 0.1)' },
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </Paper>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom in timeout={700}>
                    <Paper
                      sx={{
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#ffffff',
                        borderRadius: 2,
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                        height: '240px',
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#1A1A40', fontWeight: '600' }}>
                        Pagos Vencidos
                      </Typography>
                      <Typography variant="h4" sx={{ color: '#455A64', fontWeight: '700', mt: 2 }}>
                        22,63€
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          mt: 3,
                          borderColor: '#455A64',
                          color: '#455A64',
                          '&:hover': { backgroundColor: 'rgba(69, 90, 100, 0.1)' },
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </Paper>
                  </Zoom>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Tabla debajo del gráfico */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#f9f9f9',
                  borderRadius: 3,
                  boxShadow: '0 3px 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    fontFamily: 'Roboto, sans-serif',
                  }}
                >
                  Flujo de Caja
                </Typography>

                {/* Nueva estructura de columnas */}
                <TableContainer
                  component={Paper}
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Table aria-label="flujo caja table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: '#1655ba', color: '#fff' }}>
                        <TableCell style={{ color: '#fff', fontWeight: 'bold', padding: '10px' }}>Categoría</TableCell>
                        {rows.map((row) => (
                          <TableCell key={row.month} style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>
                            {row.month}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Balance Inicial */}
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold', padding: '10px' }}>Balance Inicial</TableCell>
                        {rows.map((row) => (
                          <TableCell
                            key={row.month}
                            style={{ textAlign: 'center', padding: '10px', cursor: 'pointer', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                            sx={{
                              '&:hover': {
                                backgroundColor: '#e0f7fa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                              },
                            }}
                            onClick={() => handleOpen(row)}
                          >
                            {row.balanceInicial}
                          </TableCell>
                        ))}
                      </TableRow>

                      {/* Ventas */}
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold', padding: '10px' }}>Ventas</TableCell>
                        {rows.map((row) => (
                          <TableCell
                            key={row.month}
                            style={{
                              textAlign: 'center',
                              backgroundColor: parseFloat(row.ventas) < 0 ? '#ffebee' : '#e8f5e9',
                              padding: '10px',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                            }}
                            sx={{
                              '&:hover': {
                                backgroundColor: '#e0f7fa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                              },
                            }}
                            onClick={() => handleOpen(row)}
                          >
                            {row.ventas} <EstadoIcon estado={parseFloat(row.ventas) > 0 ? 'positivo' : 'negativo'} />
                          </TableCell>
                        ))}
                      </TableRow>

                      {/* Extras */}
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold', padding: '10px' }}>Extras</TableCell>
                        {rows.map((row) => (
                          <TableCell
                            key={row.month}
                            style={{
                              textAlign: 'center',
                              backgroundColor: parseFloat(row.extras) < 0 ? '#ffebee' : '#e8f5e9',
                              padding: '10px',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                            }}
                            sx={{
                              '&:hover': {
                                backgroundColor: '#e0f7fa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                              },
                            }}
                            onClick={() => handleOpen(row)}
                          >
                            {row.extras} <EstadoIcon estado={parseFloat(row.extras) > 0 ? 'positivo' : 'negativo'} />
                          </TableCell>
                        ))}
                      </TableRow>

                      {/* Servicios */}
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold', padding: '10px' }}>Servicios</TableCell>
                        {rows.map((row) => (
                          <TableCell
                            key={row.month}
                            style={{
                              textAlign: 'center',
                              backgroundColor: parseFloat(row.servicios) > 0 ? '#ffebee' : '#e8f5e9',
                              padding: '10px',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                            }}
                            sx={{
                              '&:hover': {
                                backgroundColor: '#e0f7fa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                              },
                            }}
                            onClick={() => handleOpen(row)}
                          >
                            {row.servicios} <EstadoIcon estado={parseFloat(row.servicios) < 0 ? 'positivo' : 'negativo'} />
                          </TableCell>
                        ))}
                      </TableRow>

                      {/* Impuestos */}
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold', padding: '10px' }}>Impuestos</TableCell>
                        {rows.map((row) => (
                          <TableCell
                            key={row.month}
                            style={{ textAlign: 'center', padding: '10px', cursor: 'pointer', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                            sx={{
                              '&:hover': {
                                backgroundColor: '#e0f7fa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                              },
                            }}
                            onClick={() => handleOpen(row)}
                          >
                            {row.impuestos}
                          </TableCell>
                        ))}
                      </TableRow>

                      {/* Movimiento Neto */}
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold', padding: '10px' }}>Movimiento Neto</TableCell>
                        {rows.map((row) => (
                          <TableCell
                            key={row.month}
                            style={{
                              textAlign: 'center',
                              backgroundColor: parseFloat(row.movimientoNeto) < 0 ? '#ffebee' : '#e8f5e9',
                              padding: '10px',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                            }}
                            sx={{
                              '&:hover': {
                                backgroundColor: '#e0f7fa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                              },
                            }}
                            onClick={() => handleOpen(row)}
                          >
                            {row.movimientoNeto} <EstadoIcon estado={parseFloat(row.movimientoNeto) > 0 ? 'positivo' : 'negativo'} />
                          </TableCell>
                        ))}
                      </TableRow>

                      {/* Balance Final */}
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold', padding: '10px' }}>Balance Final</TableCell>
                        {rows.map((row) => (
                          <TableCell
                            key={row.month}
                            style={{ textAlign: 'center', padding: '10px', cursor: 'pointer', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                            sx={{
                              '&:hover': {
                                backgroundColor: '#e0f7fa',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                              },
                            }}
                            onClick={() => handleOpen(row)}
                          >
                            {row.balanceFinal}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Modal para mostrar los detalles */}
                <Modal
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 3,
                        p: 3,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        <CircleIcon sx={{ color: '#d81b60', fontSize: '16px', verticalAlign: 'middle', mr: 1 }} />
                        653.3 Febrero 2024
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        <strong>Total:</strong> 664,69€
                      </Typography>

                      <Button variant="outlined" fullWidth sx={{ mb: 2, borderColor: '#ccc', color: '#666' }} onClick={toggleDocuments}>
                        Ver documentos
                      </Button>

                      {showDocuments && (
                        <TableContainer component={Paper} sx={{ maxHeight: 200, mb: 2 }}>
                          <Table stickyHeader>
                            <TableHead>
                              <TableRow>
                                <TableCell>Documento</TableCell>
                                <TableCell>Pagado</TableCell>
                                <TableCell>Total</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {documentos.map((doc) => (
                                <TableRow key={doc.id}>
                                  <TableCell>
                                    <CircleIcon sx={{ color: doc.status === 'pagado' ? green[500] : red[500], fontSize: '14px', verticalAlign: 'middle', mr: 1 }} />
                                    {`#${doc.id}: ${doc.name}`}
                                  </TableCell>
                                  <TableCell>{doc.pagado}€</TableCell>
                                  <TableCell>{doc.total}€</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}

                      <Typography variant="subtitle2" sx={{ color: '#f57c00', backgroundColor: '#fff3e0', p: 1, borderRadius: 2, textAlign: 'center', mb: 2 }}>
                        63,39€ Pendiente
                      </Typography>

                      <Button variant="contained" fullWidth sx={{ backgroundColor: '#37474f', color: '#fff', mb: 2, fontWeight: 'bold' }}>
                        Set goal
                      </Button>

                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Presupuesto mensual
                      </Typography>
                      <TextField fullWidth variant="outlined" size="small" sx={{ mb: 2 }} defaultValue="0,00" />
                      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <Checkbox size="small" />
                        <Typography variant="body2">Aplicar a futuros meses</Typography>
                      </Box>

                      <Button variant="contained" fullWidth sx={{ backgroundColor: '#1976d2', fontWeight: 'bold' }}>
                        Guardar
                      </Button>
                    </Box>
                  </Fade>
                </Modal>
              </Box>
            </Grid>
          </Grid>


        </Box>
      </Box>
    </Box>
  );
};

export default FlujoCaja;
