// Ruta: /api/usuairos
const { Router } = require('express');
// npm i express-validator
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos.js');
const { validarJWT } = require('../middlewares/validar_jwt.js');

const { getUsuarios, crearUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');

const router = Router();

// Rutas
router.get('/', validarJWT, getUsuarios);
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
        // validador middelware
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
        
    ],
    updateUsuario
);

router.delete( '/:uid',validarJWT, deleteUsuario);

module.exports = router;