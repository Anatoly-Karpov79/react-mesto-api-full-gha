const token = require('jsonwebtoken');

const AuthError = require('../errors/autherror');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies.jwt;
  if (!jwt) {
    next(new AuthError('Необходимо срочно авторизоваться'));
    return;
  }
  // const token = req.cookies.jwt;

  let payload;

  try {
    payload = token.verify(jwt, JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};
