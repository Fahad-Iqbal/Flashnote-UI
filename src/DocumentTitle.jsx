import React from 'react';
import styled from 'styled-components';

const DocumentTitle = ({ title }) => {
  return (
    <Wrapper>
      <h1>{title}</h1>
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 1rem;
  h1 {
    font-size: 3rem;
    padding: 1rem;
    color: var(--note-text-color);
  }
`;

export default DocumentTitle;
