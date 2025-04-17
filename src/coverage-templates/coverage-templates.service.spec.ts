import { Test, TestingModule } from '@nestjs/testing';
import { CoverageTemplatesService } from './coverage-templates.service';

describe('CoverageTemplatesService', () => {
  let service: CoverageTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoverageTemplatesService],
    }).compile();

    service = module.get<CoverageTemplatesService>(CoverageTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
