const { celebrate, Joi } = require('celebrate');
const validator = require("validator");

const URL_REGEX = /^https?:\/\/(www\.)?[\w-._~:/?#[\]@!$&’()*+,;=]*#?/;

const getUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const upgradeUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
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
    owner: Joi.object().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const getSavedMoviesValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
});

module.exports = {
  getUserValidation,
  upgradeUserInfoValidation,
  createMovieValidation,
  getSavedMoviesValidation,
  deleteMovieValidation,
};
