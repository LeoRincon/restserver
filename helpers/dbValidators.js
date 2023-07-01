const { Category, Role, User, Product } = require('../models');

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
const existUserById = async (userId) => {
 const existUser = await User.findById(userId);

 if (!existUser) {
  throw new Error(`ID invalid`);
 }
};

const existCategoryById = async (id) => {
 console.log('existCategoryById');
 const existCategory = await Category.findById(id);
 if (!existCategory) {
  throw new Error(`The id ${id} does not exist`);
 }
};

const existProductById = async (id) => {
 const existProduct = await Product.findById(id);
 if (!existProduct) {
  throw new Error(`The id ${id} does not exist`);
 }
};

const validateCollections = (collection = '', collections = []) => {
 const including = collections.includes(collection);
 if (!including) {
  throw new Error(
   `The collection ${collection} is not allowed, ${collections}`
  );
 }
 return true;
};
module.exports = {
 isValidRole,
 existEmail,
 existUserById,
 existCategoryById,
 existProductById,
 validateCollections,
};
