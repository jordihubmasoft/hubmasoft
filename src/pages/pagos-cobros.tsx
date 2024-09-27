import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  Pagination,
  Modal,
  Fade,
  Backdrop,
  InputAdornment,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useTranslation } from '../hooks/useTranslations';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import Header from '../componentes/Header';
import Sidebar from '../componentes/Sidebar';

// Simulated data
const transactionsData = [
  { fecha: '25/09/2024', contacto: 'Amazon SA', cuenta: 'Fernaplastic', documento: 'Gasto 762652', total: '- 46,87€', tipo: 'gasto', detalle: 'Compra de materiales de oficina' },
  { fecha: '25/09/2024', contacto: 'Cliente general', cuenta: 'TPV - jardi domotic 1', documento: 'Venta 24.198', total: '234,89€', tipo: 'venta', detalle: 'Venta de productos domóticos' },
  { fecha: '23/09/2024', contacto: 'Repsol Cartagena SL', cuenta: 'Fernaplastic 2', documento: 'Gasto 28098765', total: '- 222,77€', tipo: 'gasto', detalle: 'Compra de combustible industrial' },
  { fecha: '09/09/2024', contacto: 'Francisco García Cruz', cuenta: 'No asignado', documento: 'Venta 24.197', total: '1.234,89€', tipo: 'venta', detalle: 'Venta de dispositivos electrónicos' },
];

const PagosCobros = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedDate, setSelectedDate] = useState('01/01/2024 - 31/12/2024');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2; // Simulating pagination

  // Filtrar datos por tipo de transacción y búsqueda
  const filteredData = transactionsData.filter((item) => {
    if (selectedFilter !== 'Todos' && item.tipo !== selectedFilter.toLowerCase()) return false;
    if (searchTerm && !item.contacto.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Manejo de la paginación
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f4f4f4' }}>
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
            p: 5,
            marginLeft: isMenuOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease',
            maxWidth: 'calc(100% - 240px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                {t('PAGOS Y COBROS')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 120 }}
                >
                  <MenuItem value="Todos">{t('Todos')}</MenuItem>
                  <MenuItem value="Gastos">{t('Gastos')}</MenuItem>
                  <MenuItem value="Ventas">{t('Ventas')}</MenuItem>
                </TextField>

                <TextField
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  variant="outlined"
                  size="small"
                  label={t('Fecha')}
                />

                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={t('Buscar contacto')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 200 }}
                />

                <IconButton sx={{ color: '#1976d2' }}>
                  <FilterListIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Tabla mejorada */}
            <Paper sx={{ p: 3, width: '100%', borderRadius: 4, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
              <TableContainer sx={{borderRadius: 4}}>
                <Table >
                  <TableHead >
                    <TableRow sx={{ backgroundColor: '#1976d2' }}>
                      <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{t('Fecha')}</TableCell>
                      <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{t('Contacto')}</TableCell>
                      <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{t('Cuenta')}</TableCell>
                      <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{t('N° Documento')}</TableCell>
                      <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{t('Total')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((transaction, index) => (
                      <TableRow key={index} hover sx={{ cursor: 'pointer' }} onClick={() => handleOpenModal(transaction)}>
                        <TableCell sx={{ textAlign: 'center' }}>{transaction.fecha}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{transaction.contacto}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{transaction.cuenta}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{transaction.documento}</TableCell>
                        <TableCell sx={{ textAlign: 'center', color: transaction.tipo === 'venta' ? green[500] : red[500] }}>
                          {transaction.total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Paginación mejorada */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  {t('Mostrando')} {Math.min((page - 1) * itemsPerPage + 1, filteredData.length)}-{Math.min(page * itemsPerPage, filteredData.length)} {t('de')} {filteredData.length} {t('transacciones')}
                </Typography>
                <Pagination count={Math.ceil(filteredData.length / itemsPerPage)} page={page} onChange={(e, val) => setPage(val)} color="primary" />
              </Box>

              {/* Total */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                  {t('Total')}: 1.200,14€
                </Typography>
              </Box>
            </Paper>

            {/* Botones de acción */}
            <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1A237E', color: '#fff', fontWeight: '600', boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)' }}
                startIcon={<FileDownloadIcon />}
              >
                {t('EXPORTAR')}
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1976d2', color: '#fff', fontWeight: '600', boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)' }}
                startIcon={<PrintIcon />}
                onClick={() => window.print()}
              >
                {t('IMPRIMIR')}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Modal para mostrar los detalles de la transacción */}
      <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              {t('Detalles de la Transacción')}
            </Typography>
            {selectedTransaction && (
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>{t('Fecha')}: </strong>{selectedTransaction.fecha}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>{t('Contacto')}: </strong>{selectedTransaction.contacto}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>{t('Cuenta')}: </strong>{selectedTransaction.cuenta}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>{t('Documento')}: </strong>{selectedTransaction.documento}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>{t('Total')}: </strong>{selectedTransaction.total}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>{t('Descripción')}: </strong>{selectedTransaction.detalle}
                </Typography>
              </Box>
            )}
            <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 3, width: '100%' }}>
              {t('Cerrar')}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PagosCobros;
