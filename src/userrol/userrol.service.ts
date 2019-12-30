import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRol } from '../dto/userrol.dto';

@Injectable()
export class UserrolService {

    constructor(@InjectModel('UserRol') private readonly UserRolModel: Model<UserRol>) {
        // this.users = [
        //   {
        //     userId: 1,
        //     username: 'john',
        //     password: 'changeme',
        //     pet: { name: 'alfred', picId: 1 },
        //   },
        //   {
        //     userId: 2,
        //     username: 'chris',
        //     password: 'secret',
        //     pet: { name: 'gopher', picId: 2 },
        //   },
        //   {
        //     userId: 3,
        //     username: 'maria',
        //     password: 'guess',
        //     pet: { name: 'jenny', picId: 3 },
        //   },
        // ];
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
    
}
