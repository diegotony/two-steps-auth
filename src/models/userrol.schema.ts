import * as mongoose from 'mongoose'
export const UserRolSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rol_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Rol'},
});