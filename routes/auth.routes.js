const Router = require('express').Router;
const router = Router();
const authController = require('../controllers/auth.controller');
const newAuth = require('../middlewares/auth/new.middleware');

router.get('/sign-in', authController.getSignIn);
router.post('/sign-in', [newAuth], authController.postSignIn);
router.get('/sign-up', authController.getSignUp);
router.get('/sign-out', authController.postSignOut);

module.exports = router;