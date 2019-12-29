import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Rol } from 'src/dto/rol.dto';

@Injectable()
export class RolService {
  constructor(@InjectModel('Rol') private readonly RolModel: Model<Rol>) {}

  async createRol(createRolDto: Rol): Promise<any> {
    try {
      const createdRol = new this.RolModel(createRolDto);
      if (!createdRol) {
        throw new HttpException('Upps error ...', HttpStatus.BAD_REQUEST);
      }
      return await createdRol.save();
    } catch (error) {
      throw new HttpException(
        `Callback postItem ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findRols(): Promise<any[]> {
    return await this.RolModel.find({})
      .populate('catalog')
      .exec();
  }
  
}
