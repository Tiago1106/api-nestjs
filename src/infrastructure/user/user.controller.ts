import {
  Body,
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import { CreateUserUseCase } from '@application/user/create-user.usecase';
import { FetchUsersUseCase } from '@application/user/fetch-users.usecase';
import { FetchUserUseCase } from '@application/user/fetch-user.usecase';
import { CreateUserHttpDTO } from './dto/create-user.http.dto';
import { User } from '@domain/user/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly fetchUsersUseCase: FetchUsersUseCase,
    private readonly fetchUserUseCase: FetchUserUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() body: CreateUserHttpDTO) {
    await this.createUserUseCase.execute(body);

    return { message: 'User created successfully' };
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List users' })
  async findAll() {
    const users = await this.fetchUsersUseCase.execute();

    return users;
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List user' })
  async findById(@Param('id') id: string) {
    const user = await this.fetchUserUseCase.execute(id);

    return user;
  }
}
