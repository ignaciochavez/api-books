import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateEnvironmentVariables } from './common/utils/util';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    ValidateEnvironmentVariables();
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: true
    }));
    app.useGlobalFilters(new ValidationExceptionFilter());
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'tests') {
    const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .setTitle('API-BOOKS')
      .setDescription('Documentación de API-BOOKS')
      .setVersion('v1')
      .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce el token JWT (Bearer Token) en este formato: `Bearer YOUR_TOKEN`'
      },
      'access-token',
      )
      .build();

      const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  
      app.use('/swagger/v1/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(document);
      });
  
      SwaggerModule.setup('swagger', app, document, {
        jsonDocumentUrl: 'swagger/v1/swagger.json'
      });
    }
    await app.listen(process.env.PORT!);
  } catch (error: any) {
    console.error('Error al iniciar la aplicación:', error.message);
    process.exit(1);    
  }
}

bootstrap();
