import Document from './Document';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import Modal from './Modal';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from './context';

const Home = () => {
  const {
    user,
    setUser,
    selectedDoc,
    isSearchOpen,
    setIsSearchOpen,
    isAllDocsOpen,
    setIsAllDocsOpen,
    isPracticeOpen,
    setIsPracticeOpen,
    isCreateOpen,
    setIsCreateOpen,
    isUserOpen,
    setIsUserOpen,
  } = useGlobalContext();

  const modals = [
    { isModalOpen: isSearchOpen, modalType: 'Search', setFn: setIsSearchOpen },
    {
      isModalOpen: isAllDocsOpen,
      modalType: 'All Documents',
      setFn: setIsAllDocsOpen,
    },
    {
      isModalOpen: isPracticeOpen,
      modalType: 'Practice Flashcards',
      setFn: setIsPracticeOpen,
    },
    {
      isModalOpen: isCreateOpen,
      modalType: 'Create Document',
      setFn: setIsCreateOpen,
    },
    {
      isModalOpen: isUserOpen,
      modalType: 'User Options',
      setFn: setIsUserOpen,
    },
  ];

  if (!user) return <Navigate to={'/landing'} />;
  return (
    <main>
      {modals.map((modal) => {
        const { isModalOpen, modalType, setFn } = modal;
        if (isModalOpen)
          return <Modal key={modalType} modalType={modalType} setFn={setFn} />;
      })}

      <Sidebar />

      <div className="main-container">
        <Header />
        <Document document={selectedDoc} />
      </div>
    </main>
  );
};

export default Home;
