const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let userRolSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'the user must be assigned']
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, 'the user must be assigned']
    },
    state: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('UserRol', userRolSchema);