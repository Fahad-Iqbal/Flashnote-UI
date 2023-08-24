import React, { useEffect } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  // KeyboardDoubleArrowDown,
  // KeyboardDoubleArrowUp,
  WebAsset,
  WebAssetOff,
} from '@mui/icons-material';
import { useState } from 'react';
import { useGlobalContext } from './context';

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
  { icon: <Delete sx={{ color: '#720000' }} />, name: 'Remove' },
  // { icon: <KeyboardDoubleArrowDown />, name: 'Insert Note Below' },
  // { icon: <KeyboardDoubleArrowUp />, name: 'Insert Note Above' },
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

function SpeedDialPlain({ type, id }) {
  const {
    selectedDoc,
    removeNote,
    moveNoteUp,
    moveNoteDown,
    toggleFlashcardDisabled,
    getFlashcardDisabled,
    state,
  } = useGlobalContext();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    console.log(getFlashcardDisabled(id));
    console.log(id);
    setEnabled(!getFlashcardDisabled(id));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StyledSpeedDial
        sx={{ '& .MuiFab-primary': { width: 40, height: 40 } }}
        className="speed-dial"
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon />}
        direction={'left'}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() => {
              if (action.name === 'Remove') {
                removeNote(selectedDoc.id, id);
              }
              if (action.name === 'Move Up') {
                moveNoteUp(selectedDoc.id, id);
              }
              if (action.name === 'Move Down') {
                moveNoteDown(selectedDoc.id, id);
              }
            }}
            disabled={selectedDoc.finished}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
        {type !== 'section-heading' && type !== 'plain' && (
          <SpeedDialAction
            sx={
              enabled
                ? { border: '0.05rem solid #00748e55' }
                : { border: '0.05rem solid #7200005c' }
            }
            icon={enabled ? <WebAsset /> : <WebAssetOff />}
            tooltipTitle={
              enabled ? 'Flashcard: Enabled' : 'Flashcard: Disabled'
            }
            onClick={() => {
              setEnabled((prev) => !prev);
              toggleFlashcardDisabled(id);
            }}
          />
        )}
      </StyledSpeedDial>
    </ThemeProvider>
  );
}

export default React.memo(SpeedDialPlain);
