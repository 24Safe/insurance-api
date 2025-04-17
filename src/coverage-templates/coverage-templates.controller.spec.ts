import { Test, TestingModule } from '@nestjs/testing';
import { CoverageTemplatesController } from './coverage-templates.controller';

describe('CoverageTemplatesController', () => {
  let controller: CoverageTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoverageTemplatesController],
    }).compile();

    controller = module.get<CoverageTemplatesController>(CoverageTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
