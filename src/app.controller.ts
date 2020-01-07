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
  Delete,
  HttpCode,
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
  apiKey: 'a7629f62',
  apiSecret: 'HE84x0SdAQBHoD6G',
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
        number: data.phone,
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

  // @Get('/verify')
  // @Render('verify')
  // async verify(@Request() req, @Res() res: Response) {
  //   return { message: req.flash('loginError') };
  // }

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
        if (result.status === '0') {
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
    // res.redirect('/verify');
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

  // Docente Component

  @UseGuards(AuthenticatedGuard)
  @Get('/estudiantes')
  @Render('estudiantes')
  getStudents(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/notas')
  @Render('notas')
  getNotas(@Request() req) {
    return { user: req.user };
  }

  //  Admin Rol
  // @UseGuards(AuthenticatedGuard)
  @Get('/admin/users')
  @Render('adminuser')
  getAdmin(@Request() req) {
    return { user: req.user };
  }

  @Get('/admin/tables')
  @Render('admintables')
  getAdminTables(@Request() req) {
    return { user: req.user };
  }
}
