import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    const { name, users, schedules } = createGroupDto;

    return await this.prisma.group.create({
      data: {
        name,
        ...(users && {
          connect: users.map((userId) => ({ id: userId })),
        }),
        ...(schedules && {
          connect: schedules.map((scheduleId) => ({ id: scheduleId })),
        }),
      },
    });
  }

  async findAll() {
    return await this.prisma.group.findMany();
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.group.findUniqueOrThrow({
        where: { id },
        include: { users: true, schedules: true },
      });
      return result;
    } catch {
      `Пользователь с ID ${id} не найден`;
    }
  }

  async findUserSchedule(userId: number) {
    const userWithGroups = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        groups: {
          include: {
            schedules: true,
          },
        },
      },
    });

    const schedules = userWithGroups.groups.flatMap((group) => group.schedules);
    return schedules;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      const existingGroup = await this.prisma.group.findUniqueOrThrow({
        where: { id },
        include: { users: true, schedules: true },
      });

      const { users, schedules, ...groupData } = updateGroupDto;

      const updateData: any = {
        ...groupData,
        ...(users && {
          set: existingGroup.users.map((user) => ({ id: user.id })),
          connect: users.map((userId) => ({ id: userId })),
        }),
        ...(schedules && {
          set: existingGroup.schedules.map((schedule) => ({ id: schedule.id })),
          connect: schedules.map((scheduleId) => ({ id: scheduleId })),
        }),
      };

      return await this.prisma.group.update({
        where: { id },
        data: updateData,
      });
    } catch {
      `Пользователь с ID ${id} не найден`;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.group.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.group.delete({
        where: { id },
      });
    } catch {
      console.log(`Группа с ID ${id} не найдена`);
    }
  }
}
