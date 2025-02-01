import { Injectable } from '@nestjs/common';
import { Period } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PutPeriodDto } from './dto';
import { setTime } from 'src/utils/date';
import { isAfter } from 'date-fns';
import { InvalidTimeRangeException } from 'src/errors/periods';

@Injectable()
export class PeriodsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPeriods({
    dayIndex,
  }: {
    dayIndex?: number;
  }): Promise<{ periods: Period[] }> {
    const periods = await this.prisma.period.findMany({
      where: {
        dayIndex,
      },
      orderBy: {
        dayIndex: 'asc',
      },
    });

    return {
      periods,
    };
  }

  async changePeriod(data: PutPeriodDto): Promise<{ period: Period }> {
    const date = new Date();
    const finishDate = setTime(date, `${data.finishTime}:59:999`);
    const startDate = setTime(date, `${data.startTime}:00:00`);

    if (!isAfter(finishDate, startDate)) {
      throw new InvalidTimeRangeException();
    }

    const period = await this.prisma.period.update({
      where: {
        dayIndex: data.dayIndex,
      },
      data: {
        startTime: data.startTime,
        finishTime: data.finishTime,
      },
    });

    return { period };
  }
}
