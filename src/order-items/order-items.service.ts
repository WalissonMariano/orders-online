import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { OrderItems } from './entities/order-items.entity';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { UpdateOrderItemsDto } from './dto/update-order-items.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemService } from '../item/item.service';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItems)
    private readonly orderItemsRepository: Repository<OrderItems>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly itemService: ItemService,
  ) {}

  async getByOrderId(orderId: number): Promise<OrderItems[]> {
    await this.ensureOrderExists(orderId);

    return this.orderItemsRepository.find({
      where: { orderId },
    });
  }

  async getById(id: number): Promise<OrderItems> {
    const orderItem = await this.orderItemsRepository.findOne({
      where: { id },
    });

    if (!orderItem) {
      throw new NotFoundException(`Item do pedido ${id} não encontrado.`);
    }

    return orderItem;
  }

  async createOrderItems(
    createOrderItems: CreateOrderItemsDto,
  ): Promise<OrderItems> {
    await this.ensureOrderExists(createOrderItems.orderId);
    await this.itemService.getItemById(createOrderItems.itemId);

    const taxValue = await this.calculateTaxValue(
      createOrderItems.itemId,
      createOrderItems.quantity,
    );
    const totalValue = await this.calculateTotalValue(
      createOrderItems.itemId,
      createOrderItems.quantity,
    );

    return this.orderItemsRepository.save({
      orderId: createOrderItems.orderId,
      itemId: createOrderItems.itemId,
      quantity: createOrderItems.quantity,
      taxValue,
      totalValue,
    });
  }

  async updateOrderItems(
    id: number,
    updateOrderItems: UpdateOrderItemsDto,
  ): Promise<OrderItems> {
    const orderItem = await this.getById(id);
    const itemId = updateOrderItems.itemId ?? orderItem.itemId;
    const quantity = updateOrderItems.quantity ?? orderItem.quantity;

    if (updateOrderItems.itemId !== undefined) {
      await this.itemService.getItemById(itemId);
    }

    orderItem.itemId = itemId;
    orderItem.quantity = quantity;
    orderItem.taxValue = await this.calculateTaxValue(itemId, quantity);
    orderItem.totalValue = await this.calculateTotalValue(itemId, quantity);

    return this.orderItemsRepository.save(orderItem);
  }

  async deleteOrderItems(id: number): Promise<DeleteResult> {
    await this.getById(id);

    return this.orderItemsRepository.delete({ id });
  }

  async deleteByOrderId(orderId: number): Promise<DeleteResult> {
    return this.orderItemsRepository.delete({ orderId });
  }

  async calculateTaxValue(itemId: number, quantity: number): Promise<number> {
    const unitValue = Number(
      (await this.itemService.getItemById(itemId)).unitValue,
    );
    const taxPercentage =
      await this.itemService.getTaxPercentageByItemId(itemId);

    return unitValue * (Number(taxPercentage) / 100) * quantity;
  }

  async calculateTotalValue(itemId: number, quantity: number): Promise<number> {
    const unitValue = Number(
      (await this.itemService.getItemById(itemId)).unitValue,
    );

    return unitValue * quantity;
  }

  private async ensureOrderExists(orderId: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Pedido ${orderId} não encontrado.`);
    }
  }
}
