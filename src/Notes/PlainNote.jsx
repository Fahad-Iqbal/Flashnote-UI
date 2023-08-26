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
  handleRemove,
  backContent,
  setBackContent,
}) => {
  const [content, setContent] = useState(noteContent || '');
  const {
    selectedDoc,
    isCaretAtBeginning,
    focusOnNextNote,
    isCaretAtEnd,
    focusOnNote,
    isPracticeOpen,
    isSearchOpen,
  } = useGlobalContext();
  useEffect(() => {
    const input = document.getElementById(id);
    input.innerText = content;
  }, [content]);

  return (
    <div
      id={id}
      contentEditable={
        !(selectedDoc?.finished || isPracticeOpen || isSearchOpen)
      }
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          if (!e.target.innerText.length) {
            const newList = backContent.filter((_, i) => i !== index);
            setBackContent(newList);
            setTimeout(() => {
              const previousListItem = document.getElementById(
                `${parentId}${index - 1}`
              );
              if (previousListItem) {
                previousListItem.focus();
              }
              if (index === 0) document.getElementById(parentId).focus();
            }, 90);
          }
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          const newList = [...backContent];
          if (!e.altKey && !e.shiftKey) {
            if (!newList.length) {
              setBackContent(['', '']);
            } else if (newList.length) {
              newList.splice(index + 1, 0, '');
              setBackContent(newList);
            }
          } else if (e.altKey && e.shiftKey) {
            newList.splice(index + 1, 0, `${e.target.innerText}`);
            setBackContent(newList);
          }
          setTimeout(() => {
            const nextListItem = document.getElementById(
              `${parentId}${index + 1}`
            );
            if (nextListItem) {
              nextListItem.focus();
            }
          }, 10);
        }
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

export default React.memo(PlainNote);
