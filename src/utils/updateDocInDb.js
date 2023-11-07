import { baseURL } from '../data';

const updateDocInDb = async (token, documentId, body) => {
  const url = baseURL + `/documents/${documentId}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    });
    const doc = await response.json();
    return doc;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default updateDocInDb;
