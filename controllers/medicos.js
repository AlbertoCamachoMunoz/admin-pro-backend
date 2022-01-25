
const bcrypt = require('bcryptjs');
const { response } = require('express');
const Medico = require('../models/medico.js')
const { generateJWT } = require('../helpers/jwt')


const getMedicos = async(req, res = response) => {

    const medico = await Medico.find({}, 'nombre usuario');
    res.json({
        ok: true,
        medico
    })
}

const crearMedico = async (req, res = response) => {

    const { email, password, nombre } = req.body;
    console.log(req.body);
    

    try {

        const existeMedico = await Medico.findOne({ email });
        if (existeMedico) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya existe medico'
            })
        }
        
        const medico = new Medico(req.body);

        const salt = bcrypt.genSaltSync();
        medico.password = bcrypt.hashSync(password, salt);
        
        await medico.save();
        const token = await generateJWT(medico.id);


        res.json({
            ok: true,
            token,
            medico
            
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta create medico'
        })
    }

}

// TODO: vALIDAR TOKEN
const updateMedico = async (req, res = response) => {

    const uid = req.params.uid;

    try {

        const medicoDb = await Medico.findById(uid);

        if (!medicoDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no existe con ese uid'
            })
        }

        // Update
        const { password, google, email, ...campos } = req.body;

        if (medicoDb.email !== email) {
            const existeMedico = await Medico.findOne({ email })
            if (existeMedico) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Correo ya existe medico'
                })
            }
            // solo si son distintos lo añadimos
            campos.email = email;
        }

        const updateMedico = await medico.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            updateMedico
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta update medico'
        })
    }

}

const deleteMedico = async (req, res = response) => {

    const uid = req.params.uid;
    console.log(uid);

    try {

        const medicoDb = await Medico.findById(uid);

        if (!medicoDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no existe con ese uid'
            })
        }


        const deleteMedico = await Medico.findByIdAndDelete(uid);


        res.json({
            ok: true,
            deleteMedico
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta delete medico'
        })
    }

}


module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico
}