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
import { FuncionalidadService } from '../funcionalidad/funcionalidad.service';
import { RolService } from '../rol/rol.service';

@Controller('rolesfuncionalidad')
export class RolesfuncionalidadController {
  constructor(
    private readonly rolFuncionalidadService: RolesfuncionalidadService,
    private readonly funcionalidadService: FuncionalidadService,
    private readonly rolService: RolService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  @HttpCode(201)
  async createRol(@Body() dto: any, @Res() res: Response) {
    return await this.rolFuncionalidadService
      .createRolFuncionalidad(dto)
      .then(() => res.redirect('/rolesfuncionalidad'));
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
      return this.funcionalidadService
        .findFuncionalidades()
        .then(funcionalidades => {
          return this.rolService.findRols().then(rols => {
            return {
              rolfuncionalidades: data,
              funcionalidades: funcionalidades,
              rols: rols,
            };
          });
        });
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
