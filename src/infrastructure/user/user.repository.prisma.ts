import { UserRepository } from '@domain/user/user.repository';
import { User } from '@domain/user/user.entity';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(
      (u) => new User(u.id, u.name, u.email, u.password, u.createdAt, u.updatedAt),
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async update(user: User): Promise<void> {
    const updateData: Partial<{
      name: string;
      email: string;
      password: string;
    }> = {};
    if (user.name) updateData.name = user.name;
    if (user.email) updateData.email = user.email;
    if (user.password) updateData.password = user.password;

    await this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });
  }
}