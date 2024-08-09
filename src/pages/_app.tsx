// src/pages/_app.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { LanguageProvider } from '../context/LanguageContext';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#F8F9FA',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
