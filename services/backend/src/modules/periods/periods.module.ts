import { Module } from '@nestjs/common';
import { PeriodsController } from './periods.controller';
import { PeriodsService } from './periods.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PeriodsController],
  providers: [PeriodsService, PrismaService],
})
export class PeriodsModule {}
