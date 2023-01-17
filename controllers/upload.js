const { response } = require("express");
const path = require('path');

const cargarArchivo = async (req, res = response) => {

  //Existe archivo en request??
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({msg:'No hay archivos en la request'});
  }

  // Reconocer archivo y armar el path hacia la carpeta raiz del proyecto
  const { archivo } = req.files;
  const uploadPath = path.join(__dirname,'../uploads', archivo.name);

  // mv() mueve el archivo hacia el uploadPath
  archivo.mv(uploadPath, (err) => {
    if (err)
      return res.status(500).json({err});

    res.json({msg: 'Archivo creado en: ' + uploadPath});
  });

};

module.exports = { cargarArchivo }