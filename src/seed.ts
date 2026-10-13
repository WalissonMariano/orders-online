import { AppDataSource } from './data-source';
import { Item } from './item/entities/item.entity';
import { Order } from './order/entities/order.entity';
import { OrderItems } from './order-items/entities/order-items.entity';
import { TypeOfItems } from './type-of-items/entities/type-of-items.entity';

function calculateTaxValue(
  unitValue: number,
  taxPercentage: number,
  quantity: number,
): number {
  return unitValue * (taxPercentage / 100) * quantity;
}

function calculateTotalValue(unitValue: number, quantity: number): number {
  return unitValue * quantity;
}

export async function populateDemoData(): Promise<void> {
  const typeOfItemsRepository = AppDataSource.getRepository(TypeOfItems);
  const itemRepository = AppDataSource.getRepository(Item);
  const orderRepository = AppDataSource.getRepository(Order);
  const orderItemsRepository = AppDataSource.getRepository(OrderItems);

  const productType = await typeOfItemsRepository.save({
    typeItemsDescription: 'Produto',
    taxPercentage: 10,
  });

  const serviceType = await typeOfItemsRepository.save({
    typeItemsDescription: 'Serviço',
    taxPercentage: 15,
  });

  const rice = await itemRepository.save({
    numberItem: 1,
    typeOfItemId: productType.id,
    itemDescription: 'Arroz 5kg',
    unitValue: 15.5,
    image: 'arroz.jpg',
  });

  const bean = await itemRepository.save({
    numberItem: 2,
    typeOfItemId: productType.id,
    itemDescription: 'Feijão 1kg',
    unitValue: 8.9,
    image: 'feijao.jpg',
  });

  const oil = await itemRepository.save({
    numberItem: 3,
    typeOfItemId: productType.id,
    itemDescription: 'Óleo 900ml',
    unitValue: 7.5,
    image: 'oleo.jpg',
  });

  const milk = await itemRepository.save({
    numberItem: 4,
    typeOfItemId: productType.id,
    itemDescription: 'Leite 1L',
    unitValue: 5.25,
    image: 'leite.jpg',
  });

  const delivery = await itemRepository.save({
    numberItem: 5,
    typeOfItemId: serviceType.id,
    itemDescription: 'Entrega',
    unitValue: 8,
    image: 'entrega.jpg',
  });

  const firstOrder = await orderRepository.save({
    orderNumber: 1,
    orderDescription: 'Pedido demonstração',
  });

  const secondOrder = await orderRepository.save({
    orderNumber: 2,
    orderDescription: 'Pedido mercado',
  });

  const saveOrderItem = async (
    orderId: number,
    item: Item,
    taxPercentage: number,
    quantity: number,
  ) => {
    const unitValue = Number(item.unitValue);

    await orderItemsRepository.save({
      orderId,
      itemId: item.id,
      quantity,
      taxValue: calculateTaxValue(unitValue, taxPercentage, quantity),
      totalValue: calculateTotalValue(unitValue, quantity),
    });
  };

  const productTax = Number(productType.taxPercentage);
  const serviceTax = Number(serviceType.taxPercentage);

  await saveOrderItem(firstOrder.id, rice, productTax, 2);
  await saveOrderItem(firstOrder.id, bean, productTax, 3);
  await saveOrderItem(firstOrder.id, delivery, serviceTax, 1);

  await saveOrderItem(secondOrder.id, oil, productTax, 2);
  await saveOrderItem(secondOrder.id, milk, productTax, 4);
  await saveOrderItem(secondOrder.id, rice, productTax, 1);
  await saveOrderItem(secondOrder.id, delivery, serviceTax, 1);
}

async function seed() {
  await AppDataSource.initialize();
  await populateDemoData();
  await AppDataSource.destroy();
}

if (require.main === module) {
  seed().catch(async (error) => {
    console.error(error);
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(1);
  });
}
