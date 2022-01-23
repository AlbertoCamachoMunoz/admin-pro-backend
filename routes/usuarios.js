// Ruta: /api/usuairos
const { Router } = require('express');
// npm i express-validator
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos.js');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios');

const router = Router();

// Rutas
router.get('/', getUsuarios);
router.post(
    '/',
    [
        // validador middelware
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        validarCampos,
        
    ],
    crearUsuario
);

module.exports = router;