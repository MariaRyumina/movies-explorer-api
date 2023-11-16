const router = require('express').Router();

const {
  getUser,
  upgradeUserInfo,
} = require('../controllers/users');

const {
  getUserValidation,
  upgradeUserInfoValidation,
} = require('../middlewares/validation');

router.get('/users/me', getUserValidation, getUser);
router.patch('/users/me', upgradeUserInfoValidation, upgradeUserInfo);

module.exports = router;
