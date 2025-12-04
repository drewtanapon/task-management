import { Test, TestingModule } from '@nestjs/testing';
import { RealTimeComService } from './real-time-com.service';

describe('RealTimeComService', () => {
  let service: RealTimeComService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealTimeComService],
    }).compile();

    service = module.get<RealTimeComService>(RealTimeComService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
