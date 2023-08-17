import { useState, useRef, useEffect } from 'react';

const SectionHeading = ({ heading }) => {
  const [content, setContent] = useState(heading || '');
  const input = useRef('');
  useEffect(() => {
    input.current.innerText = content;
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
      className="section-heading"
    ></div>
  );
};

export default SectionHeading;
