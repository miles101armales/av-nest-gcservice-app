import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseInitializationService {
  constructor(private readonly connection: DataSource) {}

  async initializeDatabase(): Promise<void> {
    try {
      // Устанавливаем соединение с базой данных
      await this.connection.initialize();
      console.log('Database connection established successfully');

      // Выполняем миграции (если они есть)
      await this.connection.runMigrations();
      console.log('Database migrations executed successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
}
