
const Usuario = require('../models/usuarios.js')
const { response } = require('express');

const getUsuarios = async(req, res) => {

    const usuario = await Usuario.find({}, 'nombre email rol google');
    res.json({
        ok: true,
        usuario
    })
}

const crearUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body;
    console.log(req.body);
    


    try {

        // const existeUsuario = await Usuario.findOne({ email });
        const usuario = new Usuario(req.body);
        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya existe'
            })
        }

        await usuario.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta'
        })
    }


    res.json({
        ok: true,
        usuario
    })
}


module.exports = {
    getUsuarios,
    crearUsuario,
}