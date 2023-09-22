import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { useGlobalContext } from './context';
import CloseButton from './CloseButton';

const Create = () => {
  const { setIsCreateOpen, createNewDocument } = useGlobalContext();
  const createInput = useRef('');
  return (
    <Wrapper>
      <CloseButton
        clickFn={() => {
          setIsCreateOpen(false);
        }}
      />

      <div>
        <h1>Create New Document</h1>
      </div>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          if (!createInput.current.value) {
            return;
          }
          setIsCreateOpen(false);
          createNewDocument(createInput.current.value);
        }}
      >
        <input
          ref={createInput}
          placeholder="Document Title"
          type="text"
          name=""
          id="document-title"
        />
        <button
          className="create btn primary"
          // onClick={() => {
          //   setIsCreateOpen(false);
          //   createNewDocument(createInput.current.value);
          // }}
        >
          <img
            src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_4_hzjlkw.svg"
            alt="Plus Icon"
          />
          <p>
            <span>C</span>reate
          </p>
        </button>
      </form>
    </Wrapper>
  );
};

export default Create;

const Wrapper = styled.div`
  width: 50%;
  min-width: 50rem;
  background-color: var(--color-background);
  color: var(--note-text-color);
  /* height: clamp(50rem, 75vh, 100rem); */
  height: 20rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  gap: 3rem;
  position: relative;

  h1 {
    font-size: 2.8rem;
  }

  .form-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  input {
    padding: 0.5rem;
    font-size: 2.4rem;
    height: 3.3rem;
    border-radius: 0.4rem;
    border: none;
    box-shadow: -1px -1px 3px var(--secondary-button-shadow-top),
      1px 1px 3px var(--secondary-button-shadow-bottom);
    background-color: transparent;
    color: var(--note-text-color);
  }
`;
