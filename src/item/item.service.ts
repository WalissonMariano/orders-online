import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { TypeOfItemsService } from '../type-of-items/type-of-items.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly typeOfItemService: TypeOfItemsService,
  ) {}

  async getAllItems(): Promise<Item[]> {
    const items = await this.itemRepository.find({
      relations: ['typeOfItems'],
    });

    if (!items || items.length === 0) {
      throw new NotFoundException('Not found items');
    }

    return items;
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException(`Product id ${id} not found`);
    }

    return item;
  }

  async getTaxPercentageByItemId(idItem: number): Promise<number> {
    const item = await this.getItemById(idItem);
    const typeOfItems = await this.typeOfItemService.getTypeOfItemsById(
      item.typeOfItemId,
    );

    return typeOfItems?.taxPercentagem ?? 0;
  }

  async createItem(createItemDto: CreateItemDto): Promise<CreateItemDto> {
    await this.typeOfItemService.getTypeOfItemsById(createItemDto.typeOfItemId);

    return this.itemRepository.save({
      ...createItemDto,
    });
  }

  async updateItem(
    itemId: number,
    updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    const item = await this.getItemById(itemId);

    item.itemDescription = updateItemDto.itemDescription;
    item.numberItem = updateItemDto.numberItem;

    return await this.itemRepository.save(item);
  }

  async deleteItem(itemId: number): Promise<DeleteResult> {
    await this.getItemById(itemId);

    return this.itemRepository.delete({ id: itemId });
  }
}
