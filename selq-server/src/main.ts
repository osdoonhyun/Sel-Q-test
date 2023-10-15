import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@root/app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { BaseAPIDocument } from '@root/appconfig/swagger.document';
import * as cookieParser from 'cookie-parser';
import { TransformInterceptor } from '@root/common/interfaces/transform.interceptor';
import { HttpExceptionFilter } from '@root/common/filters/http-exception.filter';
// import * as fs from 'fs';

async function bootstrap() {
  // const customLogger = new CustomLogger();
  // const app = await NestFactory.create(AppModule, {
  //   logger: WinstonModule.createLogger(customLogger.createLoggerConfig),
  // });

  // const httpsOptions = {
  //   key: fs.readFileSync('./cert/cert.pem'),
  //   cert: fs.readFileSync('./cert/key.pem'),
  // };

  // const app = await NestFactory.create(AppModule, { httpsOptions });
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  app.enableCors({
    // origin: configService.get('FRONTEND_URL'),
    // origin: '*',
    origin: [
      configService.get('FRONTEND_URL'),
      'http://localhost:3000',
      'http://localhost',
      'http://seql.store',
      'https://seql.store',
      'http://seql.store:3000',
      'http://seql.store:8000',
      'https://43.202.208.59',
      'http://43.202.208.59',
      'http://43.202.208.59:3000',
      'http://43.202.208.59:8000',
      // 'https://seql.store:3000',
      // 'https://seql.store:3000',
      // 'https://seql.store:3000',
      // 'https://seql.store:3000',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get('SERVER_PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
