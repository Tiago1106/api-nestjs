import { User } from '@domain/user/user.entity';
import { UserRepository } from '@domain/user/user.repository';

export class FetchUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.findAll();

    const filteredResponse = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    return filteredResponse;
  }
}