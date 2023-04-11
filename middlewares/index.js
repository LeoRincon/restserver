const { validateJWT } = require('./validate-jwt');
const { validateRole } = require('./validate-roles');
const { validateFields } = require('./validateFields');

module.exports = {
 validateJWT,
 validateRole,
 validateFields,
};
