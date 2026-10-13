import { AppDataSource } from './data-source';
import { populateDemoData } from './seed';

async function resetDemoDatabase() {
  await AppDataSource.initialize();

  await AppDataSource.query(`
    TRUNCATE TABLE
      public.order_items,
      public."order",
      public.item,
      public.type_of_items
    RESTART IDENTITY CASCADE
  `);

  await populateDemoData();
  await AppDataSource.destroy();
}

resetDemoDatabase().catch(async (error) => {
  console.error(error);
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(1);
});
