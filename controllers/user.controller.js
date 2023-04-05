const { response, request } = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');

const getUsers = async (req = request, res = response) => {
 const { limit = 5, from = 0 } = req.query;
 const query = { state: true };

 const totalPromise = User.countDocuments(query);
 const usersPromise = User.find(query).skip(Number(from)).limit(Number(limit));

 const [total, users] = await Promise.all([totalPromise, usersPromise]);

 res.json({
  total,
  users,
 });
};

const postUsers = async (req, res) => {
 const { name, email, password, role } = req.body;
 const user = new User({ name, email, password, role });

 // encrypt password
 const salt = bcryptjs.genSaltSync();
 user.password = bcryptjs.hashSync(password, salt);

 await user.save();

 res.json({
  msg: 'post API 2',
  user,
 });
};

const putUsers = async (req, res) => {
 const id = req.params.id;
 const { _id, password, google, ...rest } = req.body;

 // TODO: validate against DB

 if (password) {
  const salt = bcryptjs.genSaltSync();
  rest.password = bcryptjs.hashSync(password, salt);
 }

 const user = await User.findByIdAndUpdate(id, rest, { new: true });

 res.json({
  msg: 'User updated',
  user,
 });
};

const deleteUsers = (req, res) => {
 res.json({
  msg: 'delete API',
 });
};

module.exports = { getUsers, postUsers, putUsers, deleteUsers };
