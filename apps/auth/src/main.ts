import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AuthModule);
  const PORT = process.env.PORT;
  await app.listen(PORT);
  logger.log(`Auth app started on port ${PORT}`);
}
bootstrap();
