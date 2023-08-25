import { styled } from 'styled-components';
import DocumentTitle from './Notes/DocumentTitle';
import Note from './Notes/Note';
import { useGlobalContext } from './context';
import React from 'react';
const Document = () => {
  const { selectedDoc } = useGlobalContext();
  if (!selectedDoc) {
    return (
      <Wrapper>
        <div className="empty-document">
          <h1>No document to show. Create or select a document.</h1>
        </div>
      </Wrapper>
    );
  }
  const { id, title, notes } = selectedDoc;

  return (
    <Wrapper>
      <DocumentTitle title={title} />
      <ul>
        {notes?.map((note, index) => {
          const { type, content } = note;
          return (
            <li key={note.id}>
              <Note
                id={note.id}
                index={index}
                type={type}
                content={content}
                flashcardDisabled={!!note.flashcardDisabled}
              />
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
  .empty-document {
    color: var(--note-text-color);
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
    width: 100%;
    margin: 5rem;
    margin-left: auto;
    margin-right: auto;
  }
`;
