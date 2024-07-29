import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Logo from '../public/img/Logo.svg'  // Asegúrate de que la ruta sea correcta

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1A1A40' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', height: '70px' }}> {/* Fija la altura del contenedor */}
          <Image src={Logo} alt="Logo" width={150} height={150} style={{ maxHeight: '100%' }} /> {/* Ajusta el tamaño del logo */}
        </Box>
        <Box>
          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
          >
            <NotificationsIcon sx={{ color: '#2666CF' }} />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle sx={{ color: '#2666CF' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
