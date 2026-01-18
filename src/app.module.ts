import { Module } from '@nestjs/common';
import { UserModule } from './infrastructure/user/user.module';
import { AuthModule } from '@infrastructure/auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
})
export class AppModule {}