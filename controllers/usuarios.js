
const Usuario = require('../models/usuarios.js')

const getUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: []
    })
}

const crearUsuario = async (req, res) => {

    const { email, password, nombre } = req.body;
    console.log(req.body);
    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({
        ok: true,
        usuario
    })
}


module.exports = {
    getUsuarios,
    crearUsuario,
}