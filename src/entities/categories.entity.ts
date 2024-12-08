import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Products } from './products.entity';
  
  @Entity('categories')
  export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 50, nullable: false })
    name: string;
  
    @OneToMany(() => Products, (product) => product.category)
    products: Products[];
  }
  