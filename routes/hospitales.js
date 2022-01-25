// Hospitales
// Ruta: /api/hospitales

const { Router } = require('express');
// npm i express-validator
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos.js');
const { validarJWT } = require('../middlewares/validar_jwt.js');

const { getHospitales, crearHospital, updateHospital, deleteHospital } = require('../controllers/Hospitales');

const router = Router();

// Rutas
router.get('/', validarJWT, getHospitales);
router.post(
    '/',
    [   
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put(
    '/:uid',
    [
        // validador middelware
        validarJWT,
    ],
    updateHospital
);

router.delete( '/:uid',validarJWT, deleteHospital);

module.exports = router;