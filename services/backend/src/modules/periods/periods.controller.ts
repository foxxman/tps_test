import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetPeriodsResponse, PeriodResponse } from './responses';
import { PutPeriodDto } from './dto';
import { PeriodsGuard } from 'src/guards';
import { Period } from '@prisma/client';

@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get available periods' })
  @ApiResponse({ type: GetPeriodsResponse })
  async getPeriods(): Promise<GetPeriodsResponse> {
    const { periods } = await this.periodsService.getPeriods({});
    return {
      periods,
    };
  }

  @Put('')
  @ApiOperation({ summary: 'Change one of available periods' })
  @ApiResponse({ type: PeriodResponse })
  @UseGuards(PeriodsGuard)
  async changePeriod(@Body() data: PutPeriodDto): Promise<Period> {
    const { period } = await this.periodsService.changePeriod(data);
    return period;
  }
}
