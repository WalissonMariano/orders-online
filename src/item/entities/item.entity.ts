import { TypeOfItems } from '../../type-of-items/entities/type-of-items.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'number_item', nullable: false })
  numberItem: number;

  @Column({ name: 'type_of_item_id', nullable: false })
  typeOfItemId: number;

  @Column({ name: 'item_description', nullable: false })
  itemDescription: string;

  @Column('decimal', {
    name: 'unit_value',
    nullable: false,
    precision: 6,
    scale: 2,
  })
  unitValue: number;

  @Column({ name: 'image', nullable: false })
  image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ManyToOne(
    () => TypeOfItems,
    (typeOfItems: TypeOfItems) => typeOfItems.item,
    { eager: true },
  )
  @JoinColumn({ name: 'type_of_item_id', referencedColumnName: 'id' })
  typeOfItems?: TypeOfItems;
}
