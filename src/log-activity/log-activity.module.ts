import { Module } from '@nestjs/common';
import { LogActivityService } from './log-activity.service';
import { LogActivityController } from './log-activity.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LogActivityController],
  providers: [LogActivityService],
  imports: [PrismaModule],
})
export class LogActivityModule {}
