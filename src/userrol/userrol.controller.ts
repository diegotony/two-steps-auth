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
import { UserrolService } from './userrol.service';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { RolService } from '../rol/rol.service';
import { UserService } from '../user/user.service';

@Controller('userrol')
export class UserrolController {
  constructor(
    private readonly userRolService: UserrolService,
    private readonly rolService: RolService,
    private readonly userService: UserService,
  ) {}
  @Post()
  @HttpCode(200)
  async createItem(@Body() data: any, @Res() res: Response) {
    return await this.userRolService
      .createUserRol(data)
      .then(() => res.redirect('/userrol'));
  }

  // @Get()
  // @HttpCode(200)
  // async findAll(): Promise<any[]> {
  //   return (await this.userRolService.findRolUsers());
  // }

  @Get(':id')
  @HttpCode(200)
  async findRol(@Param() params): Promise<any[]> {
    return await this.userRolService.findUserRol(params.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('roluser')
  getRolUsers(@Request() req) {
    return this.userRolService.findRolUsers().then(data => {
      return this.rolService.findRols().then(rols => {
        return this.userService.findUsers().then(users => {
          return { rolusers: data, rols: rols, users: users };
        });
      });
    });
  }

  @UseGuards(AuthenticatedGuard)
  @HttpCode(201)
  @Get('/delete/:id')
  deleteRol(@Request() req, @Param() param, @Res() res: Response) {
    return this.userRolService.deleteUserRol(param.id).then(data => {
      console.log(data);
      res.redirect('/userrol');
    });
  }
}
