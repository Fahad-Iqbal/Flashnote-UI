import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useGlobalContext } from './context';
import DocumentList from './DocumentList';
import { flexbox } from '@mui/system';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { draftDocs, finishedDocs, state } = useGlobalContext();
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          justifyContent: 'center',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            style={{ color: 'var(--note-text-color)' }}
            label="Draft"
            {...a11yProps(0)}
          />
          <Tab
            style={{ color: 'var(--note-text-color)' }}
            label="Finished"
            {...a11yProps(1)}
          />
          <Tab
            style={{ color: 'var(--note-text-color)' }}
            label="All Documents"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DocumentList docArray={draftDocs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DocumentList docArray={finishedDocs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DocumentList docArray={Object.values(state)} />
      </CustomTabPanel>
    </Box>
  );
}
