import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicSelect from './BasicSelect';
import Note from './Notes/Note';
import { useGlobalContext } from './context';
import { Button } from '@mui/material';
const Practice = () => {
  const { showAnswer, setShowAnswer, flashcards, setIsPracticeOpen } =
    useGlobalContext();
  const [selectedFlashcard, setSelectedFlashcard] = useState(0);
  const [note, setNote] = useState(null);

  useEffect(() => {
    if (flashcards.length) setNote(flashcards[selectedFlashcard]);
  }, [selectedFlashcard]);
  if (selectedFlashcard >= flashcards.length || !flashcards.length || !note)
    return (
      <Wrapper>
        <div className="practice-end">
          <h2>You've reviewed all flashcards</h2>
          <Button
            onClick={() => {
              setIsPracticeOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      </Wrapper>
    );
  return (
    <Wrapper>
      <div className="practice-header">
        <p>{`${flashcards.length} cards in `}</p>
        <BasicSelect />
      </div>
      <ul>
        <li>Biology</li>

        {note?.sectionHeading && (
          <li className="sect-heading">{note.sectionHeading}</li>
        )}
      </ul>
      <div className="question-area">
        <Note
          key={note.id}
          id={note.id}
          type={note.type}
          content={note.content}
          practice={true}
          reversible={note.reversible}
        />
      </div>
      {!showAnswer && (
        <div className="show-button-container">
          <button
            className="primary show-button"
            onClick={() => {
              setShowAnswer(true);
            }}
          >
            Show Answer
          </button>
        </div>
      )}
      {showAnswer && (
        <div className="performance-section">
          <button
            onClick={() => {
              setShowAnswer(false);
              setSelectedFlashcard(selectedFlashcard + 1);
            }}
          >
            <p className="icon">😰</p> <p>Forgot</p> <span>1 min</span>{' '}
          </button>
          <button
            onClick={() => {
              setShowAnswer(false);
            }}
          >
            <p className="icon">😬</p> <p>Partially Recalled</p>{' '}
            <span>10 min</span>{' '}
          </button>
          <button
            onClick={() => {
              setShowAnswer(false);
            }}
          >
            <p className="icon">😐</p> <p>Recalled With Effort</p>{' '}
            <span>30 min</span>{' '}
          </button>
          <button
            onClick={() => {
              setShowAnswer(false);
            }}
          >
            <p className="icon">😃</p> <p>Recalled Easily</p>{' '}
            <span>1 hour</span>{' '}
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Practice;

const Wrapper = styled.div`
  width: 90%;
  min-width: 50rem;
  background-color: var(--color-background);
  color: var(--note-text-color);
  height: clamp(50rem, 75vh, 100rem);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;

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
    border-bottom: 0.2rem solid #cce1e6;
    gap: 1.2rem;
    padding: 1rem;
  }

  ul {
    margin-top: 1rem;
    list-style-position: inside;
    font-size: 1.8rem;
    padding-left: 2rem;
  }
  li {
    padding: 0.2rem;
  }
  .sect-heading {
    padding-left: 2.4rem;
  }

  .show-button-container,
  .performance-section {
    margin-top: auto;
    display: flex;
    justify-content: center;
    border-top: 0.2rem solid #cce1e6;

    .show-button {
      display: block;
      width: 100%;
      margin: 0.5rem;
      height: 6.5rem;
      border-bottom-left-radius: 0.6rem;
      border-bottom-right-radius: 0.6rem;
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
  .performance-section button {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    width: 25%;
    border: none;
    margin: 0.2rem;
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 0.6rem;
    box-shadow: 1px 1px 3px var(--secondary-button-shadow-bottom);
    background-color: var(--color-background);
    color: var(--note-text-color);
  }
  .icon {
    font-size: 2rem;
  }

  .question-area {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
  }

  .practice-end {
    width: 100%;
    height: clamp(50rem, 75vh, 100rem);
    background-color: var(--color-background);
    flex-direction: column;
    gap: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
  }
`;
