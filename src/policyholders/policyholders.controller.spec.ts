import { Test, TestingModule } from '@nestjs/testing';
import { PolicyholdersController } from './policyholders.controller';

describe('PolicyholdersController', () => {
  let controller: PolicyholdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolicyholdersController],
    }).compile();

    controller = module.get<PolicyholdersController>(PolicyholdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
