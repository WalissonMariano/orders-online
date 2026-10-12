import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class CreateTypeOfItemsDto {
  @ApiProperty({
    description: 'Descrição do Tipo do Item.',
    example: 'Produto',
  })
  @IsString()
  typeItemsDescription: string;

  @ApiProperty({
    description: 'Porcentagem referente ao imposto.',
    example: 10,
  })
  @IsNumber()
  taxPercentage: number;
}
