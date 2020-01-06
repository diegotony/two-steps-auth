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
import { RolesfuncionalidadService } from './rolesfuncionalidad.service';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('rolesfuncionalidad')
export class RolesfuncionalidadController {
  constructor(
    private readonly rolFuncionalidadService: RolesfuncionalidadService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  @HttpCode(204)
  async createRol(@Body() dto: any, @Res() res: Response) {
    return await this.rolFuncionalidadService
      .createRolFuncionalidad(dto)
      .then(() => res.redirect('/rolfuncionalidad'));
  }

  // @Get()
  // @HttpCode(200)
  // async findRols(): Promise<any[]> {
  //   return await this.rolFuncionalidadService.findRolFuncionalidad();
  // }

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('rolfuncionalidad')
  getRolFuncionalidad(@Request() req) {
    return this.rolFuncionalidadService.findRolFuncionalidad().then(data => {
      return { rolfuncionalidades: data };
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  @Render('funcionalidad')
  funcionalidad(@Request() req, @Param() param) {
    return this.rolFuncionalidadService
      .findOneRolFuncionalidad(param.id)
      .then(data => {
        console.log(data);
        return { funcionalidad: data };
      });
  }

  @UseGuards(AuthenticatedGuard)
  @HttpCode(201)
  @Get('/delete/:id')
  deleteRol(@Request() req, @Param() param, @Res() res: Response) {
    return this.rolFuncionalidadService
      .deleteRolesFuncionalidad(param.id)
      .then(data => {
        console.log(data);
        res.redirect('/rolesfuncionalidad');
      });
  }
}
