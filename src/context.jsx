import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { docs } from './data.js';
import reducer from './reducer.js';

// Global context hook
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  else return null;
};
const getDocsFromLocalStorage = () => {
  const documents = localStorage.getItem('documents');
  if (documents) return JSON.parse(documents);
  else return docs;
};
const defaultDocsState = docs;
const AppContext = ({ children }) => {
  // User Information Context

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  // documents state
  const [state, dispatch] = useReducer(reducer, getDocsFromLocalStorage());

  // document functions
  const removeNote = (documentId, noteId) => {
    dispatch({ type: 'REMOVE_NOTE', payload: { documentId, noteId } });
  };

  const toggleFinished = (documentId) => {
    dispatch({ type: 'TOGGLE_FINISHED', payload: { documentId } });
  };

  const updateTitle = (documentId, title) => {
    dispatch({ type: 'UPDATE_TITLE', payload: { documentId, title } });
  };

  const moveNoteUp = (documentId, noteId) => {
    dispatch({ type: 'MOVE_NOTE_UP', payload: { documentId, noteId } });
  };

  const moveNoteDown = (documentId, noteId) => {
    dispatch({ type: 'MOVE_NOTE_DOWN', payload: { documentId, noteId } });
  };

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [draftDocs, setDraftDocs] = useState([]);
  const [finishedDocs, setFinishedDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState({ ...docs[0] });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAllDocsOpen, setIsAllDocsOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  useEffect(() => {
    const finished = [];
    const draft = [];
    for (let key in state) {
      if (state[key].finished) {
        finished.push(state[key]);
      } else if (!state[key].finished) {
        draft.push(state[key]);
      }
      if (key === `${selectedDoc.id}`) {
        setSelectedDoc(state[key]);
      }
    }
    setDraftDocs(draft);
    setFinishedDocs(finished);
    localStorage.setItem('documents', JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isSidebarOpen,
        setIsSidebarOpen,
        draftDocs,
        finishedDocs,
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
        state,
        removeNote,
        toggleFinished,
        updateTitle,
        moveNoteDown,
        moveNoteDown,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
