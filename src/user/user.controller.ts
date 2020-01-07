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
import { Response } from 'express';
import { UserService } from './user.service';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthenticatedGuard)
  @Post()
  @HttpCode(204)
  async createItem(@Body() data: any, @Res() res: Response) {
    return await this.userService
      .createItem(data)
      .then(() => res.redirect('/user'));
  }

  // @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('user')
  getUsers(@Request() req) {
    return this.userService.findUsers().then(data => {
      // console.log(data);
      return { users: data };
    });
  }

  // @UseGuards(AuthenticatedGuard)
  @HttpCode(201)
  @Get('/delete/:id')
  deleteRol(@Request() req, @Param() param, @Res() res: Response) {
    return this.userService.deleteItem(param.id).then(data => {
      console.log(data);
      res.redirect('/user');
    });
  }
}
