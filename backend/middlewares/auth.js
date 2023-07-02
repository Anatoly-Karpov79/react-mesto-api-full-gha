const jwt = require('jsonwebtoken');

const AuthError = require('../errors/autherror');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться token'));
    return;
  }

  req.user = payload;

  next();
};
// авторизация на локале
