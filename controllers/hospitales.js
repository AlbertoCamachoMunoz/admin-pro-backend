
const bcrypt = require('bcryptjs');
const { response } = require('express');
const Hospital = require('../models/hospital.js')


const getHospitales = async(req, res) => {

    const hospital = await Hospital
                                .find({}, 'nombre img')
                                .populate('usuario', 'nombre email img');
    res.json({
        ok: true,
        hospital
    })
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    console.log('hospital', hospital);

    try {

        
        const hospitalDB = await hospital.save();


        res.json({
            ok: true,
            hospitalDB
            
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta create hospital'
        })
    }

}

// TODO: vALIDAR TOKEN
const updateHospital = async (req, res = response) => {

    const uid = req.params.uid;

    try {

        const hospitalDb = await Hospital.findById(uid);

        if (!hospitalDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no existe con ese uid'
            })
        }

        // Update
        const { password, google, email, ...campos } = req.body;

        if (hospitalDb.email !== email) {
            const existeHospital = await Hospital.findOne({ email })
            if (existeHospital) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Correo ya existe hospital'
                })
            }
            // solo si son distintos lo añadimos
            campos.email = email;
        }

        const updateHospital = await Hospital.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            updateHospital
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta update hospital'
        })
    }

}

const deleteHospital = async (req, res = response) => {

    const uid = req.params.uid;
    console.log(uid);

    try {

        const hospitalDb = await Hospital.findById(uid);

        if (!hospitalDb) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no existe con ese uid'
            })
        }


        const deleteHospital = await Hospital.findByIdAndDelete(uid);


        res.json({
            ok: true,
            deleteHospital
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta delete hospital'
        })
    }

}


module.exports = {
    getHospitales,
    crearHospital,
    updateHospital,
    deleteHospital
}