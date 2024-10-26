import { Order } from '../entities/order.entity';

export class ReturnOrderDto {
  id: number;
  orderNumber: number;
  orderDescription: string;
  createAt: Date;

  constructor(order: Order) {
    this.id = order.id;
    this.orderNumber = order.orderNumber;
    this.orderDescription = order.orderDescription;
    this.createAt = order.createdAt;
  }
}
