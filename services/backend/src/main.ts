import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from './pipes/validation-exception.factory';
import { addDays } from 'date-fns';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TPS test API')
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      requestInterceptor: (req) => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        req.headers['X-Timezone'] = timezone;
        return req;
      },
    },
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
