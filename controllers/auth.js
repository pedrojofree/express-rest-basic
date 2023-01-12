const { response } = require("express");
const Usuario = require("../models/usuario");
const brcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");


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


const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;
    
    try {
        const { correo, nombre, img } = await googleVerify( id_token );


        let usuario = await Usuario.findOne({ correo });
            
        
        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                rol: "USER_ROLE",
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }
}



module.exports = {
    login,
    googleSignIn
}