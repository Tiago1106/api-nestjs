import { randomUUID } from 'crypto';

import { User } from '@domain/user/user.entity';
import { UserRepository } from '@domain/user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { HashService } from '@shared/crypto/hash.service';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { InvalidPasswordError } from './errors/invalid-password.error';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<void> {
    const userAlreadyExists =
      await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }
    if (!data.password || data.password.length < 6) {
      throw new InvalidPasswordError();
    }

    const passwordHash = await HashService.hash(data.password);

    const user = new User(
      randomUUID(),
      data.name,
      data.email,
      passwordHash,
    );

    await this.userRepository.create(user);
  }
}