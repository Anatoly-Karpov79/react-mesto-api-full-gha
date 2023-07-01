const jwt = require('jsonwebtoken');

const AuthError = require('../errors/autherror');

module.exports = (req, res, next) => {
  const token = req.cookies;

  if (!token) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;

  next();
};
