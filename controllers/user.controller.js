const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
 res.json({
  msg: 'get API With controllers  v1',
 });
};
const postUsers = (req, res) => {
 //  const body = req.body;
 const { name, age } = req.body;
 res.json({
  msg: 'post API',
  name,
  age,
 });
};
const putUsers = (req, res) => {
 res.json({
  msg: 'put API',
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
