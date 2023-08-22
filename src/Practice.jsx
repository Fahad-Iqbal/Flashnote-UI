import React from 'react';
import styled from 'styled-components';
import BasicSelect from './BasicSelect';

const Practice = () => {
  const numFlashcards = 22;

  return (
    <Wrapper>
      <div className="practice-header">
        <p>{`${numFlashcards} cards in `}</p>
        <BasicSelect />
      </div>
      <hr />
    </Wrapper>
  );
};

export default Practice;

const Wrapper = styled.div`
  width: 90%;
  min-width: 50rem;
  background-color: var(--color-background);
  color: var(--note-text-color);
  height: clamp(40rem, 60vh, 100rem);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;

  .select {
    color: var(--note-text-color);
    border-color: var(--note-text-color);
  }
  svg {
    color: var(--note-text-color);
  }
  .practice-header {
    display: flex;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    gap: 1.2rem;
    padding: 1rem;
  }
  hr {
    color: (-note-text-color);
  }
`;
