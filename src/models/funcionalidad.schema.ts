import * as mongoose from 'mongoose'
export const FuncionalidadSchema = new mongoose.Schema({
    name: {type: String, required: true},
    url: {type: String, required: true},
});