const { Categoria, Producto, Usuario, Role } = require("../models");


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
    try {
        const existe = await Usuario.findById( id );
    } catch (error) {
        throw new Error(`ID "${id}" do not match to any product.`)
    }
};

const existeCategoria = async (id = '') => {
    try {
        const existe = await Categoria.findById( id );
    } catch (error) {
        throw new Error(`ID "${id}" do not match to any product.`)
    }
};

const existeProducto = async ( id = '' ) => {
    try {
        const existe = await Producto.findById( id );
    } catch (error) {
        throw new Error(`ID "${id}" do not match to any product.`)
    }
    

}

module.exports = {esRolValido, existeCorreo, existeUsuarioByID, existeCategoria, existeProducto}