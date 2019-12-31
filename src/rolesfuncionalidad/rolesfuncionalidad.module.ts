import { Module } from '@nestjs/common';
import { RolesfuncionalidadController } from './rolesfuncionalidad.controller';
import { RolesfuncionalidadService } from './rolesfuncionalidad.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolFuncionalidad } from '../dto/rolfuncionalidad.dto';

@Module({
  imports:[MongooseModule.forFeature([{name:'RolFuncionalidad', schema:RolFuncionalidad}])],
  controllers: [RolesfuncionalidadController],
  providers: [RolesfuncionalidadService]
})
export class RolesfuncionalidadModule {}
