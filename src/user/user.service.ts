import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../dto/user.dto';
const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class UserService {
  private readonly users: any[];

  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async findOne(username: string): Promise<any> {
    return this.users.find(user => user.username === username);
  }

  async findUser(email: string): Promise<any> {
    return this.UserModel.findOne({ email: email }).exec();
  }

  async createItem(data: any): Promise<any> {
    try {
      let plain = data.password;

      bcrypt.hash(plain, saltRounds, (err, hash) => {
        const createdItem = new this.UserModel({
          email: data.email,
          password: hash,
          phone: data.phone,
        });

        if (!createdItem) {
          throw new HttpException('Upps error ...', HttpStatus.BAD_REQUEST);
        }
        return createdItem.save();
        // console.log(data);
      });
    } catch (error) {
      throw new HttpException(
        `Callback postItem ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findUsers(): Promise<any[]> {
    return await this.UserModel.find({})
      .populate('catalog')
      .exec();
  }

  async deleteItem(idItem: string): Promise<any> {
    try {
      const deleteIem = this.UserModel;
      if (!deleteIem) {
        throw new HttpException('Upps error ...', HttpStatus.BAD_REQUEST);
      }
      return await deleteIem.findByIdAndRemove(idItem);
    } catch (error) {
      throw new HttpException(
        `Callback editItem ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
