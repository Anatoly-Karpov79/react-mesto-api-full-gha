 class Api {
  constructor({headers, baseUrl, token}) {
    this._headers = headers
    this._baseUrl = baseUrl
    this._token = token
  }
    _handleResponse = (res) => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      };
      

  getUserInfo() {
    return fetch(this._baseUrl + `/users/me`, { 
      method: "GET",
      authorization: this._token,
    headers: this._headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  changeProfile({name, about}) {
   return fetch(this._baseUrl + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      authorization: this._token,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      } ), 
    }) 
    .then(this._handleResponse);
    
  }

  addCard(data) {
   return fetch(this._baseUrl + `/cards`, {
      method: "POST",
      authorization: this._token,
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  setLike(_id) {
    return fetch(this._baseUrl + `/cards/` + _id + `/likes`, {
      method: "PUT",
      authorization: this._token,
      headers: this._headers,
    }).then(this._handleResponse);
  }
   // Удалить лайк
   removeLike(_id) {
    return fetch(this._baseUrl + `/cards/` + _id + `/likes/`, {
      method: 'DELETE',
      authorization: this._token,
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  changeAvatar({data}) {
    return  fetch(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      authorization: this._token,
      headers: this._headers,
      body: JSON.stringify( {avatar: data} )
    })
      .then(this._handleResponse);
  }

  deleteCard(_cardId) {
    return fetch(this._baseUrl + `/cards/` + _cardId, {
        method: "DELETE",
        authorization: this._token,
        headers: this._headers,
    }).then(this._handleResponse);
  
  }
  
}

export const api = new Api({
      
  baseUrl: `https://karpov.mesto.nomoredomains.rocks`,
  token: `Bearer ${localStorage.getItem('token')}`,
  headers: {
    credentials: "include",
      Accept: "application/json",
      
       
  },
  
});
