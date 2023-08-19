import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 25,
  },
  palette: {
    primary: { main: '#006981' },
  },

  overrides: {
    MuiSpeedDialAction: {
      staticTooltipLabel: {
        backgroundColor: 'red',
        width: 1500,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
