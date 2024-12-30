const config = {
  baseUrl: "https://nomoreparties.co/v1/apf-cohort-202",
  headers: {
    authorization: "1b8643f6-c74c-459f-b84c-0c10972c2c2c",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const changeUserInfo = (userInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify(userInfo),
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify(avatar),
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const addCard = (cardInfo) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardInfo),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const toggleLike = (cardId, type) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: type,
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};
