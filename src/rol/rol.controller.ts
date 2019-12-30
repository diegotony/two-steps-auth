import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from '../dto/rol.dto';

@Controller('rol')
export class RolController {

    constructor(private readonly rolService: RolService) { }

    @Post()
    @HttpCode(200)
    async createItem(@Body() dto: any) {
      return (await this.rolService.createRol(dto));
    }

    @Get()
    @HttpCode(200)
    async findAll(): Promise<any[]> {
      return (await this.rolService.findRols());
    }
}
