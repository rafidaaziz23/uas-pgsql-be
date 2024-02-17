import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: any) {
    const { name, desc } = createCategoryDto;
    return this.prisma.category.create({
      data: {
        name,
        desc,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: any) {
    const { name, desc } = updateCategoryDto;
    return this.prisma.category.update({
      where: { id },
      data: {
        name,
        desc,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
