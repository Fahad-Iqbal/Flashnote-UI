import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicSelect from './BasicSelect';
import Note from './Notes/Note';
import { useGlobalContext } from './context';
import { Button } from '@mui/material';
import CloseButton from './CloseButton';
const Practice = () => {
  const {
    showAnswer,
    setShowAnswer,
    flashcards,
    setIsPracticeOpen,
    updateFlashcardInfo,
    state,
  } = useGlobalContext();
  const [filteredFlashcards, setFilteredFlashcards] = useState(flashcards);
  const [note, setNote] = useState(null);
  const [times, setTimes] = useState({
    1: 60000,
    2: 120000,
    3: 600000,
    4: 900000,
  });
  const [docIdFilter, setDocIdFilter] = useState('All');

  useEffect(() => {
    const reps = note?.flashcardInfo?.repetitions;
    if (!reps) {
      setTimes({
        1: 60000,
        2: 120000,
        3: 600000,
        4: 900000,
      });
    } else {
      setTimes({
        1: 60000,
        2: 120000 * reps,
        3: reps <= 7 ? 600000 * reps : 18000000 * reps,
        4: reps <= 7 ? 900000 * reps : (36000000 + reps) * reps,
      });
    }
  }, [note]);

  const getTimeString = (time) => {
    const hour = 3600000;
    if (time < hour) {
      const timeNumber = Math.ceil(time / 60000);
      return `${timeNumber} min`;
    } else if (time < 48 * hour) {
      const timeNumber = Math.ceil(time / hour);
      return `${timeNumber} ${timeNumber === 1 ? 'hour' : 'hours'}`;
    } else if (time < 24 * hour * 30) {
      const timeNumber = Math.ceil(time / (24 * hour));
      return `${timeNumber} ${timeNumber === 1 ? 'day' : 'days'}`;
    } else {
      const timeNumber = Math.ceil(time / (24 * hour * 30));
      return `${timeNumber} ${timeNumber === 1 ? 'month' : 'months'}`;
    }
  };

  const handleClick = (easeFactor) => {
    let reps = note?.flashcardInfo?.repetitions;
    if (!reps) {
      reps = 1;
    } else if (easeFactor === 1 && note.flashcardInfo.repetitions >= 5) {
      reps = 5;
    } else if (easeFactor === 2 && note.flashcardInfo.repetitions > 7) {
      reps = 7;
    } else {
      reps += 1;
    }
    updateFlashcardInfo(note, easeFactor, reps, times[easeFactor]);
  };

  useEffect(() => {
    if (docIdFilter !== 'All') {
      const filteredList = flashcards.filter(
        (flashcard) => flashcard.documentId === docIdFilter
      );
      setFilteredFlashcards(filteredList);
    } else if (docIdFilter === 'All') {
      setFilteredFlashcards(flashcards);
    }
  }, [docIdFilter, flashcards]);

  useEffect(() => {
    if (filteredFlashcards.length) {
      setNote(filteredFlashcards[0]);
    } else {
      setNote(null);
    }
  }, [filteredFlashcards]);

  if (!filteredFlashcards.length || !note)
    return (
      <Wrapper>
        <div className="practice-header">
          <p>{`${filteredFlashcards.length} cards in `}</p>
          <BasicSelect
            docIdFilter={docIdFilter}
            setDocIdFilter={setDocIdFilter}
          />
        </div>
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
      <CloseButton
        clickFn={() => {
          setIsPracticeOpen(false);
          setShowAnswer(false);
        }}
      />
      <div className="practice-header">
        <p>{`${filteredFlashcards.length} cards in `}</p>
        <BasicSelect
          docIdFilter={docIdFilter}
          setDocIdFilter={setDocIdFilter}
        />
      </div>

      <ul>
        <li>{note.documentTitle}</li>

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
              handleClick(1);
            }}
          >
            <p className="icon">😰</p> <p>Forgot</p>{' '}
            <span>{getTimeString(times[1])}</span>{' '}
          </button>
          <button
            onClick={() => {
              setShowAnswer(false);
              handleClick(2);
            }}
          >
            <p className="icon">😬</p> <p>Partially Recalled</p>{' '}
            <span>{getTimeString(times[2])}</span>{' '}
          </button>
          <button
            onClick={() => {
              setShowAnswer(false);
              handleClick(3);
            }}
          >
            <p className="icon">😐</p> <p>Recalled With Effort</p>{' '}
            <span>{getTimeString(times[3])}</span>{' '}
          </button>
          <button
            onClick={() => {
              setShowAnswer(false);
              handleClick(4);
            }}
          >
            <p className="icon">😃</p> <p>Recalled Easily</p>{' '}
            <span>{getTimeString(times[4])}</span>{' '}
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Practice;

const Wrapper = styled.div`
  position: relative;
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
      height: 7.5rem;
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
    font-size: 3rem;
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
