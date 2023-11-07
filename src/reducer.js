import { deleteNoteFromDb, updateDocInDb } from './utils';

const reducer = (state, action) => {
  if (action.type === 'INITIALIZE_STATE') {
    return action.payload;
  }

  if (action.type === 'REMOVE_NOTE') {
    const { documentId, noteId, token } = action.payload;
    const newNotes = [...state[documentId].notes];
    const index = newNotes.findIndex((note) => note.id === noteId);
    newNotes.splice(index, 1);
    updateDocInDb(token, documentId, { notes: newNotes });
    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }

  if (action.type === 'TOGGLE_FINISHED') {
    const { documentId, finished } = action.payload;

    return {
      ...state,
      [documentId]: {
        ...state[documentId],
        finished: finished,
      },
    };
  }

  if (action.type === 'UPDATE_TITLE') {
    const { documentId, title } = action.payload;

    return {
      ...state,
      [documentId]: {
        ...state[documentId],
        title: title ? title : 'Untitled Document',
      },
    };
  }
  if (action.type === 'MOVE_NOTE_UP') {
    const { documentId, noteId, token } = action.payload;
    const noteIndex = state[documentId].notes.findIndex(
      (note) => note.id === noteId
    );
    if (noteIndex === 0 || noteIndex === -1) return state;
    const previousNote = state[documentId].notes[noteIndex - 1];
    const currentNote = state[documentId].notes[noteIndex];
    const newNotes = [...state[documentId].notes];
    newNotes[noteIndex - 1] = currentNote;
    newNotes[noteIndex] = previousNote;
    updateDocInDb(token, documentId, { notes: newNotes });

    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }
  if (action.type === 'MOVE_NOTE_DOWN') {
    const { documentId, noteId, token } = action.payload;
    const noteIndex = state[documentId].notes.findIndex(
      (note) => note.id === noteId
    );
    if (noteIndex === state[documentId].notes.length - 1 || noteIndex === -1)
      return state;
    const nextNote = state[documentId].notes[noteIndex + 1];
    const currentNote = state[documentId].notes[noteIndex];
    const newNotes = [...state[documentId].notes];
    newNotes[noteIndex + 1] = currentNote;
    newNotes[noteIndex] = nextNote;
    updateDocInDb(token, documentId, { notes: newNotes });

    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }
  if (action.type === 'UPDATE_DOCUMENT') {
    const { documentId, noteId, noteContent, token } = action.payload;
    const noteIndex = state[documentId]?.notes?.findIndex(
      (note) => note.id === noteId
    );
    if (noteIndex === -1 || !state[documentId]) return state;
    const newNotes = [...state[documentId].notes];
    const newNote = { ...state[documentId].notes[noteIndex] };

    for (let key in noteContent) {
      newNote[key] = noteContent[key];
    }
    newNotes[noteIndex] = newNote;
    updateDocInDb(token, documentId, { notes: newNotes });
    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }

  if (action.type === 'INSERT_NOTE') {
    const { documentId, index, noteContent, token } = action.payload;

    const newNotes = [...state[documentId].notes];
    newNotes.splice(index, 0, noteContent);
    updateDocInDb(token, documentId, { notes: newNotes });

    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }

  if (action.type === 'FOCUS_ON_NOTE') {
    const { documentId, noteId } = action.payload;
    const selectedDoc = state[documentId];
    const note =
      selectedDoc.notes &&
      selectedDoc.notes?.find((note) => note.id === noteId);
    if (!note) {
      return state;
    }
    if (note.type === 'basic' || note.type === 'reversible') {
      document.getElementById(`front${noteId}`)?.focus();
    } else if (
      note.type === 'cloze' ||
      note.type === 'list' ||
      note.type === 'section-heading' ||
      note.type === 'plain'
    ) {
      const element = document.getElementById(noteId);
      element?.focus();
      element.scrollIntoView(false);
    }
    return state;
  }

  if (action.type === 'TOGGLE_FLASHCARD_DISABLED') {
    const { documentId, noteId, token } = action.payload;
    const newNotes = [
      ...state[documentId].notes.map((note) => {
        if (note.id === noteId) {
          const disabled = !note.flashcardDisabled;
          return { ...note, flashcardDisabled: disabled };
        }
        return { ...note };
      }),
    ];
    updateDocInDb(token, documentId, { notes: newNotes });
    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }

  if (action.type === 'CREATE_NEW_DOCUMENT') {
    const { id, documentTitle } = action.payload;

    return {
      ...state,
      [id]: { id: id, finished: false, title: documentTitle, notes: [] },
    };
  }

  if (action.type === 'DELETE_DOCUMENT') {
    const newState = { ...state };
    delete newState[action.payload.documentId];
    return { ...newState };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
