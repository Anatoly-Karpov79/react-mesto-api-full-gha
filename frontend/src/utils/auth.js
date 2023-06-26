export const BASE_URL = "http://karpov.mesto.nomoredomains.rocks";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      credentials: "include",
      Accept: "application/json",
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), 
  }).then(checkResponse);
  
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.e30.Sel2Ydp2Uy8fP5GSkzU581n8JKZTLQZUKlvgQSHmul4`,
      'Content-Type': 'application/json'
    },
  }).then((res) => checkResponse(res));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  }).then(checkResponse);
};