const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../../models');

const searchUsers = async (wordSearch = '', res = response) => {
 const esMongoID = ObjectId.isValid(wordSearch);

 if (esMongoID) {
  const user = await User.findById(wordSearch);
  return res.json({
   results: user ? [user] : [],
  });
 }

 const regex = new RegExp(wordSearch, 'i');
 const users = await User.find({
  $or: [{ name: regex }, { email: regex }],
  $and: [{ sate: true }],
 });

 res.json({
  results: users,
 });
};

const searchCategories = async (wordSearch = '', res = response) => {
 const esMongoID = ObjectId.isValid(wordSearch);

 if (esMongoID) {
  const category = await Category.findById(wordSearch);
  return res.json({
   results: category ? [category] : [],
  });
 }

 const regex = new RegExp(wordSearch, 'i');
 const categories = await category.find({ name: regex, state: true });

 res.json({
  results: categories,
 });
};

const searchProducts = async (wordSearch = '', res = response) => {
 const esMongoID = ObjectId.isValid(wordSearch);

 if (esMongoID) {
  const product = await Product.findById(wordSearch).populate(
   'category',
   'name'
  );
  return res.json({
   results: product ? [product] : [],
  });
 }

 const regex = new RegExp(wordSearch, 'i');
 const products = await Product.find({
  name: regex,
  state: true,
 }).populate('category', 'name');

 res.json({
  results: products,
 });
};

module.exports = {
 searchUsers,
 searchCategories,
 searchProducts,
};
