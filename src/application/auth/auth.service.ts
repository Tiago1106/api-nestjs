import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { HashService } from '@shared/crypto/hash.service';
import { InvalidCredentialsError } from './errors/auth.error';
import type { UserRepository } from '@domain/user/user.repository';

interface AuthRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password }: AuthRequest): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const isValid = await HashService.compare(password, user.password);

    if (!isValid) throw new InvalidCredentialsError();

    const secret = process.env.JWT_SECRET || 'change_this_secret';

    const token = jwt.sign({ sub: user.id, email: user.email }, secret, {
      expiresIn: '2h',
    });

    return { token };
  }
}
