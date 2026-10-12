import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderItemsDto {
  @ApiProperty({
    description: 'Id do item selecionado.',
    example: 12,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  itemId?: number;

  @ApiProperty({
    description: 'Quantidade solicitada do item selecionado.',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
