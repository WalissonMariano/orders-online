import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TypeOfItems } from './entities/type-of-items.entity';
import { CreateTypeOfItemsDto } from './dto/create-type-of-items.dto';

@Injectable()
export class TypeOfItemsService {
  constructor(
    @InjectRepository(TypeOfItems)
    private readonly typeOfItemsRepository: Repository<TypeOfItems>,
  ) {}

  async getAllTypesOfItems(): Promise<TypeOfItems[]> {
    const typeOfItems = await this.typeOfItemsRepository.find();

    if (!typeOfItems || typeOfItems.length === 0) {
      throw new NotFoundException(`type of items empty`);
    }

    return typeOfItems;
  }

  async getTypeOfItemsById(id: number): Promise<TypeOfItems> {
    const typeOfItems = await this.typeOfItemsRepository.findOne({
      where: {
        id,
      },
    });

    if (!typeOfItems) {
      throw new NotFoundException(`Type id ${id} not found`);
    }

    return typeOfItems;
  }

  async getTypeOfItemsByName(
    typeItemsDescription: string,
  ): Promise<TypeOfItems> {
    const typeOfItems = await this.typeOfItemsRepository.findOne({
      where: {
        typeItemsDescription,
      },
    });

    if (!typeOfItems) {
      throw new NotFoundException(`Type ${typeItemsDescription} not found`);
    }

    return typeOfItems;
  }

  async createTypesOfItems(
    createTypesOfItems: CreateTypeOfItemsDto,
  ): Promise<TypeOfItems> {
    const typeOfItems = await this.getTypeOfItemsByName(
      createTypesOfItems.typeItemsDescription,
    ).catch(() => undefined);

    if (typeOfItems) {
      throw new BadRequestException(
        `Type ${createTypesOfItems.typeItemsDescription} exist`,
      );
    }

    return this.typeOfItemsRepository.save(createTypesOfItems);
  }

  async deleteTypeOfItems(typeOfItemsId: number): Promise<DeleteResult> {
    await this.getTypeOfItemsById(typeOfItemsId);

    return this.typeOfItemsRepository.delete({ id: typeOfItemsId });
  }
}
