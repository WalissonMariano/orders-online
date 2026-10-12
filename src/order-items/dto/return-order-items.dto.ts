import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../item/entities/item.entity';
import { OrderItems } from '../entities/order-items.entity';

export class ReturnOrderItemsDto {
  @ApiProperty({ example: 1 })
  orderId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 1.55 })
  taxValue: number;

  @ApiProperty({ example: 31 })
  totalValue: number;

  @ApiProperty({ type: () => Item })
  item: Item;

  constructor(orderItems: OrderItems) {
    this.orderId = orderItems.orderId;
    this.quantity = orderItems.quantity;
    this.taxValue = orderItems.taxValue;
    this.totalValue = orderItems.totalValue;
    this.item = orderItems.item;
  }
}
