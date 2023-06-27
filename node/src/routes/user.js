const express = require('express')
const userRouter = express.Router();
const userController = require('../app/controllers/UserController');

userRouter.get('/',userController.show)

module.exports = userRouter;