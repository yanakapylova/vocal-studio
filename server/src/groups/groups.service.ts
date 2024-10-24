import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
// import { Cache } from 'cache-manager';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class GroupsService {
  constructor(
    private prisma: PrismaService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

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
    // const value = await this.cacheManager.get('allUsers'); // ? Retrieve data from the cache
    // if (value) {
    //   console.log('"allUsers" has been taken from cache');
    //   return value;
    // } else {
      const result = await this.prisma.group.findMany();
      // await this.cacheManager.set('allUsers', result); //  ? Set data in the cache
    //   console.log("'allUsers' has been cached");
      return result;
    // }
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
