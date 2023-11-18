const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const httpCode = require('../utils/httpCode');
const NotFoundError = require('../errors/NotFoundError');
const {
  ERROR_VALIDATION_INCORRECT_DATA,
  ERROR_FORBIDDEN_DELETE,
  SUCCESSFUL_DELETE,
  ERROR_NOT_FOUND_MOVIE,
} = require('../utils/constants');

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(ERROR_VALIDATION_INCORRECT_DATA));
        return;
      }
      next(err);
    });
};

const deleteSavedMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => Error('NotFound'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError(ERROR_FORBIDDEN_DELETE));
        return;
      }

      Movie.findByIdAndDelete(movie._id)
        .then(() => res.status(httpCode.OK_REQUEST).send({ message: SUCCESSFUL_DELETE }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        console.error(err);
        next(new ValidationError(ERROR_VALIDATION_INCORRECT_DATA));
        return;
      } if (err.message === 'NotFound') {
        next(new NotFoundError(ERROR_NOT_FOUND_MOVIE));
        return;
      }
      next(err);
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteSavedMovie,
};
