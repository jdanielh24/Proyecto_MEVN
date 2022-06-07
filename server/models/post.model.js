const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }, 
    title: String,
    category: String,
    content: String,
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);