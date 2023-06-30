const jwt = require('jsonwebtoken');

const AuthError = require('../errors/autherror');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходимо срочно авторизоваться'));
    return;
  }
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};
