import { styled } from 'styled-components';
import DocumentTitle from './DocumentTitle';
import Note from './Note';
import { useGlobalContext } from './context';
import React from 'react';
const Document = () => {
  const { selectedDoc } = useGlobalContext();
  const { id, title, notes } = selectedDoc;

  return (
    <Wrapper>
      <DocumentTitle title={title} />
      <ul>
        {notes.map((note, index) => {
          const { type, content } = note;
          return (
            <li key={index}>
              <Note id={index} type={type} content={content} />
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default React.memo(Document);

const Wrapper = styled.article`
  height: 93vh;
  overflow: auto;
`;
