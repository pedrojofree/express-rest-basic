/*

    Se utiliza una Class para mantener el orden en el archivo "app.js"
        - El contructor auto-asigna las constantes y llama a las funciones para su activacion.
        - El metodo listen() en el app.js correrá el servidor.
        
*/



const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');

class Server { 

    constructor() { //Propiedades que se asignaran al incovarse en app.js

        this.app = express();
        this.PORT= process.env.PORT;


        //Conectar a DBs
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

        //FILE UPLOAD - Carga de archivos para todas las rutas en mi servidor.
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    };

    routes() {

        // ##### HOME: es reconocida por el MIDDLEWARE './public' y es el index.html.

        this.app.use('/api/users', require('../routes/usuarios')) //Agregando rutas para USUARIOS

        this.app.use('/api/auth', require('../routes/auth')) //Agregando rutas para AUTENTICACION / LOGIN
        
        this.app.use('/api/categories', require('../routes/categorias')) //Agregando rutas para CATEGORIAS

        this.app.use('/api/products', require('../routes/productos')) //Agregando rutas para PRODUCTOS
        
        this.app.use('/api/search', require('../routes/buscar')) //Agregando rutas para BUSQUEDA

        this.app.use('/api/upload', require('../routes/upload')) //Agregando rutas para ARCHIVOS
        
    };

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`SUCCESS: Port ${this.PORT}.`)
        });
    };
};

module.exports = Server;