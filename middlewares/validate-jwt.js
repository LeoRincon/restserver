const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res, next) => {
 const token = req.header('x-token');

 if (!token) {
  return res.status(401).json({
   msg: 'There is no token in the request',
  });
 }

 try {
  // Verify token and get the payload
  // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  const userAuthenticated = await User.findById(uid);
  console.log(userAuthenticated);

  if (!userAuthenticated) {
   return res.status(401).json({
    msg: 'Token is not valid - user does not exist in DB',
   });
  }

  if (!userAuthenticated.state) {
   return res.status(401).json({
    msg: 'Token is not valid - user status: false',
   });
  }

  req.user = userAuthenticated;

  next();
 } catch (error) {
  return res.status(401).json({
   msg: 'Token is not valid',
  });
 }
};

module.exports = {
 validateJWT,
};
