import React from 'react';
import { styled } from 'styled-components';

const Create = () => {
  return (
    <Wrapper>
      <div form-container></div>
    </Wrapper>
  );
};

export default Create;

const Wrapper = styled.div`
  width: 90%;
  min-width: 50rem;
  background-color: var(--color-background);
  color: var(--note-text-color);
  /* height: clamp(50rem, 75vh, 100rem); */
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;
