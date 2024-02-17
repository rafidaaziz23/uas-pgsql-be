import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLogActivityDto } from './dto/create-log-activity.dto';

@Injectable()
export class LogActivityService {
  constructor(private prisma: PrismaService) {}

  async create(createLogActivityDto: any) {
    const { user_id, name, desc } = createLogActivityDto;
    return this.prisma.logActivity.create({
      data: {
        User: { connect: { id: user_id } },
        name,
        desc,
      },
    });
  }

  async findAll() {
    return this.prisma.logActivity.findMany();
  }
}
