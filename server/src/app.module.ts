import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ScheduleModule,
    GroupsModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
