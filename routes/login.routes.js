const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/login.controller');

const LoginRouter = Router();

LoginRouter.post('/login', login);

module.exports = LoginRouter;
