const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise ((resolve, reject) => {
        // ------------ Reconocer archivo y armar el path hacia la carpeta raiz del proyecto
        const { archivo } = files;
        const extension = archivo.name.split('.').at(-1)

        //--------------- Validar extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`Invalid file extension '${extension}'. Only '${extensionesValidas}' are supported`) 
        };

        // ------------ mv() mueve el archivo hacia el uploadPath
        const nombreFinal = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname,'../uploads', carpeta, nombreFinal); //Armando el Path para almacenar el archivo subido

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            };
            resolve(nombreFinal);
        });
    })

  
}

module.exports = {subirArchivo}