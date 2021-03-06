const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.js')
const { generateJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')


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

const googleSignIn = async (req, res = response) => {
    const googleToken = req.body.token;

    try {
        // otra forma de hacerlo
        // await googleVerify(googleToken).then((object)=>{
        const { name, email, picture } = await googleVerify(googleToken);

        // verificar si existe el usuario
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        console.log(usuarioDB);
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                img: picture,
                password: '@@@',
                google:true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token de google no es correcto'
        })
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    try {

        const token = await generateJWT(uid);

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe con ese uid usuario'
            })
        }

        res.json({
            ok: true,
            token,
            usuarioDb
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token NO RENOVADO'
        })
    }

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}
