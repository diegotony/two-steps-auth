import { Test, TestingModule } from '@nestjs/testing';
import { UserRolController } from './user-rol.controller';

describe('UserRol Controller', () => {
  let controller: UserRolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRolController],
    }).compile();

    controller = module.get<UserRolController>(UserRolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
