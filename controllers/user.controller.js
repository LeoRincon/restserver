const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
 //  const query = req.query;

 const { query, id, name } = req.query;
 res.json({
  msg: 'get API With controllers  v1',
  query,
  id,
  name,
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
