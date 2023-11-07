import { baseURL } from '../data';

const newDocumentId = async (token, title) => {
  const url = baseURL + '/documents';

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        title: title,
      }), // body data type must match "Content-Type" header
    });
    const { id } = await response.json();
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default newDocumentId;
