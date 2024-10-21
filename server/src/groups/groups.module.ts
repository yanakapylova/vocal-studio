import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    CacheModule.registerAsync<CacheModuleOptions>({
      useFactory: async () => {
        const client = createClient({
          url: 'redis://localhost:6379',
        });
        await client.connect();

        return {
          store: redisStore,
          url: 'redis://localhost:6379',
          ttl: 600,
          isGlobal: true,
        };
      },
    }),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, PrismaService],
})
export class GroupsModule {}
