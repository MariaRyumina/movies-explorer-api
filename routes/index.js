const router = require('express').Router();
const movieRoutes = require('./movies');
const userRoutes = require('./users');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');
const { ERROR_NOT_FOUND_PAGE } = require('../utils/constants');

const { createUser, login } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');

router.use('/movies', auth, movieRoutes);
router.use('/users', auth, userRoutes);

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError(ERROR_NOT_FOUND_PAGE));
});

module.exports = router;
