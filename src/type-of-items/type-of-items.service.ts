import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TypeOfItems } from './entities/type-of-items.entity';
import { CreateTypeOfItemsDto } from './dto/create-type-of-items.dto';
import { UpdateTypeOfItemsDto } from './dto/update-type-of-items.dto';

@Injectable()
export class TypeOfItemsService {
  constructor(
    @InjectRepository(TypeOfItems)
    private readonly typeOfItemsRepository: Repository<TypeOfItems>,
  ) {}

  async getAllTypesOfItems(): Promise<TypeOfItems[]> {
    return this.typeOfItemsRepository.find();
  }

  async getTypeOfItemsById(id: number): Promise<TypeOfItems> {
    const typeOfItems = await this.typeOfItemsRepository.findOne({
      where: {
        id,
      },
    });

    if (!typeOfItems) {
      throw new NotFoundException(`Tipo de item ${id} não encontrado.`);
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
      throw new NotFoundException(
        `Tipo de item ${typeItemsDescription} não encontrado.`,
      );
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
        `Tipo de item ${createTypesOfItems.typeItemsDescription} já existe.`,
      );
    }

    return this.typeOfItemsRepository.save(createTypesOfItems);
  }

  async updateTypeOfItems(
    typeOfItemsId: number,
    updateTypeOfItems: UpdateTypeOfItemsDto,
  ): Promise<TypeOfItems> {
    const typeOfItems = await this.getTypeOfItemsById(typeOfItemsId);

    if (
      updateTypeOfItems.typeItemsDescription &&
      updateTypeOfItems.typeItemsDescription !==
        typeOfItems.typeItemsDescription
    ) {
      const duplicated = await this.getTypeOfItemsByName(
        updateTypeOfItems.typeItemsDescription,
      ).catch(() => undefined);

      if (duplicated) {
        throw new BadRequestException(
          `Tipo de item ${updateTypeOfItems.typeItemsDescription} já existe.`,
        );
      }
    }

    if (updateTypeOfItems.typeItemsDescription !== undefined) {
      typeOfItems.typeItemsDescription = updateTypeOfItems.typeItemsDescription;
    }

    if (updateTypeOfItems.taxPercentage !== undefined) {
      typeOfItems.taxPercentage = updateTypeOfItems.taxPercentage;
    }

    return this.typeOfItemsRepository.save(typeOfItems);
  }

  async deleteTypeOfItems(typeOfItemsId: number): Promise<DeleteResult> {
    await this.getTypeOfItemsById(typeOfItemsId);

    return this.typeOfItemsRepository.delete({ id: typeOfItemsId });
  }
}
