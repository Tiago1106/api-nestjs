import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { LoginHttpDTO } from '../user/dto/login.http.dto';
import { AuthService } from '@application/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'User authenticated' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: LoginHttpDTO) {
    const token = await this.authService.execute(body);

    return token;
  }
}
