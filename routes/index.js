const router = require('express').Router();

const movieRoutes = require('./movies');
const userRoutes = require('./users');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

const { createUser, login } = require('../controllers/users');

router.use(auth, movieRoutes);
router.use(auth, userRoutes);

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
