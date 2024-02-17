import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionModule],
  imports: [PrismaModule],
})
export class TransactionModule {}
