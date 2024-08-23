// src/pages/_app.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { LanguageProvider } from '../context/LanguageContext';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        {/* Wrap the Component with AnimatePresence for animation transitions */}
        <AnimatePresence mode='wait'>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
