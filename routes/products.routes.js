const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, validateRole } = require('../middlewares');

const {
 createProduct,
 getProducts,
 getProduct,
 updateProduct,
 deleteProduct,
} = require('../controllers/products');

const {
 existCategoryById,
 existProductById,
} = require('../helpers/dbvalidators');

const productRouter = Router();

productRouter.get('/', getProducts);

productRouter.get(
 '/:id',
 [
  check('id', 'Does not valid').isMongoId(),
  check('id').custom(existProductById),
  validateFields,
 ],
 getProduct
);

productRouter.post(
 '/',
 [
  validateJWT,
  check('name', 'name is mandatory').not().isEmpty(),
  check('category', 'Does not a mongo id').isMongoId(),
  check('category').custom(existCategoryById),
  validateFields,
 ],
 createProduct
);

productRouter.put(
 '/:id',
 [validateJWT, check('id').custom(existProductById), validateFields],
 updateProduct
);

productRouter.delete(
 '/:id',
 [
  validateJWT,
  validateRole('ADMIN_ROLE'),
  check('id', 'Does nte a valid mongo id').isMongoId(),
  check('id').custom(existProductById),
  validateFields,
 ],
 deleteProduct
);

module.exports = productRouter;
