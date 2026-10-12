import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderItemsService } from '../order-items/order-items.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderItems'],
    });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new NotFoundException(`Pedido ${id} não encontrado.`);
    }

    return order;
  }

  async getOrderByNumber(orderNumber: number): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { orderNumber },
    });

    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.getOrderByNumber(createOrderDto.orderNumber);

    if (order) {
      throw new ConflictException(
        `Número de pedido ${createOrderDto.orderNumber} já existe.`,
      );
    }

    return this.orderRepository.save({
      orderNumber: createOrderDto.orderNumber,
      orderDescription: createOrderDto.orderDescription,
    });
  }

  async deleteOrder(orderId: number): Promise<DeleteResult> {
    await this.getOrderById(orderId);
    await this.orderItemsService.deleteByOrderId(orderId);

    return this.orderRepository.delete({ id: orderId });
  }

  async updateOrder(
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.getOrderById(orderId);

    if (
      updateOrderDto.orderNumber !== undefined &&
      updateOrderDto.orderNumber !== order.orderNumber
    ) {
      const duplicated = await this.getOrderByNumber(
        updateOrderDto.orderNumber,
      );

      if (duplicated) {
        throw new ConflictException(
          `Número de pedido ${updateOrderDto.orderNumber} já existe.`,
        );
      }

      order.orderNumber = updateOrderDto.orderNumber;
    }

    if (updateOrderDto.orderDescription !== undefined) {
      order.orderDescription = updateOrderDto.orderDescription;
    }

    return await this.orderRepository.save(order);
  }
}
