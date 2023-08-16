import { styled } from 'styled-components';
import DocumentTitle from './DocumentTitle';
import Note from './Note';
import SpeedDialTest from './SpeedDialTest';
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
          <Note />
        </li>
        <li>
          <Note />
        </li>
      </ul>
    </Wrapper>
  );
};

export default Document;

const Wrapper = styled.article``;
