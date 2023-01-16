/*
        Rutas especificas con CRUD de categorias.
                Se han separado middlewares de controladores para preservar la logica.
*/


const { Router } = require('express'); 
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, deleteCategoria } = require('../controllers/categorias');

const { validarJWT, validarCampos, tieneRole } = require('../middleware');
const { existeCategoria } = require('../helpers/db-validators');


const router = Router();


/*
    {{url}}/api/categories
*/

//Obtener todas las categorias - path publico
router.get('/', obtenerCategorias)

//Obtener una categoria por ID - path publico
router.get('/:id', [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],obtenerCategoria);

//Crear una categoria - privada solo para token validos
router.post('/', [
    validarJWT,
    check('nombre', 'Name is mandatory.').not().isEmpty(), 
    validarCampos
], crearCategoria)

//Actualizar un registro - privada solo para token validos
router.put('/:id', [
    validarJWT,
    check('id').custom( existeCategoria ),
    check('nombre', 'nombre is mandatory.').not().isEmpty(),
    validarCampos
], actualizarCategoria)

//Borra categorias - privada solo para Admin
router.delete('/:id', [
    validarJWT,
    tieneRole( 'ADMIN_ROLE' ),
    check('id').custom( existeCategoria ), 
    check('id', 'Is not a mongoID').isMongoId(), 
    validarCampos
], deleteCategoria)





module.exports = router;