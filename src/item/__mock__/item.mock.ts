import { typeOfItemsMock } from '../../type-of-items/__mock__/typeOfItems.mock';
import { Item } from '../entities/item.entity';

export const itemMock: Item = {
  id: 123,
  numberItem: 123,
  typeOfItemId: 2,
  itemDescription: 'Arroz 5kg',
  unitValue: 10.5,
  image: 'teste.jpg',
  createdAt: new Date(),
  updateAt: new Date(),
  typeOfItems: typeOfItemsMock,
};
