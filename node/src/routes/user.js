const express = require('express')
const multer = require('multer')
const userRouter = express.Router();
const userController = require('../app/controllers/UserController');
const middleController = require('../app/controllers/MiddleWareConTroller')

userRouter.get('/home',middleController.verifyToken,userController.getUser)
userRouter.delete('/delete-user',middleController.verifyToken,userController.deleteUser)
userRouter.put('/update-password',middleController.verifyToken,userController.updatePassword)
userRouter.put('/update-profile',middleController.verifyToken,userController.updateProfile)
userRouter.put('/update-email',middleController.verifyToken,userController.updateEmail)
userRouter.get('/',userController.show)

module.exports = userRouter;