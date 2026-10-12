import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderItems } from './entities/order-items.entity';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemService } from '../item/item.service';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItems)
    private readonly orderItemsRepository: Repository<OrderItems>,
    private readonly itemService: ItemService,
  ) {}

  async getAllTypesOfItems(): Promise<OrderItems[]> {
    const orderItems = this.orderItemsRepository.find();

    return orderItems;
  }

  async createOrderItems(
    createOrderItems: CreateOrderItemsDto,
  ): Promise<OrderItems> {
    await this.itemService.getItemById(createOrderItems.itemId);

    return this.orderItemsRepository.save(createOrderItems);
  }

  async calculateTaxValue(itemId: number, quantity: number): Promise<number> {
    const unitValue = (await this.itemService.getItemById(itemId)).unitValue;
    const taxPercentage =
      await this.itemService.getTaxPercentageByItemId(itemId);

    return unitValue * (Number(taxPercentage) / 100) * quantity;
  }

  async calculateTotalValue(itemId: number, quantity: number): Promise<number> {
    const unitValue = (await this.itemService.getItemById(itemId)).unitValue;

    return unitValue * quantity;
  }
}
