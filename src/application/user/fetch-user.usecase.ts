import { User } from '@domain/user/user.entity';
import { UserRepository } from '@domain/user/user.repository';
import { NotFoundUserError } from './errors/not-found-user.error';

export class FetchUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundUserError();
    }

    const filteredResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return filteredResponse;
  }
}