import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const DocumentTitle = ({ title }) => {
  return (
    <Wrapper>
      <div>
        <h1>{title}</h1>
        <FormControlLabel
          control={<Checkbox color="primary" size="small" />}
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
