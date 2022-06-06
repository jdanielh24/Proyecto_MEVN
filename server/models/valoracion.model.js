const mongoose = require('mongoose');

const valoracionSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idPost:{
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comentario: String,
    valoracion: Number
});

module.exports = mongoose.model('Valoracion', valoracionSchema);