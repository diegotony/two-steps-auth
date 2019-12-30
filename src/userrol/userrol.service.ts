import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRol } from '../dto/userrol.dto';

@Injectable()
export class UserrolService {

    constructor(@InjectModel('UserRol') private readonly UserRolModel: Model<UserRol>) {

      }
    
    
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
    
      async findItems(): Promise<any[]> {
        return await this.UserRolModel.find({})
          .exec();
      }

      async findUserRol(id:string): Promise<any[]> {
        return await this.UserRolModel.find({user_id: id})
          .exec();
      }
    
}
