const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = [
    'users',
    'categories',
    'products',
    'roles'
]

const buscarUser = async ( termino = '', res = response ) => {

    const esMongoID = isValidObjectId(termino); //If mongo id true/false

    if (esMongoID) {
        const usuario = await Usuario.findById( termino );
        return res.json({
            result: (usuario) ? [usuario] : []
        });
    };

    const regex = new RegExp ( termino, 'i');

    const usuarios = await Usuario.find ({
        $or: [ { nombre: regex }, { correo: regex} ],
        $and: [ { estado: true } ]
    })

    res.json({
        totalMatchs: usuarios.length,
        result: usuarios
    });
};

const buscarCategories = async ( termino = '', res = response ) => {
    const esMongoID = isValidObjectId(termino); //If mongo id true/false

    if (esMongoID) {
        const categoria = await Categoria.findById( termino ).populate('usuario', 'nombre');
        return res.json({
            result: (categoria) ? [categoria] : []
        });
    };    
    
    const regex = new RegExp ( termino, 'i' );
    const categorias = await Categoria.find({nombre: regex, estado: true}).populate('usuario', 'nombre')

    res.json({
        totalMatchs: categorias.length,
        result: categorias
    });
};

const buscarProducts = async ( termino = '', res = response ) => {
    const esMongoID = isValidObjectId(termino); //If mongo id true/false

    if (esMongoID) {
        const producto = await Producto.findById( termino );
        return res.json({result: (producto) ? [producto] : []} );
    };       
    
    const regex = new RegExp ( termino, 'i')
    const productos = await Producto.find({
        $or: [{nombre: regex}, {descripcion: regex}]
    }).populate('categoria', 'nombre');

    res.json({
        totalMatchs: productos.length,
        result: productos
    });
};


// ----------------------- CONTROLLERS -------------------------------
const buscar = async (req, res = response) => {

    const { collection, term } = req.params;

    if (!coleccionesPermitidas.includes( collection )) {
        return res.status(400).json({
            msg: 'Invalid collection'
        })
    }

    switch (collection) {
        case 'users':
            buscarUser( term, res);
        break;
        case 'categories':
            buscarCategories ( term, res );
        break;
        case 'products':
            buscarProducts ( term, res );
        break;
    
        default:
            res.status(500).json({
                msg: 'Switch default'
            })
            break;
    };
};

module.exports = buscar;