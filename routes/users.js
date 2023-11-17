const router = require('express').Router();

const {
  getUser,
  upgradeUserInfo,
} = require('../controllers/users');

const {
  upgradeUserInfoValidation,
} = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', upgradeUserInfoValidation, upgradeUserInfo);

module.exports = router;
