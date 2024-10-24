import { HttpException, Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const { groups, ...newUser } = createScheduleDto;

    return await this.prisma.schedule.create({
      data: {
        ...newUser,
        ...(groups && {
          connect: groups.map((groupId) => ({ id: groupId })),
        }),
      },
    });
  }

  async findAll() {
    return await this.prisma.schedule.findMany({
      include: {
        groups: true,
      },
    });
  }

  async findUserSchedule(userId: number) {
    const schedules = await this.prisma.schedule.findMany({
      where: {
        groups: {
          some: {
            users: {
              some: {
                id: userId,
              },
            },
          },
        },
      },
      include: {
        groups: true,
      },
    });

    return schedules;
  }

  async findOne(id: number): Promise<Schedule> {
    const result = await this.prisma.schedule.findUnique({
      where: { id },
      include: { groups: true },
    });

    if (!result) {
      throw new HttpException(`Расписание с ID ${id} не найдено`, 400);
    }
    return result;
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    try {
      const existingSchedule = await this.prisma.schedule.findUniqueOrThrow({
        where: { id },
        include: { groups: true },
      });
      const { groups, ...scheduleData } = updateScheduleDto;

      const updateData: any = {
        ...scheduleData,
        ...(groups && {
          set: existingSchedule.groups.map((group) => ({ id: group.id })),
          connect: groups.map((groupId) => ({ id: groupId })),
        }),
      };

      return this.prisma.schedule.update({
        where: { id },
        data: updateData,
      });
    } catch {
      console.log(`Расписание с ID ${id} не найдено`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.schedule.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.schedule.delete({
        where: { id },
      });
    } catch {
      console.log(`Расписание с ID ${id} не найдено`);
    }
  }
}
