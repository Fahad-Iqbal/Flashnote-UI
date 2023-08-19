import { createContext, useContext, useEffect, useState } from 'react';
import { docs, draftDocs, finishedDocs } from './data.js';

// Global context hook
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const draft = draftDocs;
const finished = finishedDocs;
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  else return null;
};

const AppContext = ({ children }) => {
  // User Information Context

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [draftDocs, setDraftDocs] = useState(draft);
  const [finishedDocs, setFinishedDocs] = useState(finished);
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAllDocsOpen, setIsAllDocsOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isSidebarOpen,
        setIsSidebarOpen,
        draftDocs,
        setDraftDocs,
        finishedDocs,
        setFinishedDocs,
        selectedDoc,
        setSelectedDoc,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
