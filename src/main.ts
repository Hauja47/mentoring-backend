import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as path from 'path';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config and setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Mentoring API')
    .setDescription('This is API of Mentoring')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Generate Swagger json file
  const swaggerOutputPath = path.resolve(process.cwd(), 'swagger.json');
  writeFileSync(swaggerOutputPath, JSON.stringify(document), {
    encoding: 'utf-8',
  });

  await app.listen(3000);
}
bootstrap();
