import { Test, TestingModule } from '@nestjs/testing';
import { RealTimeComController } from './real-time-com.controller';
import { RealTimeComService } from './real-time-com.service';

describe('RealTimeComController', () => {
  let controller: RealTimeComController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealTimeComController],
      providers: [RealTimeComService],
    }).compile();

    controller = module.get<RealTimeComController>(RealTimeComController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
