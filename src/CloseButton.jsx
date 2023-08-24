import React from 'react';
import { styled } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({ clickFn }) => {
  return (
    <Wrapper className="close-button" onClick={clickFn}>
      <CloseIcon />
    </Wrapper>
  );
};

export default CloseButton;

const Wrapper = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  top: 2rem;
  left: 2rem;
  cursor: pointer;

  svg {
    height: 3rem;
    width: 3rem;
    color: var(--note-text-color);
  }
`;
