import Document from './Document';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import Modal from './Modal';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from './context';
import React from 'react';

const Home = () => {
  const {
    user,
    selectedDoc,
    isSearchOpen,
    isAllDocsOpen,
    isPracticeOpen,
    isCreateOpen,
    isUserOpen,
  } = useGlobalContext();

  if (isSearchOpen) {
    return <Modal modalType={'search'} />;
  }

  const modals = [
    { isModalOpen: isSearchOpen, modalType: 'search' },
    {
      isModalOpen: isAllDocsOpen,
      modalType: 'all',
    },
    {
      isModalOpen: isPracticeOpen,
      modalType: 'practice',
    },
    {
      isModalOpen: isCreateOpen,
      modalType: 'create',
    },
    {
      isModalOpen: isUserOpen,
      modalType: 'user',
    },
  ];

  if (!user) return <Navigate to={'/landing'} />;
  return (
    <main>
      {modals.map((modal) => {
        const { isModalOpen, modalType } = modal;
        if (isModalOpen) return <Modal key={modalType} modalType={modalType} />;
      })}

      <Sidebar />

      <div className="main-container">
        <Header />
        <Document document={selectedDoc} />
      </div>
    </main>
  );
};

export default React.memo(Home);
