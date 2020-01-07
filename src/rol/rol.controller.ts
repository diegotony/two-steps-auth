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
import { RolService } from './rol.service';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  @HttpCode(204)
  async createRol(@Body() dto: any, @Res() res: Response) {
    return await this.rolService
      .createRol(dto)
      .then(() => res.redirect('/rol'));
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('rol')
  getRol(@Request() req) {
    return this.rolService.findRols().then(data => {
      console.log(data);
      return { rols: data };
    });
  }

  @UseGuards(AuthenticatedGuard)
  @HttpCode(201)
  @Get('/delete/:id')
  deleteRol(@Request() req, @Param() param, @Res() res: Response) {
    return this.rolService.deleteRol(param.id).then(data => {
      console.log(data);
      res.redirect('/rol');
    });
  }
}
