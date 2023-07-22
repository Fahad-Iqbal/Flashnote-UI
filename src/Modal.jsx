import React from 'react';

const Modal = ({ modalType, setFn }) => {
  return (
    <div
      className="overlay"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: '1000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={(e) => {
        if (e.target.classList.contains('overlay')) setFn(false);
      }}
    >
      <div
        className="modal"
        style={{
          width: '70%',
          height: '80%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minWidth: '500px',
          backgroundColor: 'var(--color-background)',
          color: 'var(--note-text-color)',
          borderRadius: '1rem',
        }}
      >
        <h1 style={{ fontSize: '4rem' }}>{modalType} Modal</h1>
        <br />
        <h3 style={{ fontSize: '2rem' }}>
          Click the button or click outside the modal to exit
        </h3>
        <br />
        <br />
        <button
          className="btn"
          onClick={() => {
            setFn(false);
          }}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Modal;
