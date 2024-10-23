import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ScheduleModule, GroupsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
