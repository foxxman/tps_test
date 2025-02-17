import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { IsValidTime } from 'src/decorators';

export class PutPeriodDto {
  @ApiProperty({
    example: '6',
    description: `Index of the week day`,
  })
  @IsInt({ message: 'dayIndex must be an integer' })
  @Min(0, { message: 'dayIndex must be at least 0' })
  @Max(6, { message: 'dayIndex must be at most 6' })
  @ApiProperty({
    example: '6',
    description: `Index of the week day`,
  })
  dayIndex: number;

  @ApiProperty({
    example: '00:00',
    description: `Start of available time slot`,
  })
  @IsValidTime({
    message: 'incorrect-start',
  })
  startTime: string;

  @ApiProperty({
    example: '23:59',
    description: `Finish of available time slot`,
  })
  @IsValidTime({
    message: 'incorrect-finish',
  })
  finishTime: string;
}
