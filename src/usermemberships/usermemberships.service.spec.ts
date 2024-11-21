import { Test, TestingModule } from '@nestjs/testing';
import { UsermembershipsService } from './usermemberships.service';

describe('UsermembershipsService', () => {
  let service: UsermembershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsermembershipsService],
    }).compile();

    service = module.get<UsermembershipsService>(UsermembershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
