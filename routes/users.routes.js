const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const newUser = require('../middlewares/users/new.middleware');
const newAuth = require('../middlewares/auth/new.middleware');

router.post('/new', [newUser, newAuth] ,usersController.newUser);

module.exports = router;