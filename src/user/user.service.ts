import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../dto/user.dto';

@Injectable()
export class UserService {
  private readonly users: any[];

  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {
  }

  async findOne(username: string): Promise<any> {
    return this.users.find(user => user.username === username);
  }

  async findUser(email: string): Promise<any> {
    return this.UserModel.findOne({ email: email }).exec();
  }

  async createItem(data: any): Promise<any> {
    try {
      const createdItem = new this.UserModel(data);
      if (!createdItem) {
        throw new HttpException('Upps error ...', HttpStatus.BAD_REQUEST);
      }
      return await createdItem.save();
    } catch (error) {
      throw new HttpException(
        `Callback postItem ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findItems(): Promise<any[]> {
    return await this.UserModel.find({})
      .populate('catalog')
      .exec();
  }

  //   async findItem(idItem: string): Promise<any[]> {
  //     return await this.ItemModel.findById(idItem).populate('catalog').exec();
  //   }
  //   async deleteItem(idItem: string): Promise<Item[]> {
  //     try {
  //       const editIem = this.ItemModel;
  //       if(!editIem){
  //         throw new HttpException('Upps error ...', HttpStatus.BAD_REQUEST);
  //       }
  //       return await editIem.findByIdAndRemove(idItem);
  //     } catch (error) {
  //       throw new HttpException(`Callback editItem ${error.message}`, HttpStatus.BAD_REQUEST);
  //     }

  //   }
  //   async editItem(idItem: string, dto: CreateItemDto) {
  //     return await this.ItemModel
}
