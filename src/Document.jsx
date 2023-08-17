import { styled } from 'styled-components';
import DocumentTitle from './DocumentTitle';
import Note from './Note';
import SpeedDialTest from './SpeedDialPlain';
const Document = ({ document }) => {
  const { id, title, content } = document || {
    id: 0,
    title: 'Biology',
    content: {
      heading: 'Structure and function of the cell',
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
      </ul>
    </Wrapper>
  );
};

export default Document;

const Wrapper = styled.article``;
