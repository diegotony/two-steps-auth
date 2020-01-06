import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Funcionalidad } from 'src/dto/funcionalidad.dto';

@Injectable()
export class FuncionalidadService {
  constructor(
    @InjectModel('Funcionalidad')
    private readonly FuncionalidadModel: Model<Funcionalidad>,
  ) {}

  async createFuncionalidad(data: any): Promise<any> {
    try {
      const createdFuncionalidad = new this.FuncionalidadModel(data);
      if (!createdFuncionalidad) {
        throw new HttpException('Upps error ...', HttpStatus.BAD_REQUEST);
      }
      return await createdFuncionalidad.save();
    } catch (error) {
      throw new HttpException(
        `Callback postItem ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findFuncionalidades(): Promise<any[]> {
    return await this.FuncionalidadModel.find({}).exec();
  }

  async deleteFuncionalidad(idItem: string): Promise<any> {
    try {
      const deleteIem = this.FuncionalidadModel;
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
