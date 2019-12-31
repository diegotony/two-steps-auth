import * as mongoose from 'mongoose'
export const RolFuncionalidadSchema = new mongoose.Schema({
    funcionalidad_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Funcionalidad'},
    userrol_id: {type: mongoose.Schema.Types.ObjectId, ref: 'UserRol'},
});