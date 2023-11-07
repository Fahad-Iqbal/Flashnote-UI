import { baseURL } from '../data';

const deleteDocFromDb = async (token, documentId) => {
  const url = baseURL + `/documents/${documentId}`;
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
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};
export default deleteDocFromDb;
