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
    '/:id',
    [
        // validador middelware
        validarJWT,
         check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital es necesario').isMongoId(),
        validarCampos
    ],
    updateMedico
);

router.delete( '/:id',validarJWT, deleteMedico);

module.exports = router;