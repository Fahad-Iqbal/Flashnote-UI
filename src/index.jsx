import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import AppContext from './context.jsx';

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
    <AppContext>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppContext>
  </React.StrictMode>
);
