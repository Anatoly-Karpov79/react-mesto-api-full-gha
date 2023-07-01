const jwt = require('jsonwebtoken');

const AuthError = require('../errors/autherror');

const { JWT_SECRET = 'dev-key', NODE_ENV } = process.env;

module.exports.auht = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    next(new AuthError('Необходимо срочно авторизоваться'));
    return;
  }
  const token = cookie.replace('jwt', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key');
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};
