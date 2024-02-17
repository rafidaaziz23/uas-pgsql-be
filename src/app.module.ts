import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { LogActivityModule } from './log-activity/log-activity.module';
import { InventoryModule } from './inventory/inventory.module';
import { SupplierModule } from './supplier/supplier.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    UserModule,
    LogActivityModule,
    InventoryModule,
    SupplierModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
