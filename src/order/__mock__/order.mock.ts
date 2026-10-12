import { Order } from '../entities/order.entity';

export const orderMock: Order = {
  id: 1432,
  orderNumber: 125,
  orderDescription: 'Descrição Pedido Teste',
  createdAt: new Date(),
  updateAt: new Date(),
};
