const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const httpCode = require('../utils/httpCode');
const ConflictError = require('../errors/ConflictError');
const {
  ERROR_VALIDATION_INCORRECT_DATA,
  ERROR_NOT_FOUND_USER,
  ERROR_CONFLICT,
} = require('../utils/constants');

const getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

const upgradeUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => Error('NotFound'))
    .then((data) => {
      if (data) {
        res.send(data);
        return;
      }
      next(new NotFoundError(ERROR_NOT_FOUND_USER));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(ERROR_VALIDATION_INCORRECT_DATA));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(ERROR_CONFLICT));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(httpCode.STATUS_CREATED).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_CONFLICT));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError(ERROR_VALIDATION_INCORRECT_DATA));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super_duper_crypto_strong_key',
        { expiresIn: '7d' },
        null,
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  upgradeUserInfo,
  createUser,
  login,
};
