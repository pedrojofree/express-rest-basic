const Role = require("../models/role");
const Usuario = require("../models/usuario");

/*
    Funciones personalizadas para validad cada parametro que se intenta ingresar a la DB.
*/

const esRolValido = async (rol= '') => {
    const existeRol = await Role.findOne( { rol } )
    if (!existeRol) {
            throw new Error(`Invalid "${rol}" role.`)
    };
};

const existeCorreo = async (correo = '') => {
    const existeUsuario = await Usuario.findOne ( {correo} ); //Buscar usuario con mismo correo
    if (existeUsuario) {
        throw new Error(`Email "${correo}" is already in use.`)
    };
};

const existeUsuarioByID = async (id = '') => {
    const existeUsuario = await Usuario.findById ( id ); //Buscar por id
    if (!existeUsuario) {
        throw new Error(`ID "${id}" do not exist.`)
    };
};

module.exports = {esRolValido, existeCorreo, existeUsuarioByID}