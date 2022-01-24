const { response } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response, next) => { 

        // validator
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors : errores.mapped()
        })
    }

    // si llega aqui no hay errores
    next();

}

module.exports = { validarCampos };  
