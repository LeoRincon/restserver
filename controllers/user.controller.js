const { response, request } = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');

const getUsers = (req = request, res = response) => {
 const { query, id, name } = req.query;
 res.json({
  msg: 'get API With controllers  v1',
  query,
  id,
  name,
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

const putUsers = (req, res) => {
 const id = req.params.id;
 res.json({
  msg: 'put API',
  id,
 });
};

const patchUsers = (req, res) => {
 res.json({
  msg: 'patch API',
 });
};

const deleteUsers = (req, res) => {
 res.json({
  msg: 'delete API',
 });
};

module.exports = { getUsers, postUsers, putUsers, patchUsers, deleteUsers };
