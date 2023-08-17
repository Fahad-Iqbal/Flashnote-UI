import { styled } from 'styled-components';
import DocumentTitle from './DocumentTitle';
import Note from './Note';
const Document = ({ document }) => {
  const { id, title, content } = document || {
    id: 0,
    title: 'Biology',
    content: {
      heading: 'Structure and function of the cell',
      front: 'Where is the DNA stored in eukaryotic cells',
      back: 'DNA is stored inside the nucleus in eukaryotic cells',
    },
  };
  return (
    <Wrapper>
      <DocumentTitle title={title} />
      <ul>
        <li>
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
      </ul>
    </Wrapper>
  );
};

export default Document;

const Wrapper = styled.article``;
