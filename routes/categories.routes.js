const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, validateRole } = require('../middlewares');

const {
 createCategory,
 getCategories,
 getCategory,
 updateCategory,
 deleteCategory,
} = require('../controllers/categories');
const { existCategoryById } = require('../helpers/dbvalidators');

const CategoryRouter = Router();

CategoryRouter.get('/', getCategories);

CategoryRouter.get(
 '/:id',
 [
  check('id', 'Does not a valid ID').isMongoId(),
  check('id').custom(existCategoryById),
  validateFields,
 ],
 getCategory
);

CategoryRouter.post(
 '/',
 [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  validateFields,
 ],
 createCategory
);

CategoryRouter.put(
 '/:id',
 [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  check('id').custom(existCategoryById),
  validateFields,
 ],
 updateCategory
);

CategoryRouter.delete(
 '/:id',
 [
  validateJWT,
  validateRole('ADMIN_ROLE'),
  check('id', 'Does Not valid id').isMongoId(),
  check('id').custom(existCategoryById),
  validateFields,
 ],
 deleteCategory
);

module.exports = CategoryRouter;
