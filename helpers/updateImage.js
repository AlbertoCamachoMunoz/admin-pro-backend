const fs = require("fs");

const Usuario = require('../models/usuario.js')
const Medico = require('../models/medico.js')
const Hospital = require('../models/hospital.js')

const updateImage = async (type, id, nombreArchivo) => {

    console.log('dentro de helper');

    switch (type) {
        
        case 'medicos':
            await saveDataBase( Medico, 'medicos', id, nombreArchivo )
            break;
        
        case 'hospitales':
            await saveDataBase( Hospital, 'hospitales', id, nombreArchivo )
            break;
        
        case 'usuarios':
            await saveDataBase( Medico, 'usuarios', id, nombreArchivo )
            break;
            
        default:
            break;

    }

};

const saveDataBase = async (Entity, name,  id, nombreArchivo) => {
    
    const entity = await Entity.findById(id)
    const pathViejo = `./uploads/${name}/${entity.img}`;
    if (!entity) return false;
    
    if (fs.existsSync(pathViejo)) fs.unlinkSync(pathViejo);
    entity.img = nombreArchivo;
    await entity.save();
    return;

}

module.exports = {
    updateImage
}