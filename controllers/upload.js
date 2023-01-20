const path = require('path');
const fs = require ('fs');

const { response } = require("express");

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");


const cargarArchivo = async (req, res = response) => {
  //-------------- Existe archivo en request??
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({msg:'No file in request. 1'});
  }

  try {

    // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos')
    const nombre = await subirArchivo(req.files, undefined, 'imgs')
    res.json({nombre})
    
  } catch (msg) {
    res.status(400).json({msg})
  }
};

// const actualizarImagen = async (req, res = response) => { //Con files locales

//   const { id, collection } = req.params

//   let modelo;

//   switch (collection) {

//     case 'users': //Validacion 
//       modelo=await Usuario.findById(id);
//       if (!modelo) {
//         return res.status(400).json({
//             msg: `User does not exist with ID: ${id}`
//         });
//       };
//       break;

//     case 'products':
//       modelo=await Producto.findById(id);

//       if (!modelo) {
//         return res.status(400).json({
//             msg: `Product does not exist with ID: ${id}`
//         });
//       };
//       break;
  
//     default:
//       return res.status(500).json({msg: 'Invalid collection.'})

//   }


//   //Eliminar imagen previa si existe. CON PATH Y FILESYSTEM
//   if (modelo.img) {
//     const pathImg = path.join(__dirname, '../uploads', collection, modelo.img);
//     if (fs.existsSync(pathImg)) {
//       fs.unlinkSync(pathImg);
//     };
//   };

//   //Agregar nueva foto.
//   try {

//     const nombre = await subirArchivo(req.files, undefined, collection);
//     modelo.img = nombre;

//     await modelo.save()
  
//     res.json(modelo)

//   } catch (error) {
//     return res.status(500).json({msg: error})
//   }
  

// };

const actualizarImagenCloudinary = async (req, res = response) => { //Con Cloudinary API

  const { id, collection } = req.params

  let modelo;

  switch (collection) {

    case 'users': //Validacion 
      modelo=await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
            msg: `User does not exist with ID: ${id}`
        });
      };
      break;

    case 'products':
      modelo=await Producto.findById(id);

      if (!modelo) {
        return res.status(400).json({
            msg: `Product does not exist with ID: ${id}`
        });
      };
      break;
  
    default:
      return res.status(500).json({msg: 'Invalid collection.'})

  }


  //Eliminar imagen previa si existe. CON cloudinary
  if (modelo.img) {
    const fileNameComplete = modelo.img.split('/').at(-1)
    const [ public_id ]  = fileNameComplete.split('.');

    cloudinary.uploader.destroy(public_id);
  };

  //Agregar nueva foto.
  try {

    const { secure_url } = await cloudinary.uploader.upload( req.files.archivo.tempFilePath )
    modelo.img = secure_url;
    await modelo.save()
    res.json(modelo)

  } catch (error) {

    return res.status(500).json({msg: error})

  };
};

const mostrarImagen = async (req, res = response) => {

  const { id, collection } = req.params

  let modelo;
  
  switch (collection) {

    case 'users': //Validacion 
      modelo=await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
            msg: `User does not exist with ID: ${id}`
        });
      };
      break;

    case 'products':
      modelo=await Producto.findById(id);

      if (!modelo) {
        return res.status(400).json({
            msg: `Product does not exist with ID: ${id}`
        });
      };
      break;
  
    default:
      return res.status(500).json({msg: 'Invalid collection.'})

  }


  //Eliminar imagen previa si existe. CON PATH Y FILESYSTEM
  if (modelo.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, modelo.img);
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    };
  };

  const placeholderPath = path.join(__dirname, '../assets', 'no-image.jpg');
  res.status(500).sendFile(placeholderPath)
  
};

module.exports = { cargarArchivo, mostrarImagen, actualizarImagenCloudinary }