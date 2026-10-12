import { CreateOrderDto } from '../dto/create-order.dto';

export const createOrderMock: CreateOrderDto = {
  orderNumber: 1,
  orderDescription: 'Pedido Teste',
  createdAt: new Date(),
  updateAt: new Date(),
};
