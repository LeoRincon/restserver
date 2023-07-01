const { User, Product } = require('../models');

const getModelById = async (collection, id) => {
 switch (collection) {
  case 'users':
   let userModel = await User.findById(id);
   if (!userModel) {
    throw new Error(`User with id ${id} does not exist`);
   }
   return userModel;

  case 'products':
   let productModel = await Product.findById(id);
   if (!productModel) {
    throw new Error(`Product with id ${id} does not exist`);
   }

   return productModel;

  default:
   throw new Error(`I forgot to do it: ${collection}`);
 }
};

module.exports = {
 getModelById,
};
