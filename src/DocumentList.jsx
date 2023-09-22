import { Delete } from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@mui/material';
import { useGlobalContext } from './context';
import { useState } from 'react';

const DocumentList = ({ docArray }) => {
  const {
    deleteDocument,
    selectedDoc,
    setSelectedDoc,
    setIsAllDocsOpen,
    state,
  } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [docId, setDocId] = useState(false);
  return (
    <List>
      {docArray.map((document) => {
        return (
          <ListItem>
            <ListItemText
              style={{ cursor: 'pointer', color: 'var(--note-text-color)' }}
              onClick={() => {
                setSelectedDoc(state[document.id]);
                setIsAllDocsOpen(false);
              }}
              primary={document.title}
            />
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setDocId(document.id);
                  setOpen(true);
                  if (document.id === selectedDoc?.id) {
                    setSelectedDoc(null);
                  }
                }}
                color="primary"
                edge="end"
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </ListItem>
        );
      })}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete this document?'}
        </DialogTitle>
        <DialogActions>
          <Button
            style={{ color: 'red' }}
            onClick={() => {
              deleteDocument(docId);
              setOpen(false);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};
export default DocumentList;
