/*

    Se utiliza una Class para mantener el orden en el archivo "app.js"
        - El contructor auto-asigna las constantes y llama a las funciones para su activacion.
        - El metodo listen() en el app.js correrá el servidor.
        
*/









const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server { 

    constructor() { //Propiedades que se asignaran al incovarse en app.js

        this.app = express();
        this.PORT= process.env.PORT;


        //Conectar a DB
        this.connectDB()
        
        //Middlewares: funciones que se ejecutan siempre.
        this.middlewares()
        
        //Routes: Reconocer rutas de mi aplicación
        this.routes()

    };

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //Reconocer directorio publico (CSS, HTML)
        this.app.use( express.static('public') );

        //Lectura y parseo del body recibido a la API.
        this.app.use ( express.json() );
        
        //CORS
        this.app.use( cors() );
    };

    routes() {

        // ##### HOME: es reconocida por el MIDDLEWARE './public' y es el index.html.

        this.app.use('/api/users', require('../routes/usuarios'))
        
    };

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`SUCCESS: Port ${this.PORT}.`)
        });
    };
};

module.exports = Server;