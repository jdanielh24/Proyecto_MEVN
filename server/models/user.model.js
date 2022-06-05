const mongoose = require('mongoose');

let validate = require('mongoose-beautiful-unique-validation');

const userSchema = mongoose.Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario']},
    email: {
        type: String, 
        required: [true, 'El email es necesario'],
        unique: 'Error. El email ya existe'},
    password: {type: String, required: [true, 'La contraseña es obligatoria']}
});

userSchema.plugin(validate);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = mongoose.model('User', userSchema);