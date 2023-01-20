const { response } = require("express")
const { Categoria } = require('../models')


//obtenerCategorias (paginado - limite - populate)
const obtenerCategorias = async (req, res = response) => {

    const { limit=5, from=0 } = req.query //Recibiendo filtros por URL
    const filtrosDB = {estado: true};


    const categorias = await Categoria.find(filtrosDB) //METODO LENTO
    .skip( Number(from) )
    .limit( Number(limit) )
    .populate( 'usuario', 'nombre')

    const registrosTotales = await Categoria.countDocuments(filtrosDB);

    res.json({
        registrosTotales,
        categorias
    })
};

//obtenerCategoria (por id - populate) return object {}
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoriaDB = await Categoria.findById(id).populate( 'usuario', 'nombre');

    res.json(categoriaDB);
};

//Crear una Categoria - privada solo para token validos
const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    const existeCategoria = await Categoria.findOne( {nombre} );

    //Evitar duplicados
    if ( existeCategoria ) {
        return res.status(400).json({
            msg: "post",
            msg: `CATEGORIA: '${existeCategoria.nombre}' ya existe.`
        })
    };

    //Generar la categoria
    const data = {
        nombre,
        usuario: req.usuario._id
    };

    //Formateo de informacion con Modelo
    const categoria = await new Categoria ( data );

    //Guardar en DB
    await categoria.save()

    res.status(201).json(categoria)
};

//actualizarCategoria (recibir id de la categoria)
const actualizarCategoria = async (req, res = response) => {

    try {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;
    
        
        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;
    
    
        const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true} ).populate( 'usuario', 'nombre');
    
        res.json({categoria});
    } catch (error) {
        console.log(error);
    }

};

//deleteCategoria (estado: false)
const deleteCategoria = async ( req, res = response ) => {
    const { id } = req.params; //id desde base de datos para borrar

    //MANERA RECOMENDADA, CONSERVANDO POSIBLES RELACIONES CON OTRAS BASES DE DATOS
    const categoriaEstado = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json( categoriaEstado )
}

module.exports = {obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, deleteCategoria };