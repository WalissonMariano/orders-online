import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ReturnItemDto } from './dto/return-item.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Busca todos os itens' })
  @Get()
  async getAllItems(): Promise<ReturnItemDto[]> {
    return (await this.itemService.getAllItems()).map(
      (item) => new ReturnItemDto(item),
    );
  }

  @ApiOperation({ summary: 'Busca item por id' })
  @Get(':id')
  async getItemById(@Param('id') id: number): Promise<ReturnItemDto> {
    return new ReturnItemDto(await this.itemService.getItemById(id));
  }

  @ApiOperation({ summary: 'Cria item' })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemService.createItem(createItemDto);
  }

  @ApiOperation({ summary: 'Altera item por id' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return await this.itemService.updateItem(id, updateItemDto);
  }

  @ApiOperation({ summary: 'Deleta item por id' })
  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<DeleteResult> {
    return await this.itemService.deleteItem(id);
  }
}
