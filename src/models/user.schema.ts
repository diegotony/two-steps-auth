import * as mongoose from 'mongoose'
export const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    catalog: {type: mongoose.Schema.Types.ObjectId, ref: 'Rol'},
    
});