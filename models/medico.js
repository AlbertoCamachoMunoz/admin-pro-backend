const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
})

MedicoSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    return {_id, object};
});
module.exports = model('Medico', MedicoSchema);