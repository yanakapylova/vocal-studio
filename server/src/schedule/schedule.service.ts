import { HttpException, Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) { }

  async create(createScheduleDto: CreateScheduleDto) {
    // TODO: use rest operator
    const { type, date, time, place, durationMin, activity, groups } =
      createScheduleDto;

    return await this.prisma.schedule.create({
      data: {
        type,
        date,
        time,
        place,
        durationMin,
        activity,
        groups: groups
          ? {
            connect: groups.map((groupId) => ({ id: groupId })),
          }
          : undefined,
      },
    });
  }

  // TODO: remove  Promise<any[]>
  async findAll(): Promise<any[]> {
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

    return schedules; // Возвращаем найденные расписания
  }

  async findOne(id: number): Promise<Schedule> {
    const result = await this.prisma.schedule.findUnique({
      where: { id },
      include: { groups: true }, // Включаем группы, если нужно
    });

    if (!result) {
      throw new HttpException(`Расписание с ID ${id} не найдено`, 400);
    }
    return result;
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    const existingSchedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: { groups: true },
    });

    if (!existingSchedule) {
      throw new HttpException(`Расписание с ID ${id} не найдено`, 400);
    }

    const { groups, ...scheduleData } = updateScheduleDto;

    const updateData: any = {
      ...scheduleData,
    };

    if (groups) {
      updateData.groups = {
        set: existingSchedule.groups.map((group) => ({ id: group.id })), // Удаляем старые группы
        connect: groups.map((groupId) => ({ id: groupId })), // Подключаем новые группы
      };
    }

    return await this.prisma.schedule.update({
      where: { id },
      data: updateData,
    });
  }

  // Метод для удаления расписания
  async remove(id: number): Promise<void> {
    const existingSchedule = await this.prisma.schedule.findUnique({
      where: { id },
    });

    if (!existingSchedule) {
      throw new HttpException(`Расписание с ID ${id} не найдено`, 400);
    }

    await this.prisma.schedule.delete({
      where: { id },
    });
  }
}
