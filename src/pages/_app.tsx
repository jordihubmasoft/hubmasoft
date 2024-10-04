// src/pages/_app.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { LanguageProvider } from '../context/LanguageContext';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { AuthProvider } from "../context/AuthContext"; // Asegúrate que la ruta sea correcta

// Tema personalizado
const theme = createTheme({
  palette: {
    background: {
      default: '#F8F9FA',
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    // Envuelve toda la aplicación con AuthProvider para manejar la autenticación
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          {/* Wrap the Component with AnimatePresence for animation transitions */}
          <AnimatePresence mode='wait'>
            {/* Pasa la ruta actual como la key para manejar las animaciones entre páginas */}
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
