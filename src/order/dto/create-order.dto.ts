import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateOrderItemsDto } from '../../order-items/dto/create-order-items.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Número do Pedido.',
    example: 25,
  })
  @IsNumber()
  orderNumber: number;

  @ApiProperty({
    description: 'Descrição do Pedido.',
    example: 'Pedido de Arroz 5kg',
  })
  @IsString()
  orderDescription: string;

  @ApiProperty({ type: [CreateOrderItemsDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemsDto)
  orderItems?: CreateOrderItemsDto[];

  createdAt: Date;

  updateAt: Date;
}
