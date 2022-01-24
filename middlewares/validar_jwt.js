const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => { 

    // Leer el token
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET_SEED);
        // añadimos el uid a la request
        req.uid = uid;   
        // console.log(token);
        // si llega aqui no hay errores
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }



}

module.exports = { validarJWT };  