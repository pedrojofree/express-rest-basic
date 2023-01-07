const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');


/*
    Los controladores permiten separar la logica de programación de la declaracion de las rutas y sus métodos.
    

*/


const usuariosGet = async (req, res) => {
    
    
    const { limite=5, desde=0 } = req.query //Recibiendo parametros por URL para limitar los usuarios devueltos.
    const filtro = { estado: true }

    // const usuarios = await Usuario.find(filtro) METODO LENTO
    //     .skip( Number(desde) )
    //     .limit( Number(limite) );

    // const registrosTotales = await Usuario.countDocuments(filtro);

    const [registrosTotales, usuarios] = await Promise.all([ //METODO RAPIDO con DESESTRUCTURACIÓN DE ARRAY
        await Usuario.countDocuments(filtro), //Valor 0 de array
        await Usuario.find(filtro) 
            .skip( Number(desde) )
            .limit( Number(limite) ) //Valor 1 de array
    ]);

    res.json({
        "msg": "peticion GET a mi API - desde CONTROLADOR",
        registrosTotales,
        usuarios
    })
};

const usuariosPut = async (req, res) => { //IMPORTANTE!: en las RUTAS hay que indicar que se recibe info por URL. (/:id)


    //Recibe info por URL y actualiza la DB --------------------------------
    const { id } = req.params; 
    const { password, google, correo, ...resto } = req.body;

    if ( password ) {
        //Re-encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true} );


    res.json({
        "msg": "peticion PUT - desde CONTROLADOR",
        usuario
    })
};

const usuariosPost = async (req, res) => {


    // Recibe informacion desde el cliente. --------------
    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    /* 
        Encriptar password:
        "genSaltSync" genera un algoritmo de encriptacion iterable 10 veces .
        "hashsync" toma la contraseña del usuario y la somete al algoritmo de salt.
    */
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //Guardar
    await usuario.save();

    res.json({
        "msg": "peticion POST - desde CONTROLADOR",
        usuario
    });
};

const usuariosDelete = async (req, res) => {

    const {id} = req.params; //id desde base de datos para borrar

    //MANERA RECOMENDADA, CONSERVANDO POSIBLES RELACIONES CON OTRAS BASES DE DATOS
    const usuarioYaInactivo = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({ usuarioYaInactivo })
};


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}