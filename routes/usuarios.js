/*
        ##########################################
        Rutas especificas con CRUD de usuarios.
        Middlewares: Funciones que se ejecutan antes de las peticiones HTTP
        Controladores: La funcion propia de la peticion. Como borrar, etc
        Helpers: Funciones ajenas al servidor. Pequeñas ayudas
        ##########################################
*/

const { Router } = require('express'); 
const { check } = require('express-validator')

//Helpers
const { esRolValido, existeCorreo, existeUsuarioByID } = require('../helpers/db-validators');

//Middlewares personalizados OPTIMIZADOS 
const {validarCampos, validarJWT, esAdmin, tieneRole} = require('../middleware')

//Controladores
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom( (id) => existeUsuarioByID( id ) ),
        check('rol').custom( (rol) => esRolValido( rol )),
        validarCampos
] ,usuariosPut); //Express reconocera todo lo que se envie por URL

router.post('/', [

        //Middleware que acumula posibles errores------------------------ 
        check('nombre', 'Invalid name').not().isEmpty(), 
        check('password', 'Invalid password. Use more than 6 characters').isLength({min: 6}),
        check('correo', 'Invalid email').isEmail(),
        check('correo').custom( (correo) => existeCorreo( correo )),
        check('rol').custom( (rol) => esRolValido( rol )),
        validarCampos

], usuariosPost);

router.delete('/:id', [
        validarJWT,
        // esAdmin,
        tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE' ),
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom( (id) => existeUsuarioByID( id ) ),
        validarCampos
] ,usuariosDelete);




module.exports = router;