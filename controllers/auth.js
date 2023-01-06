const { response } = require("express");
const Usuario = require("../models/usuario");
const brcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el correo existe 
        const usuario = await Usuario.findOne({ correo });
        if (!usuario){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            });
        };

        //Verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false"
            });
        };

        //Verificar password
        const esPasswordValido = brcrypt.compareSync(password, usuario.password);
        if (!esPasswordValido) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password"
            });
        };

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.status(500).json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Talk to admin"
        });
    };
};

module.exports = {
    login
}