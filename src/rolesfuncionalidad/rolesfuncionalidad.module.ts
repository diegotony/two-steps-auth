import { Module } from '@nestjs/common';
import { RolesfuncionalidadController } from './rolesfuncionalidad.controller';
import { RolesfuncionalidadService } from './rolesfuncionalidad.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolFuncionalidadSchema } from '../models/rolfuncionalidad.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'RolFuncionalidad', schema:RolFuncionalidadSchema}])],
  controllers: [RolesfuncionalidadController],
  providers: [RolesfuncionalidadService],
  exports: [RolesfuncionalidadService],

})
export class RolesfuncionalidadModule {}
