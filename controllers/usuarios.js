/*

    Los controladores permiten separar la logica de programación de la declaracion de las rutas y sus métodos.
    
*/




const usuariosGet = (req, res) => {
    
    const query = req.query 

    res.json({
        "msg": "peticion GET a mi API - desde CONTROLADOR",
        query
    })
};

const usuariosPut = (req, res) => { //IMPORTANTE!: en las RUTAS hay que indicar que se recibe info por URL. (/:id)

    const id = req.params.id //Recibe info del cliente y actualiza la DB.

    res.json({
        "msg": "peticion PUT - desde CONTROLADOR",
        id
    })
};
const usuariosPost = (req, res) => {

    const body = req.body; //Recibe informacion desde el cliente y agregala a la DB.

    res.json({
        "msg": "peticion POST - desde CONTROLADOR",
        body
    })
};
const usuariosDelete = (req, res) => {

    //recibe el ID por URL del usuario a eliminar de la DB.

    res.json({
        "msg": "peticion DELETE - desde CONTROLADOR"
    })
};


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}