const { ERROR_SERVER } = require('../utils/constants');

const handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.error(err);

  res.status(statusCode).send({ message: statusCode === 500 ? ERROR_SERVER : message });

  next();
};

module.exports = handleError;
