
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

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDb = await Medico.findById(id);

        if (!medicoDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no existe con ese id'
            })
        }

        // Update
        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        }

        const updateMedico = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

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

    const id = req.params.id;
    console.log(id);

    try {

        const medicoDb = await Medico.findById(id);

        if (!medicoDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no existe con ese id'
            })
        }

        const deleteMedico = await Medico.findByIdAndDelete(id);


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