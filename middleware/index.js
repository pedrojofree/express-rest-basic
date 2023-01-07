const  validarCampos  = require('../middleware/validate');
const  validarJWT  = require('../middleware/validar-jwt');
const validarRoles = require('../middleware/validar-roles');

module.exports = { ...validarCampos, ...validarJWT, ...validarRoles };