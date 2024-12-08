import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { Users } from './users.entity';
  import { OrderDetails } from './order-details.entity';
  
  @Entity('orders')
  export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Users, (user) => user.orders)
    user: Users;
  
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
  
    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    @JoinColumn()
    orderDetails: OrderDetails;
  }
  