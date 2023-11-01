import { baseURL } from '../data';

const logout = async (setUser, token) => {
  setUser(null);
  localStorage.removeItem('user');
  localStorage.removeItem('documents');
  const response = await fetch(baseURL + '/logout', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const msg = await response.json();
  console.log(msg);
};

export default logout;
