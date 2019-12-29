import * as mongoose from 'mongoose'
export const RolSchema = new mongoose.Schema({
    name: {type: String, required: true},

});