import { Module } from '@nestjs/common';
import { TypeOfItemsService } from './type-of-items.service';
import { TypeOfItemsController } from './type-of-items.controller';
import { TypeOfItems } from './entities/type-of-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfItems])],
  providers: [TypeOfItemsService],
  controllers: [TypeOfItemsController],
  exports: [TypeOfItemsService],
})
export class TypeOfItemsModule {}
