import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { LoginResponse } from './responses';
import { userModelToDto } from './toDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ type: LoginResponse })
  async login(@Body() data: LoginDto): Promise<LoginResponse> {
    const { user, token } = await this.authService.signInWithPassword(data);

    return {
      token,
      user: userModelToDto(user),
    };
  }
}
