import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  createProduct(product: Omit<Product, "id">): Promise<Product> {
    return this.productsRepository.createProduct(product);
  }

  findAll() {
    return this.productsRepository.getProducts();
  }

  findOne(id: number) {
    return this.productsRepository.getProductById(id);  }

  update(id: number, updateProductDto: Partial<Omit<Product, "id">>) {
    return this.productsRepository.updateProduct(id, updateProductDto);
  }

  async remove(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
