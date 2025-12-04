import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRealTimeComDto } from './dto/create-real-time-com.dto';
import { UpdateRealTimeComDto } from './dto/update-real-time-com.dto';
import { Observable } from 'rxjs';
import { Sse } from '@nestjs/common';
import { RealTimeComService } from './real-time-com.service';

@Controller('real-time-com')
export class RealTimeComController {
  constructor(private readonly realTimeComService: RealTimeComService) { }

  @Get()
  getHello(): string {
    return this.realTimeComService.getHello();
  }

  @Sse('sse')
  sse(): Observable<{ data: string }> {
    return this.realTimeComService.getSse();
  }
}
