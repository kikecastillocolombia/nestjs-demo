import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToMany,
  } from 'typeorm';
  import { Orders } from './orders.entity';
  import { Products } from './products.entity';
  
  @Entity('order_details')
  export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;
  
    @OneToOne(() => Orders, (order) => order.orderDetails)
    order: Orders;
  
    @ManyToMany(() => Products, (product) => product.orderDetails)
    products: Products[];
  }
  