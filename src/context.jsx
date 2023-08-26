import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { docs } from './data.js';
import reducer from './reducer.js';
import { nanoid } from 'nanoid';

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
const AppContext = ({ children }) => {
  // User Information Context

  const [user, setUser] = useState(getUserFromLocalStorage());
  // documents state
  const [state, dispatch] = useReducer(reducer, getDocsFromLocalStorage());

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [draftDocs, setDraftDocs] = useState([]);
  const [finishedDocs, setFinishedDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
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

    if (newDocCreated.created) {
      if (state[newDocCreated.id]) {
        setSelectedDoc(state[newDocCreated.id]);
        setNewDocCreated({ created: false, id: '' });
      }
    }
    // if (!state[selectedDoc?.id]) {
    //   setSelectedDoc(state[0]);
    // }
    if (state[selectedDoc?.id]) {
      setSelectedDoc(state[selectedDoc.id]);
    }

    setDraftDocs(draft);
    setFinishedDocs(finished);
    setFlashcards(flashcardArray);
    setAllNotes(notesArray);
    localStorage.setItem('documents', JSON.stringify(state));
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
              id: 'reverse' + note.id,
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

  const updateDocument = (documentId, noteId, noteContent) => {
    dispatch({
      type: 'UPDATE_DOCUMENT',
      payload: { documentId, noteId, noteContent },
    });
  };

  const toggleFlashcardDisabled = (noteId) => {
    dispatch({
      type: 'TOGGLE_FLASHCARD_DISABLED',
      payload: { documentId: selectedDoc.id, noteId },
    });
  };

  const deleteDocument = (documentId) => {
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
      payload: { documentId, index, noteContent },
    });
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

  const createNewDocument = (documentTitle) => {
    if (!documentTitle) return;
    const newId = nanoid();
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
