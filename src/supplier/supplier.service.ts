import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create(createSupplierDto: any) {
    const { name, contact, address, desc } = createSupplierDto;
    return this.prisma.supplier.create({
      data: {
        name,
        contact,
        address,
        desc,
      },
    });
  }

  async findAll() {
    return this.prisma.supplier.findMany();
  }

  async findOne(id: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async update(id: number, updateSupplierDto: any) {
    const { name, contact, address, desc } = updateSupplierDto;
    return this.prisma.supplier.update({
      where: { id },
      data: {
        name,
        contact,
        address,
        desc,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }
}
