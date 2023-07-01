const path = require('path');
const fs = require('fs');

const { response } = require('express');
const {
 validateUploadFile,
 clearPreviousImage,
} = require('../helpers/upload-file');
const { getModelById } = require('../helpers/getModel');
const { User, Product } = require('../models');

const uploadFile = async (req, res = response) => {
 try {
  // const name = await validateUploadFile( req.files, ['txt','md'], 'texts' );
  const name = await validateUploadFile(req.files, undefined, 'imgs');

  res.json({ name });
 } catch (error) {
  res.status(400).json({ error });
 }
};

const UpdateImageCloudinary = async (req, res = response) => {
 try {
  const { id, collection } = req.params;

  const model = await getModelById(collection, id);

  await clearPreviousImage(model.img);

  const name = await validateUploadFile(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
 } catch (error) {
  res.status(400).json({ error });
 }
};

const showImage = async (req, res = response) => {
 const { id, collection } = req.params;

 const model = await getModelById(collection, id);

 // clear previous images
 if (model.img) {
  return res.json({ urlImage: model.img });
  // const pathImage = path.join(__dirname, '../uploads', collection, model.img);
  // if (fs.existsSync(pathImage)) {
  //  return res.sendFile(pathImage);
  // }
 }

 const pathImage = path.join(__dirname, '../assets/no-image.jpg');
 res.sendFile(pathImage);
};

module.exports = {
 uploadFile,
 showImage,
 UpdateImageCloudinary,
};
