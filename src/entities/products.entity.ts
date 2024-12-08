import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Categories } from './categories.entity';
  import { OrderDetails } from './order-details.entity';
  
  @Entity('products')
  export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 50, nullable: false })
    name: string;
  
    @Column('text', { nullable: false })
    description: string;
  
    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;
  
    @Column('int', { nullable: false })
    stock: number;
  
    @Column({ default: 'default-image.png' })
    imgUrl: string;
  
    @ManyToOne(() => Categories, (category) => category.products)
    category: Categories;
  
    @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetails[];
  }
  