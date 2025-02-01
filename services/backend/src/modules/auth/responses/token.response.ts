import { ApiProperty } from '@nestjs/swagger';
import { IToken } from '../../../types/auth';

export class TokenResponse implements IToken {
  @ApiProperty({
    description: 'Token',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  token: string;

  @ApiProperty({
    description: 'Timestamp, when token will expire',
    example: 213123213213,
  })
  expireAt: number;
}
