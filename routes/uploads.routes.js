const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFileToUpload } = require('../middlewares');
const {
 uploadFile,
 updateFile,
 showImage,
 UpdateImageCloudinary,
} = require('../controllers/uploads');
const { validateCollections } = require('../helpers/dbvalidators');

const updateFileRouter = Router();

updateFileRouter.post('/', validateFileToUpload, uploadFile);

updateFileRouter.put(
 '/:collection/:id',
 [
  validateFileToUpload,
  check('id', 'Id, must be an id of mongo').isMongoId(),
  check('collection').custom((c) =>
   validateCollections(c, ['users', 'products'])
  ),
  validateFields,
 ],
 UpdateImageCloudinary
);

updateFileRouter.get(
 '/:collection/:id',
 [
  check('id', 'Id, must be an id of mongo').isMongoId(),
  check('collection').custom((c) =>
   validateCollections(c, ['users', 'products'])
  ),
  validateFields,
 ],
 showImage
);

module.exports = updateFileRouter;
