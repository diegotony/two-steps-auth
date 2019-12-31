import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RolFuncionalidad } from '../dto/rolfuncionalidad.dto';

@Injectable()
export class RolesfuncionalidadService {
    constructor(@InjectModel('RolFuncionalidad') private readonly RolFuncionalidadModel: Model<RolFuncionalidad>) {}

  async createRolFuncionalidad(data: any): Promise<any> {
    try {
      const createdRol = new this.RolFuncionalidadModel(data);
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
  async findRolFuncionalidad(): Promise<any[]> {
    return await this.RolFuncionalidadModel.find({})
      .exec();
  }

}
