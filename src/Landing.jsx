import React, { useEffect } from 'react';
import heroImg from './hero.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Landing = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <Wrapper className="hero-section">
      <article>
        <div className="logo-container">
          <img
            className="logo-icon"
            src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047201/Icon_rkfp37.png"
            alt="icon"
          />
          <div className="logo-text-container">
            <div className="logo-text">
              Flash<span>N</span>ote
            </div>
          </div>
        </div>
        <h1>Take Your Learning to Extraordinary Heights</h1>
        <p>
          FlashNote is a note-taking and flashcard app, designed to help you
          understand and master memory intensive subjects.{' '}
        </p>
        <button
          className="btn primary"
          onClick={() => {
            navigate('/login');
          }}
        >
          Sign In
        </button>
      </article>
      <img
        className="hero-img"
        src={heroImg}
        alt="Image of man holding a test paper"
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: absolute;
  display: flex;
  /* height: 40vh; */
  gap: 8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  max-width: 100rem;
  padding: 3rem;
  box-shadow: 1px 1px 3px #0000001c;

  img.hero-img {
    width: 40%;
    object-position: top;
    object-fit: contain;
  }

  article {
    /* padding-top: 10rem; */
    justify-content: space-around;
    width: 50%;
  }

  .logo-container {
    height: 5rem;
    margin-left: 0;
  }
  .logo-text-container {
    height: 100%;
  }
  .logo-text {
    height: 100%;
    font-size: 4rem;
  }
  .logo-icon {
    height: 3.5rem;
    width: 3.5rem;
  }

  h1 {
    font-size: 2.4rem;
    padding-top: 2.4rem;
  }
  p {
    padding-top: 1.6rem;
    font-size: 1.6rem;
  }

  .btn.primary {
    margin-top: 2rem;
    padding: 0.6rem 1.2rem;
  }

  @media (max-width: 750px) {
    .hero-img {
      right: -3rem;
      top: 25rem;
      position: absolute;
    }
  }
`;

export default Landing;
