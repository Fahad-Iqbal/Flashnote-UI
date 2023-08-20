import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './context';

const PlainNote = ({
  id,
  type,
  content: noteContent,
  index,
  handleMoveUp,
  handleMoveDown,
  handleUpdate,
}) => {
  const [content, setContent] = useState(noteContent || '');
  const { selectedDoc, moveNoteUp, moveNoteDown } = useGlobalContext();
  useEffect(() => {
    const input = document.getElementById(id);
    input.innerText = content;
  }, [content]);
  return (
    <div
      id={id}
      contentEditable={!selectedDoc.finished}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.key === 'ArrowUp') {
          if (e.altKey) {
            if (handleMoveUp) {
              handleMoveUp(index);
            }
            moveNoteUp(selectedDoc.id, id);
          }
        }
        if (e.key === 'ArrowDown') {
          if (e.altKey) {
            if (handleMoveDown) {
              handleMoveDown(index);
            }
            moveNoteDown(selectedDoc.id, id);
          }
        }
      }}
      onBlur={(e) => {
        setContent(e.target.innerText);
        handleUpdate(index, e.target.innerText);
      }}
      onPaste={(e) => {
        if (e.clipboardData.items[0].type !== 'text/plain') {
          e.preventDefault();
        }
        setContent(e.target.innerText);
        handleUpdate(index, e.target.innerText);
      }}
      className={type}
    ></div>
  );
};

export default PlainNote;
