import { styled } from 'styled-components';
import DocumentTitle from './Notes/DocumentTitle';
import Note from './Notes/Note';
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
            <li key={note.id}>
              <Note id={note.id} index={index} type={type} content={content} />
            </li>
          );
        })}
        <hr />
        <li>
          {!selectedDoc.finished && (
            <Note
              id={'bottom-selection-bar'}
              type="selection-bar"
              index={selectedDoc.notes.length}
            />
          )}
        </li>
      </ul>
    </Wrapper>
  );
};

export default React.memo(Document);

const Wrapper = styled.article`
  height: 93vh;
  overflow: auto;
`;
