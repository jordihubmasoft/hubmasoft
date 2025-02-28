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
  const [hovered, setHovered] = useState(false); // Estado para hover

  const handleMouseEnter = () => {
    if (!isMenuOpen) {
      toggleMenu(); // Expande el menú si está cerrado
    }
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMenuOpen) {
      toggleMenu(); // Contrae el menú si está abierto
    }
    setHovered(false);
  };

  const handleItemClick = (path) => {
    router.push(path);
  };

  const handleToggle = (openStateSetter, isOpen) => {
    openStateSetter(!isOpen);
  };

  const sidebarExpanded = isMenuOpen || hovered;

  return (
    <Box
    onMouseEnter={handleMouseEnter} // Expande al hacer hover
    onMouseLeave={handleMouseLeave} // Contrae al salir del hover // Contrae al salir del hover
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#F8F9FA',
        padding: '10px',
        boxShadow: sidebarExpanded ? '2px 0 5px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease',
        width: sidebarExpanded ? '250px' : '70px', // Cambia el ancho dinámicamente
        overflow: 'hidden',
      }}
    >
      <Tooltip title={sidebarExpanded ? "Close Menu" : "Open Menu"} placement="right">
        <Button onClick={toggleMenu} sx={{ marginBottom: '20px', padding: '8px 16px' }}>
          {sidebarExpanded ? <ChevronLeftIcon sx={{ color: '#1A73E8' }} /> : <MenuIcon sx={{ color: '#1A73E8' }} />}
        </Button>
      </Tooltip>

      <List
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          paddingRight: '8px',
          paddingBottom: '50px',
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
            onClick={() => handleItemClick('/dashboard/dashboard')}
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
            {sidebarExpanded && <ListItemText primary={t('sidebar.dashboard')} sx={{ color: '#343A40', fontWeight: 'bold' }} />}
          </ListItem>
        </Tooltip>

        {/* Contactos */}
        <Tooltip title="Contactos" placement="right">
          <ListItem
            onClick={() => handleItemClick('/contacts/contacts')}
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
            {sidebarExpanded && (
              <>
                <ListItemText primary={t('sidebar.contacts')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8',
                      color: '#FFFFFF',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)',
                      border: '1px solid #1A73E8',
                    },
                  }}
                  // Redirige con un query parameter
                  onClick={() => router.push('/contacts/contacts?new=true')}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        </Tooltip>

        {/* Ventas */}
        <Tooltip title="Ventas" placement="right">
          <ListItem
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
            {sidebarExpanded && (
              <>
                <ListItemText primary={t('sidebar.sales')} onClick={() => !openSales && handleItemClick('/sales/ventas')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openSales ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openSales && sidebarExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['/sales/presupuestos-ventas', '/sales/pedidos-ventas', '/sales/albaranes-ventas', '/sales/proformas-ventas', '/sales/facturas-ventas', '/sales/facturas-recurrentes-ventas'].map((path, index) => (
              <ListItem
                sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
                onClick={() => handleItemClick(path)}
                key={path}
              >
                <ListItemText primary={t(`sidebar.${['quotes', 'orders', 'deliveryNotes', 'proformas', 'invoices', 'recurringInvoices'][index]}`)} sx={{ color: '#6C757D' }} />
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8',
                      color: '#FFFFFF',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)',
                      border: '1px solid #1A73E8',
                    },
                  }}
                  onClick={() => router.push(`${path}?new=true`)}
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
            {sidebarExpanded && (
              <>
                <ListItemText primary={t('sidebar.purchases')} onClick={() => !openPurchases && handleItemClick('/purchases/compras')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openPurchases ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openPurchases && sidebarExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['/purchases/presupuestos-compras', '/purchases/pedidos-compras', '/purchases/albaranes-compras', '/purchases/proformas-compras', '/purchases/facturas-compras', '/purchases/facturas-recurrentes-compras'].map((path, index) => (
              <ListItem
                sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
                onClick={() => handleItemClick(path)}
                key={path}
              >
                <ListItemText primary={t(`sidebar.${['quotes', 'orders', 'deliveryNotes', 'proformas', 'invoices', 'recurringInvoices'][index]}`)} sx={{ color: '#6C757D' }} />
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8',
                      color: '#FFFFFF',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)',
                      border: '1px solid #1A73E8',
                    },
                  }}
                  onClick={() => router.push(`${path}?new=true`)}
                >
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Collapse>


        {/* Inventario */}
        <Tooltip title="Inventario" placement="right">
          <ListItem
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
            {sidebarExpanded && (
              <>
                <ListItemText primary={t('sidebar.inventory')} onClick={() => !openInventory } sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openInventory ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openInventory && sidebarExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/inventory/panel-control-inventario')}
            >
              <ListItemText primary={t('sidebar.controlPanel')} sx={{ color: '#6C757D' }} />
            </ListItem>
            {/* Submenus with "+" button */}
            {['/inventory/instalaciones-inventario', '/inventory/productos-inventario', '/inventory/categorias-inventario','/inventory/subfamilias', '/inventory/pedidosDeVenta-inventario', '/sales/albaranes-ventas', '/purchases/albaranes-compras'].map((path, index) => (
              <ListItem
                sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
                onClick={() => handleItemClick(path)}
                key={path}
              >
                <ListItemText primary={t(`sidebar.${['warehouses', 'products', 'families', 'subfamilies','salesOrders', 'salesDeliveryNotes', 'purchaseDeliveryNotes'][index]}`)} sx={{ color: '#6C757D' }} />
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8',
                      color: '#FFFFFF',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)',
                      border: '1px solid #1A73E8',
                    },
                  }}
                  onClick={() => router.push(`${path}?new=true`)}
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
            {sidebarExpanded && (
              <>
                <ListItemText primary={t('sidebar.accounting')} onClick={() => !openAccounting} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                {openAccounting ? <ExpandLess sx={{ color: '#1A73E8' }} /> : <ExpandMore sx={{ color: '#1A73E8' }} />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openAccounting && sidebarExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/accounting/Flujo-Caja')}
            >
              <ListItemText primary={t('sidebar.cashflow')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/accounting/pagos-cobros')}
            >
              <ListItemText primary={t('sidebar.paymentsReceipts')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/accounting/impuestos')}
            >
              <ListItemText primary={t('sidebar.taxes')} sx={{ color: '#6C757D' }} />
            </ListItem>
          </List>
        </Collapse>

        {/* Empleados */}
        <Tooltip title="Empleados" placement="right">
          <ListItem
            onClick={() => handleItemClick('/employees/empleados')}
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
            {sidebarExpanded && (
              <>
                <ListItemText primary={t('sidebar.employees')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8',
                      color: '#FFFFFF',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)',
                      border: '1px solid #1A73E8',
                    },
                  }}
                  onClick={() => router.push('/empleados?new=true')}
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
            onClick={() => handleItemClick('/projects/proyectos')}
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
            {sidebarExpanded && (
              <>
                <ListItemText primary={t('sidebar.projects')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8',
                      color: '#FFFFFF',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)',
                      border: '1px solid #1A73E8',
                    },
                  }}
                  onClick={() => router.push('/proyectos?new=true')}
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
            onClick={() => handleItemClick('/tpv/TPV')}
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
            {sidebarExpanded && (
              <>
                <ListItemText primary={t('sidebar.TPV')} sx={{ color: '#343A40', fontWeight: 'bold' }} />
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    color: '#6C757D',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#1A73E8',
                      color: '#FFFFFF',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 8px 16px rgba(26, 115, 232, 0.2)',
                      border: '1px solid #1A73E8',
                    },
                  }}
                  onClick={() => router.push('/TPV?new=true')}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );
};

export default Sidebar;
