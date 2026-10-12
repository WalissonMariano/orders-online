import { OrderItems } from '../../order-items/entities/order-items.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'order_number', nullable: false })
  orderNumber: number;

  @Column({ name: 'order_description', nullable: false })
  orderDescription: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @OneToMany(() => OrderItems, (orderItems: OrderItems) => orderItems.order, {
    cascade: true,
    eager: true,
  })
  orderItems?: OrderItems[];
}
