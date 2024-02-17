import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(createInventoryDto: any) {
    const { name, price, qty, category_id, create_by } = createInventoryDto;
    return this.prisma.inventory.create({
      data: {
        name,
        price,
        qty,
        Category: { connect: { id: category_id } },
        User: { connect: { id: create_by } },
      },
    });
  }

  async findAll() {
    return this.prisma.inventory.findMany({
      include: { Category: true },
    });
  }

  async findOne(id: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
      include: { Category: true },
    });
    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }
    return inventory;
  }

  async update(id: number, updateInventoryDto: any) {
    const { name, price, qty, category_id } = updateInventoryDto;
    return this.prisma.inventory.update({
      where: { id },
      data: {
        name,
        price,
        qty,
        Category: { connect: { id: category_id } },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.inventory.delete({
      where: { id },
    });
  }
}
