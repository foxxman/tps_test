import { BadRequestException } from '@nestjs/common';

export class InvalidTimeRangeException extends BadRequestException {
  constructor(message?: string) {
    super(message ?? 'invalid-time-range');
  }
}
