 class Api {
  constructor({headers, baseUrl}) {
    this._headers = headers
    this._baseUrl = baseUrl
    
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
      credentials: 'include',
     headers: this._headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      credentials: 'include',
       headers: this._headers,
    }).then(this._handleResponse);
  }

  changeProfile({name, about}) {
   return fetch(this._baseUrl + `/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      
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
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
    
  }

  setLike(id) {
    return fetch(this._baseUrl + `/cards/` + id + `/likes/`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }
   // Удалить лайк
   removeLike(id) {
    return fetch(this._baseUrl + `/cards/` + id + `/likes/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  changeAvatar({data}) {
    return  fetch(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify( {avatar: data} )
    })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + `/cards/` + cardId, {
        method: "DELETE",
        credentials: 'include',
        headers: this._headers,
    }).then(this._handleResponse);
  
  }
  
}

export const api = new Api({
      
  baseUrl: `http://84.252.142.182`,
  
  headers: {
    'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
       
  },
  
});
