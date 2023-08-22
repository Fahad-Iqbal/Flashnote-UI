import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
import Note from './Note';

const SectionHeading = ({ id, heading, index, type }) => {
  const [content, setContent] = useState(heading || '');
  const [showSelectionBar, setShowSelectionBar] = useState(false);
  const {
    selectedDoc,
    moveNoteUp,
    moveNoteDown,
    handleArrowDown,
    handleArrowUp,
    isCaretAtEnd,
    updateDocument,
    removeNote,
    focusOnPreviousNote,
    duplicateNote,
    insertEmptyNoteOfType,
  } = useGlobalContext();

  useEffect(() => {
    const input = document.getElementById(id);
    input.innerText = content;
    updateDocument(selectedDoc.id, id, {
      id: id,
      type: 'section-heading',
      content: content,
    });
  }, [content]);

  return (
    <>
      <div
        id={id}
        contentEditable={!selectedDoc.finished}
        onKeyDown={(e) => {
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
            e.key === 'Backspace' &&
            (e.target.innerText.length === 0 || e.target.innerHTML === '<br>')
          ) {
            focusOnPreviousNote(id);
            removeNote(selectedDoc.id, id);
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
          setContent(e.target.innerText);
          setTimeout(() => {
            setShowSelectionBar(false);
          }, 100);
        }}
        onPaste={(e) => {
          if (e.clipboardData.items[0].type !== 'text/plain') {
            e.preventDefault();
          }
          setContent(`${e.target.innerText}`);
        }}
        className="section-heading "
      ></div>
      {showSelectionBar && <Note type={'selection-bar'} index={index + 1} />}
    </>
  );
};

export default React.memo(SectionHeading);
