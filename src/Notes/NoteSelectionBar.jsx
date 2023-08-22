import { Button } from '@mui/material';
import { useGlobalContext } from '../context';
import { nanoid } from 'nanoid';

const NoteSelectionBar = ({ id, index }) => {
  const { selectedDoc, insertNote, focusOnNote } = useGlobalContext();

  const buttons = [
    {
      buttonText: 'Basic Card',
      noteContent: {
        id: nanoid(),
        type: 'basic',
        content: {
          front: '',
          back: '',
        },
      },
    },
    {
      buttonText: 'Reversible Card',
      noteContent: {
        id: nanoid(),
        type: 'reversible',
        content: {
          front: '',
          back: '',
        },
      },
    },
    {
      buttonText: 'List Card',
      noteContent: {
        id: nanoid(),
        type: 'list',
        content: {
          front: '',
          back: [],
        },
      },
    },
    {
      buttonText: 'Cloze Deletion Card',
      noteContent: {
        id: nanoid(),
        type: 'cloze',
        content: '',
      },
    },
    {
      buttonText: 'Section Heading',

      noteContent: {
        id: nanoid(),
        type: 'section-heading',
        content: '',
      },
    },
  ];

  return (
    <div className="selection-bar" id={id}>
      <Button style={{ color: 'var(--note-text-color)' }} disabled={true}>
        Insert:
      </Button>
      {buttons.map((button) => {
        const { buttonText, noteContent } = button;
        return (
          <Button
            color="primary"
            style={{
              color: 'var(--note-text-color)',
              border: '1px solid var(--note-text-color)',
              boxShadow: '1px 1px 3px var(--color-header-box-shadow)',
            }}
            key={buttonText}
            variant="outlined"
            onClick={() => {
              insertNote(selectedDoc.id, index, noteContent);
              if (id === 'bottom-selection-bar') {
                setTimeout(() => {
                  const bar = document.getElementById(id);
                  bar.scrollIntoView();
                  focusOnNote(noteContent.id);
                }, 0);
              }
              setTimeout(() => {
                focusOnNote(noteContent.id);
              }, 0);
            }}
          >
            {buttonText}
          </Button>
        );
      })}
    </div>
  );
};
export default NoteSelectionBar;
