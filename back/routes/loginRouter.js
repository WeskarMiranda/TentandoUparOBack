const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/loginController');

// Rota para autenticação de login
loginRouter.post('/', loginController.login);

module.exports = loginRouter;

