// Ruta: /api/login
// Ruta: /api/login/google

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos.js');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();


router.post('/',
    [
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    login
);

router.post('/google',
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    googleSignIn
)


module.exports = router;