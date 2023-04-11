const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');

const { login } = require('../controllers/login.controller');

const LoginRouter = Router();

LoginRouter.post(
 '/login',
 [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({
   min: 6,
  }),
  validateFields,
 ],
 login
);

module.exports = LoginRouter;
