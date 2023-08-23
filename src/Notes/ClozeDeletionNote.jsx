import React, { useState, useEffect } from 'react';
import { Button, Popover } from '@mui/material';
import { useGlobalContext } from '../context';
import Note from './Note';

const ClozeDeletionNote = ({ id, type, content: noteContent, index }) => {
  const [content, setContent] = useState(noteContent || '');
  const [isSelected, setIsSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSelectionBar, setShowSelectionBar] = useState(false);

  const [isSpanClicked, setIsSpanClicked] = useState(false);
  const {
    selectedDoc,
    moveNoteUp,
    moveNoteDown,
    updateDocument,
    handleArrowUp,
    handleArrowDown,
    isCaretAtEnd,
    isCaretAtBeginning,
    removeNote,
    focusOnPreviousNote,
    duplicateNote,
    insertEmptyNoteOfType,
    isPracticeOpen,
  } = useGlobalContext();

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
    const input = document.getElementById(id);
    input.innerHTML = `${content}`;

    updateDocument(selectedDoc.id, id, {
      id: id,
      type: 'cloze',
      content: content,
    });
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
            Add a Cloze Deletion
          </Button>
        </Popover>
      )}
      {isSpanClicked && !selectedDoc.finished && (
        <Popover
          className="remove-cloze"
          open={isSpanClicked}
          anchorEl={() => {
            return document.getElementById(id);
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
        id={id}
        contentEditable={!(selectedDoc.finished || isPracticeOpen)}
        onKeyDown={(e) => {
          if (
            e.key === 'Backspace' &&
            (e.target.innerText.length === 0 || e.target.innerHTML === '<br>')
          ) {
            focusOnPreviousNote(id);
            removeNote(selectedDoc.id, id);
          }

          if (e.key === 'Enter') {
            e.preventDefault();
            if (!e.altKey) {
              setShowSelectionBar(true);
            } else if (e.altKey && !e.shiftKey) {
              insertEmptyNoteOfType(selectedDoc.id, index + 1, type);
            } else if (e.altKey && e.shiftKey) {
              duplicateNote(selectedDoc.id, index + 1, id);
            }
          }

          if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (e.altKey) {
              moveNoteUp(selectedDoc.id, id);
            } else if (!e.altKey && !e.shiftKey) {
              handleArrowUp(id);
            }
            return;
          }
          if (
            e.key === 'ArrowDown' ||
            (isCaretAtEnd() && e.key === 'ArrowRight')
          ) {
            if (e.altKey) {
              moveNoteDown(selectedDoc.id, id);
            } else if (!e.altKey && !e.shiftKey) handleArrowDown(id);
            return;
          }
        }}
        onBlur={(e) => {
          setContent(e.target.innerHTML);
          setTimeout(() => {
            setShowSelectionBar(false);
          }, 100);
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
      {showSelectionBar && <Note type={'selection-bar'} index={index + 1} />}
    </>
  );
};

export default React.memo(ClozeDeletionNote);
