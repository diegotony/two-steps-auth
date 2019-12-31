import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { RolesfuncionalidadService } from './rolesfuncionalidad.service';

@Controller('rolesfuncionalidad')
export class RolesfuncionalidadController {
    constructor(private readonly rolFuncionalidadService: RolesfuncionalidadService) { }

    @Post()
    @HttpCode(200)
    async createRol(@Body() dto: any) {
      return (await this.rolFuncionalidadService.createRolFuncionalidad(dto));
    }

    @Get()
    @HttpCode(200)
    async findRols(): Promise<any[]> {
      return (await this.rolFuncionalidadService.findRolFuncionalidad());
    }


}
