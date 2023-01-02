require('dotenv').config(); //Reconoce las variables de entorno

const Server = require('./models/server');

const server = new Server()

server.listen(); //Inicia el server