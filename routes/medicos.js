// Medicos
// Ruta: /api/Medicos

const { Router } = require('express');
// npm i express-validator
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos.js');
const { validarJWT } = require('../middlewares/validar_jwt.js');

const { getMedicos, crearMedico, updateMedico, deleteMedico } = require('../controllers/Medicos');

const router = Router();

// Rutas
router.get('/', validarJWT, getMedicos);
router.post(
    '/',
    [   
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital es necesario').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put(
    '/:uid',
    [
        // validador middelware
        validarJWT,
    ],
    updateMedico
);

router.delete( '/:uid',validarJWT, deleteMedico);

module.exports = router;