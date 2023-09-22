import React from 'react';
import { styled } from 'styled-components';
import { useGlobalContext } from './context';

const User = () => {
  const { user, setUser, setIsUserOpen } = useGlobalContext();
  return (
    <Wrapper>
      {' '}
      <div className="user-icon-name-container">
        <img
          className="user-icon"
          src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_aibzke.svg"
          alt="User"
        />
        <p className="user-name">{user.name}</p>
      </div>
      <button
        className="log-out"
        style={{ height: '3rem', fontSize: '1.6rem' }}
        onClick={() => {
          setIsUserOpen(false);
          localStorage.removeItem('user');
          setUser(null);
        }}
      >
        Log out
      </button>
    </Wrapper>
  );
};

export default User;

const Wrapper = styled.div`
  width: 75vw;
  height: 60vh;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  padding: 5rem;
  gap: 3rem;

  img {
    height: 2.4rem;
  }
  .user-name {
    font-size: 2rem;
  }
`;
