const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
  const token = await generateJWT(user.id);

  res.json({
   user,
   token,
  });
 } catch (error) {
  console.log(error);
  return res.status(500).json({
   msg: 'error in the server, contact the administrator',
  });
 }
};

const googleSignIn = async (req = request, res = response) => {
 const { id_token } = req.body;

 try {
  const { name, picture, email } = await googleVerify(id_token);

  let user = await User.findOne({ email });

  if (!user) {
   //create user
   const data = {
    name,
    email,
    password: ':P',
    picture,
    google: true,
    role: 'ADMIN_ROLE',
   };

   user = new User(data);
   await user.save();
  }

  // user state = false
  if (!user.state) {
   return res.status(401).json({
    msg: 'user blocked',
   });
  }

  //generate a JWT
  const token = await generateJWT(user.id);

  res.json({
   user,
   token,
  });
 } catch (error) {
  res.status(400).json({
   msg: 'token google not valid',
  });
 }
};

module.exports = {
 login,
 googleSignIn,
};
