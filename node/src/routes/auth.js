const express = require('express')
const authRouter = express.Router();
const authController = require('../app/controllers/AuthController');
authRouter.post('/signin',authController.login)
authRouter.get('/',authController.show)

module.exports = authRouter;