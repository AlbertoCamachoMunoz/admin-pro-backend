// search
// Ruta: /api/uploads

const { Router } = require('express');
// npm i express-validator
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar_jwt.js');


const { fileUploads, fileDownload } = require('../controllers/uploads.js');

const router = Router();

router.use(expressFileUpload());

// Rutas
router.put('/:type/:id', validarJWT, fileUploads);
router.get('/:type/:img', validarJWT, fileDownload);



module.exports = router;