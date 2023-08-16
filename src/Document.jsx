import { styled } from 'styled-components';
import DocumentTitle from './DocumentTitle';
import Note from './Note';
import SpeedDialTest from './SpeedDialPlain';
const Document = ({ document }) => {
  const { id, title, content } = document || {
    id: 0,
    title: 'Biology',
  };
  return (
    <Wrapper>
      <DocumentTitle title={title} />
      <ul>
        <li>
          <Note type={'section-heading'} />
        </li>
        <li>
          <Note type={'plain'} />
        </li>
        <li>
          <Note type={'plain'} />
        </li>
      </ul>
    </Wrapper>
  );
};

export default Document;

const Wrapper = styled.article``;
