const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const validateUploadFile = async (
 files,
 validateExtensions = ['png', 'jpg', 'jpeg', 'gif'],
 folder = ''
) => {
 try {
  const { file } = files;
  const shortName = file.name.split('.');
  const extension = shortName[shortName.length - 1];

  // Validate extension
  if (!validateExtensions.includes(extension)) {
   throw new Error(
    `The extension ${extension} is not allowed, ${validateExtensions}`
   );
  }

  const { tempFilePath } = file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  return secure_url;
 } catch (error) {
  console.info('🇨🇴🚨 => file: upload-file.js:27 => error:', error);
  throw new Error('The file could not be uploaded');
 }
};

const clearPreviousImage = async (image) => {
 if (image) {
  const nameArr = image.split('/');
  const name = nameArr[nameArr.length - 1];
  const [public_id] = name.split('.');
  cloudinary.uploader.destroy(public_id);
 }
 return;
};

module.exports = {
 validateUploadFile,
 clearPreviousImage,
};
