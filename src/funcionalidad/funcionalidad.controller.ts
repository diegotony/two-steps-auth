import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { FuncionalidadService } from './funcionalidad.service';

@Controller('funcionalidad')
export class FuncionalidadController {
    constructor(private readonly funcionalidadService: FuncionalidadService) { }

    @Post()
    @HttpCode(200)
    async createRol(@Body() dto: any) {
      return (await this.funcionalidadService.createFuncionalidad(dto));
    }

    @Get()
    @HttpCode(200)
    async findRols(): Promise<any[]> {
      return (await this.funcionalidadService.findFuncionalidades());
    }


}
