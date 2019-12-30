import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { RolController } from './rol/rol.controller';
import { RolModule } from './rol/rol.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserrolController } from './userrol/userrol.controller';
import { UserrolModule } from './userrol/userrol.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UserModule, RolModule, AuthModule, UserrolModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
