import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { isNumber } from 'class-validator';
import { isAfter, isBefore, isEqual } from 'date-fns';
import { OutOfTimeRangeException } from 'src/errors/periods';
import { PutPeriodDto } from 'src/modules/periods/dto';
import { PeriodsService } from 'src/modules/periods/periods.service';
import { getUserDateTime, setTime } from 'src/utils/date';

type GuardedRequest = Request & {
  body: PutPeriodDto;
};

@Injectable()
export class PeriodsGuard implements CanActivate {
  constructor(private readonly periodsService: PeriodsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as GuardedRequest;
    const timezone = request.headers['x-timezone'];

    if (!isNumber(request.body?.dayIndex)) {
      throw new BadRequestException('day-index-required');
    }
    const date = getUserDateTime(timezone);
    const dayIndex = date.getDay();

    const { periods } = await this.periodsService.getPeriods({
      dayIndex,
    });

    if (!periods[0]) {
      return false;
    }

    const availableStartDate = setTime(date, `${periods[0].startTime}:0:0`);
    const availableFinishDate = setTime(
      date,
      `${periods[0].finishTime}:59:999`,
    );

    const isDateEqualToBorder =
      isEqual(date, availableStartDate) || isEqual(date, availableFinishDate);
    const isDateInAvailableRange =
      isBefore(date, availableFinishDate) && isAfter(date, availableStartDate);
    const isWeekDayEqual = dayIndex === request.body.dayIndex;

    if ((isDateInAvailableRange || isDateEqualToBorder) && isWeekDayEqual) {
      return true;
    }
    throw new OutOfTimeRangeException();
  }
}
