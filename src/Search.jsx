import React from 'react';
import AutocompleteSearch from './AutocompleteSearch';
import { styled } from 'styled-components';
import { useGlobalContext } from './context';

const Search = () => {
  const { isSearchOpen } = useGlobalContext();
  return (
    <SearchWrapper>
      <AutocompleteSearch key={isSearchOpen} />
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.article`
  padding: 1.5rem;
  width: clamp(50rem, 75vw, 100rem);
  /* height: 75vh; */
  background-color: var(--color-background);
  position: absolute;
  top: 5rem;
  border-radius: 0.5rem;
  z-index: 10000;
`;
