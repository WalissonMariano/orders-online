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
    private readonly typeOfItemsService: TypeOfItemsService,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: ['typeOfItems'],
    });
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException(`Item ${id} não encontrado.`);
    }

    return item;
  }

  async getTaxPercentageByItemId(idItem: number): Promise<number> {
    const item = await this.getItemById(idItem);
    const typeOfItems = await this.typeOfItemsService.getTypeOfItemsById(
      item.typeOfItemId,
    );

    return typeOfItems?.taxPercentage ?? 0;
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    await this.typeOfItemsService.getTypeOfItemsById(
      createItemDto.typeOfItemId,
    );

    return this.itemRepository.save({
      ...createItemDto,
    });
  }

  async updateItem(
    itemId: number,
    updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    const item = await this.getItemById(itemId);

    if (updateItemDto.typeOfItemId !== undefined) {
      await this.typeOfItemsService.getTypeOfItemsById(
        updateItemDto.typeOfItemId,
      );
      item.typeOfItemId = updateItemDto.typeOfItemId;
    }

    if (updateItemDto.itemDescription !== undefined) {
      item.itemDescription = updateItemDto.itemDescription;
    }

    if (updateItemDto.numberItem !== undefined) {
      item.numberItem = updateItemDto.numberItem;
    }

    if (updateItemDto.unitValue !== undefined) {
      item.unitValue = updateItemDto.unitValue;
    }

    if (updateItemDto.image !== undefined) {
      item.image = updateItemDto.image;
    }

    return await this.itemRepository.save(item);
  }

  async deleteItem(itemId: number): Promise<DeleteResult> {
    await this.getItemById(itemId);

    return this.itemRepository.delete({ id: itemId });
  }
}
