import { Item } from '../../item/entities/item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'type_of_items' })
export class TypeOfItems {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'type_items_description', nullable: false })
  typeItemsDescription: string;

  @Column({
    name: 'tax_percentage',
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: false,
  })
  taxPercentagem: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @OneToMany(() => Item, (item: Item) => item.typeOfItemId)
  item: Item[];
}
