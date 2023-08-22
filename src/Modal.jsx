import React from 'react';
import { useGlobalContext } from './context';
import Practice from './Practice';
import Create from './Create';
import Search from './Search';
import AllDocs from './AllDocs';
import User from './User';

const Modal = ({ modalType }) => {
  const {
    setIsSearchOpen,
    setIsAllDocsOpen,
    setIsPracticeOpen,
    setIsCreateOpen,
    setIsUserOpen,
  } = useGlobalContext();
  const setFunctions = {
    all: setIsAllDocsOpen,
    search: setIsSearchOpen,
    practice: setIsPracticeOpen,
    create: setIsCreateOpen,
    user: setIsUserOpen,
  };

  const setFn = setFunctions[modalType];
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
          maxWidth: '120rem',
          display: 'flex',
          justifyContent: 'center',
          minWidth: '500px',
        }}
      >
        {modalType === 'practice' && <Practice />}
        {modalType === 'create' && <Create />}
        {modalType === 'search' && <Search />}
        {modalType === 'all' && <AllDocs />}
        {modalType === 'user' && <User />}
      </div>
    </div>
  );
};

export default Modal;
