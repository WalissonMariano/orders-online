import { DeleteResult, Repository } from 'typeorm';
import { OrderService } from '../order.service';
import { OrderItemsService } from '../../order-items/order-items.service';
import { ItemService } from '../../item/item.service';
import { Order } from '../entities/order.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItems } from '../../order-items/entities/order-items.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderItemsDto } from 'src/order-items/dto/create-order-items.dto';
import { itemMock } from '../../item/__mock__/item.mock';
import { UpdateOrderDto } from '../dto/update-order.dto';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: Repository<Order>;
  let orderItemsService: OrderItemsService;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(OrderItems),
          useClass: Repository,
        },
        {
          provide: OrderItemsService,
          useValue: {
            calculateTaxValue: jest.fn(),
            calculateTotalValue: jest.fn(),
          },
        },
        {
          provide: ItemService,
          useValue: {
            getItemById: jest.fn(),
          },
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    orderItemsService = module.get<OrderItemsService>(OrderItemsService);
    itemService = module.get<ItemService>(ItemService);
  });

  describe('getAllOrders', () => {
    it('should return all orders with orderItems', async () => {
      const orders = [{ id: 1, orderItems: [] }];
      jest
        .spyOn(orderRepository, 'find')
        .mockResolvedValueOnce(orders as Order[]);

      const result = await orderService.getAllOrders();
      expect(result).toEqual(orders);
    });

    it('should throw NotFoundException if no orders are found', async () => {
      jest.spyOn(orderRepository, 'find').mockResolvedValueOnce([]);

      await expect(orderService.getAllOrders()).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getOrderById', () => {
    it('should return an order by ID', async () => {
      const order = { id: 1 };
      jest
        .spyOn(orderRepository, 'findOne')
        .mockResolvedValueOnce(order as Order);

      const result = await orderService.getOrderById(1);
      expect(result).toEqual(order);
    });

    it('should throw NotFoundException if order is not found', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(orderService.getOrderById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getOrderByNumber', () => {
    it('should return an order by order number', async () => {
      const order = { orderNumber: 123 };
      jest
        .spyOn(orderRepository, 'findOne')
        .mockResolvedValueOnce(order as Order);

      const result = await orderService.getOrderByNumber(123);
      expect(result).toEqual(order);
    });
  });

  describe('createOrder', () => {
    const createOrderDto: CreateOrderDto = {
      orderNumber: 123,
      orderDescription: 'Sample Order',
      orderItems: [{ itemId: 1, quantity: 10 }] as CreateOrderItemsDto[],
      createdAt: new Date(),
      updateAt: new Date(),
    };

    it('should create an order with order items', async () => {
      jest.spyOn(orderService, 'getOrderByNumber').mockResolvedValueOnce(null);
      jest.spyOn(itemService, 'getItemById').mockResolvedValueOnce(itemMock);
      jest
        .spyOn(orderItemsService, 'calculateTaxValue')
        .mockResolvedValueOnce(5);
      jest
        .spyOn(orderItemsService, 'calculateTotalValue')
        .mockResolvedValueOnce(50);
      jest
        .spyOn(orderRepository, 'save')
        .mockResolvedValueOnce(createOrderDto as Order);

      const result = await orderService.createOrder(createOrderDto);
      expect(result).toEqual(createOrderDto);
    });

    it('should throw NotFoundException if order already exists', async () => {
      jest
        .spyOn(orderService, 'getOrderByNumber')
        .mockResolvedValueOnce({ orderNumber: 123 } as Order);

      await expect(orderService.createOrder(createOrderDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order by ID', async () => {
      jest
        .spyOn(orderService, 'getOrderById')
        .mockResolvedValueOnce({ id: 1 } as Order);
      jest
        .spyOn(orderRepository, 'delete')
        .mockResolvedValueOnce({ affected: 1 } as DeleteResult);

      const result = await orderService.deleteOrder(1);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('updateOrder', () => {
    it('should update an order', async () => {
      const updateOrderDto: UpdateOrderDto = {
        orderNumber: 456,
        orderDescription: 'Updated Order',
      };
      jest
        .spyOn(orderService, 'getOrderById')
        .mockResolvedValueOnce({ id: 1, ...updateOrderDto } as Order);
      jest
        .spyOn(orderRepository, 'save')
        .mockResolvedValueOnce({ id: 1, ...updateOrderDto } as Order);

      const result = await orderService.updateOrder(1, updateOrderDto);
      expect(result).toEqual({ id: 1, ...updateOrderDto });
    });
  });
});
