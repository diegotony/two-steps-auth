import {
  Controller,
  Get,
  Render,
  Post,
  Res,
  Request,
  UseGuards,
  UseFilters,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import { UserService } from './user/user.service';
import { UserrolService } from './userrol/userrol.service';
import { RolesfuncionalidadService } from './rolesfuncionalidad/rolesfuncionalidad.service';
import { RolService } from './rol/rol.service';
import { FuncionalidadService } from './funcionalidad/funcionalidad.service';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(
    private userRolService: UserrolService,
    private RolFuncionalidadService: RolesfuncionalidadService,
    private RolService: RolService,
    private userService: UserService,
    private funcionalidadService: FuncionalidadService,

  ) {}

  //  Login Component

  @Get('/')
  @Render('login')
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }

  //  Home page

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  async getHome(@Request() req) {
    return this.userRolService.findUserRol(req.user._doc['_id']).then(data => {
      console.log(data);
      return { user: req.user._doc, rol: data };
    });
  }

  // @UseGuards(AuthenticatedGuard)
  // @Get('/profile')
  // @Render('profile')
  // getProfile(@Request() req) {
  //   return { user: req.user };
  // }

  // Check Funcionalidades

  @UseGuards(AuthenticatedGuard)
  @Get('/funcionalidad/:id')
  @Render('funcionalidad')
  funcionalidad(@Request() req, @Param() param) {
    return this.RolFuncionalidadService.findOneRolFuncionalidad(param.id).then(
      data => {
        console.log(data);
        return { funcionalidad: data };
      },
    );
  }

  // Docente Component

  @UseGuards(AuthenticatedGuard)
  @Get('/estudiantes')
  @Render('estudiantes')
  getStudents(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/notas')
  @Render('profile')
  getNotas(@Request() req) {
    return { user: req.user };
  }

  //  Admin Rol
  @UseGuards(AuthenticatedGuard)
  @Get('/admin')
  @Render('admin')
  getAdmin(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/rol')
  @Render('rol')
  getRol(@Request() req) {
    return this.RolService.findRols().then(data => {
      console.log(data);
      return { rols: data };
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/user')
  @Render('user')
  getUsers(@Request() req) {
    return this.userService.findUsers().then(data => {
      console.log(data);
      return { users: data };
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/roluser')
  @Render('roluser')
  getRolUsers(@Request() req) {
    return this.userRolService.findRolUsers().then(data => {
      console.log(data);
      return { rolusers: data };
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/funcioadmin')
  @Render('funcionalidadesadmin')
  getFuncionalidad(@Request() req) {
    return this.funcionalidadService.findFuncionalidades().then(data => {
      console.log(data);
      return { funcionalidades: data };
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/rolfuncionalidad')
  @Render('rolfuncionalidad')
  getRolFuncionalidad(@Request() req) {
    return this.RolFuncionalidadService.findRolFuncionalidad().then(data => {
      return { rolfuncionalidades: data };
    });
  }
}
