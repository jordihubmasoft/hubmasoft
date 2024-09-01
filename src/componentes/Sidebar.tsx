import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactsIcon from '@mui/icons-material/Contacts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from '../hooks/useTranslations';

const Sidebar = ({ isMenuOpen, toggleMenu }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [openContacts, setOpenContacts] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openPurchases, setOpenPurchases] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);
  const [openAccounting, setOpenAccounting] = useState(false);

  const handleItemClick = (path) => {
    router.push(path);
  };

  const handleToggle = (openStateSetter, isOpen) => {
    openStateSetter(!isOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#F8F9FA',
        padding: '10px',
        boxShadow: isMenuOpen ? '2px 0 5px rgba(0,0,0,0.1)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <Tooltip title={isMenuOpen ? "Close Menu" : "Open Menu"} placement="right">
        <Button onClick={toggleMenu} sx={{ marginBottom: '20px', padding: '8px 16px' }}>
          {isMenuOpen ? <ChevronLeftIcon sx={{ color: '#1A73E8' }} /> : <MenuIcon sx={{ color: '#1A73E8' }} />}
        </Button>
      </Tooltip>
      
      <List
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          paddingRight: '8px',
          paddingBottom: '50px', // Añade espacio al final para asegurar que el último elemento sea visible
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#a1a1a1',
            },
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '4px',
          },
        }}
      >
        {/* Panel de Control */}
        <Tooltip title="Panel de Control" placement="right">
          <ListItem
            button
            onClick={() => handleItemClick('/dashboard')}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && <ListItemText primary={t('sidebar.dashboard')} sx={{ color: '#343A40', fontWeight: 'bold' }} />}
          </ListItem>
        </Tooltip>

        {/* Other items remain unchanged */}
        {/* Contactos */}
        <Tooltip title="Contactos" placement="right">
          <ListItem
            button
            onClick={() => handleToggle(setOpenContacts, openContacts)}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <ContactsIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && (
              <>
                <ListItemText primary={t('sidebar.contacts')} onClick={() => !openContacts && handleItemClick('/contacts')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openContacts ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openContacts && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/clients')}
            >
              <ListItemText primary={t('sidebar.clients')} sx={{ color: '#6C757D' }} />
              {/* Botón con el símbolo de "+" con esquinas redondeadas */}
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'transparent',
                  color: '#6C757D',
                  borderRadius: '8px', // Cambiado a esquinas redondeadas
                  border: '1px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#1A73E8', // Fondo azul al hacer hover
                    color: '#FFFFFF',   // Color del icono blanco al hacer hover
                    transform: 'scale(1.1)', // Aumenta ligeramente el tamaño
                    boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)', // Sombra sutil
                    border: '1px solid #1A73E8', // Borde del mismo color al hacer hover
                  },
                  '&:active': {
                    transform: 'scale(1)', // Reducción del efecto de escala al hacer clic
                    boxShadow: '0px 4px 12px rgba(26, 115, 232, 0.1)', // Menor sombra al hacer clic
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/suppliers')}
            >
              <ListItemText primary={t('sidebar.suppliers')} sx={{ color: '#6C757D' }} />
              {/* Botón con el símbolo de "+" con esquinas redondeadas */}
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'transparent',
                  color: '#6C757D',
                  borderRadius: '8px', // Cambiado a esquinas redondeadas
                  border: '1px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#1A73E8', // Fondo azul al hacer hover
                    color: '#FFFFFF',   // Color del icono blanco al hacer hover
                    transform: 'scale(1.1)', // Aumenta ligeramente el tamaño
                    boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)', // Sombra sutil
                    border: '1px solid #1A73E8', // Borde del mismo color al hacer hover
                  },
                  '&:active': {
                    transform: 'scale(1)', // Reducción del efecto de escala al hacer clic
                    boxShadow: '0px 4px 12px rgba(26, 115, 232, 0.1)', // Menor sombra al hacer clic
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Ventas */}
        <Tooltip title="Ventas" placement="right">
          <ListItem
            button
            onClick={() => handleToggle(setOpenSales, openSales)}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && (
              <>
                <ListItemText primary={t('sidebar.sales')} onClick={() => !openSales && handleItemClick('/ventas')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openSales ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openSales && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['/sales-quotes', '/pedidos-ventas', '/albaranes-ventas', '/sales-proformas', '/facturas-ventas', '/sales-recurring-invoices'].map((path, index) => (
              <ListItem
                button
                sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
                onClick={() => handleItemClick(path)}
                key={path}
              >
                <ListItemText primary={t(`sidebar.${['quotes', 'orders', 'deliveryNotes', 'proformas', 'invoices', 'recurringInvoices'][index]}`)} sx={{ color: '#6C757D' }} />
                {/* Botón con el símbolo de "+" con esquinas redondeadas */}
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px', // Cambiado a esquinas redondeadas
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8', // Fondo azul al hacer hover
                      color: '#FFFFFF',   // Color del icono blanco al hacer hover
                      transform: 'scale(1.1)', // Aumenta ligeramente el tamaño
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)', // Sombra sutil
                      border: '1px solid #1A73E8', // Borde del mismo color al hacer hover
                    },
                    '&:active': {
                      transform: 'scale(1)', // Reducción del efecto de escala al hacer clic
                      boxShadow: '0px 4px 12px rgba(26, 115, 232, 0.1)', // Menor sombra al hacer clic
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Compras */}
        <Tooltip title="Compras" placement="right">
          <ListItem
            button
            onClick={() => handleToggle(setOpenPurchases, openPurchases)}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && (
              <>
                <ListItemText primary={t('sidebar.purchases')} onClick={() => !openPurchases && handleItemClick('/compras')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openPurchases ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openPurchases && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['/purchase-quotes', '/purchase-orders', '/purchase-delivery-notes', '/purchase-proformas', '/purchase-invoices', '/purchase-recurring-invoices'].map((path, index) => (
              <ListItem
                button
                sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
                onClick={() => handleItemClick(path)}
                key={path}
              >
                <ListItemText primary={t(`sidebar.${['quotes', 'orders', 'deliveryNotes', 'proformas', 'invoices', 'recurringInvoices'][index]}`)} sx={{ color: '#6C757D' }} />
                {/* Botón con el símbolo de "+" con esquinas redondeadas */}
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px', // Esquinas redondeadas
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8', // Fondo azul al hacer hover
                      color: '#FFFFFF',   // Color del icono blanco al hacer hover
                      transform: 'scale(1.1)', // Aumenta ligeramente el tamaño
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)', // Sombra sutil
                      border: '1px solid #1A73E8', // Borde del mismo color al hacer hover
                    },
                    '&:active': {
                      transform: 'scale(1)', // Reducción del efecto de escala al hacer clic
                      boxShadow: '0px 4px 12px rgba(26, 115, 232, 0.1)', // Menor sombra al hacer clic
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Gastos */}
        <Tooltip title="Gastos" placement="right">
          <ListItem
            button
            onClick={() => handleItemClick('/gastos')}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <BusinessCenterIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && (
              <>
                <ListItemText primary={t('sidebar.Gastos')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {/* Botón con el símbolo de "+" con esquinas redondeadas */}
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px', // Esquinas redondeadas
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8', // Fondo azul al hacer hover
                      color: '#FFFFFF',   // Color del icono blanco al hacer hover
                      transform: 'scale(1.1)', // Aumenta ligeramente el tamaño
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)', // Sombra sutil
                      border: '1px solid #1A73E8', // Borde del mismo color al hacer hover
                    },
                    '&:active': {
                      transform: 'scale(1)', // Reducción del efecto de escala al hacer clic
                      boxShadow: '0px 4px 12px rgba(26, 115, 232, 0.1)', // Menor sombra al hacer clic
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        </Tooltip>

        {/* Inventario */}
        <Tooltip title="Inventario" placement="right">
          <ListItem
            button
            onClick={() => handleToggle(setOpenInventory, openInventory)}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && (
              <>
                <ListItemText primary={t('sidebar.inventory')} onClick={() => !openInventory && handleItemClick('/inventario')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openInventory ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openInventory && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/control-panel')}
            >
              <ListItemText primary={t('sidebar.controlPanel')} sx={{ color: '#6C757D' }} />
              {/* No button for the first submenu */}
            </ListItem>
            {/* Submenus with "+" button */}
            {['/warehouses', '/products', '/categories', '/sales-orders', '/sales-delivery-notes', '/purchase-delivery-notes'].map((path, index) => (
              <ListItem
                button
                sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
                onClick={() => handleItemClick(path)}
                key={path}
              >
                <ListItemText primary={t(`sidebar.${['warehouses', 'products', 'categories', 'salesOrders', 'salesDeliveryNotes', 'purchaseDeliveryNotes'][index]}`)} sx={{ color: '#6C757D' }} />
                {/* Botón con el símbolo de "+" con esquinas redondeadas */}
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px', // Esquinas redondeadas
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8', // Fondo azul al hacer hover
                      color: '#FFFFFF',   // Color del icono blanco al hacer hover
                      transform: 'scale(1.1)', // Aumenta ligeramente el tamaño
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)', // Sombra sutil
                      border: '1px solid #1A73E8', // Borde del mismo color al hacer hover
                    },
                    '&:active': {
                      transform: 'scale(1)', // Reducción del efecto de escala al hacer clic
                      boxShadow: '0px 4px 12px rgba(26, 115, 232, 0.1)', // Menor sombra al hacer clic
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Contabilidad */}
        <Tooltip title="Contabilidad" placement="right">
          <ListItem
            button
            onClick={() => handleToggle(setOpenAccounting, openAccounting)}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <AccountBalanceIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && (
              <>
                <ListItemText primary={t('sidebar.accounting')} onClick={() => !openAccounting && handleItemClick('/contabilidad')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openAccounting ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openAccounting && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/cashflow')}
            >
              <ListItemText primary={t('sidebar.cashflow')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/payments-receipts')}
            >
              <ListItemText primary={t('sidebar.paymentsReceipts')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/taxes')}
            >
              <ListItemText primary={t('sidebar.taxes')} sx={{ color: '#6C757D' }} />
            </ListItem>
          </List>
        </Collapse>

        {/* Empleados */}
        <Tooltip title="Empleados" placement="right">
          <ListItem
            button
            onClick={() => handleItemClick('/empleados')}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <AssignmentIndIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && (
              <>
                <ListItemText primary={t('sidebar.employees')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {/* Botón con el símbolo de "+" con esquinas redondeadas */}
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px', // Esquinas redondeadas
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8', // Fondo azul al hacer hover
                      color: '#FFFFFF',   // Color del icono blanco al hacer hover
                      transform: 'scale(1.1)', // Aumenta ligeramente el tamaño
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)', // Sombra sutil
                      border: '1px solid #1A73E8', // Borde del mismo color al hacer hover
                    },
                    '&:active': {
                      transform: 'scale(1)', // Reducción del efecto de escala al hacer clic
                      boxShadow: '0px 4px 12px rgba(26, 115, 232, 0.1)', // Menor sombra al hacer clic
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        </Tooltip>

        {/* Proyectos */}
        <Tooltip title="Proyectos" placement="right">
          <ListItem
            button
            onClick={() => handleItemClick('/proyectos')}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <BusinessCenterIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && (
              <>
                <ListItemText primary={t('sidebar.projects')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {/* Botón con el símbolo de "+" con esquinas redondeadas */}
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px', // Esquinas redondeadas
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8', // Fondo azul al hacer hover
                      color: '#FFFFFF',   // Color del icono blanco al hacer hover
                      transform: 'scale(1.1)', // Aumenta ligeramente el tamaño
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)', // Sombra sutil
                      border: '1px solid #1A73E8', // Borde del mismo color al hacer hover
                    },
                    '&:active': {
                      transform: 'scale(1)', // Reducción del efecto de escala al hacer clic
                      boxShadow: '0px 4px 12px rgba(26, 115, 232, 0.1)', // Menor sombra al hacer clic
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        </Tooltip>

        {/* TPV */}
        <Tooltip title="TPV" placement="right">
          <ListItem
            button
            onClick={() => handleItemClick('/TPV')}
            sx={{
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                bgcolor: '#E3F2FD',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: '#6C757D', transition: 'color 0.2s ease', '&:hover': { color: '#1A73E8' } }} />
            </ListItemIcon>
            {isMenuOpen && <ListItemText primary={t('sidebar.TPV')} sx={{ color: '#343A40', fontWeight: 'bold' }} />}
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );
};

export default Sidebar;