import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {

    constructor(private readonly rolService: RolService) { }

    @Post()
    @HttpCode(200)
    async createRol(@Body() dto: any) {
      return (await this.rolService.createRol(dto));
    }

    @Get()
    @HttpCode(200)
    async findRols(): Promise<any[]> {
      return (await this.rolService.findRols());
    }
}
