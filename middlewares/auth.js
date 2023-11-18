const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');
const { ERROR_AUTH } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(ERROR_AUTH));
    return;
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', ''); // Таким образом, в переменную token запишется только JWT
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super_duper_crypto_strong_key');
  } catch (err) {
    next(new UnauthorizedError(ERROR_AUTH));
    return;
  }

  req.user = payload;

  next();
};
