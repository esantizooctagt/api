const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const UserController = require('../controllers/users');

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

router.use(myLogger);

/* GET users listing. */
router.get('/', function(req, res, next) {
});


router.post('/login', UserController.users_login);

// router.post('/signup', UserController.create_user);

// router.delete('/:userId', UserController.delete_user);

module.exports = router;
