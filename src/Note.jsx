import React, { forwardRef, useRef } from 'react';
import PlainNote from './PlainNote';
import styled from 'styled-components';
import SpeedDialPlain from './SpeedDialPlain';
import SectionHeading from './SectionHeading';

const Note = ({ type }) => {
  if (type === 'plain')
    return (
      <Wrapper>
        <PlainNote />
        <SpeedDialPlain />
      </Wrapper>
    );
  if (type === 'section-heading')
    return (
      <Wrapper style={{ marginLeft: '1rem' }}>
        <SectionHeading />
        <SpeedDialPlain type={type} />
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
  border-radius: 0.2rem;
  div:focus {
    outline: none;
  }
  .plain-note {
    padding-top: 1rem;
    margin-right: 5rem;
  }

  &:has(.section-heading) {
    background-color: var(--highlight-color);
  }
  .section-heading {
    width: 100%;
    height: 100%;
    padding-top: 0.5rem;
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .css-1x3g5n7-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab {
    width: 4rem;
    height: 4rem;
    opacity: 0;
    transition: all 0.25s linear !important;
    transform: translateY(3rem) !important;

    /* pointer-events: none; */
  }

  &:hover .css-1x3g5n7-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab,
  &:focus .css-1x3g5n7-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab {
    opacity: 1;
    transform: translateY(0) !important;
    /* pointer-events: all; */
  }
`;

export default Note;
