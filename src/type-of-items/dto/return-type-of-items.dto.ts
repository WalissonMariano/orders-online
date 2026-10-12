import { ApiProperty } from '@nestjs/swagger';
import { TypeOfItems } from '../entities/type-of-items.entity';

export class ReturnTypeOfItemsDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Produto' })
  typeItemsDescription: string;

  @ApiProperty({ example: 10 })
  taxPercentage: number;

  constructor(typeOfItems: TypeOfItems) {
    this.id = typeOfItems.id;
    this.typeItemsDescription = typeOfItems.typeItemsDescription;
    this.taxPercentage = typeOfItems.taxPercentage;
  }
}
