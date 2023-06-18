const jwt = require('jsonwebtoken');

const AuthError = require('../errors/autherror');

module.exports = (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    next(new AuthError('Необходимо срочно авторизоваться'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  console.log(payload);
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;

  next();
};
