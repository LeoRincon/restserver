const Role = require('../models/role.js');
const User = require('../models/user.js');

const isValidRole = async (role = '') => {
 const existRole = await Role.findOne({ role });
 if (!existRole) {
  throw new Error(`Role ${role} does not exist`);
 }
};

const existEmail = async (email) => {
 const emailExist = await User.findOne({ email });

 if (emailExist) {
  throw new Error(`Email ${email}  exist`);
 }
};

module.exports = {
 isValidRole,
 existEmail,
};
