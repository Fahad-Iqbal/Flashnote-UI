import React from 'react';

const Document = () => {
  return (
    <div
      className="document"
      style={{
        bottom: '0',
        height: '93vh',
        overflow: 'auto',
      }}
    >
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
