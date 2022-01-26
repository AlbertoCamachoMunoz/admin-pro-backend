// search
// Ruta: /api/search

const { Router } = require('express');
// npm i express-validator
const { validarJWT } = require('../middlewares/validar_jwt.js');

const { getSearch, getSearchCollector } = require('../controllers/search.js');

const router = Router();

// Rutas
router.get('/:search', validarJWT, getSearch);

router.get('/colecion/:tabla/:search', validarJWT,  getSearchCollector);


module.exports = router;