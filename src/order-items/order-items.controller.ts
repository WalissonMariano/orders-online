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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { UpdateOrderItemsDto } from './dto/update-order-items.dto';
import { ReturnOrderItemsDto } from './dto/return-order-items.dto';
import { OrderItems } from './entities/order-items.entity';

@ApiTags('Order-Items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @ApiOperation({ summary: 'Lista os itens de um pedido' })
  @Get('order/:orderId')
  async getByOrderId(
    @Param('orderId') orderId: number,
  ): Promise<ReturnOrderItemsDto[]> {
    return (await this.orderItemsService.getByOrderId(orderId)).map(
      (orderItem) => new ReturnOrderItemsDto(orderItem),
    );
  }

  @ApiOperation({ summary: 'Busca um item do pedido por id' })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<ReturnOrderItemsDto> {
    return new ReturnOrderItemsDto(await this.orderItemsService.getById(id));
  }

  @ApiOperation({ summary: 'Adiciona um item a um pedido' })
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createOrderItemsDto: CreateOrderItemsDto,
  ): Promise<OrderItems> {
    return this.orderItemsService.createOrderItems(createOrderItemsDto);
  }

  @ApiOperation({ summary: 'Altera um item do pedido' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderItemsDto: UpdateOrderItemsDto,
  ): Promise<OrderItems> {
    return this.orderItemsService.updateOrderItems(id, updateOrderItemsDto);
  }

  @ApiOperation({ summary: 'Remove um item do pedido' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderItemsService.deleteOrderItems(id);
  }
}
