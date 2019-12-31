import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Funcionalidad } from '../dto/funcionalidad.dto';
import { FuncionalidadService } from './funcionalidad.service';
import { FuncionalidadController } from './funcionalidad.controller';


@Module({
    imports:[MongooseModule.forFeature([{name:'Funcionalidad',schema:Funcionalidad}])],
    providers:[FuncionalidadService],
    controllers:[FuncionalidadController],
})
export class FuncionalidadModule {}
