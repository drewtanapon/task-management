import { PartialType } from '@nestjs/mapped-types';
import { CreateRealTimeComDto } from './create-real-time-com.dto';

export class UpdateRealTimeComDto extends PartialType(CreateRealTimeComDto) {}
