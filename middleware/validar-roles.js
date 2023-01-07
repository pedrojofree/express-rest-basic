const { request, response } = require("express");

const esAdmin = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se intentó verificar el rol sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede eliminar usuarios.`
        })
    }

    next()
}

const tieneRole = ( ...roles ) => {
    return ( req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se intentó verificar el rol sin validar el token primero'
            });
        };

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `Se requiere uno de estos roles para eliminar usuarios "${roles}"`
            })
        }
        next()
    }
}

module.exports = {esAdmin, tieneRole};