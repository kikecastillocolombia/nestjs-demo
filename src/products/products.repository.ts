import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.interface";

type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

@Injectable()
export class ProductsRepository {
  
  
  private products: Products[] = [
    {
      id: 1,
      name: "Laptop",
      description: "A powerful gaming laptop.",
      price: 1500,
      stock: true,
      imgUrl: "https://example.com/images/laptop.jpg",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "A high-end smartphone with great features.",
      price: 800,
      stock: true,
      imgUrl: "https://example.com/images/smartphone.jpg",
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: 250,
      stock: true,
      imgUrl: "https://example.com/images/headphones.jpg",
    },
    {
      id: 4,
      name: "Smartwatch",
      description: "A smartwatch with fitness tracking and notifications.",
      price: 200,
      stock: false,
      imgUrl: "https://example.com/images/smartwatch.jpg",
    },
  ];

  async getProducts() {
    return this.products;
  }

  async getProductById(id: number) {
    return this.products.find((product) => product.id == id);
  }

  async createProduct(product: Omit<Products, "id">) {
    const id = this.products.length + 1;
    const newProduct = {
      id,
      ...product,
    };

    this.products = [
      ...this.products,
      newProduct,
    ]
    return newProduct;
  }

  async updateProduct(id: number, updateProductDto: Partial<Product>) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
  
    Object.assign(product, updateProductDto);
    
    return product;
  }

  async deleteProduct(id: number) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error('Product not found');
    }
    
    this.products.splice(index, 1);
    return { message: 'Product deleted successfully' };
  }    
}
