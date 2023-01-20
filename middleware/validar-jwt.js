
const jwt = require( 'jsonwebtoken' );
const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {

    //Verificar si se incluye el token en Header. ---------------------------------------
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            msg: 'No token in request'
        });
    };

    // Si existe, validar que sea valido. ------------------------------
    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY) //uid grabado en JWT

        //Leer el usuario que corresponde al UID por su JWT
        const usuario = await Usuario.findById(uid); 

        //Verificar si existe en DB ---------------------------
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe o es undefined'
            });
        };

        //Verificar si el UID tiene estado en true -------------------------
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            });
        };

        req.usuario = usuario;
        next()

    } catch (error) {
        res.status(401).json({
            error,
        });
    };

};

module.exports = {validarJWT};