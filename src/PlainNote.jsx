import React, { useState, useEffect } from 'react';

const PlainNote = ({ id, type, content: noteContent }) => {
  const [content, setContent] = useState(noteContent || '');
  useEffect(() => {
    const input = document.getElementById(`${type}-${id}`);
    input.innerText = content;
  }, [content]);
  return (
    <div
      id={`${type}-${id}`}
      contentEditable={true}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
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
