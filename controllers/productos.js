const { response } = require("express");


const Producto = require("../models/producto");







//Obtener todos los productos - path publico
const obtenerProductos = async ( req, res = response ) => {

    const { limit=5, from=0 } = req.query //Recibiendo filtros por URL
    const filtrosDB = {estado: true};


    const productos = await Producto.find(filtrosDB) //METODO LENTO
    .skip( Number(from) )
    .limit( Number(limit) )
    .populate( 'usuario', 'nombre')
    .populate( 'categoria', 'nombre')

    const registrosTotales = await Producto.countDocuments(filtrosDB);

    res.json( {registrosTotales, productos} )
};

//Obtener un producto por ID - path publico
const obtenerProductoByID = async ( req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById( id ).populate( 'usuario', 'nombre').populate( 'categoria', 'nombre');

    res.json(producto);
}

//Crear un PRODUCTO - privada solo para token validos
const crearProducto = async ( req, res = response ) => {

    const { estado, usuario, ...body} = req.body;

    const existeProducto = await Producto.findOne( {nombre: body.nombre} )

    if (existeProducto) {
        return res.json({
            msg: `Product ${existeProducto.nombre} already exist.`
        });
    };


    //Si no existe el producto, crearlo y guardarlo.
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id, //Viene del middleware validarJWT
    };
    
    const producto = await new Producto ( data );

    await producto.save();

    res.status(201).json(producto);
}

//Actualizar un PRODUCTO - privada solo para tokens validos
const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true} );

    res.json(producto);
}

//Cambiar estado de producto - solo para ADMINS
const deleteProducto = async (req, res = response) => {

    const { id } = req.params;

    const inactivo = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true} );

    res.json({
        msg: 'Producto desactivado',
        inactivo
    });

};










module.exports = {
    obtenerProductos, crearProducto, obtenerProductoByID, actualizarProducto, deleteProducto
}