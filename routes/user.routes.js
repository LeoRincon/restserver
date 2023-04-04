const { Router } = require('express');
const {
 getUsers,
 postUsers,
 putUsers,
 patchUsers,
 deleteUsers,
} = require('../controllers/user.controller');

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const UserRouter = Router();

UserRouter.get('/', getUsers);
UserRouter.post(
 '/',
 [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({
   min: 6,
  }),
  check('email', 'Email invalid  ').isEmail(),
  check('role', 'Role invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validateFields,
 ],
 postUsers
);
UserRouter.put('/:id', putUsers);
UserRouter.patch('/', patchUsers);
UserRouter.delete('/', deleteUsers);

module.exports = UserRouter;
