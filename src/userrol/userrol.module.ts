import { Module } from '@nestjs/common';
import { UserrolService } from './userrol.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRolSchema } from '../models/userrol.schema';

import { UserrolController } from './userrol.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:'UserRol', schema:UserRolSchema}])],
  providers: [UserrolService],
  exports: [UserrolService],
  controllers: [UserrolController]
  
})
export class UserrolModule {}
