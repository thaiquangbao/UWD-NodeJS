const express = require('express')
const welcomeRouter = express.Router();
const welcomeController = require('../app/controllers/WelcomeController');

welcomeRouter.get('/',welcomeController.show)

module.exports = welcomeRouter;