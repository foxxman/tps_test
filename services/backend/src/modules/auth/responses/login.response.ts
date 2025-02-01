import { ApiProperty } from '@nestjs/swagger';
import { TokenResponse } from './token.response';
import { UserResponse } from './user.response';

export class LoginResponse {
  @ApiProperty({
    description: 'User object',
  })
  user: UserResponse;

  @ApiProperty({
    description: 'Access token',
  })
  token: TokenResponse;
}
