const reducer = (state, action) => {
  if (action.type === 'REMOVE_NOTE') {
    const { documentId, noteId } = action.payload;
    const newNotes = [...state[documentId].notes];
    const index = newNotes.findIndex((note) => note.id === noteId);
    newNotes.splice(index, 1);
    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }

  if (action.type === 'TOGGLE_FINISHED') {
    const { documentId } = action.payload;
    console.log(documentId);
    console.log(state[documentId].finished);
    return {
      ...state,
      [documentId]: {
        ...state[documentId],
        finished: !state[documentId].finished,
      },
    };
  }

  if (action.type === 'UPDATE_TITLE') {
    const { documentId, title } = action.payload;

    return { ...state, [documentId]: { ...state[documentId], title: title } };
  }
  if (action.type === 'MOVE_NOTE_UP') {
    const { documentId, noteId } = action.payload;
    const noteIndex = state[documentId].notes.findIndex(
      (note) => note.id === noteId
    );
    if (noteIndex === 0 || noteIndex === -1) return state;
    const previousNote = state[documentId].notes[noteIndex - 1];
    const currentNote = state[documentId].notes[noteIndex];
    const newNotes = [...state[documentId].notes];
    newNotes[noteIndex - 1] = currentNote;
    newNotes[noteIndex] = previousNote;
    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }
  if (action.type === 'MOVE_NOTE_DOWN') {
    const { documentId, noteId } = action.payload;
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

    return {
      ...state,
      [documentId]: { ...state[documentId], notes: newNotes },
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
