import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Image from 'next/image';
import logo from '../../public/img/Logo.svg'; // Asegúrate de que esta ruta sea correcta

const Header = ({ isMenuOpen }) => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: '#FFFFFF', 
        boxShadow: 'none', 
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1 // Asegura que el header esté sobre el sidebar
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image src={logo} alt="Logo" height={40} style={{ marginRight: 16 }} />
        </Box>
        <Box>
          <IconButton size="large" aria-label="show new notifications" color="inherit">
            <NotificationsIcon sx={{ color: '#000000' }} />
          </IconButton>
          <IconButton size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
            <AccountCircle sx={{ color: '#000000' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
