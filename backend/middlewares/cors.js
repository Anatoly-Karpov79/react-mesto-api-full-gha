const allowedCors = [
  'http://akarpov.mesto.nomoredomains.rocks',
  'https://akarpov.mesto.nomoredomains.rocks',
  'http://localhost:3000',
  'https://localhost:3000',
  
  'https://192.168.0.158:3000',
  'http://192.168.0.158:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    res.end();
  }
  next();
};
