import { Injectable } from '@nestjs/common';
import { CreateRealTimeComDto } from './dto/create-real-time-com.dto';
import { UpdateRealTimeComDto } from './dto/update-real-time-com.dto';
import { Observable, interval, map } from 'rxjs';

@Injectable()
export class RealTimeComService {
  getHello(): string {
    return 'Hello World!';
  }

  // SSE stream method
  getSse(): Observable<{ data: string }> {
    return interval(1000).pipe(
      map((count) => ({
        data: 'SSE message #${count}',
      }))
    );
  }
}