import { AppBar, Toolbar, IconButton, Box, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';  // Importa el hook useRouter
import { LanguageContext } from '../context/LanguageContext';
import logo from '../../public/img/Logo.svg'; // Asegúrate de que esta ruta sea correcta

const Header = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { language, changeLanguage } = useContext(LanguageContext)!;
  const router = useRouter(); // Usa el hook useRouter para manejar la navegación

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (lang: string) => {
    changeLanguage(lang);
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    router.push('/profile'); // Redirige a la página de perfil
  };

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
          <img src={logo.src} alt="Logo" height={40} style={{ marginRight: 16 }} />
        </Box>
        <Box>
          <IconButton size="large" aria-label="show new notifications" color="inherit">
            <NotificationsIcon sx={{ color: '#000000' }} />
          </IconButton>
          <IconButton size="large" aria-label="change language" color="inherit" onClick={handleMenuClick}>
            <LanguageIcon sx={{ color: '#000000' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose(language)}
          >
            <MenuItem onClick={() => handleMenuClose('Castellano')}>Castellano</MenuItem>
            <MenuItem onClick={() => handleMenuClose('English')}>English</MenuItem>
          </Menu>
          <IconButton 
            size="large" 
            edge="end" 
            aria-label="account of current user" 
            aria-haspopup="true" 
            color="inherit" 
            onClick={handleProfileClick}  // Asocia el evento onClick con la función de redirección
          >
            <AccountCircle sx={{ color: '#000000' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
