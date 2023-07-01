const jwt = require('jsonwebtoken');

const AuthError = require('../errors/autherror');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies) {
    next(new AuthError('Необходимо срочно авторизоваться'));
    return;
  }
  const token = res.cookies.replace('jwt', '');

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
