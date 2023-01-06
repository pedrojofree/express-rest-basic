const { model, Schema } = require("mongoose");

const usuario = new Schema({

    //ID se agrega automaticamente en mongoDB.

    nombre: {
        type: String,
        required: [true, 'NAME is mandatory'],
    },
    correo: {
        type: String,
        required: [true, 'MAIL is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'PASSWORD is mandatory'],
    },

    img: {
        type: String
    },

    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE'] ignorado porque ahora se valida segun DB
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },
});

//Excluyendo password y __v del retorno. Renombrando el _id
usuario.methods.toJSON = function () { 
    const { password, __v, _id, ...user} = this.toObject()
    user.uid = _id; 
    return user;
}

module.exports = model( 'Usuario', usuario);