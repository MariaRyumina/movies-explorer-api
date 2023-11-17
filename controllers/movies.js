const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const httpCode = require('../httpCode');
const NotFoundError = require('../errors/NotFoundError');

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
        next(new ValidationError('Переданы некорректные данные при создании фильма'));
        return;
      }
      next(err);
    });
};

const deleteSavedMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .orFail(() => Error('NotFound'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Нельзя удалять фильмы других пользователей!'));
        return;
      }

      Movie.findByIdAndDelete()
        .then(() => {
          return res.status(httpCode.OK_REQUEST).send({message: 'Фильм успешно удален'})
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Удаление фильма с некорректным id'));
        return;
      } if (err.message === 'NotFound') {
        next(new NotFoundError('Фильм с указанным _id не найден'));
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
