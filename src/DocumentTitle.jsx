import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from './context';

const DocumentTitle = ({ title }) => {
  const { selectedDoc, toggleFinished } = useGlobalContext();
  const { finished } = selectedDoc;
  const input = useRef('');
  return (
    <Wrapper>
      <div>
        <h1
          contentEditable={!finished}
          onPaste={(e) => {
            if (e.clipboardData.items[0].type !== 'text/plain') {
              e.preventDefault();
            }
            setFrontContent(`${e.target.innerText}`);
          }}
        >
          {title}
        </h1>
        <FormControlLabel
          control={
            <Checkbox
              checked={finished}
              inputRef={input}
              onChange={() => {
                toggleFinished(selectedDoc.id);
              }}
              color="primary"
              size="small"
            />
          }
          label="Mark as finished"
        />
      </div>
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  div {
    display: flex;
    justify-content: space-between;
  }
  padding: 1rem;
  h1 {
    font-size: 3rem;
    padding: 1rem;
    color: var(--note-text-color);
  }

  .css-m0g451-MuiTypography-root {
    font-size: 1.8rem;
    color: var(--note-text-color);
  }

  .css-1omibmq-MuiButtonBase-root-MuiCheckbox-root {
    color: var(--note-text-color);
  }
`;

export default React.memo(DocumentTitle);
