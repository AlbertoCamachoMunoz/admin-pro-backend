// Ruta: /api/usuairos
const { Router } = require('express');
// npm i express-validator
const validator = require('express-validator');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos.js');
const { getUsuarios, crearUsuario, updateUsuario } = require('../controllers/usuarios');

const router = Router();

// Rutas
router.get('/', getUsuarios);
router.post(
    '/',
    [
        // validador middelware
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
        
    ],
    crearUsuario
);

router.put(
    '/:uid',
    [
        validator.param('uid').isMongoId().trim(),
        // validador middelware
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
        
    ],
    updateUsuario
);

module.exports = router;