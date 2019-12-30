import {
  Controller,
  Get,
  Render,
  Post,
  Res,
  Request,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import { UserService } from './user/user.service';
import { UserrolService } from './userrol/userrol.service';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userRolService: UserrolService,

  ) {}
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

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  async getHome(@Request() req) {
    return this.userRolService.findUserRol(req.user._doc['_id']).then(data => {
      console.log(data)

      return { user: req.user._doc, rol: data };
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
