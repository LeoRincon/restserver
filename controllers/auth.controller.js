const { response, request } = require('express');

const login = (req = request, res = response) => {
 const { email, password } = req.body;

 res.json({
  msg: 'login',
  email,
  password,
 });
};

module.exports = {
 login,
};
