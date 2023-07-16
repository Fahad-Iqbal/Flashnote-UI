import React from 'react';

const Document = ({ setIsSideNavOpen }) => {
  return (
    <div
      className="document"
      style={{
        bottom: '0',
        height: '93vh',
        overflow: 'scroll',
        borderBottom: '1px dashed black',
      }}
    >
      <button
        onClick={(e) => {
          setIsSideNavOpen(true);
        }}
        style={{
          transform: 'rotate(90deg) translate()',
          position: 'absolute',
          left: '0',
          top: '50%',
          zIndex: '100',
          cursor: 'pointer',
        }}
      >
        Open
      </button>
      <p
        style={{
          fontSize: '5rem',
          textAlign: 'center',
          verticalAlign: 'center',
          padding: '30vh',
        }}
      >
        Document Area
      </p>
    </div>
  );
};

export default Document;
