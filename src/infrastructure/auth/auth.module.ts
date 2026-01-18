import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import { AuthController } from './auth.controller';
import { UserRepositoryPrisma } from '../user/user.repository.prisma';
import { AuthService } from '@application/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrisma,
    },
    {
      provide: AuthService,
      useFactory: (userRepository) => new AuthService(userRepository),
      inject: ['UserRepository'],
    },
  ],
})
export class AuthModule {}
