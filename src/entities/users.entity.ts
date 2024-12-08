import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Orders } from './orders.entity';
  
  @Entity('users')
  export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 50, nullable: false })
    name: string;
  
    @Column({ length: 50, unique: true, nullable: false })
    email: string;
  
    @Column({ length: 20, nullable: false })
    password: string;
  
    @Column('bigint')
    phone: number;
  
    @Column({ length: 50 })
    country: string;
  
    @Column('text')
    address: string;
  
    @Column({ length: 50 })
    city: string;
  
    @OneToMany(() => Orders, (order) => order.user)
    orders: Orders[];
  }
  