
const bcrypt = require('bcryptjs');
const { response } = require('express');
const Usuario = require('../models/usuarios.js')
const { generateJWT } = require('../helpers/jwt')


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

        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya existe'
            })
        }
        
        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();
        const token = await generateJWT(usuario.id);


        res.json({
            ok: true,
            token,
            usuario
            
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta create'
        })
    }

}

// TODO: vALIDAR TOKEN
const updateUsuario = async (req, res = response) => {

    const uid = req.params.uid;

    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe con ese uid'
            })
        }

        // Update
        const { password, google, email, ...campos } = req.body;

        if (usuarioDb.email !== email) {
            const existeUsuario = await Usuario.findOne({ email })
            if (existeUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Correo ya existe'
                })
            }
            // solo si son distintos lo añadimos
            campos.email = email;
        }

        const updateUsuario = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            updateUsuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta update'
        })
    }

}

const deleteUsuario = async (req, res = response) => {

    const uid = req.params.uid;
    console.log(uid);

    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe con ese uid'
            })
        }


        const deleteUsuario = await Usuario.findByIdAndDelete(uid);


        res.json({
            ok: true,
            deleteUsuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta delete'
        })
    }

}


module.exports = {
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario
}