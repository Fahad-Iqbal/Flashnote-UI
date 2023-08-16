import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  WebAsset,
  WebAssetOff,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(-0.5),
    right: theme.spacing(3),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <Delete color="error" />, name: 'Remove' },
  { icon: <KeyboardDoubleArrowDown />, name: 'Insert Note Below' },
  { icon: <KeyboardDoubleArrowUp />, name: 'Insert Note Above' },
  { icon: <KeyboardArrowDown />, name: 'Move Down' },
  { icon: <KeyboardArrowUp />, name: 'Move Up' },
];

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

export default function SpeedDialTest() {
  const [enabled, setEnabled] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon />}
        direction={'left'}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
        <SpeedDialAction
          key={
            enabled
              ? 'Disable Flashcards From This Note'
              : 'Enable Flashcards From This Note'
          }
          icon={enabled ? <WebAssetOff /> : <WebAsset />}
          tooltipTitle={
            enabled
              ? 'Disable Flashcards From This Note'
              : 'Enable Flashcards From This Note'
          }
          onClick={() => {
            setEnabled((prev) => !prev);
          }}
        />
      </StyledSpeedDial>
    </ThemeProvider>
  );
}