import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolSchema } from '../models/rol.schema';
import { RolController } from './rol.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:'Rol', schema:RolSchema}])],
  providers: [RolService],
  controllers:[RolController]
})
export class RolModule {}
