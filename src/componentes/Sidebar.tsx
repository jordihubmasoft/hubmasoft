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
import { Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ isMenuOpen, toggleMenu }) => {
  const router = useRouter();
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F8F9FA' }}>
      <Button onClick={toggleMenu} sx={{ marginBottom: '20px' }}>
        {isMenuOpen ? <ChevronLeftIcon /> : <MenuIcon />}
      </Button>
      <List sx={{ flexGrow: 1 }}>
        <ListItem button onClick={() => handleItemClick('/dashboard')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && <ListItemText primary="Dashboard" />}
        </ListItem>

        <ListItem button onClick={() => handleToggle(setOpenContacts, openContacts)} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <ContactsIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && (
            <>
              <ListItemText primary="Contacts" onClick={() => !openContacts && handleItemClick('/contacts')} />
              {openContacts ? <ExpandLess onClick={() => handleToggle(setOpenContacts, openContacts)} /> : <ExpandMore onClick={() => handleToggle(setOpenContacts, openContacts)} />}
            </>
          )}
        </ListItem>
        <Collapse in={openContacts && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/clients')}>
              <ListItemText primary="Clients" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/suppliers')}>
              <ListItemText primary="Suppliers" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleToggle(setOpenSales, openSales)} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && (
            <>
              <ListItemText primary="Sales" onClick={() => !openSales && handleItemClick('/ventas')} />
              {openSales ? <ExpandLess onClick={() => handleToggle(setOpenSales, openSales)} /> : <ExpandMore onClick={() => handleToggle(setOpenSales, openSales)} />}
            </>
          )}
        </ListItem>
        <Collapse in={openSales && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/sales-quotes')}>
              <ListItemText primary="Quotes" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/sales-orders')}>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/sales-delivery-notes')}>
              <ListItemText primary="Delivery Notes" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/sales-proformas')}>
              <ListItemText primary="Proformas" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/sales-invoices')}>
              <ListItemText primary="Invoices" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleToggle(setOpenPurchases, openPurchases)} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && (
            <>
              <ListItemText primary="Purchases" onClick={() => !openPurchases && handleItemClick('/compras')} />
              {openPurchases ? <ExpandLess onClick={() => handleToggle(setOpenPurchases, openPurchases)} /> : <ExpandMore onClick={() => handleToggle(setOpenPurchases, openPurchases)} />}
            </>
          )}
        </ListItem>
        <Collapse in={openPurchases && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/purchase-quotes')}>
              <ListItemText primary="Quotes" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/purchase-orders')}>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/purchase-delivery-notes')}>
              <ListItemText primary="Delivery Notes" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/purchase-proformas')}>
              <ListItemText primary="Proformas" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/purchase-invoices')}>
              <ListItemText primary="Invoices" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleToggle(setOpenInventory, openInventory)} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && (
            <>
              <ListItemText primary="Inventory" onClick={() => !openInventory && handleItemClick('/inventario')} />
              {openInventory ? <ExpandLess onClick={() => handleToggle(setOpenInventory, openInventory)} /> : <ExpandMore onClick={() => handleToggle(setOpenInventory, openInventory)} />}
            </>
          )}
        </ListItem>
        <Collapse in={openInventory && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/control-panel')}>
              <ListItemText primary="Control Panel" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/warehouses')}>
              <ListItemText primary="Warehouses" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/products')}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/inventory-orders')}>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/sales-orders')}>
              <ListItemText primary="Sales Orders" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/purchase-orders')}>
              <ListItemText primary="Purchase Orders" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleToggle(setOpenAccounting, openAccounting)} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <AccountBalanceIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && (
            <>
              <ListItemText primary="Accounting" onClick={() => !openAccounting && handleItemClick('/contabilidad')} />
              {openAccounting ? <ExpandLess onClick={() => handleToggle(setOpenAccounting, openAccounting)} /> : <ExpandMore onClick={() => handleToggle(setOpenAccounting, openAccounting)} />}
            </>
          )}
        </ListItem>
        <Collapse in={openAccounting && isMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/cashflow')}>
              <ListItemText primary="Cashflow" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/payments-receipts')}>
              <ListItemText primary="Payments and Receipts" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleItemClick('/taxes')}>
              <ListItemText primary="Taxes" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleItemClick('/expenses')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && <ListItemText primary="Expenses" />}
          <IconButton
            size="large"
            color="inherit"
            onClick={() => router.push('/create-document')}
            sx={{ marginLeft: 'auto' }}
          >
            <AddCircleIcon sx={{ color: '#17A2B8', fontSize: '40px' }} />
          </IconButton>
        </ListItem>

        <ListItem button onClick={() => handleItemClick('/empleados')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <AssignmentIndIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && <ListItemText primary="Employees" />}
        </ListItem>

        <ListItem button onClick={() => handleItemClick('/proyectos')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <BusinessCenterIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          {isMenuOpen && <ListItemText primary="Projects" />}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
