import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { EnkodModule } from './enkod/enkod.module';
import { PurchasesModule } from './purchases/purchases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ExportsModule } from './exports/exports.module';
import { NullsalesModule } from './nullsales/nullsales.module';
import { DatabaseInitializationService } from './database/db.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    SalesModule,
    EnkodModule,
    PurchasesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        manualInitialization: true,
        toRetry(err) {
          return false;
        },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ExportsModule,
    NullsalesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseInitializationService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly databaseService: DatabaseInitializationService,
  ) {}
  onApplicationBootstrap() {
    this.databaseService.initializeDatabase();
  }
}
