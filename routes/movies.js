const router = require('express').Router();

const {
  getSavedMovies,
  createMovie,
  deleteSavedMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteSavedMovieValidation,
} = require('../middlewares/validation');

router.get('', getSavedMovies);
router.post('', createMovieValidation, createMovie);
router.delete('/:_id', deleteSavedMovieValidation, deleteSavedMovie);

module.exports = router;
