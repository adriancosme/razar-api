import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const processEnv: any = dotenv.parse(fs.readFileSync(`.env`));
  app.setGlobalPrefix('api');
  await app.listen(processEnv.PORT);
}
bootstrap();
