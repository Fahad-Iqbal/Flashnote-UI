import { useState } from 'react';
import './App.css';
import Document from './Document';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import { draftDocs, finishedDocs } from './data.js';
import Modal from './Modal';

const draft = draftDocs;
const finished = finishedDocs;

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [draftDocs, setDraftDocs] = useState(draft);
  const [finishedDocs, setFinishedDocs] = useState(finished);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [isAllDocsOpen, setIsAllDocsOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

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

  return (
    <main>
      {modals.map((modal) => {
        const { isModalOpen, modalType, setFn } = modal;
        if (isModalOpen)
          return <Modal key={modalType} modalType={modalType} setFn={setFn} />;
      })}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        draftDocs={draftDocs}
        finishedDocs={finishedDocs}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
      />

      <div className="main-container">
        <Header />
        <Document document={selectedDoc} />
      </div>
    </main>
  );
}
