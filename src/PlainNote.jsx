import { SliderValueLabel } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';

const PlainNote = () => {
  const [content, setContent] = useState('hello');
  const input = useRef('');
  useEffect(() => {
    input.current.innerText = content;
    console.log(content);
  }, [content]);
  return (
    <div
      ref={input}
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
        setContent(`${e.target.innerText}`);
      }}
      className="plain-note"
    ></div>
  );
};

export default PlainNote;
