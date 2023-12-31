import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { baseURL, docs } from './data.js';
import reducer from './reducer.js';
import { nanoid } from 'nanoid';
import { newDocumentId, deleteDocFromDb, updateDocInDb } from './utils';

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
  else return {};
};

const getDocs = async (token, setInit, setIsLoading) => {
  setIsLoading(true);
  try {
    const url = baseURL + '/documents';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.ok) {
      const docs = await response.json();
      setInit(docs);
    } else {
      setInit({});
      const docs = await response.json();
      console.log(docs);
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setInit({});
    setIsLoading(false);
  }
};

const AppContext = ({ children }) => {
  // User Information Context

  const [user, setUser] = useState(getUserFromLocalStorage());
  const [init, setInit] = useState(getDocsFromLocalStorage());
  const [isLoading, setIsLoading] = useState(true);
  // documents state
  const [state, dispatch] = useReducer(reducer, null);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [draftDocs, setDraftDocs] = useState([]);
  const [finishedDocs, setFinishedDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState((state && state[0]) || null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAllDocsOpen, setIsAllDocsOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newDocCreated, setNewDocCreated] = useState({
    created: false,
    id: '',
  });
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    if (user) {
      getDocs(user.token, setInit, setIsLoading);
    }
  }, [user]);

  useEffect(() => {
    console.log('hit');
    const newState = { ...init };
    delete newState.lastActiveDocId;
    dispatch({ type: 'INITIALIZE_STATE', payload: newState });
  }, [init]);

  useEffect(() => {
    if (!isLoading) {
      const finished = [];
      const draft = [];
      let notesArray = [];
      let flashcardArray = [];
      for (let key in state) {
        if (state[key].finished) {
          finished.push(state[key]);
        } else if (!state[key].finished) {
          draft.push(state[key]);
        }
        // if (key === `${selectedDoc.id}`) {
        //   setSelectedDoc(state[key]);
        // }
        if (!state[key].flashcardsDisabled) {
          const newFlashcardList = getFlashcards(
            state[key].notes,
            key,
            state[key].title
          );
          flashcardArray = flashcardArray.concat(newFlashcardList);
        }
        notesArray = notesArray.concat(
          state[key].notes.map((note) => {
            return { ...note, documentId: key };
          })
        );
      }
      if (init.lastActiveDocId) {
        setSelectedDoc(state[init.lastActiveDocId]);
        setInit({ ...init, lastActiveDocId: null });
      }

      if (state[selectedDoc?.id]) {
        setSelectedDoc(state[selectedDoc.id]);
      }

      if (newDocCreated.created) {
        if (state[newDocCreated.id]) {
          setSelectedDoc(state[newDocCreated.id]);
          setNewDocCreated({ created: false, id: '' });
        }
      }

      setDraftDocs(draft);
      setFinishedDocs(finished);
      setFlashcards(flashcardArray);
      setAllNotes(notesArray);
      localStorage.setItem('documents', JSON.stringify(state));
    }
  }, [state]);

  const getFlashcards = (notes, documentId, documentTitle) => {
    const flashcardArray = [];
    let sectionHeading = '';
    notes.forEach((note) => {
      if (note.type === 'section-heading') {
        sectionHeading = note.content;
      }
      if (note.type !== 'section-heading' && isValidFlashCard(note)) {
        if (note.type === 'reversible') {
          const front = note.content.front;
          const back = note.content.back;
          const reverseCardTime = note.flashcardInfo?.reverse?.timeOfNextReview;
          if (
            !reverseCardTime ||
            (reverseCardTime && Date.now() > reverseCardTime)
          ) {
            flashcardArray.push({
              ...note,
              documentId,
              documentTitle,
              id: 'reverse' + `${note.id}`,
              practice: true,
              sectionHeading: sectionHeading,
              content: { front: back, back: front },
            });
          }
          const forwardCardTime = note.flashcardInfo?.timeOfNextReview;
          if (
            !forwardCardTime ||
            (forwardCardTime && Date.now() > forwardCardTime)
          ) {
            flashcardArray.push({
              ...note,
              documentId,
              documentTitle,
              sectionHeading: sectionHeading,
              practice: true,
            });
          }
        } else if (note.type !== 'reversible') {
          flashcardArray.push({
            ...note,
            documentId,
            documentTitle,
            sectionHeading: sectionHeading,
            practice: true,
          });
        }
      }
    });
    return flashcardArray;
  };

  const isValidFlashCard = (note) => {
    if (note.flashcardDisabled) {
      return false;
    }
    if (
      note.type === 'reversible' &&
      note.flashcardInfo &&
      Date.now() < note.flashcardInfo.timeOfNextReview &&
      note?.flashcardInfo?.reverse &&
      Date.now() < note.flashcardInfo.reverse.timeOfNextReview
    ) {
      return false;
    }

    if (
      note.type !== 'reversible' &&
      note.flashcardInfo &&
      Date.now() < note.flashcardInfo.timeOfNextReview
    ) {
      return false;
    }
    if (
      note.type === 'cloze' &&
      // typeof note.content === 'string' &&
      !note.content.includes('<span>') &&
      !note.content.includes('</span>')
    ) {
      return false;
    }
    if (
      note.type === 'basic' ||
      note.type === 'reversible' ||
      note.type === 'list'
    ) {
      if (!note.content.front.length || !note.content.back.length) {
        return false;
      }
    }
    if (note.type === 'list' && note.content.back.length) {
      for (let item of note.content.back) {
        if (item.length) {
          return true;
        }
      }
      return false;
    }
    if (
      note.type === 'reversible' &&
      (!note.flashcardInfo || !note.flashcardInfo?.reverse)
    ) {
      return true;
    }
    return true;
  };

  // document functions
  const removeNote = (documentId, noteId) => {
    dispatch({
      type: 'REMOVE_NOTE',
      payload: { documentId, noteId, token: user.token },
    });
  };

  const toggleFinished = async (documentId) => {
    const updatedDoc = await updateDocInDb(user.token, documentId, {
      finished: !state[documentId].finished,
    });
    if (!updatedDoc) {
      return;
    }
    dispatch({
      type: 'TOGGLE_FINISHED',
      payload: { documentId: updatedDoc.id, finished: updatedDoc.finished },
    });
  };

  const updateTitle = async (documentId, title) => {
    const updatedDoc = await updateDocInDb(user.token, documentId, {
      title: title,
    });
    if (!updatedDoc) {
      return;
    }
    dispatch({
      type: 'UPDATE_TITLE',
      payload: { documentId, title: updatedDoc.title },
    });
  };

  const moveNoteUp = (documentId, noteId) => {
    dispatch({
      type: 'MOVE_NOTE_UP',
      payload: { documentId, noteId, token: user.token },
    });
  };

  const moveNoteDown = (documentId, noteId) => {
    dispatch({
      type: 'MOVE_NOTE_DOWN',
      payload: { documentId, noteId, token: user.token },
    });
    setTimeout(() => {
      focusOnNote(noteId);
    }, 100);
  };

  const updateDocument = (documentId, noteId, noteContent) => {
    dispatch({
      type: 'UPDATE_DOCUMENT',
      payload: { documentId, noteId, noteContent, token: user.token },
    });
  };

  const toggleFlashcardDisabled = (noteId) => {
    dispatch({
      type: 'TOGGLE_FLASHCARD_DISABLED',
      payload: { documentId: selectedDoc.id, noteId, token: user.token },
    });
  };

  const deleteDocument = async (documentId) => {
    const deleted = await deleteDocFromDb(user.token, documentId);
    if (!deleted) {
      return;
    }
    dispatch({ type: 'DELETE_DOCUMENT', payload: { documentId } });
  };

  const getFlashcardDisabled = (noteId) => {
    const targetNote = selectedDoc.notes.find((note) => noteId === note.id);
    const disabled = targetNote?.flashcardDisabled;
    return !!disabled;
  };

  const insertNote = (documentId, index, noteContent) => {
    dispatch({
      type: 'INSERT_NOTE',
      payload: { documentId, index, noteContent, token: user.token },
    });
    // insertNoteInDb(user.token, documentId, index, noteContent, state, dispatch);
    setTimeout(() => {
      focusOnNote(noteContent.id);
    }, 100);
  };

  const insertEmptyNoteOfType = (documentId, index, noteType) => {
    const notes = {
      basic: {
        id: nanoid(),
        flashcardDisabled: false,
        type: 'basic',
        content: {
          front: '',
          back: '',
        },
      },

      reversible: {
        id: nanoid(),
        flashcardDisabled: false,

        type: 'reversible',
        content: {
          front: '',
          back: '',
        },
      },

      list: {
        id: nanoid(),
        flashcardDisabled: false,

        type: 'list',
        content: {
          front: '',
          back: [],
        },
      },

      cloze: {
        id: nanoid(),
        flashcardDisabled: false,

        type: 'cloze',
        content: '',
      },

      'section-heading': {
        id: nanoid(),
        flashcardDisabled: false,

        type: 'section-heading',
        content: '',
      },
    };
    insertNote(documentId, index, notes[noteType]);
  };

  const duplicateNote = (documentId, index, noteId) => {
    const note = { ...selectedDoc.notes?.find((note) => note.id === noteId) };
    if (!note) {
      return;
    }
    delete note.flashcardInfo;
    insertNote(documentId, index, { ...note, id: nanoid() });
  };

  const focusOnNote = (noteId) => {
    if (!noteId) return;
    dispatch({
      type: 'FOCUS_ON_NOTE',
      payload: { documentId: selectedDoc.id, noteId },
    });
  };

  const focusOnNextNote = (noteId) => {
    const notes = selectedDoc.notes;
    const index = notes.findIndex((note) => note.id === noteId);
    if (index === notes.length - 1) {
      return;
    }
    focusOnNote(notes[index + 1].id);
  };

  const focusOnPreviousNote = (noteId) => {
    const notes = selectedDoc.notes;
    const index = notes.findIndex((note) => note.id === noteId);
    if (index === 0) {
      focusOnNote(notes[index + 1]?.id);
      return;
    }
    focusOnNote(notes[index - 1].id);
  };

  const isCaretAtEnd = () => {
    const selection = window.getSelection();
    const offset = selection.focusOffset;
    selection.modify('move', 'forward', 'character');
    if (offset === selection.focusOffset) return true;
    else {
      selection.modify('move', 'backward', 'character');
      return false;
    }
  };

  const isCaretAtBeginning = () => {
    const selection = window.getSelection();
    const offset = selection.focusOffset;
    selection.modify('move', 'backward', 'character');
    if (offset === selection.focusOffset) return true;
    else {
      selection.modify('move', 'forward', 'character');
      return false;
    }
  };

  const handleArrowUp = (noteId) => {
    if (!isCaretAtBeginning() || selectedDoc.notes[0]?.id === noteId) {
      return;
    } else {
      focusOnPreviousNote(noteId);
    }
  };
  const handleArrowDown = (noteId) => {
    if (!isCaretAtEnd()) {
      return;
    } else {
      focusOnNextNote(noteId);
    }
  };

  const createNewDocument = async (documentTitle) => {
    if (!documentTitle) return;

    const newId = await newDocumentId(user.token, documentTitle);

    if (!newId) {
      return;
    }

    dispatch({
      type: 'CREATE_NEW_DOCUMENT',
      payload: { id: newId, documentTitle },
    });
    setNewDocCreated({ created: true, id: newId });
  };

  const updateFlashcardInfo = (note, newEaseFactor, newReps, newTime) => {
    const noteId = note.id;
    const documentId = note.documentId;
    const noteContent = noteId.includes('reverse')
      ? {
          flashcardInfo: {
            ...note.flashcardInfo,
            reverse: {
              easeFactor: newEaseFactor,
              repetitions: newReps,
              timeOfNextReview: Date.now() + newTime,
            },
          },
        }
      : {
          flashcardInfo: {
            ...note.flashcardInfo,
            easeFactor: newEaseFactor,
            repetitions: newReps,
            timeOfNextReview: Date.now() + newTime,
          },
        };

    updateDocument(documentId, noteId.replace('reverse', ''), noteContent);
  };
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
        moveNoteUp,
        moveNoteDown,
        updateDocument,
        focusOnNextNote,
        focusOnPreviousNote,
        focusOnNote,
        handleArrowDown,
        handleArrowUp,
        isCaretAtBeginning,
        isCaretAtEnd,
        insertNote,
        duplicateNote,
        insertEmptyNoteOfType,
        flashcards,
        showAnswer,
        setShowAnswer,
        toggleFlashcardDisabled,
        getFlashcardDisabled,
        createNewDocument,
        updateFlashcardInfo,
        deleteDocument,
        allNotes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
