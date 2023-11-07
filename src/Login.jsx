import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from './context';
import { baseURL } from './data';

const Login = () => {
  const { user, setUser } = useGlobalContext();
  const [isFetching, setIsFetching] = useState(false);

  const initialInputs = {
    username: '',
    email: '',
    password: '',
    isMember: true,
    registerMsg: '',
  };
  const [inputs, setInputs] = useState({ ...initialInputs });
  const handleChange = (e) => {
    setInputs((previousState) => {
      return { ...previousState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async () => {
    const url = baseURL + '/register';
    setIsFetching(true);
    try {
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: inputs.username,
          email: inputs.email,
          password: inputs.password,
        }), // body data type must match "Content-Type" header
      });
      const { msg } = await response.json();
      if (msg) {
        setInputs((previousState) => {
          return { ...previousState, registerMsg: msg };
        });
      }
      if (response.status === 201) {
        setInputs((previousState) => {
          return {
            ...previousState,
            username: '',
            email: '',
            password: '',
            isMember: true,
          };
        });
      }
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  const loginUser = async () => {
    setIsFetching(true);
    const url = baseURL + '/login';
    try {
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
        }), // body data type must match "Content-Type" header
      });

      const newUser = await response.json();
      if (response.status === 200) {
        setUser(newUser);
        setInputs((previousState) => {
          return {
            ...previousState,
            username: '',
            email: '',
            password: '',
            isMember: true,
          };
        });
        localStorage.setItem('user', JSON.stringify(newUser));
      } else if (response.status === 401) {
        setInputs((previousState) => {
          return { ...previousState, registerMsg: newUser.msg };
        });
      }
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  if (user) {
    return <Navigate to={'/'} />;
  }
  return (
    <Wrapper className="login">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!inputs.isMember) {
            await registerUser();
          } else if (inputs.isMember) {
            await loginUser();
          }
          // localStorage.setItem('user', JSON.stringify(newUser));
        }}
      >
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
        {inputs.registerMsg && <p>{inputs.registerMsg}</p>}
        <TextField
          required
          inputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          name="username"
          value={inputs.username}
          onChange={handleChange}
          label="Username"
          type="text"
          placeholder="Username"
          variant="standard"
        />
        {!inputs.isMember && (
          <TextField
            required
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 16 } }}
            name="email"
            value={inputs.email}
            onChange={handleChange}
            label="Email"
            type="email"
            placeholder="Email"
            variant="standard"
          />
        )}
        <TextField
          required
          inputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          name="password"
          value={inputs.password}
          onChange={handleChange}
          label="Password"
          type="password"
          placeholder="Password"
          variant="standard"
        />
        <Button type="submit" variant="contained" disabled={isFetching}>
          {inputs.isMember ? 'Sign In' : 'Sign Up'}
        </Button>
        <p>
          {inputs.isMember
            ? "Don't have an account?"
            : 'Already have an account?'}
          <button
            className="have-account-btn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setInputs((prev) => {
                return { ...prev, isMember: !prev.isMember };
              });
            }}
          >
            {inputs.isMember ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    padding-bottom: 3rem;
    width: 100%;
    max-width: 40rem;
    box-shadow: 1px 1px 5px #4e4e4e2b;
    gap: 1rem;
    border-radius: 0.5rem;
  }

  .logo-container {
    align-self: center;
    margin-left: 0;
  }

  Button {
    border-radius: 0.2rem;
    font-size: 1.6rem;
    margin-top: 2rem;
    background-color: var(--primary-button-background);

    &:hover {
      background-color: var(--primary-button-background);
    }
  }

  p {
    font-size: 1.5rem;
  }
  button.have-account-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 1.5rem;
    margin-left: 0.5rem;
    color: var(--primary-button-background);
    text-decoration: underline;
  }
  @media (max-width: 650px) {
    .logo-text {
      display: block;
    }
    .logo-container {
      align-items: center;
      margin: 0;
    }
  }
`;
