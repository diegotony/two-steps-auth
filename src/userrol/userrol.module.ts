import { Module } from '@nestjs/common';
import { UserrolService } from './userrol.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRolSchema } from '../models/userrol.schema';

import { UserrolController } from './userrol.controller';
import { RolService } from '../rol/rol.service';
import { RolModule } from '../rol/rol.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserRol', schema: UserRolSchema }]),
    RolModule,
    UserModule,
  ],
  providers: [UserrolService],
  exports: [UserrolService],
  controllers: [UserrolController],
})
export class UserrolModule {}
