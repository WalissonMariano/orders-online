import { Order } from '../entities/order.entity';
import { ReturnOrderItemsDto } from '../../order-items/dto/return-order-items.dto';

export class ReturnOrderDto {
  id: number;
  orderNumber: number;
  orderDescription: string;
  createAt: Date;
  orderItems: ReturnOrderItemsDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.orderNumber = order.orderNumber;
    this.orderDescription = order.orderDescription;
    this.createAt = order.createdAt;
    this.orderItems = order.orderItems;
  }
}
