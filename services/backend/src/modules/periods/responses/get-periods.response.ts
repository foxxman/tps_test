import { PeriodResponse } from './period.response';
import { ApiProperty } from '@nestjs/swagger';

export class GetPeriodsResponse {
  @ApiProperty({
    description: `Array of available periods`,
    isArray: true,
    type: PeriodResponse,
  })
  periods: PeriodResponse[];
}
