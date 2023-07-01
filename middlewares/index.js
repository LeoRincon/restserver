const { validateJWT } = require('./validate-jwt');
const { validateRole } = require('./validate-roles');
const { validateFields } = require('./validateFields');
const { validateFileToUpload } = require('./validate-file');

module.exports = {
 validateJWT,
 validateRole,
 validateFields,
 validateFileToUpload,
};
