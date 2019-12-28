const mongoose = require('mongoose')
let Schema = mongoose.Schema;


let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'the name must be assigned']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);