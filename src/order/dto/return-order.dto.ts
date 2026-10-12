import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { ReturnOrderItemsDto } from '../../order-items/dto/return-order-items.dto';

export class ReturnOrderDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 25 })
  orderNumber: number;

  @ApiProperty({ example: 'Pedido de Arroz 5kg' })
  orderDescription: string;

  @ApiProperty()
  createAt: Date;

  @ApiProperty({ type: [ReturnOrderItemsDto] })
  orderItems: ReturnOrderItemsDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.orderNumber = order.orderNumber;
    this.orderDescription = order.orderDescription;
    this.createAt = order.createdAt;
    this.orderItems = (order.orderItems ?? []).map(
      (orderItem) => new ReturnOrderItemsDto(orderItem),
    );
  }
}
