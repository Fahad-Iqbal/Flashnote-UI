import { baseURL } from '../data';
const insertNoteInDb = async (
  token,
  documentId,
  index,
  noteContent,
  state,
  dispatch
) => {
  const url = baseURL + '/notes';
  const newNotes = [...state[documentId].notes];
  newNotes.splice(index, 0, noteContent);
  console.log('newNotes in insertIntoDb', newNotes);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ documentId, notes: newNotes }), // body data type must match "Content-Type" header
    });
    if (response.status === 200) {
      const updatedNotes = await response.json();
      console.log('updateNotes:', updatedNotes);
      dispatch({
        type: 'UPDATE_NOTES',
        payload: { documentId, notes: updatedNotes },
      });
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default insertNoteInDb;
