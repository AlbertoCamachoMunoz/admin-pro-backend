const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROL'
    },
    google: {
        type: Boolean,
        default: false
    },
})

UsuarioSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return {_id, object};
});
module.exports = model('Usuario', UsuarioSchema);