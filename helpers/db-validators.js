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
        throw new Error(`ID "${id}" do not match to any user.`)
    }
};

const existeCategoria = async (id = '') => {
    try {
        const existe = await Categoria.findById( id );
    } catch (error) {
        throw new Error(`ID "${id}" do not match to any category.`)
    }
};

const existeProducto = async ( id = '' ) => {
    try {
        const existe = await Producto.findById( id );
    } catch (error) {
        throw new Error(`ID "${id}" do not match to any product.`)
    }
}

const isCollectionAvailable = async ( collection = '', collections = []) => {
    const incluida = collections.includes((collection));
    if (!incluida) {
        throw new Error(`'${collection}' is not a db collection. Allowed: ${collections}`);
    }

    return true;
};

module.exports = {esRolValido, existeCorreo, existeUsuarioByID, existeCategoria, existeProducto, isCollectionAvailable}