const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios.js')
const { generateJWT } = require('../helpers/jwt')


const login = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {

        // Verifica email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuarion no existe'
            })
        }
        // Verifica password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(500).json({
                ok: false,
                msg: 'Password no valid'
            })
        }

        // generar token validador - jwt
        const token = await generateJWT(usuario.id);
        res.json({
            ok: true,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta AUTH'
        })
    }
};


module.exports = {
    login
}
// revert 1

