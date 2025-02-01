import { ApiProperty } from '@nestjs/swagger';

export class PeriodResponse {
  @ApiProperty({
    description: `Period's unique identifier`,
    example: '12345-12345-12345',
  })
  id: string;

  @ApiProperty({
    example: '6',
    description: `Index of the week day`,
  })
  dayIndex: number;

  @ApiProperty({
    example: '00:00',
    description: `Start of available time slot`,
  })
  startTime: string;

  @ApiProperty({
    example: '23:59',
    description: `Finish of available time slot`,
  })
  finishTime: string;
}
