import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';

const PlainNote = ({
  id,
  type,
  content: noteContent,
  index,
  handleMoveUp,
  handleMoveDown,
  handleUpdate,
  parentId,
}) => {
  const [content, setContent] = useState(noteContent || '');
  const { selectedDoc, isCaretAtBeginning, focusOnNextNote, isCaretAtEnd } =
    useGlobalContext();
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
            handleMoveUp(index);
          } else if (!e.altKey && !e.shiftKey & isCaretAtBeginning()) {
            const previousListItem = document.getElementById(
              `${parentId}${index - 1}`
            );
            if (previousListItem) {
              previousListItem.focus();
            }
            if (index === 0) {
              const parentNote = document.getElementById(parentId);
              parentNote?.focus();
            }
          }
        }
        if (e.key === 'ArrowDown') {
          if (e.altKey) {
            handleMoveDown(index);
          } else if (!e.altKey && !e.shiftKey & isCaretAtEnd()) {
            const nextListItem = document.getElementById(
              `${parentId}${index + 1}`
            );
            if (nextListItem) {
              nextListItem.focus();
            } else {
              focusOnNextNote(parentId);
            }
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
