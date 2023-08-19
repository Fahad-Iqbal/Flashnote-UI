import { useState, useEffect } from 'react';
import { Button, Popover } from '@mui/material';
import { useGlobalContext } from './context';

const ClozeDeletionNote = ({ id, type, content: noteContent }) => {
  const [content, setContent] = useState(noteContent || '');
  const [isSelected, setIsSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSpanClicked, setIsSpanClicked] = useState(false);
  const { selectedDoc } = useGlobalContext();

  const addSpanTags = (text) => {
    if (content.includes(text)) {
      const newInnerHTML = content.replace(text, `<span>${text}</span>`);
      setContent(newInnerHTML);
    }
  };
  const removeSpanTags = (text) => {
    console.log('remove called');
    if (content.includes(text.outerHTML)) {
      const newInnerHTML = content.replace(text.outerHTML, text.innerText);
      setContent(newInnerHTML);
    }
  };
  const removeAllSpanTags = () => {
    const regex = /<span>|<\/span>/g;
    const newInnerHTML = content.replace(regex, '');
    setContent(newInnerHTML);
  };

  useEffect(() => {
    const input = document.getElementById(`${type}-${id}`);
    input.innerHTML = `${content}`;
  }, [content]);

  return (
    <>
      {isSelected && (
        <Popover
          className="add-cloze"
          open={isSelected}
          anchorEl={anchorEl}
          onClose={() => {
            setIsSelected(false);
            window.getSelection().collapseToStart();
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Button
            variant="outlined"
            // color="primary"
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'var(--primary-button-background)',
            }}
            onClick={() => {
              setIsSelected(false);
              addSpanTags(window.getSelection().toString());
            }}
          >
            Add a Cloze
          </Button>
        </Popover>
      )}
      {isSpanClicked && !selectedDoc.finished && (
        <Popover
          className="remove-cloze"
          open={isSpanClicked}
          anchorEl={() => {
            return document.getElementById(`${type}-${id}`);
          }}
          onClose={() => {
            setIsSpanClicked(false);
            setAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Button
            variant="outlined"
            style={{
              margin: '0.2rem',
              fontSize: 10,
              fontWeight: 'bold',
              color: 'var(--primary-button-background)',
            }}
            onClick={() => {
              removeSpanTags(anchorEl);
              setIsSpanClicked(false);
            }}
          >
            Remove
          </Button>
          <Button
            variant="outlined"
            style={{
              margin: '0.2rem',
              fontSize: 10,
              fontWeight: 'bold',
              color: 'var(--primary-button-background)',
            }}
            onClick={() => {
              removeAllSpanTags();
              setIsSpanClicked(false);
            }}
          >
            Remove All
          </Button>
        </Popover>
      )}
      <div
        id={`${type}-${id}`}
        contentEditable={!selectedDoc.finished}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
          if (e.key === 'ArrowDown') {
            e.target.nextElementSibling.focus();
          }
        }}
        onBlur={(e) => {
          setContent(e.target.innerHTML);
        }}
        onSelect={(e) => {
          if (window.getSelection().toString()) {
            setIsSelected(true);
            setAnchorEl(e.target);
          }
          if (!window.getSelection().toString()) {
            setIsSelected(false);
            setAnchorEl(null);
          }
        }}
        onClick={(e) => {
          if (e.target.localName === 'span') {
            setAnchorEl(e.target);
            setIsSpanClicked(true);
          }
        }}
        onPaste={(e) => {
          if (e.clipboardData.items[0].type !== 'text/plain') {
            e.preventDefault();
          }
          setContent(e.target.innerHTML);
        }}
        className={type}
      ></div>
    </>
  );
};

export default ClozeDeletionNote;
