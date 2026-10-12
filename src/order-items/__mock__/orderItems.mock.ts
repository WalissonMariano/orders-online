import { orderMock } from 'src/order/__mock__/order.mock';
import { OrderItems } from '../entities/order-items.entity';
import { itemMock } from 'src/item/__mock__/item.mock';

export const orderItemsMock: OrderItems = {
  id: 123,
  orderId: 2324,
  itemId: 1020,
  quantity: 100,
  taxValue: 15,
  totalValue: 20,
  createdAt: new Date(),
  updateAt: new Date(),
  order: orderMock,
  item: itemMock,
};
