import React from 'react';
import PlainNote from './PlainNote';
import styled from 'styled-components';
import SpeedDialPlain from '../SpeedDialPlain';
import SectionHeading from './SectionHeading';
import BasicCardNote from './BasicCardNote';
import ListCardNote from './ListCardNote';
import ClozeDeletionNote from './ClozeDeletionNote';
import { useGlobalContext } from '../context';

const Note = ({ id, type, content }) => {
  if (type === 'basic')
    return (
      <Wrapper>
        <BasicCardNote id={id} type={type} content={content} />
        <SpeedDialPlain id={id} type={type} />
      </Wrapper>
    );
  if (type === 'reversible')
    return (
      <Wrapper>
        <BasicCardNote id={id} type={type} content={content} />
        <SpeedDialPlain id={id} type={type} />
      </Wrapper>
    );
  if (type === 'cloze')
    return (
      <Wrapper>
        <ClozeDeletionNote id={id} type={type} content={content} />
        <SpeedDialPlain id={id} type={type} />
      </Wrapper>
    );
  if (type === 'list')
    return (
      <Wrapper>
        <ListCardNote id={id} type={type} content={content} />
        <SpeedDialPlain id={id} type={type} />
      </Wrapper>
    );
  if (type === 'section-heading')
    return (
      <Wrapper style={{ marginLeft: '1rem' }}>
        <SectionHeading id={id} heading={content} />
        <SpeedDialPlain id={id} type={type} />
      </Wrapper>
    );
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
    /* outline: 1px solid var(--footer-box-shadow); */
    box-shadow: 1px 1px 5px 4px var(--footer-box-shadow);
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
`;

export default React.memo(Note);
