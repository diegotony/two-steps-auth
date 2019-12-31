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
import { FuncionalidadService } from './funcionalidad/funcionalidad.service';
import { FuncionalidadController } from './funcionalidad/funcionalidad.controller';
import { FuncionalidadModule } from './funcionalidad/funcionalidad.module';
import { RolesfuncionalidadModule } from './rolesfuncionalidad/rolesfuncionalidad.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UserModule, RolModule, AuthModule, UserrolModule, FuncionalidadModule, RolesfuncionalidadModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
