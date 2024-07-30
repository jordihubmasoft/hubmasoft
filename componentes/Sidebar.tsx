import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ContactsIcon from '@mui/icons-material/Contacts'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon from '@mui/icons-material/Inventory'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box, IconButton } from '@mui/material'

const Sidebar = () => {
  const router = useRouter()
  const [openContacts, setOpenContacts] = useState(false)
  const [openSales, setOpenSales] = useState(false)
  const [openPurchases, setOpenPurchases] = useState(false)
  const [openInventory, setOpenInventory] = useState(false)
  const [openAccounting, setOpenAccounting] = useState(false)

  const handleContactsClick = () => {
    setOpenContacts(!openContacts)
  }

  const handleSalesClick = () => {
    setOpenSales(!openSales)
  }

  const handlePurchasesClick = () => {
    setOpenPurchases(!openPurchases)
  }

  const handleInventoryClick = () => {
    setOpenInventory(!openInventory)
  }

  const handleAccountingClick = () => {
    setOpenAccounting(!openAccounting)
  }

  return (
    <Box sx={{ bgcolor: '#F8F9FA', height: '100vh', padding: '20px', boxShadow: 'none', borderRight: 'none', position: 'fixed' }}>
      <List>
        <ListItem button onClick={() => router.push('/dashboard')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={handleContactsClick} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <ContactsIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          <ListItemText primary="Contactos" />
          {openContacts ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openContacts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/clientes')}>
              <ListItemText primary="Clientes" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/proveedores')}>
              <ListItemText primary="Proveedores" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleSalesClick} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          <ListItemText primary="Ventas" />
          {openSales ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSales} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/presupuestos-ventas')}>
              <ListItemText primary="Presupuestos" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/pedidos-ventas')}>
              <ListItemText primary="Pedidos" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/albaranes-ventas')}>
              <ListItemText primary="Albaranes" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/proformas-ventas')}>
              <ListItemText primary="Proformas" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/facturas-ventas')}>
              <ListItemText primary="Facturas" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handlePurchasesClick} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          <ListItemText primary="Compras" />
          {openPurchases ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPurchases} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/presupuestos-compras')}>
              <ListItemText primary="Presupuestos" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/pedidos-compras')}>
              <ListItemText primary="Pedidos" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/albaranes-compras')}>
              <ListItemText primary="Albaranes" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/proformas-compras')}>
              <ListItemText primary="Proformas" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/facturas-compras')}>
              <ListItemText primary="Facturas" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleInventoryClick} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          <ListItemText primary="Inventario" />
          {openInventory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openInventory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/panel-control')}>
              <ListItemText primary="Panel de control" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/almacenes')}>
              <ListItemText primary="Almacenes" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/productos')}>
              <ListItemText primary="Productos" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/pedidos-inventario')}>
              <ListItemText primary="Pedidos" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/pedidos-venta')}>
              <ListItemText primary="Pedidos de venta" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/pedidos-compra')}>
              <ListItemText primary="Pedidos de compra" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleAccountingClick} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <AccountBalanceIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          <ListItemText primary="Contabilidad" />
          {openAccounting ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAccounting} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/clashflow')}>
              <ListItemText primary="Clashflow" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/pagos-cobros')}>
              <ListItemText primary="Pagos y cobros" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => router.push('/impuestos')}>
              <ListItemText primary="Impuestos" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => router.push('/gastos')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: '#6C757D' }} />
          </ListItemIcon>
          <ListItemText primary="Gastos" />
          <IconButton
            size="large"
            color="inherit"
            onClick={() => router.push('/crear-documento')}
            sx={{ marginLeft: 'auto' }}
          >
            <AddCircleIcon sx={{ color: '#17A2B8', fontSize: '40px' }} />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default Sidebar
