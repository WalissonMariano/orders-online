import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { OrderItems } from './entities/order-items.entity';
import { Order } from '../order/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from '../item/item.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItems, Order]), ItemsModule],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
