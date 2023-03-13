const { Router } = require('express');
const {
 getUsers,
 postUsers,
 putUsers,
 patchUsers,
 deleteUsers,
} = require('../controllers/user.controller');

const UserRouter = Router();

UserRouter.get('/', getUsers);
UserRouter.post('/', postUsers);
UserRouter.put('/:id', putUsers);
UserRouter.patch('/', patchUsers);
UserRouter.delete('/', deleteUsers);

module.exports = UserRouter;
