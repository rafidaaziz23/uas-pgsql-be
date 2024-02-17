import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as config from 'config';

// const port = config.get<number>('server.port') || 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
