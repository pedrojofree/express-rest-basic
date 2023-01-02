/*
        Rutas especificas con CRUD de usuarios.
*/


const { Router } = require('express'); 

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut); //Express reconocera todo lo que se envie por URL

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);


module.exports = router;