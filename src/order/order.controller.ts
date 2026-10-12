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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ReturnOrderDto } from './dto/return-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderItemsDto } from '../order-items/dto/create-order-items.dto';
import { DeleteResult } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItems } from 'src/order-items/entities/order-items.entity';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Cria pedido' })
  @UsePipes(ValidationPipe)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Insere item em um pedido existente' })
  @UsePipes(ValidationPipe)
  @Post(':id/items')
  async createOrderItemsByIdOrder(
    @Param('id') id: number,
    @Body() createOrderItemsDto: CreateOrderItemsDto,
  ): Promise<OrderItems> {
    return await this.orderService.createOrderItemsByIdOrder(
      id,
      createOrderItemsDto,
    );
  }

  @ApiOperation({ summary: 'Busca todos pedidos' })
  @Get()
  async getAllOrders(): Promise<ReturnOrderDto[]> {
    return (await this.orderService.getAllOrders()).map(
      (order) => new ReturnOrderDto(order),
    );
  }

  @ApiOperation({ summary: 'Busca pedido por id' })
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<ReturnOrderDto> {
    return new ReturnOrderDto(await this.orderService.getOrderById(id));
  }

  @ApiOperation({ summary: 'Altera pedido por id' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return await this.orderService.updateOrder(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Deleta pedido por id' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.orderService.deleteOrder(id);
  }
}
