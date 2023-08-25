import { Delete } from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { useGlobalContext } from './context';

const DocumentList = ({ docArray }) => {
  const { deleteDocument, setSelectedDoc, setIsAllDocsOpen, state } =
    useGlobalContext();

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
                  deleteDocument(document.id);
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
    </List>
  );
};
export default DocumentList;
