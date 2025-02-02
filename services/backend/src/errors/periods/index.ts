import { BadRequestException, ForbiddenException } from '@nestjs/common';

export class InvalidTimeRangeException extends BadRequestException {
  constructor(message?: string) {
    super(message ?? 'invalid-time-range');
  }
}

export class OutOfTimeRangeException extends ForbiddenException {
  constructor(message?: string) {
    super(message ?? 'out-of-time-range');
  }
}
