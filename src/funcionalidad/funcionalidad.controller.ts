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
import { FuncionalidadService } from './funcionalidad.service';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('funcionalidad')
export class FuncionalidadController {
  constructor(private readonly funcionalidadService: FuncionalidadService) {}

  @Post()
  @HttpCode(204)
  async createRol(@Body() dto: any, @Res() res: Response) {
    return await this.funcionalidadService
      .createFuncionalidad(dto)
      .then(() => res.redirect('/funcionalidad'));
  }

  // @Get()
  // @HttpCode(200)
  // async findRols(): Promise<any[]> {
  //   return await this.funcionalidadService.findFuncionalidades();
  // }

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('funcionalidadesadmin')
  getFuncionalidad(@Request() req) {
    return this.funcionalidadService.findFuncionalidades().then(data => {
      console.log(data);
      return { funcionalidades: data };
    });
  }

  @UseGuards(AuthenticatedGuard)
  @HttpCode(201)
  @Get('/delete/:id')
  deleteRol(@Request() req, @Param() param, @Res() res: Response) {
    return this.funcionalidadService
      .deleteFuncionalidad(param.id)
      .then(data => {
        console.log(data);
        res.redirect('/funcionalidad');
      });
  }
}
