import { Test, TestingModule } from '@nestjs/testing';
import { UsermembershipsController } from './usermemberships.controller';

describe('UsermembershipsController', () => {
  let controller: UsermembershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsermembershipsController],
    }).compile();

    controller = module.get<UsermembershipsController>(UsermembershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
