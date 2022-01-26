const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt')
const Usuario = require('../models/usuario.js')
const Medico = require('../models/medico.js')
const Hospital = require('../models/hospital.js')


const getSearch = async(req, res = response) => {


    // http://localhost:3000/api/search?search=alberto
    // const search = req.query.search;

    // http://localhost:3000/api/search/alberto
    const search = req.params.search;
    // hace la busqueda de coincidencias ademas es insensible a mayusculas y minusculas
    const regexp = new RegExp(search, 'i');

    try {

        const [ usuarios, medicos, hospitales, total ] = await Promise.all([
            Usuario.find({nombre:regexp}, 'nombre email rol google'),
            Medico.find({nombre:regexp}, 'nombre'),
            Hospital.find({nombre:regexp}, 'nombre'),
            
            Usuario.count()
        ])

        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales,
            total,
        })

    } catch (error) {
         console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta search'
        })
    }

}

const getSearchCollector = async(req, res = response) => {


    // http://localhost:3000/api/search?search=alberto
    // const search = req.query.search;

    // http://localhost:3000/api/search/alberto
    const search = req.params.search;
    const tabla = req.params.tabla;
    console.log(tabla);
    // hace la busqueda de coincidencias ademas es insensible a mayusculas y minusculas
    const regexp = new RegExp(search, 'i');

    let data = [];

    try {

        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regexp })
                    .populate('usuario', 'nombre email')
                    .populate('hospital', 'nombre email');
                break;
            
            case 'hospitales':
                data = await Hospital.find({ nombre: regexp });
                break;
            
            case 'usuarios':
                data = await Usuario.find({ nombre: regexp })
                break;
            
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Coleción no encontrada'
                });

        }

        res.json({
            ok: false,
            data
        }) 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la consulta search'
        })
    }

}

module.exports = {
    getSearch,
    getSearchCollector
}