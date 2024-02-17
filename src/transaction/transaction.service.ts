import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: any) {
    const { desc, created_by, details } = createTransactionDto;
    const status = 0;

    const transaction = await this.prisma.transaction.create({
      data: {
        status,
        desc,
        created_by,
      },
    });

    const createDetails = details.map((detail: any) => ({
      ...detail,
      transaction_id: transaction.id,
    }));
    await this.prisma.transactionDetail.createMany({
      data: createDetails,
    });

    return transaction;
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: { User: true, TransactionDetail: true },
    });
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: { User: true, TransactionDetail: true },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: number, updateTransactionDto: any) {
    const { desc } = updateTransactionDto;
    return this.prisma.transaction.update({
      where: { id },
      data: {
        desc,
      },
    });
  }

  async updateStatus(id: number, updateTransactionStatusDto: any) {
    const { status } = updateTransactionStatusDto;
    return this.prisma.transaction.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
