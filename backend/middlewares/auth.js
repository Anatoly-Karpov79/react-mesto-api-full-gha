const jwt = require('jsonwebtoken');

const AuthError = require('../errors/autherror');
const {
  STATUS_OK,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies) {
    next(new AuthError('Необходимо срочно авторизоваться'));
    return;
  }
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    res.status(STATUS_OK).send({ message: 'Успешная авторизация' });
    // .send({ token })
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};
