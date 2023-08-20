import { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from './context';

const SectionHeading = ({ id, heading }) => {
  const [content, setContent] = useState(heading || '');
  const { selectedDoc, moveNoteUp, moveNoteDown, updateDocument } =
    useGlobalContext();

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
    <div
      id={id}
      contentEditable={!selectedDoc.finished}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.key === 'ArrowUp') {
          if (e.altKey) {
            moveNoteUp(selectedDoc.id, id);
          }
        }
        if (e.key === 'ArrowDown') {
          if (e.altKey) moveNoteDown(selectedDoc.id, id);
        }
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
      className="section-heading"
    ></div>
  );
};

export default SectionHeading;
