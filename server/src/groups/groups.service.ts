import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, Group } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

const prisma = new PrismaClient();

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    console.log(createGroupDto);
    const { name, users, schedules } = createGroupDto;

    return await this.prisma.group.create({
      data: {
        name,
        users: users
          ? {
              connect: users.map((userId) => ({ id: userId })),
            }
          : undefined,
        schedules: schedules
          ? {
              connect: schedules.map((scheduleId) => ({ id: scheduleId })),
            }
          : undefined,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return await prisma.group.findMany();
  }

  async findOne(id: number): Promise<Group> {
    const result = await this.prisma.group.findUnique({
      where: { id },
      include: { users: true, schedules: true },
    });

    if (!result) {
      throw new HttpException(`Группа с ID ${id} не найдена`, 400);
    }
    return result;
  }

  async findUserSchedule(userId: number) {
    // Получаем группы пользователя
    const userWithGroups = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        groups: {
          include: {
            schedules: true,
          },
        },
      }, // Включаем расписания в группы
    });

    if (!userWithGroups) {
      throw new HttpException(`Пользователь с ID ${userId} не найден`, 404);
    }

    // Извлекаем расписания из групп
    const schedules = userWithGroups.groups.flatMap((group) => group.schedules);

    return schedules; // Возвращаем все расписания
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const existingGroup = await this.prisma.group.findUnique({
      where: { id },
      include: { users: true, schedules: true },
    });

    if (!existingGroup) {
      throw new HttpException(`Группа с ID ${id} не найдена`, 400);
    }

    const { users, schedules, ...groupData } = updateGroupDto;

    const updateData: any = {
      ...groupData,
    };

    if (users) {
      updateData.users = {
        set: existingGroup.users.map((user) => ({ id: user.id })),
        connect: users.map((userId) => ({ id: userId })),
      };
    }

    if (schedules) {
      updateData.schedules = {
        set: existingGroup.schedules.map((schedule) => ({ id: schedule.id })),
        connect: schedules.map((scheduleId) => ({ id: scheduleId })),
      };
    }

    return await this.prisma.group.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<void> {
    const existingGroup = await this.prisma.group.findUnique({
      where: { id },
    });

    if (!existingGroup) {
      throw new HttpException(`Группа с ID ${id} не найдена`, 400);
    }

    await this.prisma.group.delete({
      where: { id },
    });
  }
}
