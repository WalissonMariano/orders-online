import { forwardRef, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { TypeOfItemsModule } from '../type-of-items/type-of-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    forwardRef(() => TypeOfItemsModule),
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemsModule {}
