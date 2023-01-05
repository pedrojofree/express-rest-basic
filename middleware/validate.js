/*
    Paquete Middleware que valida y cumula errores provenientes del req. Son reutilizables
        Viene con funciones como isEmail(), isMongoId(), isEmpty(), etc.
*/

const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    };
    next()
};

module.exports = {validarCampos};