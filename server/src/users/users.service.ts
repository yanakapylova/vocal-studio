import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { salt } from 'src/constants/constants'; 

// TODO: add try/catch where needed
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, groups, ...user } = createUserDto;
    const hash = await bcrypt.hash(password, salt);

    return this.prisma.user.create({
      data: {
        ...user,
        ...(groups && {
          connect: groups.map((groupId) => ({ id: groupId })),
        }),
        password: hash,
      },
      include: {
        groups: true,
      },
    });
  }

  // TODO: add foltering, sorting, pagination
  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany({
      include: {
        groups: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const result = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { groups: true },
    });

    return result;
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
        include: { groups: true },
      });
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { groups: true },
    });

    const { groups, ...userData } = updateUserDto;

    const updateData: any = {
      ...userData,
      ...(groups && {
        disconnect: user.groups.map((group) => ({ id: +group.id })),
        connect: groups.map((groupId) => ({ id: +groupId })),
      }),
    };

    return await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.user.findUniqueOrThrow({ where: { id } });

      await this.prisma.user.delete({
        where: { id },
      });
    } catch {
      console.log(`Пользователь с ID ${id} не найден`);
    }
  }
}
