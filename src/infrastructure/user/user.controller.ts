import {
  Body,
  Controller,
  Post,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateUserUseCase } from '@application/user/create-user.usecase';
import { CreateUserHttpDTO } from './dto/create-user.http.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() body: CreateUserHttpDTO) {
    await this.createUserUseCase.execute(body);

    return { message: 'User created successfully' };
  }
}
