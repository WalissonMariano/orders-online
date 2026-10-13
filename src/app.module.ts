import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { OrderModule } from './order/order.module';
import { ItemsModule } from './item/item.module';
import { TypeOfItemsModule } from './type-of-items/type-of-items.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 30,
        },
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      extra: {
        ssl: process.env.DATABASE_URL ? true : false,
      },
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: false,
    }),
    OrderModule,
    ItemsModule,
    TypeOfItemsModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
