import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ScheduleModule, GroupsModule, AuthModule]
})
export class AppModule {}
