import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, groups, ...info } = createUserDto;
    const salt = 10;
    const hash = await bcrypt.hash(createUserDto.password, salt);

    return await this.prisma.user.create({
      data: {
        ...info,
        groups: groups
          ? {
              connect: groups.map((groupId) => ({ id: groupId })),
            }
          : undefined,
        password: hash,
      },
      include: {
        groups: true,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany({
      include: {
        groups: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    console.log(id);
    const result = await this.prisma.user.findUnique({
      where: { id },
      include: { groups: true },
    });

    if (!result) {
      throw new HttpException(`Пользователь с ID ${id} не найден`, 400);
    }
    return result;
  }

  async findUserByPhone(phone: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { phone },
        include: { groups: true },
      });

      if (user) {
        return user;
      } else {
        throw new HttpException(
          `Пользователь с e-mail ${phone} не найден`,
          400,
        );
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    console.log('id service: ' + id);
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { groups: true },
    });

    if (!user) {
      throw new HttpException(`Пользователь с ID ${id} не найден`, 400);
    }

    const { groups, ...userData } = updateUserDto;

    const updateData: any = {
      ...userData,
    };

    if (groups) {
      updateData.groups = {
        disconnect: user.groups.map((group) => ({ id: +group.id })),
        connect: groups.map((groupId) => ({ id: +groupId })),
      };
    }

    return await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException(`Пользователь с ID ${id} не найден`, 400);
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
