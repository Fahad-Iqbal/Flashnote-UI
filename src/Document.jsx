import React from 'react';

const Document = () => {
  return (
    <div
      className="document"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '0',
        height: '93vh',
        overflow: 'auto',
      }}
    >
      <p
        style={{
          fontSize: '5rem',
        }}
      >
        Document Area
      </p>
    </div>
  );
};

export default Document;
