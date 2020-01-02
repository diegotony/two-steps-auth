import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionalidadService } from './funcionalidad.service';
import { FuncionalidadController } from './funcionalidad.controller';
import { FuncionalidadSchema } from '../models/funcionalidad.schema';


@Module({
    imports:[MongooseModule.forFeature([{name:'Funcionalidad',schema:FuncionalidadSchema}])],
    providers:[FuncionalidadService],
    controllers:[FuncionalidadController],
    exports: [FuncionalidadService],

})
export class FuncionalidadModule {}
