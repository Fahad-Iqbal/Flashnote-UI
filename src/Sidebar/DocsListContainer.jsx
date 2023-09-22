import React, { useRef } from 'react';
import DocumentButton from './DocumentButton';

const DocsListContainer = ({ isOpen, documents }) => {
  const list = useRef();

  const height = list?.current?.getBoundingClientRect()?.height;
  return (
    <div
      className={isOpen ? 'docs-list-container open' : 'docs-list-container'}
      style={isOpen ? { height: height } : {}}
    >
      <ul ref={list}>
        {documents.map((document) => {
          return (
            <li key={document.id}>
              <DocumentButton document={document} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(DocsListContainer);
