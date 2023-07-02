require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const cors = require('./middlewares/cors');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const NotFoundError = require('./errors/notfounderror');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(routerUsers);
app.use(routerCards);

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере 2 произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
