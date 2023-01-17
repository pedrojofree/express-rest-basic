/*
        Rutas especificas para manejo de archivos .
                Se han separado middlewares de controladores para preservar la logica.
*/


const { Router } = require('express'); 
const { check } = require('express-validator');
const { cargarArchivo } = require('../controllers/upload');
const { validarCampos } = require('../middleware/validate');


const router = Router();

router.post('/', cargarArchivo)





module.exports = router;