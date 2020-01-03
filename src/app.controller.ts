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
  Body,
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

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'cbaeaaef',
  apiSecret: 'KRTQC2ZAvUyMAAY9',
});

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

  request_id = '';

  // Verify
  @Post('/verify')
  async verifyCode(@Body() data, @Res() res: Response) {
    return nexmo.verify.request(
      {
        number: '593978732512',
        brand: 'Nexmo',
      },
      (err, result) => {
        console.log(err ? err : result);
        console.log(result.request_id);
        this.request_id = result.request_id;
        res.redirect('/check');
      },
    );
  }

  @Get('/verify')
  @Render('verify')
  async verify(@Request() req, @Res() res: Response) {
    return { message: req.flash('loginError') };
  }

  @Get('/check')
  @Render('checkcode')
  async checkPage(@Request() req, @Res() res: Response) {
    return { message: req.flash('loginError') };
  }

  @Post('/check')
  async checkCode(@Body() data, @Res() res: Response) {
    return nexmo.verify.check(
      {
        request_id: this.request_id,
        code: data.pin,
      },
      (err, result) => {
        console.log(err ? err : result);
        if(result.status==='0'){
          res.redirect('/home');
        }
      },
    );
  }

  @Post('/cancel')
  async cancelCode(@Body() data, @Res() res: Response) {
    console.log(data);
    return nexmo.verify.control(
      {
        request_id: this.request_id,
        cmd: 'cancel',
      },
      (err, result) => {
        console.log(err ? err : result);
        res.redirect('/login');
      },
    );
  }

  //  Login Component

  @Get('/')
  @Render('login')
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response) {
    res.redirect('/verify');
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
