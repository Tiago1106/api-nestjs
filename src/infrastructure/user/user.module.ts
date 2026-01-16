import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserUseCase } from '@application/user/create-user.usecase';
import { FetchUsersUseCase } from '@application/user/fetch-users.usecase';
import { UserRepositoryPrisma } from './user.repository.prisma';
import { PrismaService } from '../database/prisma.service';
import { FetchUserUseCase } from '@application/user/fetch-user.usecase';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrisma,
    },
    // CREATE USER
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository) =>
        new CreateUserUseCase(userRepository),
      inject: ['UserRepository'],
    },
    // FETCH USERS
    {
      provide: FetchUsersUseCase,
      useFactory: (userRepository) => new FetchUsersUseCase(userRepository),
      inject: ['UserRepository'],
    },
    // FETCH USER BY ID
    {
      provide: FetchUserUseCase,
      useFactory: (userRepository) => new FetchUserUseCase(userRepository),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}