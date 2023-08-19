import { styled } from 'styled-components';
import DocumentTitle from './DocumentTitle';
import Note from './Note';
const Document = ({ document }) => {
  const { id, title, notes } = document;
  return (
    <Wrapper>
      <DocumentTitle title={title} />
      <ul>
        {/* <li>
          <Note type={'section-heading'} content={content} />
        </li>
        <li>
          <Note type={'plain'} content={'note 1'} />
        </li>
        <li>
          <Note type={'plain'} content={'note 2'} />
        </li>
        <li>
          <Note id={1} type={'basic'} content={content} />
        </li>
        <li>
          <Note
            id={2}
            type={'reversible'}
            content={{ ...content, front: 'front', back: 'back' }}
          />
        </li>
        <li>
          <Note type={'list'} content={'note 2'} />
        </li>
        <li>
          <Note type={'cloze'} content={'note 2'} />
        </li> */}
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

export default Document;

const Wrapper = styled.article`
  height: 93vh;
  overflow: auto;
`;
