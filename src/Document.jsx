import React from 'react';

const Document = () => {
  return (
    <div
      style={{
        bottom: '0',
        height: '93vh',
        overflow: 'scroll',
        borderBottom: '1px dashed black',
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
