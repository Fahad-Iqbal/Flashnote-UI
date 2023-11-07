import { baseURL } from '../data';

const deleteNoteFromDb = async (token,noteId) => {
  const url = baseURL + `/notes/${noteId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.status === 204) {
      return true;
    }
    return doc;
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};

export default deleteNoteFromDb;
