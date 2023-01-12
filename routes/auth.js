/*
        Rutas especificas con CRUD de usuarios.
                Se han separado middlewares de controladores para preservar la logica.
*/


const { Router } = require('express'); 
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validate');


const router = Router();

router.post('/login', [
    check('correo', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validarCampos
], login)

router.post('/google', [
    check('id_token', 'id_token is mandatory').not().isEmpty(),
    validarCampos
], googleSignIn)




module.exports = router;