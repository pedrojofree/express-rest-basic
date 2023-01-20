const validarCampos  = require('./validate');
const validarJWT  = require('./validar-jwt');
const validarRoles = require('./validar-roles');
const validarArchivoSubir = require('./validar-archivo');

module.exports = { ...validarCampos, ...validarJWT, ...validarRoles, ...validarArchivoSubir };