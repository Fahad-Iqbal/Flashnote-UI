import { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from './context';

const SectionHeading = ({ id, heading }) => {
  const [content, setContent] = useState(heading || '');
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
