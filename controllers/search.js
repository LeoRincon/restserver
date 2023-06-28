const { response } = require('express');
const {
 searchUsers,
 searchProducts,
 searchCategories,
} = require('./utils/searchFunctions');

const allowedCollections = ['users', 'categories', 'products', 'roles'];

const search = (req, res = response) => {
 const { collection, wordSearch } = req.params;
 console.log(collection, wordSearch);

 if (!allowedCollections.includes(collection)) {
  return res.status(400).json({
   msg: `The allowed collections are: ${allowedCollections}`,
  });
 }

 switch (collection) {
  case 'users':
   searchUsers(wordSearch, res);
   break;
  case 'categories':
   searchCategories(wordSearch, res);
   break;
  case 'products':
   searchProducts(wordSearch, res);
   break;

  default:
   res.status(500).json({
    msg: 'I forgot to make this search',
   });
 }
};

module.exports = {
 search,
};
