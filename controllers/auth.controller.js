const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const login = async (req = request, res = response) => {
 const { email, password } = req.body;

 try {
  // email exist?
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json({
    msg: 'email or password are incorrect - email',
   });
  }

  // user active?
  if (!user.state) {
   return res.status(400).json({
    msg: 'email or password are incorrect - state: false',
   });
  }

  // password correct?
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
   return res.status(400).json({
    msg: 'email or password are incorrect - password',
   });
  }

  //generate a JWT

  res.json({
   msg: 'login',
   email,
   password,
  });
 } catch (error) {
  console.log(error);
  return res.status(500).json({
   msg: 'error in the server, contact the administrator',
  });
 }
};

module.exports = {
 login,
};
