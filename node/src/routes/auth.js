const express = require('express')
const authRouter = express.Router();
const authController = require('../app/controllers/AuthController');

authRouter.get('/',authController.show)

module.exports = authRouter;