import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(username, pass): Promise<any> {
    const user = await this.usersService.findUser(username);
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
   
  }
}
