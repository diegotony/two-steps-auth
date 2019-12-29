import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post()
    @HttpCode(200)
    async createItem(@Body() data: any) {
      return (await this.userService.createItem(data));
    }

    @Get()
    @HttpCode(200)
    async findAll(): Promise<any[]> {
      return (await this.userService.findItems());
    }
}
