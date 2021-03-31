import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/assets/views'));
  app.setViewEngine('hbs');
  
  cloudinary.config({
    api_key: configService.get('CLOUDINARY_API_KEY'),
    cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
    api_secret: configService.get('CLOUDINARY_API_SECRET'),
  });
  
  app.use(helmet());
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
