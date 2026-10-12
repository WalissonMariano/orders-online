import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderItemsDto {
  @ApiProperty({
    description: 'Id do pedido.',
    example: 1,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'Id do item selecionado.',
    example: 12,
  })
  @IsNumber()
  itemId: number;

  @ApiProperty({
    description: 'Quantidade solicitada do item selecionado.',
    example: 120,
  })
  @IsNumber()
  quantity: number;
}
