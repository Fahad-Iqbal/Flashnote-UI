import React from 'react';
import PlainNote from './PlainNote';
import styled from 'styled-components';

const Note = () => {
  return (
    <Wrapper>
      <PlainNote />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem;
  margin-left: 3rem;
  font-size: 2rem;
  min-height: 5rem;
  padding: 0.5rem;
  box-shadow: 1px 1px 3px var(--footer-box-shadow);
  div:focus {
    outline: none;
  }
  .plain-note {
    margin-right: 5rem;
  }
`;

export default Note;
