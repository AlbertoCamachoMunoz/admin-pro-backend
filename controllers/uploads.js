const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/updateImage");

const fileUploads = (req, res = response) => {
    
    const type = req.params.type;
    const id = req.params.id;
    
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    // compara entre los mienbros del array
    if (!tiposValidos.includes(type)) {
        res.status(400).json({
            ok: false,
            msg: 'No es un medico, hospital o usuario (type)'
        })
    }

    try {
        // validar si existe un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se ha enviado ningún archivo'
             })
        }

        const file = req.files.imagen;
        const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
        const extension = nombreCortado[nombreCortado.length - 1];
        console.log(extension);

        // validar estension
        const extensionesValidos = ['png', 'jpg', 'usuariosjpeg', 'pdf', 'gif'];
        if (!extensionesValidos.includes(extension)) {
            res.status(400).json({
                ok: false,
                msg: 'No es un archivo con extension valida'
            })
        }

        const nombreArchivo = `${ uuidv4() }.${ extension }`;

        //  ruta de la imagen
        const path = `./uploads/${type}/${nombreArchivo}`


        file.mv(path, function(err) {
            if (err)
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover el archivo'
                });
            // Actualizar imagen en BBDD
            updateImage(type, id, nombreArchivo).then(() => {
                res.json({
                    ok: true,
                    msg: 'Archivo subido correctamente',
                    nombreArchivo
                }) 
            });

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la subida de archivos',
            nombreArchivo
        }) 

    }
}

const fileDownload = (req, res = response) => {
    
    const { type, img } = req.params;
    const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);
    const noExist = path.join(__dirname, `../uploads/no-img.jpg`);
    console.log(pathImg);
    
    if (!fs.existsSync(pathImg))
        res.sendFile(noExist);
    else
        res.sendFile(pathImg);
}


module.exports = {
    fileUploads,
    fileDownload
}