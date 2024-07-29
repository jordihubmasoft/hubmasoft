import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ContactsIcon from '@mui/icons-material/Contacts'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon from '@mui/icons-material/Inventory'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()

  return (
    <List sx={{ bgcolor: '#1A1A40', color: '#EFFFFD', height: '100vh', padding: '20px' }}>
      <ListItem button onClick={() => router.push('/dashboard')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
        <ListItemIcon>
          <DashboardIcon sx={{ color: '#2666CF' }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => router.push('/contacts')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
        <ListItemIcon>
          <ContactsIcon sx={{ color: '#2666CF' }} />
        </ListItemIcon>
        <ListItemText primary="Contacto" />
      </ListItem>
      <ListItem button onClick={() => router.push('/ventas')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
        <ListItemIcon>
          <ShoppingCartIcon sx={{ color: '#2666CF' }} />
        </ListItemIcon>
        <ListItemText primary="Ventas" />
      </ListItem>
      <ListItem button onClick={() => router.push('/compras')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
        <ListItemIcon>
          <InventoryIcon sx={{ color: '#2666CF' }} />
        </ListItemIcon>
        <ListItemText primary="Compras" />
      </ListItem>
      <ListItem button onClick={() => router.push('/empleados')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
        <ListItemIcon>
          <AssignmentIndIcon sx={{ color: '#2666CF' }} />
        </ListItemIcon>
        <ListItemText primary="Empleados" />
      </ListItem>
      <ListItem button onClick={() => router.push('/proyectos')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
        <ListItemIcon>
          <BusinessCenterIcon sx={{ color: '#2666CF' }} />
        </ListItemIcon>
        <ListItemText primary="Proyectos" />
      </ListItem>
      <ListItem button onClick={() => router.push('/inventario')} sx={{ borderRadius: '10px', marginBottom: '10px' }}>
        <ListItemIcon>
          <InventoryIcon sx={{ color: '#2666CF' }} />
        </ListItemIcon>
        <ListItemText primary="Inventario" />
      </ListItem>
    </List>
  )
}

export default Sidebar
