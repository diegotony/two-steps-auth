import { Controller, Post, HttpCode, Body, Get, Param } from '@nestjs/common';
import { UserrolService } from './userrol.service';

@Controller('userrol')
export class UserrolController {
    constructor(private readonly userRolService: UserrolService) { }
    @Post()
    @HttpCode(200)
    async createItem(@Body() data: any) {
      return (await this.userRolService.createUserRol(data));
    }

    @Get()
    @HttpCode(200)
    async findAll(): Promise<any[]> {
      return (await this.userRolService.findRolUsers());
    }

    @Get(':id')
    @HttpCode(200)
    async findRol(@Param() params): Promise<any[]> {
      return (await this.userRolService.findUserRol(params.id));
    }

}
