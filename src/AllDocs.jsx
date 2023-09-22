import React from 'react';
import BasicTabs from './BasicTabs';
import { styled } from 'styled-components';
import CloseButton from './CloseButton';
import { useGlobalContext } from './context';

const AllDocs = () => {
  const { setIsAllDocsOpen } = useGlobalContext();
  return (
    <Wrapper>
      <CloseButton
        clickFn={() => {
          setIsAllDocsOpen(false);
        }}
      />
      <BasicTabs />
    </Wrapper>
  );
};

export default AllDocs;

const Wrapper = styled.div`
  position: relative;
  padding: 1rem;
  background-color: var(--color-background);
  width: 40vw;
  height: 70vh;
  overflow: auto;
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
`;
