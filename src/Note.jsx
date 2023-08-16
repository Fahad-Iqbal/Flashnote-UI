import React, { forwardRef, useRef } from 'react';
import PlainNote from './PlainNote';
import styled from 'styled-components';
import SpeedDialPlain from './SpeedDialPlain';

const Note = ({ type }) => {
  if (type === 'plain')
    return (
      <Wrapper>
        <PlainNote />
        <SpeedDialPlain />
      </Wrapper>
    );
  if (type === 'plain')
    return (
      <Wrapper>
        <PlainNote />
        <SpeedDialPlain />
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
  div:focus {
    outline: none;
  }
  .plain-note {
    margin-right: 5rem;
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
