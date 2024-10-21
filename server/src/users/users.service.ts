import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// TODO: add try/catch where needed
@Injectable()
export class UsersService {
  // TODO: add readonly access modification
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // TODO: FIX `info` -> user
    const { password, groups, ...info } = createUserDto;
    // TODO: move to contacts folder
    const salt = 10;
    // TODO: use password variable instead of createUserDto.password
    const hash = await bcrypt.hash(createUserDto.password, salt);

    // TODO: readme https://eslint.org/docs/latest/rules/no-return-await
    return await this.prisma.user.create({
      data: {
        ...info,
        // groups: groups
        //   ? {
        //       connect: groups.map((groupId) => ({ id: groupId })),
        //     }
        //   : undefined,
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
    console.log(id);

    const result = await this.prisma.user.findUnique({
      where: { id },
      include: { groups: true },
    });

    // Use findUniqueOrThrow instead of findUnique and handling 404
    if (!result) {
      // TODO: bad status code (404). Use NotFoundExeption
      throw new HttpException(`Пользователь с ID ${id} не найден`, 400);
    }
    return result;
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: { groups: true },
      });

      // TODO: try to avoid nested if/else situation
      if (user) {
        return user;
      } else {
        throw new HttpException(
          `Пользователь с e-mail ${email} не найден`,
          400,
        );
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
    }
  }

  // TODO: Remove redundant Promise<User>
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { groups: true },
    });

    if (!user) {
      throw new HttpException(`Пользователь с ID ${id} не найден`, 400);
    }

    const { groups, ...userData } = updateUserDto;

    // TODO: add strict typing
    const updateData: any = {
      ...userData,
    };

    // TODO: use ...(groups && {}) syntax instead of if/else
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
