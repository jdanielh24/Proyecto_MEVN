const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const valoracionSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    idPost:{
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true,
        index: true
    },
    comentario: String,
    valoracion: Number
});

module.exports = mongoose.model('Valoracion', valoracionSchema);