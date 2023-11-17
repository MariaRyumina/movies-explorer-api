const { celebrate, Joi } = require('celebrate');

const URL_REGEX = /^https?:\/\/(www\.)?[\w-._~:/?#[\]@!$&’()*+,;=]*#?/;

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const upgradeUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteSavedMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex(),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  upgradeUserInfoValidation,
  createMovieValidation,
  deleteSavedMovieValidation,
};
