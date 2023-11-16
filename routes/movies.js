const router = require('express').Router();

const {
  getSavedMovies,
  createMovie,
  deleteSavedMovie,
} = require('../controllers/movies');

const {
  getSavedMoviesValidation,
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

router.get('/movies', getSavedMoviesValidation, getSavedMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/_id', deleteMovieValidation, deleteSavedMovie);

module.exports = router;
