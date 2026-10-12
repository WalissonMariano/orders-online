import { ApiProperty } from '@nestjs/swagger';
import { ReturnTypeOfItemsDto } from '../../type-of-items/dto/return-type-of-items.dto';
import { Item } from '../entities/item.entity';

export class ReturnItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  numberItem: number;

  @ApiProperty({ example: 'Arroz 5kg' })
  itemDescription: string;

  @ApiProperty({ example: 15.5 })
  unitValue: number;

  @ApiProperty({ example: 'imagem-arroz.jpg' })
  image: string;

  @ApiProperty({ type: ReturnTypeOfItemsDto, required: false })
  typeOfItems?: ReturnTypeOfItemsDto;

  constructor(item: Item) {
    this.id = item.id;
    this.numberItem = item.numberItem;
    this.itemDescription = item.itemDescription;
    this.unitValue = item.unitValue;
    this.image = item.image;
    this.typeOfItems = item.typeOfItems
      ? new ReturnTypeOfItemsDto(item.typeOfItems)
      : undefined;
  }
}
