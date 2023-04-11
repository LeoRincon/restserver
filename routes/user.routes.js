const { Router } = require('express');
const { check } = require('express-validator');

const {
 getUsers,
 postUsers,
 putUsers,
 deleteUsers,
} = require('../controllers/user.controller');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
 isValidRole,
 existEmail,
 existUserById,
} = require('../helpers/dbvalidators');
const { validateRole } = require('../middlewares/validate-roles');

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
  check('email').custom(existEmail),
  check('role').custom(isValidRole),
  validateFields,
 ],
 postUsers
);
UserRouter.put(
 '/:id',
 [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(existUserById),
  check('role').custom(isValidRole),
  validateFields,
 ],
 putUsers
);
UserRouter.delete(
 '/:id',
 [
  validateJWT,
  validateRole('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(existUserById),
  validateFields,
 ],
 deleteUsers
);

module.exports = UserRouter;
