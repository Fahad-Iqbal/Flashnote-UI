import { useRef } from 'react';
import DocumentButton from './DocumentButton';

const DocsListContainer = ({ isOpen }) => {
  const list = useRef();

  const height = list?.current?.getBoundingClientRect()?.height;
  return (
    <div
      className={isOpen ? 'docs-list-container open' : 'docs-list-container'}
      style={isOpen ? { height: height } : {}}
    >
      <ul ref={list}>
        <li>
          <DocumentButton />
        </li>
        <li>
          <DocumentButton />
        </li>
        <li>
          <DocumentButton />
        </li>
        <li>
          <DocumentButton />
        </li>
        <li>
          <DocumentButton />
        </li>
      </ul>
    </div>
  );
};

export default DocsListContainer;
