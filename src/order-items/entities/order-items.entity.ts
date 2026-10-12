import { Item } from '../../item/entities/item.entity';
import { Order } from '../../order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order_items' })
export class OrderItems {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'order_id', nullable: false })
  orderId: number;

  @Column({ name: 'item_id', nullable: false })
  itemId: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column('decimal', {
    name: 'tax_value',
    nullable: false,
    precision: 6,
    scale: 2,
  })
  taxValue: number;

  @Column('decimal', {
    name: 'total_value',
    nullable: false,
    precision: 6,
    scale: 2,
  })
  totalValue: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => Order, (order: Order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
  item: Item;
}
