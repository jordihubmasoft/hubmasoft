import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Modal,
  Backdrop,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  TextField,
  IconButton,
} from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslations';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import { green, red } from '@mui/material/colors';

// Importación del Header y Sidebar
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';

const impuestosData = [
  { trimestre: '1 Trimestre', ivaSoportado: '1.615,88 €', ivaRepercutido: '4.195,38 €', resultadoIva: '2.579,50 €' },
  { trimestre: '2 Trimestre', ivaSoportado: '2.227,86 €', ivaRepercutido: '4.987,77 €', resultadoIva: '2.759,91 €' },
  { trimestre: '3 Trimestre', ivaSoportado: '5.416,92 €', ivaRepercutido: '3.464,52 €', resultadoIva: '-1.952,40 €' },
  { trimestre: '4 Trimestre', ivaSoportado: '210,00 €', ivaRepercutido: '0,00 €', resultadoIva: '-210,00 €' },
  { trimestre: 'Total', ivaSoportado: '9.470,66 €', ivaRepercutido: '12.647,67 €', resultadoIva: '3.177,01 €' },
];

const resumenData = {
  ventas: [
    { tipoIva: 'IVA 21%', subtotal: '60.226,83 €', importe: '12.647,67 €' },
  ],
  compras: [
    { tipoIva: 'IVA 21%', subtotal: '45.039,96 €', importe: '9.467,67 €' },
    { tipoIva: 'REC 5,2%', subtotal: '4.545,55 €', importe: '236,08 €' },
    { tipoIva: 'IVA 10%', subtotal: '29,00 €', importe: '2,90 €' },
    { tipoIva: 'Exención (art.20)', subtotal: '21.713,15 €', importe: '0,00 €' },
  ],
};

const Impuestos = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Para controlar el sidebar

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f4f4f4' }}>
      {/* Añadimos el Header */}
      <Header isMenuOpen={isMenuOpen} />

      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
        {/* Sidebar con su funcionalidad */}
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

        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#f4f4f4',
            p: 4,
            marginLeft: isMenuOpen ? '240px' : '70px', // Ajuste del margen en función del sidebar
            transition: 'margin-left 0.3s ease',
          }}
        >
          <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Título y Selección de Año */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A1A40' }}>
                {t('IMPUESTOS')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  select
                  label="Año"
                  defaultValue="2024"
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ width: 120 }}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </TextField>
                <Button variant="contained" color="primary" sx={{ height: 40 }}>
                  {t('VER')}
                </Button>
              </Box>
            </Box>

            {/* Tabla de Impuestos */}
            <Paper sx={{ p: 4, width: '100%', borderRadius: 3, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: '600', color: '#1A1A40' }}>
                {t('Resumen IVA')}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell><strong>{t('Período')}</strong></TableCell>
                      <TableCell><strong>{t('IVA Soportado')}</strong></TableCell>
                      <TableCell><strong>{t('IVA Repercutido')}</strong></TableCell>
                      <TableCell><strong>{t('Resultado IVA')}</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {impuestosData.map((row, index) => (
                      <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, transition: 'all 0.3s' }}>
                        <TableCell>{row.trimestre}</TableCell>
                        <TableCell>{row.ivaSoportado}</TableCell>
                        <TableCell>{row.ivaRepercutido}</TableCell>
                        <TableCell sx={{ color: parseFloat(row.resultadoIva.replace('€', '').replace('.', '').replace(',', '.')) > 0 ? green[500] : red[500] }}>
                          {row.resultadoIva}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Resumen de Impuestos */}
            <Paper sx={{ p: 4, mt: 4, width: '100%', borderRadius: 3, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: '600', color: '#1A1A40' }}>
                {t('Resumen de impuestos')}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                      <TableCell><strong>{t('Ventas')}</strong></TableCell>
                      <TableCell><strong>{t('Subtotal')}</strong></TableCell>
                      <TableCell><strong>{t('Importe')}</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resumenData.ventas.map((venta, index) => (
                      <TableRow key={index}>
                        <TableCell>{venta.tipoIva}</TableCell>
                        <TableCell>{venta.subtotal}</TableCell>
                        <TableCell>{venta.importe}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Table sx={{ mt: 3 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                      <TableCell><strong>{t('Compras')}</strong></TableCell>
                      <TableCell><strong>{t('Subtotal')}</strong></TableCell>
                      <TableCell><strong>{t('Importe')}</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resumenData.compras.map((compra, index) => (
                      <TableRow key={index}>
                        <TableCell>{compra.tipoIva}</TableCell>
                        <TableCell>{compra.subtotal}</TableCell>
                        <TableCell>{compra.importe}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Botones de Acción */}
            <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1A237E', color: '#fff', fontWeight: '600', boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)' }}
                startIcon={<FileDownloadIcon />}
                onClick={handleOpen}
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

      {/* Modal de Exportación */}
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
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('Seleccione formato de exportación')}
            </Typography>
            <Button fullWidth variant="contained" sx={{ mb: 2 }}>
              {t('Exportar en PDF')}
            </Button>
            <Button fullWidth variant="contained" color="secondary" sx={{ mb: 2 }}>
              {t('Exportar en Excel')}
            </Button>
            <Button fullWidth variant="outlined" onClick={handleClose}>
              {t('Cancelar')}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Impuestos;
