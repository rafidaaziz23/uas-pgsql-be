// src/prisma/prisma.service.ts

import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '../../node_modules/.prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  [x: string]: any;
}
