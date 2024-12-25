export const BASE_URL = "http://84.252.142.182";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {

      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {

         Accept: "application/json",
      "Content-Type": "application/json",
      // 'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse)
    .then((data) => {
      localStorage.setItem('token', data.token)
      console.log(localStorage.getItem('userId'))
      console.log(localStorage.getItem('token'))
      return data;
    })

};

export const getContent = (token) => {

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    // credentials: 'include',
    headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           'Authorization': `Bearer ${token}`,
         },
        

  }).then((res) => checkResponse(res));
};

// export const checkToken = (token) => {
//  return fetch(`${BASE_URL}/users/me`, {
//    method: "GET",
//    headers: {
//      "Accept": "application/json",
//      "Content-Type": "application/json",
//      'Authorization': `Bearer ${localStorage.getItem('token')}`,
//    },
//  }).then(checkResponse);
// };