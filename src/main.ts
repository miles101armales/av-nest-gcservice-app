import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception_filters/http-exception.filter';
import { DatabaseConnectionExceptionFilter } from './exception_filters/db-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      abortOnError: false,
    });
    app.setGlobalPrefix('api');
    app.useGlobalFilters(
      new HttpExceptionFilter(),
      new DatabaseConnectionExceptionFilter(),
    );
    await app.listen(3000);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
