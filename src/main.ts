import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  
  cloudinary.config({
    api_key: configService.get('CLOUDINARY_API_KEY'),
    cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
    api_secret: configService.get('CLOUDINARY_API_SECRET'),
  });
  
  app.use(helmet());
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
