const { response } = require('express');

const login = (_req, res = response) => {
 res.json({
  msg: 'login',
 });
};

module.exports = {
 login,
};
