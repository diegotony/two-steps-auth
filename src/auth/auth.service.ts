import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(username, pass): Promise<any> {
    try {
      const user = await this.usersService.findUser(username);
      console.log(user);
      const match = await bcrypt.compare(pass, user.password);
      console.log(match);
      if (match) {
        const { pass, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
