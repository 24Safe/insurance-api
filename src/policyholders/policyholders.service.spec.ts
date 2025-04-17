import { Test, TestingModule } from '@nestjs/testing';
import { PolicyholdersService } from './policyholders.service';

describe('PolicyholdersService', () => {
  let service: PolicyholdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolicyholdersService],
    }).compile();

    service = module.get<PolicyholdersService>(PolicyholdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
