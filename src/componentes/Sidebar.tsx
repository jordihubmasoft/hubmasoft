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
      
      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
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
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/suppliers')}
            >
              <ListItemText primary={t('sidebar.suppliers')} sx={{ color: '#6C757D' }} />
            </ListItem>
          </List>
        </Collapse>

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
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/sales-quotes')}
            >
              <ListItemText primary={t('sidebar.quotes')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/sales-orders')}
            >
              <ListItemText primary={t('sidebar.orders')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/sales-delivery-notes')}
            >
              <ListItemText primary={t('sidebar.deliveryNotes')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/sales-proformas')}
            >
              <ListItemText primary={t('sidebar.proformas')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/sales-invoices')}
            >
              <ListItemText primary={t('sidebar.invoices')} sx={{ color: '#6C757D' }} />
            </ListItem>
          </List>
        </Collapse>

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
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/purchase-quotes')}
            >
              <ListItemText primary={t('sidebar.quotes')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/purchase-orders')}
            >
              <ListItemText primary={t('sidebar.orders')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/purchase-delivery-notes')}
            >
              <ListItemText primary={t('sidebar.deliveryNotes')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/purchase-proformas')}
            >
              <ListItemText primary={t('sidebar.proformas')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/purchase-invoices')}
            >
              <ListItemText primary={t('sidebar.invoices')} sx={{ color: '#6C757D' }} />
            </ListItem>
          </List>
        </Collapse>

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
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/warehouses')}
            >
              <ListItemText primary={t('sidebar.warehouses')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/products')}
            >
              <ListItemText primary={t('sidebar.products')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/inventory-orders')}
            >
              <ListItemText primary={t('sidebar.orders')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/sales-orders')}
            >
              <ListItemText primary={t('sidebar.salesOrders')} sx={{ color: '#6C757D' }} />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4, '&:hover': { bgcolor: '#E3F2FD', transform: 'scale(1.05)', transition: 'transform 0.2s ease' } }}
              onClick={() => handleItemClick('/purchase-orders')}
            >
              <ListItemText primary={t('sidebar.purchaseOrders')} sx={{ color: '#6C757D' }} />
            </ListItem>
          </List>
        </Collapse>

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

        <Tooltip title="Gastos" placement="right">
          <ListItem
            button
            onClick={() => handleItemClick('/expenses')}
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
            {isMenuOpen && <ListItemText primary={t('sidebar.expenses')} sx={{ color: '#343A40', fontWeight: 'bold' }} />}
            <Tooltip title="Agregar Gasto" placement="top">
              <IconButton
                size="medium"
                color="inherit"
                onClick={() => router.push('/create-document')}
                sx={{
                  marginLeft: 'auto',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  backgroundColor: '#1A73E8', // Color acorde a la web
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#155AAB',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <AddCircleIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </ListItem>
        </Tooltip>

        {/* Aquí eliminé la línea divisoria (Divider) */}

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
            {isMenuOpen && <ListItemText primary={t('sidebar.employees')} sx={{ color: '#343A40', fontWeight: 'bold' }} />}
          </ListItem>
        </Tooltip>

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
            {isMenuOpen && <ListItemText primary={t('sidebar.projects')} sx={{ color: '#343A40', fontWeight: 'bold' }} />}
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );
};

export default Sidebar;
