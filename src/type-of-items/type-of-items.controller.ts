import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnTypeOfItemsDto } from './dto/return-type-of-items.dto';
import { TypeOfItemsService } from './type-of-items.service';
import { CreateTypeOfItemsDto } from './dto/create-type-of-items.dto';
import { UpdateTypeOfItemsDto } from './dto/update-type-of-items.dto';
import { TypeOfItems } from './entities/type-of-items.entity';
import { DeleteResult } from 'typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Type-Of-Items')
@Controller('type-of-items')
export class TypeOfItemsController {
  constructor(private readonly typeOfItemsService: TypeOfItemsService) {}

  @ApiOperation({ summary: 'Busca todos os tipos de item' })
  @Get()
  async getAllTypesOfItems(): Promise<ReturnTypeOfItemsDto[]> {
    return (await this.typeOfItemsService.getAllTypesOfItems()).map(
      (typeOfItems) => new ReturnTypeOfItemsDto(typeOfItems),
    );
  }

  @ApiOperation({ summary: 'Busca tipo de item por id' })
  @Get(':id')
  async getTypeOfItemsById(
    @Param('id') id: number,
  ): Promise<ReturnTypeOfItemsDto> {
    return new ReturnTypeOfItemsDto(
      await this.typeOfItemsService.getTypeOfItemsById(id),
    );
  }

  @ApiOperation({ summary: 'Cria tipo de item' })
  @UsePipes(ValidationPipe)
  @Post()
  async createTypesOfItems(
    @Body() createTypesOfItems: CreateTypeOfItemsDto,
  ): Promise<TypeOfItems> {
    return this.typeOfItemsService.createTypesOfItems(createTypesOfItems);
  }

  @ApiOperation({ summary: 'Altera tipo de item por id' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateTypeOfItems(
    @Param('id') id: number,
    @Body() updateTypeOfItems: UpdateTypeOfItemsDto,
  ): Promise<TypeOfItems> {
    return this.typeOfItemsService.updateTypeOfItems(id, updateTypeOfItems);
  }

  @ApiOperation({ summary: 'Deleta tipo de item por id' })
  @Delete(':id')
  async deleteTypeOfItems(@Param('id') id: number): Promise<DeleteResult> {
    return this.typeOfItemsService.deleteTypeOfItems(id);
  }
}
