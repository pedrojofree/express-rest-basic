/*
        Rutas especificas con CRUD de usuarios.
                Se han separado middlewares de controladores para preservar la logica.
*/


const { Router } = require('express'); 
const { check } = require('express-validator')


//Middlewares personalizados
const { esRolValido, existeCorreo, existeUsuarioByID } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validate');

//Controladores importados
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');

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
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom( (id) => existeUsuarioByID( id ) ),
        validarCampos
] ,usuariosDelete);


module.exports = router;