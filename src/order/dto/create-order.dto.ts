import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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
}
