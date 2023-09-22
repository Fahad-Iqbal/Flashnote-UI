import React from 'react';
import { useGlobalContext } from '../context';

const DocumentButton = ({ document }) => {
  const { selectedDoc, setSelectedDoc } = useGlobalContext();
  const isSelected = document.id === selectedDoc?.id;
  return (
    <button
      className={isSelected ? 'doc-button selected' : 'doc-button'}
      onClick={() => setSelectedDoc(document)}
    >
      <img
        src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
        alt="Document icon"
      />
      <p>{document.title}</p>
    </button>
  );
};

export default DocumentButton;
