import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  
  cloudinary.config({
    long_url_signature: configService.get('CLOUDINARY_URL')
  });
  
  app.use(helmet());
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
