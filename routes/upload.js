/*
        Rutas especificas para manejo de archivos .
                Se han separado middlewares de controladores para preservar la logica.
*/


const { Router } = require('express'); 
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/upload');
const { isCollectionAvailable } = require('../helpers');
const { validarArchivoSubir, validarCampos } = require('../middleware');


const router = Router();

router.get('/:collection/:id', [
        check('id', 'Not a MongoID').isMongoId(),
        check('collection').custom( c => isCollectionAvailable( c, ['users', 'products'])),
        validarCampos
], mostrarImagen)

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:collection/:id', [
        validarArchivoSubir,
        check('id', 'Not a MongoID').isMongoId(),
        check('collection').custom( c => isCollectionAvailable( c, ['users', 'products'])),
        validarCampos
// ],actualizarImagen)
],actualizarImagenCloudinary)





module.exports = router;