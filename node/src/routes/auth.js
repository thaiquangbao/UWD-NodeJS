const express = require('express')
const authRouter = express.Router();
const authController = require('../app/controllers/AuthController');
authRouter.post('/signup',authController.signup)
authRouter.post('/signin',authController.login)
authRouter.get('/check-email',authController.checkEmail)
authRouter.get('/check-username',authController.checkUserName)
authRouter.get('/check-token',authController.checkToken)
authRouter.get('/',authController.show)

module.exports = authRouter;