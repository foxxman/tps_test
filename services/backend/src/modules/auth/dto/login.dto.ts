import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: 'User email',
    example: 'user1@some.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'user1@some.com',
  })
  password: string;
}
