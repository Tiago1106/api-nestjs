import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserUseCase } from '@application/user/create-user.usecase';
import { UserRepositoryPrisma } from './user.repository.prisma';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrisma,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository) =>
        new CreateUserUseCase(userRepository),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}