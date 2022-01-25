
const bcrypt = require('bcryptjs');
const { response } = require('express');
const Medico = require('../models/medico.js')
const { generateJWT } = require('../helpers/jwt')


const getMedicos = async(req, res = response) => {

    const medico = await Medico
                            .find()
                            .populate('hospital', 'nombre _id')
                            .populate('usuario', 'nombre email')
    res.json({
        ok: true,
        medico
    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const { id_hospital, nombre } = req.body;
    
    const medico = new Medico({
        usuario: uid,
        hospital: id_hospital,
        ...req.body
    });

    console.log('medico', medico);

    try {

        
        const medicoDB = await medico.save();


        res.json({
            ok: true,
            medicoDB
            
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