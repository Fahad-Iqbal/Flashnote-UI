import { useState } from 'react';
import DocsListContainer from './DocsListContainer';
import HamburgerButton from './HamburgerButton';
import './sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  draftDocs,
  finishedDocs,
  selectedDoc,
  setSelectedDoc,
  setIsSearchOpen,
  setIsUserOpen,
  setIsCreateOpen,
  setIsPracticeOpen,
  setIsAllDocsOpen,
}) => {
  const [isFinishedOpen, setIsFinishedOpen] = useState(false);
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  return (
    <aside className="sidebar-container">
      <HamburgerButton
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <nav className={isSidebarOpen ? 'sidebar' : 'sidebar close'}>
        <div className="sidebar-top">
          <button
            className="user btn"
            onClick={() => {
              setIsUserOpen(true);
            }}
          >
            <div className="user-icon-name-container">
              <img
                className="user-icon"
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_aibzke.svg"
                alt="User"
              />
              <p className="user-name">{user.name}</p>
            </div>
            <img
              className="user-options-icon"
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675048304/Vector_5_xa7gd4.svg"
              alt="Ellipsis"
              style={{ height: '0.4rem' }}
            />
          </button>
          <button
            className="search btn"
            onClick={() => {
              setIsSearchOpen(true);
            }}
          >
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675048711/Vector_6_fpgans.svg"
              alt="Search Logo"
              className="search-icon"
            />
            <p>Search</p>
          </button>
          <button
            className="practice-flashcards btn primary"
            onClick={() => {
              setIsPracticeOpen(true);
            }}
          >
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_1_ibhk9b.svg"
              alt="Flashcards"
            />
            <p>
              Practice <span>F</span>lashcards
            </p>
          </button>
          <button
            className="all btn secondary"
            onClick={() => {
              setIsAllDocsOpen(true);
            }}
          >
            {' '}
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_2_yvljzo.svg"
              alt="Documents logo"
            />
            <p>All Documents</p>
          </button>
          <button
            className="draft btn secondary"
            onClick={() => {
              setIsDraftOpen((current) => !current);
            }}
          >
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_3_drymhl.svg"
              alt="Caret symbol"
              style={
                isDraftOpen
                  ? {
                      transform: 'rotate(90deg)',
                      transition: 'all 0.2s linear',
                    }
                  : {}
              }
            />
            <p>Draft</p>
          </button>
          <DocsListContainer
            isOpen={isDraftOpen}
            documents={draftDocs}
            selectedDoc={selectedDoc}
            setSelectedDoc={setSelectedDoc}
          />
          <button
            className="finished btn secondary"
            onClick={() => {
              setIsFinishedOpen((current) => !current);
            }}
          >
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_3_drymhl.svg"
              alt="Caret symbol"
              style={
                isFinishedOpen
                  ? {
                      transform: 'rotate(90deg)',
                      transition: 'all 0.2s linear',
                    }
                  : {}
              }
            />
            <p>Finished</p>
          </button>
          <DocsListContainer
            isOpen={isFinishedOpen}
            documents={finishedDocs}
            selectedDoc={selectedDoc}
            setSelectedDoc={setSelectedDoc}
          />
        </div>
        <div className="sidebar-bottom">
          <button
            className="darkmode btn secondary"
            onClick={() =>
              document.querySelector('html').classList.toggle('darkmode')
            }
          >
            <p>Dark Mode</p>
          </button>
          <button
            className="create btn primary"
            onClick={() => {
              setIsCreateOpen(true);
            }}
          >
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_4_hzjlkw.svg"
              alt="Plus Icon"
            />
            <p>
              <span>C</span>reate
            </p>
          </button>
        </div>
      </nav>
    </aside>
  );
  // <!-- Side Nav -->
};

export default Sidebar;
