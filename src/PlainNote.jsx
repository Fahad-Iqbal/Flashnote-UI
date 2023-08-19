import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './context';

const PlainNote = ({ id, type, content: noteContent }) => {
  const [content, setContent] = useState(noteContent || '');
  const { selectedDoc } = useGlobalContext();
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
        if (e.key === 'ArrowDown') {
          console.log(e);
          e.target.nextElementSibling.focus();
        }
      }}
      onBlur={(e) => {
        setContent(e.target.innerText);
      }}
      onPaste={(e) => {
        if (e.clipboardData.items[0].type !== 'text/plain') {
          e.preventDefault();
        }
        setContent(e.target.innerText);
      }}
      className={type}
    ></div>
  );
};

export default PlainNote;
