/*
        Rutas especificas con CRUD de productos.
                Se han separado middlewares de controladores para preservar la logica.

                ----------------------- /api/products -----------------------------
*/


const { Router } = require('express'); 
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole } = require('../middleware');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');


const { obtenerProductos, crearProducto, obtenerProductoByID, actualizarProducto, deleteProducto } = require('../controllers/productos');


const router = Router();






//GET productos
router.get('/', obtenerProductos);

//GET productos por ID
router.get('/:id', [
    check('id', 'Invalid MongoID. Check URL').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],obtenerProductoByID);

//POST Crear un producto
router.post('/', [
    validarJWT,
    check('nombre', 'Name is mandatory.').not().isEmpty(),
    check('categoria', 'Invalid MongoID. Check URL').isMongoId(),
    check('categoria').custom( existeCategoria),
    validarCampos
],crearProducto);

//PUT Actualizar un producto
router.put('/:id', [
    validarJWT,
    check('id', 'Invalid MongoID. Check URL.').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],actualizarProducto)

//DELETE un producto
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'Invalid MongoID. Check URL.').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], deleteProducto);



module.exports = router;