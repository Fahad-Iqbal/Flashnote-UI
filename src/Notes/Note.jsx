import React from 'react';
import styled from 'styled-components';
import SpeedDialPlain from '../SpeedDialPlain';
import SectionHeading from './SectionHeading';
import BasicCardNote from './BasicCardNote';
import ListCardNote from './ListCardNote';
import ClozeDeletionNote from './ClozeDeletionNote';
import { useGlobalContext } from '../context';
import NoteSelectionBar from './NoteSelectionBar';

const Note = ({ id, type, content, index }) => {
  const { isPracticeOpen, showAnswer } = useGlobalContext();
  console.log(showAnswer);
  if (type === 'section-heading')
    return (
      <Wrapper style={{ marginLeft: '1rem' }}>
        <SectionHeading id={id} heading={content} type={type} index={index} />
        <SpeedDialPlain id={id} type={type} />
      </Wrapper>
    );

  if (type === 'selection-bar') {
    return (
      <Wrapper>
        <NoteSelectionBar id={id} index={index} />
      </Wrapper>
    );
  }

  if (isPracticeOpen) {
    return (
      <QuestionWrapper>
        <Wrapper className={showAnswer ? 'answer-note' : 'question-note'}>
          {type === 'basic' && (
            <BasicCardNote
              className={
                showAnswer ? 'show-answer-basic' : 'show-question-basic'
              }
              id={id}
              type={type}
              content={content}
              index={index}
            />
          )}
          {type === 'reversible' && (
            <BasicCardNote
              className={
                showAnswer ? 'show-answer-basic' : 'show-question-basic'
              }
              id={id}
              type={type}
              content={content}
              index={index}
            />
          )}
          {type === 'cloze' && (
            <ClozeDeletionNote
              className={
                showAnswer ? 'show-answer-cloze' : 'show-question-cloze'
              }
              id={id}
              type={type}
              content={content}
              index={index}
            />
          )}
          {type === 'list' && (
            <ListCardNote
              className={showAnswer ? 'show-answer-list' : 'show-question-list'}
              id={id}
              type={type}
              content={content}
              index={index}
            />
          )}

          {!isPracticeOpen && <SpeedDialPlain id={id} type={type} />}
        </Wrapper>
      </QuestionWrapper>
    );
  } else if (!isPracticeOpen) {
    return (
      <Wrapper className={showAnswer ? 'answer-note' : 'question-note'}>
        {type === 'basic' && (
          <BasicCardNote id={id} type={type} content={content} index={index} />
        )}
        {type === 'reversible' && (
          <BasicCardNote id={id} type={type} content={content} index={index} />
        )}
        {type === 'cloze' && (
          <ClozeDeletionNote
            id={id}
            type={type}
            content={content}
            index={index}
          />
        )}
        {type === 'list' && (
          <ListCardNote id={id} type={type} content={content} index={index} />
        )}
        <SpeedDialPlain id={id} type={type} />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  position: relative;
  margin: 1rem;
  margin-left: 3rem;
  font-size: 2rem;
  min-height: 5rem;
  padding: 0.5rem;
  box-shadow: 1px 1px 3px var(--footer-box-shadow);
  color: var(--note-text-color);
  overflow: hidden;
  z-index: 1;
  border-radius: 0.2rem;
  div:focus {
    outline: none;
    box-shadow: 1px 1px 5px 1px var(--footer-box-shadow);
  }

  .plain,
  .cloze {
    padding-left: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-right: 7rem;
  }

  &:has(.section-heading) {
    background-color: var(--highlight-color);
  }
  .section-heading {
    width: 100%;
    height: 100%;
    padding: 0.7rem;
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .css-1x3g5n7-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab {
    width: 4rem;
    height: 4rem;
    opacity: 0;
    transition: all 0.25s linear !important;
    transform: translateY(2.8rem) !important;

    /* pointer-events: none; */
  }

  &:hover .css-1x3g5n7-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab,
  &:focus .css-1x3g5n7-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab,
  .css-1x3g5n7-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab:focus {
    opacity: 1;
    transform: translateY(-0.4rem) !important;
  }

  .basic-note {
    display: flex;
    gap: 1rem;

    .front-of-card,
    .back-of-card,
    .icon {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .front-of-card,
    .back-of-card {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .empty-front,
    .empty-back {
      position: relative;
      min-width: 30rem;
    }

    .empty-front::after,
    .empty-back::after {
      background-color: #d6d6d63b;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      cursor: text;
    }
    .empty-front::after {
      content: 'Front of Card';
    }
    .empty-back::after {
      content: 'Back of Card';
    }
    .icon {
      display: flex;
    }
  }

  svg.arrow {
    font-size: 2.6rem;
    color: var(--color-arrow);
  }

  .list-front-container {
    display: flex;
    gap: 1rem;
  }

  .list-item {
    margin-left: 2rem;
    margin-right: 7rem;
    padding: 0.5rem 1rem;
    position: relative;
    z-index: 3;
    border-left: 0.3rem solid var(--bullet-line);
    font-size: 1.8rem;
  }

  ::marker {
    color: transparent;
  }
  .cloze {
    span {
      background-color: var(--cloze-background);
      color: var(--cloze-text);
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .selection-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &:has(.selection-bar) {
    margin-bottom: 4rem;
  }
`;

const QuestionWrapper = styled.div`
  .question-note,
  .answer-note {
    margin: auto;
    box-shadow: none;
  }
  .question-note {
    span {
      display: inline-block;
      color: transparent;
      background-color: transparent;
      border-bottom: 2px solid var(--note-text-color);
      /* margin-bottom: -0.5rem; */
      line-height: 0.8;
      padding: 0;
      user-select: none;
    }

    .back-of-card {
      color: transparent;
      user-select: none;
    }

    .list-back {
      color: transparent;
      user-select: none;
    }
  }

  .answer-note {
    span {
      color: var(--note-text-color);
      line-height: normal;
      border-bottom: none;
      background-color: transparent;
    }
  }

  .list-back {
    ul {
      margin-top: -3rem;
    }
    li {
      padding: 0;
      margin-top: -1rem;
      /* border: solid 1px red; */
    }
  }
`;
export default React.memo(Note);
