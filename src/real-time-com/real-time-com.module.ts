import { Module } from '@nestjs/common';
import { RealTimeComService } from './real-time-com.service';
import { RealTimeComController } from './real-time-com.controller';
import { RealTimeComGateway } from './real-time-come.gateway';

@Module({
  controllers: [RealTimeComController],
  providers: [RealTimeComService, RealTimeComGateway],
})
export class RealTimeComModule {}
