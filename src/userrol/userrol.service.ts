import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRol } from '../dto/userrol.dto';

@Injectable()
export class UserrolService {
  constructor(
    @InjectModel('UserRol') private readonly UserRolModel: Model<UserRol>,
  ) {}

  async createUserRol(data: any): Promise<any> {
    try {
      const createdItem = new this.UserRolModel(data);
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

  async findRolUsers(): Promise<any[]> {
    return await this.UserRolModel.find({})
      .populate('rol_id')
      .populate('user_id')
      .exec();
  }

  findUserRol(id: string) {
    return this.UserRolModel.find({ user_id: id })
      .populate('rol_id')
      .populate('user_id')
      .exec();
  }

  async deleteUserRol(idItem: string): Promise<any> {
    try {
      const deleteIem = this.UserRolModel;
      if (!deleteIem) {
        throw new HttpException('Upps error ...', HttpStatus.BAD_REQUEST);
      }
      return await deleteIem.findByIdAndRemove(idItem);
    } catch (error) {
      throw new HttpException(
        `Callback deleteFunc ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
