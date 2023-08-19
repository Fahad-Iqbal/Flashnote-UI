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

  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
