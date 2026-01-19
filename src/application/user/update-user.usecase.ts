import { UserRepository } from '@domain/user/user.repository';
import { HashService } from '@shared/crypto/hash.service';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { InvalidLengthPasswordError, InvalidUpdatePasswordError } from './errors/invalid-password.error';
import { NotFoundUserError } from './errors/not-found-user.error';
import type { UpdateUserDTO } from './dto/update-user.dto';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UpdateUserDTO): Promise<void> {
    const { id, name, email, oldPassword, newPassword } = data;

    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundUserError();

    if (email && email !== user.email) {
      const userAlreadyExists = await this.userRepository.findByEmail(email);
      if (userAlreadyExists) throw new UserAlreadyExistsError();
      user.email = email;
    }

    if (name) user.name = name;

    if (newPassword || oldPassword) {
      if (!oldPassword || !newPassword) throw new InvalidUpdatePasswordError();

      if (newPassword.length < 6) throw new InvalidLengthPasswordError();

      const isMatch = await HashService.compare(oldPassword, user.password);
      if (!isMatch) throw new InvalidUpdatePasswordError();

      user.password = await HashService.hash(newPassword);
    }

    await this.userRepository.update(user);
  }
}